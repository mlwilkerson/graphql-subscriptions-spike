const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {graphiqlExpress, graphqlExpress} = require('apollo-server-express');
const schema = require('./graphql/schema');
const database = require('./database/database');
const helmet = require('helmet');

// import async from 'asyncawait/async'
// import await from 'asyncawait/await'


const PORT = 4000;

const app = express();

app.use(cors);
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
app.get('/graphiql', graphiqlExpress({endpointURL: '/graphql'})); // if you want GraphiQL enabled
app.listen(PORT, () => {
    console.log(`GraphiQL is available at http://localhost:${PORT}/graphiql`);
});

