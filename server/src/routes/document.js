const express = require('express');
const router = express.Router();

// Upload a document
router.post('/upload', (req, res) => {
  res.status(201).json({ 
    message: 'Document upload endpoint',
    documentId: 'doc_' + Date.now()
  });
});

// Get document by ID
router.get('/:id', (req, res) => {
  res.status(200).json({
    id: req.params.id,
    fileName: 'medical_report.pdf',
    fileSize: 1024000,
    patientName: 'Test Patient',
    patientAge: 15,
    uploadedAt: new Date().toISOString(),
    status: 'processed'
  });
});

// Get all documents for the current user
router.get('/', (req, res) => {
  res.status(200).json({
    documents: [
      {
        id: 'doc_1234',
        fileName: 'medical_report.pdf',
        patientName: 'Test Patient',
        uploadedAt: new Date().toISOString()
      }
    ]
  });
});

// Delete a document
router.delete('/:id', (req, res) => {
  res.status(200).json({ 
    message: 'Document deleted successfully',
    documentId: req.params.id
  });
});

module.exports = router;
