const express = require('express');
const router = express.Router();

// Start a new assessment
router.post('/start', (req, res) => {
  res.status(201).json({
    assessmentId: 'assessment_' + Date.now(),
    message: 'Assessment started successfully'
  });
});

// Get assessment by ID
router.get('/:id', (req, res) => {
  res.status(200).json({
    id: req.params.id,
    patientName: 'Test Patient',
    patientAge: 15,
    progress: 0,
    currentStage: 'initial',
    isComplete: false,
    messages: [
      {
        sender: 'ai',
        text: 'Hello! I\'m here to help assess strengths and interests. What activities do you or your child enjoy most?',
        timestamp: new Date().toISOString()
      }
    ]
  });
});

// Send message to assessment
router.post('/:id/message', (req, res) => {
  res.status(200).json({
    message: 'Message received',
    response: {
      text: 'Thank you for sharing that information. Could you tell me more about how these activities engage attention?',
      sender: 'ai',
      timestamp: new Date().toISOString()
    }
  });
});

// Get assessment recommendations
router.get('/:id/recommendations', (req, res) => {
  res.status(200).json({
    assessmentId: req.params.id,
    recommendations: [
      {
        title: 'Software Developer',
        match: 95,
        strengths: 'Strong pattern recognition and analytical thinking',
        challenges: 'May need quiet workspace and clear instructions',
        education: 'Computer Science degree or coding bootcamp'
      },
      {
        title: 'Data Analyst',
        match: 90,
        strengths: 'Excellent attention to detail and systematic approach',
        challenges: 'May prefer written over verbal communication',
        education: 'Statistics or Mathematics degree'
      }
    ]
  });
});

module.exports = router;
