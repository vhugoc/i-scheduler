import express from 'express';
import Connection from './configs/database/connection';
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
    app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default App;
