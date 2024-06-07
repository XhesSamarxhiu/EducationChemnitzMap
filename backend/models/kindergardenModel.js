import mongoose, { model } from 'mongoose';

const kindergardenSchema = new mongoose.Schema({

  X: { type: Number, required: true },
  Y: { type: Number, required: true },
  OBJECTID: { type: Number, required: true },
  ID: { type: Number, required: true },
  TRAEGER: { type: String, required: true },
  BEZEICHNUNG: { type: String, required: true },
  KURZBEZEICHNUNG: { type: String, required: true },
  STRASSE: { type: String, required: true },
  STRSCHL: { type: Number, required: true },
  HAUSBEZ: { type: Number, required: true },
  PLZ: { type: Number, required: true },
  ORT: { type: String, required: true },
  HORT: { type: Number, required: true },
  KITA: { type: Number, required: true },
  URL: { type: String },
  TELEFON: { type: String },
  EMAIL: { type: String },
  BARRIEREFREI: { type: Number, required: true },
  INTEGRATIV: { type: Number, required: true }
});

export const Kindergarden = mongoose.model('Kindergarden', kindergardenSchema, 'Kindergarden');
