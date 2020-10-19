import express from 'express';
const app = express();

class App {
  port: number;
  constructor() {
    this.port = 3030;
  }

  // Run server
  start() {
    app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default new App();
