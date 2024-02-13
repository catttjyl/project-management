const express = require('express');
const colors = require('colors');
const cors = require('cors');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const port = process.env.PORT || 3001;

const app = express();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("DB Connetion Successfull".cyan.underline);
})
.catch((err) => {
  console.log(`Error: ${err.message}`.red.bold);
});

const corsOptions = {
  origin: [
    'http://localhost:3000', // Assuming you're developing against localhost:3000
    'https://pmanagement.netlify.app/' // Replace with your actual Netlify URL
  ],
  credentials: true // If your client needs to send cookies or authorization headers
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
