import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  userId: String,
  action: String,
  taskId: mongoose.Schema.Types.ObjectId,
  timestamp: { type: Date, default: Date.now }
});

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

export default AuditLog;
