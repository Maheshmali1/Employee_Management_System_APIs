import express,{Request,Response,NextFunction} from 'express';
import swaggerUI from 'swagger-ui-express';
import yaml from 'yamljs';
import { erpRouter,professionalRouter,personalRouter } from '../routes';


const swaggerDocs = yaml.load('./api.yaml');

// Function to creater server in express.
export const createServer= ()=>{
	const app = express();

	app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));
	app.use(express.json());
	
	app.use('/erp',erpRouter);
	app.use('/personal',personalRouter);
	app.use('/professional',professionalRouter);
	
	app.use((err:Error,req:Request,res:Response)=>{
		res.status(500).send({success:false,message:err.message});
	});
	
	return app;
};



