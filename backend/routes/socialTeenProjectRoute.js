import express from 'express';
import { SocialTeenProject } from '../models/socialTeenProjectModel.js';

const router = express.Router();

// GET all social teen projects
router.get('/', async (req, res) => {
  try {
    const projects = await SocialTeenProject.find();
    console.log('Query result:', projects);
    res.json(projects);
  } catch (err) {
    console.error('Error retrieving social teen projects:', err);
    res.status(500).json({ message: err.message });
  }
});

// GET a specific social teen project by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const project = await SocialTeenProject.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Social teen project not found' });
    }
    return res.status(200).json(project);
  } catch (err) {
    console.error('Error retrieving social teen project:', err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
