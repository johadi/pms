import * as express from 'express';
import { Location } from '../controllers';
const router = express.Router();

router.get('/', function(req: express.Request, res: express.Response) {
  return res.json('Welcome to Population management system API');
});

router.post('/api/location', Location.add);

export default router;
