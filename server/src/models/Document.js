const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  patientName: {
    type: String,
    required: [true, 'Please provide patient name'],
    trim: true,
  },
  patientAge: {
    type: Number,
    required: [true, 'Please provide patient age'],
    min: 1,
    max: 120,
  },
  documentType: {
    type: String,
    enum: ['medical_report', 'assessment', 'diagnosis', 'other'],
    default: 'medical_report',
  },
  fileUrl: {
    type: String,
    required: [true, 'Document file URL is required'],
  },
  fileName: {
    type: String,
    required: [true, 'Original file name is required'],
  },
  fileSize: {
    type: Number,
    required: [true, 'File size is required'],
  },
  mimeType: {
    type: String,
    required: [true, 'File MIME type is required'],
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  processedAt: {
    type: Date,
    default: null,
  },
  extractedData: {
    type: Object,
    default: null,
  },
  status: {
    type: String,
    enum: ['uploaded', 'processing', 'processed', 'error'],
    default: 'uploaded',
  },
  errorMessage: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model('Document', DocumentSchema);
