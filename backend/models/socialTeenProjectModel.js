import mongoose, { model } from 'mongoose';

const socialTeenProjectSchema = new mongoose.Schema({
  
  X: { type: Number, required: true },
  Y: { type: Number, required: true },
  OBJECTID: { type: Number, required: true },
  ID: { type: Number, required: true },
  TRAEGER: { type: String, required: true },
  LEISTUNGEN: { type: String, required: true },
  STRASSE: { type: String, required: true },
  PLZ: { type: Number, required: true },
  ORT: { type: String, required: true },
  TELEFON: { type: String, required: true }
});

export const SocialTeenProject = mongoose.model('SocialTeenProject', socialTeenProjectSchema, 'socialTeenProjects');
