import { Router } from 'express';
import MessageController from '../controllers/MessageController';
import CheckConflicts from '../middlewares/CheckConflicts';
import TokenUtils from '../utilities/TokenUtils';
import MessageValidation from '../middlewares/validations/MessageValidation';
import GetUserInfo from '../utilities/GetUserInfo';

const messageRouter = Router();

messageRouter.post(
  '/send',
  TokenUtils.verifyToken,
  MessageValidation.sendValidation,
  CheckConflicts.checkReceiver,
  GetUserInfo.byPhone,
  MessageController.send
);

messageRouter.get(
  '/inbox',
  TokenUtils.verifyToken,
  MessageController.inbox,
);


export default messageRouter;
