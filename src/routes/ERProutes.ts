import { Router} from 'express';
import { getAllEmployees,createEmployee, getEmployee, updateEmployee, deleteEmployee } from '../controllers';
import { supervisorValidator, paramsValidator } from '../middleware';

const router:Router = Router();


// ERP route following '/erp/'
router.get('/',getAllEmployees);

router.get('/:id',paramsValidator, getEmployee);

router.post('/create',supervisorValidator ,createEmployee);

router.put('/:id',paramsValidator, supervisorValidator,updateEmployee);

router.delete('/:id',paramsValidator, deleteEmployee);

export const erpRouter:Router =  router;