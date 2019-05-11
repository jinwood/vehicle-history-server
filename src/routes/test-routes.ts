import Router from 'koa-router';
import createTestData = require('test/createTestData');

export const testRouter: Router = new Router(); 

testRouter.post('/test/users', createTestData.TestData.createTestData);