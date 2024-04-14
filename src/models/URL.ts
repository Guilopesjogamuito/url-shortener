import mongoose, { Schema, Document } from 'mongoose';

export interface IURL extends Document {
  originalUrl: string;
  suffix: string;
  expiresAt: Date;
  createdAt: Date;
}

const URLSchema: Schema = new Schema({
  originalUrl: { type: String, required: true },
  suffix: { type: String, required: true, unique: true },
  expiresAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IURL>('URL', URLSchema);
