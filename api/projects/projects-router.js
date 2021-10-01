const express = require('express')
const Projects = require('./projects-model')
const { validateProjectId, validateProject } = require('./projects-middleware')

const projectsRouter = express.Router()

projectsRouter.get('/', async (req, res, next) => {
    try {
        const projects = await Projects.get()
        res.status(200).json(projects)
    }
    catch (err) {
        next(err)
    }
})

projectsRouter.get('/:id', validateProjectId, async (req, res, next) => {
    try {
        const project = await req.project
        res.status(200).json(project)
    }
    catch (err) {
        next(err)
    }
})

projectsRouter.post('/', validateProject, async (req, res, next) => {
    try {
        const newProject = await Projects.insert(req.project)
        res.status(200).json(newProject)
    }
    catch (err) {
        next(err)
    }
})

module.exports = projectsRouter;
