import mongoose, { model } from 'mongoose';

const schoolSchema = new mongoose.Schema({
  X: { type: Number, required: true },
  Y: { type: Number, required: true },
  OBJECTID: { type: Number, required: true },
  ID: { type: Number, required: true },
  TYP: { type: Number, required: true },
  ART: { type: String, required: true },
  STANDORTTYP: { type: Number, required: true },
  BEZEICHNUNG: { type: String, required: true },
  BEZEICHNUNGZUSATZ: { type: String },
  KURZBEZEICHNUNG: { type: String },
  STRASSE: { type: String, required: true },
  PLZ: { type: Number, required: true },
  ORT: { type: String, required: true },
  TELEFON: { type: String },
  EMAIL: { type: String },
  TRAEGER: { type: String, required: true },
  TRAEGERTYP: { type: Number, required: true },
  BEZUGNR: { type: Number, required: true },
  GEBIETSARTNUMMER: { type: Number, required: true },
  SNUMMER: { type: Number, required: true },
  NUMMER: { type: Number, required: true },
  GlobalID: { type: mongoose.Schema.Types.UUID, required: true }
});

export const School = mongoose.model('School', schoolSchema, 'Schools');


