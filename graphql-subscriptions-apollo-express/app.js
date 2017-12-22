import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

const myGraphQLSchema = ``;
const PORT = 3000;

const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled

app.listen(PORT);