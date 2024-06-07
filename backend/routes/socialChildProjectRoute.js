import express from 'express';
import { SocialChildProject } from '../models/socialChildProjectModel.js';

const router = express.Router();

// GET all social child projects
router.get('/', async (req, res) => {
  try {
    const projects = await SocialChildProject.find();
    console.log('Query result:', projects);
    res.json(projects);
  } catch (err) {
    console.error('Error retrieving social child projects:', err);
    res.status(500).json({ message: err.message });
  }
});

// GET a specific social child project by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const project = await SocialChildProject.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Social child project not found' });
    }
    return res.status(200).json(project);
  } catch (err) {
    console.error('Error retrieving social child project:', err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
