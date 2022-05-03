import loggingMiddleware from "./express.logging.middleware";
import errorsMiddleware from "./express.errors.middleware";
import authMiddleware from "./express.auth.middleware";

export default {
  loggingMiddleware,
  errorsMiddleware,
  authMiddleware,
};
