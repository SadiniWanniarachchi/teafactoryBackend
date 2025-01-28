const mongoose = require('mongoose');

const QualityCheckSchema = new mongoose.Schema({
  batchNumber: { type: String, required: true },
  inspectionDate: { type: Date, required: true },
  status: { type: String, enum: ['Passed', 'Failed'], required: true },
});

module.exports = mongoose.model('QualityCheck', QualityCheckSchema);
