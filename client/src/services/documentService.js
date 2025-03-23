// client/src/services/documentService.js

/**
 * Service for handling document operations
 * This simulated implementation will be replaced with actual API calls in production
 */

/**
 * Uploads a medical report to the server with progress tracking
 * @param {File} file - The file object to upload
 * @param {string} patientName - Name of the patient
 * @param {number} patientAge - Age of the patient
 * @param {string} userId - ID of the current user
 * @param {Function} onProgress - Callback function for upload progress (0-100)
 * @returns {Promise<Object>} - Promise resolving to the uploaded document data
 */
export const uploadMedicalReport = async (
    file,
    patientName,
    patientAge,
    userId,
    onProgress
  ) => {
    return new Promise((resolve, reject) => {
      // Validate inputs
      if (!file) {
        reject(new Error('No file provided'));
        return;
      }
      
      if (!patientName || !patientAge) {
        reject(new Error('Patient information is incomplete'));
        return;
      }
      
      // Check file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (file.size > maxSize) {
        reject(new Error('File size exceeds 10MB limit'));
        return;
      }
      
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (onProgress && typeof onProgress === 'function') {
          onProgress(progress);
        }
        
        if (progress >= 100) {
          clearInterval(interval);
          
          // Simulate successful upload after completed progress
          setTimeout(() => {
            resolve({
              id: 'doc_' + Date.now(),
              fileName: file.name,
              fileSize: file.size,
              patientName,
              patientAge,
              uploadedAt: new Date().toISOString(),
              status: 'uploaded'
            });
          }, 500);
        }
      }, 300);
      
      // In a real implementation, you would use FormData and axios/fetch:
      /*
      const formData = new FormData();
      formData.append('file', file);
      formData.append('patientName', patientName);
      formData.append('patientAge', patientAge);
      formData.append('userId', userId);
      
      axios.post('/api/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      })
      .then(response => resolve(response.data))
      .catch(error => reject(error));
      */
    });
  };
  
  /**
   * Retrieves a list of documents for the specified user
   * @param {string} userId - The ID of the user
   * @returns {Promise<Array>} - Promise resolving to an array of document objects
   */
  export const getDocuments = async (userId) => {
    // Simulate API call with delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'doc_1234',
            fileName: 'medical_report.pdf',
            fileSize: 1024000,
            patientName: 'Alex Johnson',
            patientAge: 15,
            uploadedAt: '2023-04-10T10:30:00Z',
            status: 'processed'
          },
          {
            id: 'doc_5678',
            fileName: 'assessment.pdf',
            fileSize: 892000,
            patientName: 'Sam Williams',
            patientAge: 12,
            uploadedAt: '2023-04-15T14:45:00Z',
            status: 'processing'
          }
        ]);
      }, 800);
    });
  };
  
  /**
   * Gets a single document by its ID
   * @param {string} documentId - The ID of the document to retrieve
   * @returns {Promise<Object>} - Promise resolving to the document object
   */
  export const getDocumentById = async (documentId) => {
    // Simulate API call with delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (documentId) {
          resolve({
            id: documentId,
            fileName: 'medical_report.pdf',
            fileSize: 1024000,
            patientName: 'Alex Johnson',
            patientAge: 15,
            uploadedAt: '2023-04-10T10:30:00Z',
            status: 'processed',
            extractedData: {
              diagnosisCode: 'F84.0',
              diagnosisType: 'Autism Spectrum Disorder',
              date: '2023-03-15',
              clinician: 'Dr. Sarah Johnson',
              notes: 'Patient demonstrates strong pattern recognition and analytical skills'
            }
          });
        } else {
          reject(new Error('Document not found'));
        }
      }, 600);
    });
  };
  
  /**
   * Deletes a document by its ID
   * @param {string} documentId - The ID of the document to delete
   * @returns {Promise<Object>} - Promise resolving to a success message
   */
  export const deleteDocument = async (documentId) => {
    // Simulate API call with delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (documentId) {
          resolve({ success: true, message: 'Document deleted successfully' });
        } else {
          reject(new Error('Document not found'));
        }
      }, 500);
    });
  };
  