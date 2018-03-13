// This might be used in the future for translation file requests although 
// that should really be on s3....
import express from 'express';

const router = express.Router();

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

router.get('/', (req, res, next) => {
  res.json({});
});

export default router;