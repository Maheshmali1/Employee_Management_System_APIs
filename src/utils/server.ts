import express,{Request,Response,NextFunction} from 'express';
import swaggerUI from 'swagger-ui-express';
import yaml from 'yamljs';
import erpRouter from '../routes/ERP';

const swaggerDocs = yaml.load('./api.yaml');

// Function to creater server in express.
export const createServer = ()=>{
	const app = express();

	app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));
	app.use(express.json());
	
	app.use('/erp',erpRouter);
	
	app.use((err:Error,req:Request,res:Response,next:NextFunction)=>{
		res.status(500).send({success:false,message:err.message});
	});
	
	return app;
};



