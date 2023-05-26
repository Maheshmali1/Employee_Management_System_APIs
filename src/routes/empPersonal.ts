import { Router } from 'express';
import { getPersonalInfo, createPersonalInfo } from '../controllers';
import { paramsValidator } from '../middleware';

const router:Router = Router();

router.get('/:id', paramsValidator,getPersonalInfo);

router.post('/',createPersonalInfo);

export const personalRouter:Router =  router;

