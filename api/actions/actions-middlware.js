const Actions = require('../actions/actions-model');

function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`);
    next();
  }

function errorHandling(err, req, res, next) { //eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
    })
}

async function validateActionId(req, res, next) {
    try {
      const actionMaybe = await Actions.get(req.params.id)
      if (actionMaybe) {
        req.action = actionMaybe
        next()
      } else {
        next({ status: 404, message: "action not found" })
      }
    } catch (error) {
      next(error)
    }
  }
  
function validateNewAction(req, res, next) {
    const { notes, description, project_id } = req.body
      if(notes && description && description.length <= 128 && project_id){
        req.newAction = req.body
        next()
      } else {
        next({status: 400, message: "missing required fields"})
      }
  }

function validateUpdatedAction(req, res, next) {
    const { notes, description, completed, project_id } = req.body
      if(notes && description && description.length <= 128 && project_id && typeof completed === 'boolean'){
        req.newAction = req.body
        next()
      } else {
        next({status: 400, message: "missing required fields"})
      }
  }

module.exports = {
    logger,
    errorHandling,
    validateActionId,
    validateNewAction,
    validateUpdatedAction
  }