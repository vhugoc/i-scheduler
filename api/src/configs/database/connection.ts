const mongoose = require('mongoose');

class Connection {
  uri: string;
  username: string;
  password: string;
  database: string;

  constructor(uri:string, username:string, password:string, database:string) {
    this.uri = uri;
    this.username = username;
    this.password = password;
    this.database = database;
  }

  connect() {
    mongoose.connect(`mongodb+srv://${this.username}:${this.password}@${this.uri}/${this.database}?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
}

export default Connection;
