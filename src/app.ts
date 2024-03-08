import 'reflect-metadata';
import 'dotenv/config';

import cors from 'cors';
import container from './config/inversify.config';
import bodyParser from 'body-parser';

import { InversifyExpressServer } from 'inversify-express-utils';
import { Router } from 'express';

export class App {
  constructor() {
    const PORT = Number(process.env.PORT) || 3000;
    const server = new InversifyExpressServer(
      container,
      Router({
        caseSensitive: true,
      })
    );

    server
      .setErrorConfig((app) => {
        app.use((err: any, req: any, res: any, next: any) => {
          console.error(err.stack);
          res.status(500).send('Something broke!');
        });
      })
      .setConfig((app) => {
        app.use(cors()).use(bodyParser.json());
      })
      .build()
      .listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on port ${PORT}`);
      });
  }
}

export default new App();
