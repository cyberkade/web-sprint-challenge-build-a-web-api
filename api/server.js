const express = require('express')
const projectsRouter = require('./projects/projects-router')
const { logger, errorHandling } = require('./projects/projects-middleware')
const server = express()


server.use(express.json())

server.use('/api/projects', logger, projectsRouter)
// Build your actions router in /api/actions/actions-router.js

server.use('*', (req, res, next) => {
    next({ status: 404, message: `${req.method} ${req.originalUrl} not found!` })
});
  
server.use(errorHandling) 

module.exports = server;
