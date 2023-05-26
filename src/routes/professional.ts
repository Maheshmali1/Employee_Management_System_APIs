import { Router } from 'express';
import { createProfessionalInfo,getProfessionalInfo } from '../controllers';
import { paramsValidator } from '../middleware';

const router:Router = Router();

router.get('/:id',paramsValidator, getProfessionalInfo);

router.post('/',createProfessionalInfo);

export const professionalRouter:Router =  router;