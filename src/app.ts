import * as bodyParser from "body-parser";
import * as cors from 'cors';
import * as express from "express";
import * as routes from './routes/_index';
import cookieParser = require('cookie-parser');

class App {
  public app: express.Express;
  
  
  constructor() {
    this.app = express();
    this.config();
    routes.initRoutes(this.app)

  }

  private config(): void {   
    this.app.use(cors({
        optionsSuccessStatus: 200
}))
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }
}

export default new App().app;