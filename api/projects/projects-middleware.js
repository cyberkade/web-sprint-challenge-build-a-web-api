const Projects = require('../projects/projects-model')

function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`);
    next();
  }

function errorHandling(err, req, res, next) { //eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
    })
}

async function validateProjectId(req, res, next) {
    try {
      const projectMaybe = await Projects.get(req.params.id)
      if (projectMaybe) {
        req.project = projectMaybe
        next()
      } else {
        next({ status: 404, message: "project not found" })
      }
    } catch (error) {
      next(error)
    }
  }
  
function validateNewProject(req, res, next) {
    const { name, description } = req.body
      if(name && name.trim() && description && description.trim()){
        req.newProject = req.body
        next()
      } else {
        next({status: 400, message: "missing required fields"})
      }
  }

function validateUpdatedProject(req, res, next) {
    const { name, description, completed} = req.body
      if(name && name.trim() && description && description.trim() && typeof completed === 'boolean'){
        req.newProject = req.body
        next()
      } else {
        next({status: 400, message: "missing required fields"})
      }
  }

module.exports = {
    logger,
    errorHandling,
    validateProjectId,
    validateNewProject,
    validateUpdatedProject
  }