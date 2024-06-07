import express from 'express';
import { School } from '../models/schoolModel.js';

const router = express.Router();

// GET all schools
router.get('/', async (req, res) => {
  try {
    const schools = await School.find();
    console.log('Query result:', schools);
    res.json(schools);
  } catch (err) {
    console.error('Error retrieving schools:', err);
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (request, response) => {
  try {
    const { id }   = request.params;
    const school = await School.findById(id);
   return response.status(200).json(school);
  } catch (err) {
    console.error('Error retrieving schools:', err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
