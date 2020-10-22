import express from 'express';
const router = express.Router();

class Router {
  constructor() {
    router.get('/', (request, response) => {
      return response.status(200).json({ success: true, status: 200 });
    });
  }

  init() {
    return router;
  }
}

export default new Router();
