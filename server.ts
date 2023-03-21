const { ApolloServer, gql } = require("apollo-server-express");
const importer = require("./importer");
const express = require("express");
const credentials = require("./credentials.json");
const admin = require("firebase-admin");
importer.importAll().from("./dependencies");
const typeDefs = gql`
  ${require("./schemas.ts").schema}
`;
admin.initializeApp({
  credential: admin.credential.cert(credentials),
  databaseURL: "http://localhost:9000",
});

const resolvers = {
  Mutation: {
    orderSubmit: async (parent, args, context) =>
      require("./mutations/order_submit").resolver(args, context),
    worqOrderSubmit: async (parent, args, context) =>
      require("./mutations/worq_order_submit").resolver(args, context),
    removeOmitUser: async (parent, args, context) =>
      require("./mutations/remove_omit_user.js").resolver(
        parent,
        args,
        context
      ),
  },
  Query: {
    worqOrders: async (parent, args, context) =>
      require("./resolvers/worq_orders.js").resolver(args, context),
      getOmittedUsersFromWorqEmails: async (parent, args, context) =>
      require("./resolvers/users/get_omitted_users_from_worq_emails").resolver(
        parent,
        args,
        context
      ),
  },
};

const introspection = {
  introspection: true,
};
const playground = {
  playground: true,
};

const app = express();

let apolloServer = null;
const startServer = async () => {
  apolloServer = new ApolloServer({
    cors: false,
    typeDefs,
    resolvers,
    playground,
    introspection,
  });

  if (apolloServer == null) {
    return;
  } else {
    await apolloServer.start();
    apolloServer.applyMiddleware({
      app,
      path: "/",
      cors: { credentials: true, origin: true },
    });
  }
};

startServer();

app.listen({ port: 3131 }, () =>
  console.log(
    `🚀 Server ready at http://localhost:3131${apolloServer.graphqlPath}`
  )
);
