import express from 'express';
import { Kindergarden } from '../models/kindergardenModel.js';

const router = express.Router();

// GET all kindergardens
router.get('/', async (req, res) => {
  try {
    const kindergardens = await Kindergarden.find();
    console.log('Query result:', kindergardens);
    res.json(kindergardens);
  } catch (err) {
    console.error('Error retrieving kindergardens:', err);
    res.status(500).json({ message: err.message });
  }
});

// GET a specific kindergarden by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const kindergarden = await Kindergarden.findById(id);
  
    return response.status(200).json(kindergarden);
  } catch (err) {
    console.error('Error retrieving kindergarden:', err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
