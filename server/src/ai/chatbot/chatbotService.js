const axios = require('axios');
const Document = require('file:\\\C:\Users\KIIT\NeuroPotential\server\node_modules\mongoose\lib\helpers\document');
const Assessment = require('file:\\\C:\Users\KIIT\NeuroPotential\client\src\styles\assessment.css');

/**
 * Chatbot service to handle interactions and assessments
 */
class ChatbotService {
  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY;
    this.apiEndpoint = 'https://api.openai.com/v1/chat/completions';
    
    // Define the assessment stages and question templates
    this.assessmentStages = [
      {
        id: 'initial',
        name: 'Initial Assessment',
        description: 'Gathering basic information about strengths and challenges',
        questionTemplates: [
          'Based on the medical report, I can see {condition}. How does this affect daily activities?',
          'What activities does {patient_name} enjoy the most?',
          'In what situations does {patient_name} show the most focus and engagement?',
          'What are some challenges {patient_name} faces in social situations?',
          'How does {patient_name} respond to new environments or changes in routine?'
        ]
      },
      {
        id: 'strengths',
        name: 'Strengths Analysis',
        description: 'Identifying key strengths and aptitudes',
        questionTemplates: [
          'What subjects or activities does {patient_name} excel at?',
          'Have you noticed any particular patterns or details that {patient_name} is especially good at recognizing?',
          'Are there any repetitive tasks that {patient_name} enjoys or performs well?',
          'How does {patient_name} approach problem-solving?',
          'What kind of information or topics does {patient_name} remember most easily?'
        ]
      },
      {
        id: 'challenges',
        name: 'Challenges Assessment',
        description: 'Understanding specific challenges to consider',
        questionTemplates: [
          'What environments or situations cause the most stress or anxiety?',
          'Are there specific sensory inputs (sounds, lights, textures) that {patient_name} finds difficult?',
          'How does {patient_name} communicate needs or discomfort?',
          'What strategies have been most helpful during challenging situations?',
          'How does {patient_name} handle transitions between activities?'
        ]
      },
      {
        id: 'interests',
        name: 'Interests Exploration',
        description: 'Exploring specific interests and passions',
        questionTemplates: [
          'What topics or subjects does {patient_name} talk about most frequently?',
          'Are there any collections or categories of items that {patient_name} likes to organize or learn about?',
          'What kinds of books, shows, or media does {patient_name} prefer?',
          'Has {patient_name} shown interest in specific technologies or tools?',
          'What activities would {patient_name} choose to do if given free time?'
        ]
      },
      {
        id: 'career',
        name: 'Career Aptitude',
        description: 'Assessing potential career directions',
        questionTemplates: [
          'Has {patient_name} expressed interest in any particular careers or jobs?',
          'What kind of work environment do you think would best suit {patient_name}\'s needs?',
          'Are there any role models or professionals that {patient_name} admires?',
          'What skills would you like to see {patient_name} develop for future employment?',
          'How important is routine and structure in {patient_name}\'s ideal work environment?'
        ]
      }
    ];
  }

  /**
   * Starts a new assessment based on uploaded document
   * @param {string} userId - The user ID
   * @param {string} documentId - The document ID
   * @returns {Promise<object>} - The created assessment
   */
  async startAssessment(userId, documentId) {
    try {
      // Get the document with patient details
      const document = await Document.findById(documentId);
      if (!document) {
        throw new Error('Document not found');
      }
      
      // Extract patient information
      const patientName = document.patientName;
      const patientAge = document.patientAge;
      
      // Create initial message
      const initialMessage = await this.generateInitialMessage(document);
      
      // Create a new assessment
      const assessment = await Assessment.create({
        userId,
        documentId,
        patientName,
        patientAge,
        currentStage: 'initial',
        progress: 0,
        messages: [
          {
            sender: 'ai',
            text: initialMessage,
            timestamp: new Date()
          }
        ]
      });
      
      return assessment;
    } catch (error) {
      console.error('Error starting assessment:', error);
      throw error;
    }
  }

  /**
   * Generates an initial message based on document analysis
   * @param {object} document - The document object
   * @returns {Promise<string>} - The generated message
   */
  async generateInitialMessage(document) {
    try {
      // If we have extracted data from the document
      if (document.extractedData) {
        return this.composeMessageFromExtractedData(document);
      }
      
      // Default initial message if no data extraction
      return `Hello! I'll be helping you explore potential career paths for ${document.patientName}. 
        First, I'd like to ask a few questions to understand their strengths and interests better.
        
        Could you tell me what activities ${document.patientName} enjoys the most?`;
    } catch (error) {
      console.error('Error generating initial message:', error);
      return "Hello! I'll be helping you explore potential career paths. Let's start by discussing strengths and interests.";
    }
  }

  /**
   * Processes a user message and generates a response
   * @param {string} assessmentId - The assessment ID
   * @param {string} message - The user message
   * @returns {Promise<object>} - The updated assessment with new message
   */
  async processMessage(assessmentId, message) {
    try {
      // Get the assessment
      const assessment = await Assessment.findById(assessmentId);
      if (!assessment) {
        throw new Error('Assessment not found');
      }
      
      // Add user message to history
      assessment.messages.push({
        sender: 'user',
        text: message,
        timestamp: new Date()
      });
      
      // Generate AI response
      const response = await this.generateResponse(assessment, message);
      
      // Add AI response to history
      assessment.messages.push({
        sender: 'ai',
        text: response.message,
        timestamp: new Date()
      });
      
      // Update stage and progress if needed
      if (response.nextStage) {
        assessment.currentStage = response.nextStage;
      }
      
      // Calculate progress based on number of exchanges and stages
      const totalStages = this.assessmentStages.length;
      const messagesPerStage = 5; // Approx 5 messages per stage
      const totalExpectedMessages = totalStages * messagesPerStage;
      const currentProgress = Math.min(
        100, 
        Math.round((assessment.messages.length / totalExpectedMessages) * 100)
      );
      
      assessment.progress = currentProgress;
      
      // If assessment is complete, generate recommendations
      if (currentProgress >= 100) {
        assessment.isComplete = true;
        assessment.completedAt = new Date();
        
        // Generate recommendations (separate process)
        this.generateRecommendations(assessment._id);
      }
      
      // Save and return updated assessment
      await assessment.save();
      return assessment;
    } catch (error) {
      console.error('Error processing message:', error);
      throw error;
    }
  }

  /**
   * Generates an AI response based on assessment context and user message
   * @param {object} assessment - The assessment object
   * @param {string} userMessage - The user message
   * @returns {Promise<object>} - The response object
   */
  async generateResponse(assessment, userMessage) {
    try {
      // Prepare context from assessment and message history
      const currentStage = assessment.currentStage;
      const stageInfo = this.assessmentStages.find(stage => stage.id === currentStage);
      const messageHistory = assessment.messages.slice(-10); // Last 10 messages for context
      
      // Format messages for API
      const formattedMessages = [
        {
          role: 'system',
          content: `You are an AI career guidance assistant for neurodiverse individuals. 
            You are currently in the "${stageInfo.name}" stage of assessment (${stageInfo.description}).
            Your goal is to gather information about the patient's strengths, challenges, and interests to recommend suitable career paths.
            Be concise, specific, and use simple language. Ask one question at a time.
            The patient's name is ${assessment.patientName} and they are ${assessment.patientAge} years old.`
        },
        ...messageHistory.map(msg => ({
          role: msg.sender === 'ai' ? 'assistant' : 'user',
          content: msg.text
        }))
      ];
      
      // Call OpenAI API
      const response = await axios.post(
        this.apiEndpoint,
        {
          model: 'gpt-4',
          messages: formattedMessages,
          temperature: 0.7,
          max_tokens: 300
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      // Process response
      const aiMessage = response.data.choices[0].message.content;
      
      // Determine if we should move to next stage
      let nextStage = null;
      const currentStageIndex = this.assessmentStages.findIndex(stage => stage.id === currentStage);
      const questionsAsked = assessment.messages.filter(msg => msg.sender === 'ai').length;
      
      // Move to next stage after approximately 5 exchanges per stage
      if ((questionsAsked % 5 === 0) && (currentStageIndex < this.assessmentStages.length - 1)) {
        nextStage = this.assessmentStages[currentStageIndex + 1].id;
      }
      
      return {
        message: aiMessage,
        nextStage
      };
    } catch (error) {
      console.error('Error generating AI response:', error);
      return {
        message: 'I apologize, but I encountered an issue processing your message. Could you please try again?',
        nextStage: null
      };
    }
  }

  /**
   * Generates career recommendations based on assessment data
   * @param {string} assessmentId - The assessment ID
   */
  async generateRecommendations(assessmentId) {
    try {
      const assessment = await Assessment.findById(assessmentId)
        .populate('documentId');
      
      if (!assessment) {
        throw new Error('Assessment not found');
      }
      
      // Prepare all messages for analysis
      const allMessages = assessment.messages;
      
      // Format data for the recommendation API
      const requestData = {
        patientName: assessment.patientName,
        patientAge: assessment.patientAge,
        conversation: allMessages,
        documentData: assessment.documentId.extractedData || {}
      };
      
      // This would typically call a separate recommendation service
      // For this example, we'll use the same OpenAI API
      const prompt = `
        Based on the following assessment data for ${assessment.patientName}, age ${assessment.patientAge},
        please generate 5 potential career paths that would suit their strengths and accommodate their challenges.
        For each recommendation, provide:
        1. Career title
        2. Why it's a good match (based on identified strengths)
        3. Potential challenges and accommodations
        4. Education or training path
        
        Assessment data:
        ${JSON.stringify(requestData, null, 2)}
      `;
      
      const response = await axios.post(
        this.apiEndpoint,
        {
          model: 'gpt-4',
          messages: [
            { role: 'system', content: 'You are a career counselor specializing in neurodiversity.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 1000
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      // Extract recommendations
      const recommendationsText = response.data.choices[0].message.content;
      
      // Save recommendations to assessment
      assessment.recommendations = recommendationsText;
      assessment.recommendationsGeneratedAt = new Date();
      await assessment.save();
      
      return assessment;
    } catch (error) {
      console.error('Error generating recommendations:', error);
      // In a production environment, would want to handle this error and retry
    }
  }
}

module.exports = new ChatbotService();
