const express = require('express')
const Actions = require('./actions-model')
const { validateActionId, validateNewAction, validateUpdatedAction } = require('./actions-middlware')

const actionsRouter = express.Router()// Write your "actions" router here!

actionsRouter.get('/', async (req, res, next) => {
    try {
        const actions = await Actions.get()
        res.status(200).json(actions)
    }
    catch (err) {
        next(err)
    }
})

actionsRouter.get('/:id', validateActionId, async (req, res, next) => {
    try {
        const action = await req.action
        res.status(200).json(action)
    }
    catch (err) {
        next(err)
    }
})

actionsRouter.post('/' , validateNewAction, async (req, res, next) => {
    try {
        const newAction = await Actions.insert(req.newAction)
        res.status(201).json(newAction)
    }
    catch (err) {
        next(err)
    }
})

module.exports = actionsRouter