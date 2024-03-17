const express = require('express');
const colors = require('colors');
const cors = require('cors');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const port = process.env.PORT || 3001;
import mysql from "mysql"

const app = express();

export const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password: process.env.DB_KEY,
  database:"mgmt"
})


const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://pmanagement.netlify.app',
    'https://pgmgmtcat.netlify.app'
  ],
  credentials: true
};

app.use(cors(corsOptions));

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

app.listen(port, console.log(`Server running on port ${port}`.green));
