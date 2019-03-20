import * as express from 'express';
import { Location } from '../controllers';
import { validateCreateLocation } from '../middlewares';
const router = express.Router();

router.get('/', function(req: express.Request, res: express.Response) {
  return res.json('Welcome to Population management system API');
});

router.post('/api/location', validateCreateLocation, Location.add);
router.get('/api/location/:name', Location.get);
router.get('/api/locations', Location.getAll);
router.patch('/api/location/:name', Location.update);
router.delete('/api/location/:name', Location.delete);

export default router;
