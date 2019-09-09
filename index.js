require('dotenv').config();
const actionRoutes = require('./data/helpers/actionOps.js');
const projectRoutes = require('./data/helpers/projectOps.js')

const express = require('express');

const server = express();

const port = process.env.PORT;

server.use(express.json());
server.use('/api/actions', actionRoutes);
server.use('/api/projects', projectRoutes);

  server.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);