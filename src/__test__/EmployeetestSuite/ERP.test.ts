import { createEmployeeTests, getEmployeeTests,updateEmployeeTests,deleteEmployeeTests } from './index';

describe('ERP test suite',()=>{
	createEmployeeTests();
	getEmployeeTests();
	updateEmployeeTests();
	deleteEmployeeTests();

});