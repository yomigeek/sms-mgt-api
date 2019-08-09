import { Router } from 'express';
import authRouter from './auth';

const apiRoutes = Router();

// API Routes
apiRoutes.use('/auth', authRouter);

// Matches /api the API home route
apiRoutes.get('/', (req, res) => {
  res.status(200).send({
    url: `${req.protocol}://${req.headers.host}`,
    status: 'success',
    message: "SMS MGT API"
  });
});

export default apiRoutes;
