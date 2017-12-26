const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {graphiqlExpress, graphqlExpress} = require('apollo-server-express');
const schema = require('./graphql/schema');
// const database = require('./database/database');
const helmet = require('helmet');



const PORT = 4000;

const app = express();
const helperMiddleware = [
    bodyParser.json(),
    bodyParser.text({ type: 'application/graphql' }),
    (req, res, next) => {
        if (req.is('application/graphql')) {
            req.body = { query: req.body };
        }
        next();
    }
];

app.use(cors());
app.use(helmet());
app.use('/graphql', ...helperMiddleware, graphqlExpress({schema}));
app.get('/graphiql', graphiqlExpress({endpointURL: '/graphql'})); // if you want GraphiQL enabled
app.listen(PORT, () => {
    console.log(`GraphQL API is available at http://localhost:${PORT}/graphql`);
    console.log(`GraphiQL IDE is available at http://localhost:${PORT}/graphiql`);
});

