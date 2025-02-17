const mongoose = require('mongoose');

const QualityCheckSchema = new mongoose.Schema({
  batchNumber: {
    type: String,
    required: true,
    match: [/^(?=.*[A-Z])(?=.*\d)[A-Z0-9]+$/, 'Batch number must contain at least one uppercase letter and one number'],
  },
  inspectionDate: { type: Date, required: true },
  status: { type: String, enum: ['Passed', 'Failed'], required: true },
});

module.exports = mongoose.model('QualityCheck', QualityCheckSchema);
