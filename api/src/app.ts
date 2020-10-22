import express from 'express';
import morgan from 'morgan';
import Connection from './configs/database/connection';
import Router from './router';

const app = express();

class App extends Connection {
  port: number;
  constructor(uri:string, username:string, password:string, database:string) {
    super(uri, username, password, database);
    this.port = 3030;
  }

  // Run server
  start() {
    super.connect();
    this.middlewares();
    this.routes();
    app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
  // Middlewares initialization
  middlewares() {
    app.use(express.json());
    app.use(morgan('tiny'));
  }

  // Router initialization
  routes() {
    app.use(Router.init());
  }
}

export default App;
