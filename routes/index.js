import { Router } from 'express';

const apiRoutes = Router();

// Matches /api the API home route
apiRoutes.get('/', (req, res) => {
  res.status(200).send({
    url: `${req.protocol}://${req.headers.host}`,
    status: 'success',
    message: "SMS MGT API"
  });
});

export default apiRoutes;
