import Router from 'koa-router';
import userController from 'controllers/userController';
import vehicleController from 'controllers/vehicleController';
import HistoryItemController from 'controllers/historyItemController';

export const crudRouter: Router = new Router();

//user
crudRouter.get('/users', userController.getUsers);
crudRouter.get('/users/:id', userController.getUser);
crudRouter.post('/users', userController.createUser);
crudRouter.put('/users/:id', userController.updateUser);
crudRouter.delete('/users/:id', userController.deleteUser);

//vehicle
crudRouter.get('/vehicles', vehicleController.getVehicles);
crudRouter.get('/vehicles/:id', vehicleController.getVehicle);
crudRouter.post('/vehicles', vehicleController.createVehicle);

crudRouter.get('/vehicles/byregistration/:registration', vehicleController.getVehicleByRegistration);

//history items
crudRouter.get('/historyitems', HistoryItemController.getHistoryItems);