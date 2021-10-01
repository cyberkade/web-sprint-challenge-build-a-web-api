const express = require('express')
const Projects = require('./projects-model')
const { validateProjectId, validateNewProject, validateUpdatedProject } = require('./projects-middleware')

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

projectsRouter.post('/', validateNewProject, async (req, res, next) => {
    try {
        const newProject = await Projects.insert(req.newProject)
        res.status(201).json(newProject)
    }
    catch (err) {
        next(err)
    }
})

projectsRouter.put('/:id', validateProjectId, validateUpdatedProject, async (req, res, next) => {
    try {
        const updatedProject = await Projects.update(req.params.id, req.newProject)
        res.status(200).json(updatedProject)
    }
    catch (err) {
        next(err)
    }
})

projectsRouter.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        await Projects.remove(req.params.id)
        res.status(200)
        next()
    }
    catch (err) {
        next(err)
    }
})

projectsRouter.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const actions = await Projects.getProjectActions(req.params.id)
        res.status(200).json(actions)
    }
    catch (err) {
        next(err)
    }
})

module.exports = projectsRouter;
