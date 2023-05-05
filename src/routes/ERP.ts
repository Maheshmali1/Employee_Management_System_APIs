import { Router} from 'express';
import { getAllEmployees,createEmployee, getEmployee, updateEmployee, deleteEmployee } from '../controllers/ERP';
import { supervisorValidator } from '../middleware/supervisorValidator';
const router = Router();


// ERP route following '/erp/'
router.get('/',getAllEmployees);

router.get('/:id',getEmployee);

router.post('/create',supervisorValidator ,createEmployee);

router.put('/:id', supervisorValidator,updateEmployee);

router.delete('/:id',deleteEmployee);

export default router;