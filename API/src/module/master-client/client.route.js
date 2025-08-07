import express from 'express';
import clientController from './client.controller.js';
import MasterClientController from './client.controller.js';

const clientRouter = express.Router();

clientRouter.post('/delete', clientController.deleteSome);

clientRouter.route('/')
  .get(MasterClientController.all)
  .post(MasterClientController.create);

clientRouter.route('/:id')
  .get(MasterClientController.getById)
  .put(MasterClientController.update)
  .delete(MasterClientController.remove);

export default clientRouter;
