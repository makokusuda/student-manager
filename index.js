const config = require("./config");

const graphqlHTTP = require("express-graphql");
const graphqlApi = require("./server");

const cors = require("cors");

const express = require("express");
const app = express();

app.use(cors());

app.use((req, res, next) => {
  res.header();
  next();
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlApi.schema,
    rootValue: graphqlApi.root,
    graphiql: true,
  })
);
app.use("/", express.static(`${__dirname}/public`));

app.listen(config.express.port, () => {
  console.log(
    `Running a GraphQL API server at localhost:${config.express.port}`
  );
});
