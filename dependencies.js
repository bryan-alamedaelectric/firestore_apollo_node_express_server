const admin = require("firebase-admin");
const { ApolloServer, gql } = require("apollo-server-express");
const credentials = require("./credentials.json");
const { GraphQLJSON, GraphQLJSONObject } = require("graphql-type-json");

module.exports = {
  express: require("express"),
  admin: require("firebase-admin"),
  ApolloServer: ApolloServer,
  gql: gql,
  GraphQLJSON: GraphQLJSON,
  GraphQLJSONObject: GraphQLJSONObject,
  serviceAccount: credentials,
};
