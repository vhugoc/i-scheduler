import Application from './app';
const credentials = require('./configs/database/credentials.json');

const App = new Application(credentials.uri, credentials.username, credentials.password, credentials.database);

App.start();
