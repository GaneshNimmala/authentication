const rateLimiterMiddleware = require("../middlewares/rateLimiterMiddleware");
const loggingMiddleware = require("../middlewares/loggingMiddleware");
const usersController = require("../controllers/usersController");

const router = express.Router();

router.get(
  "/",
  loggingMiddleware.logRequest,
  rateLimiterMiddleware.limitRequests,
  usersController.getAllUsers
);
router.post(
  "/",
  loggingMiddleware.logRequest,
  rateLimiterMiddleware.limitRequests,
  usersController.createUser
);
router.get(
  "/:id",
  loggingMiddleware.logRequest,
  rateLimiterMiddleware.limitRequests,
  usersController.getUserById
);
router.put(
  "/:id",
  loggingMiddleware.logRequest,
  rateLimiterMiddleware.limitRequests,
  usersController.updateUser
);
router.delete(
  "/:id",
  loggingMiddleware.logRequest,
  rateLimiterMiddleware.limitRequests,
  usersController.deleteUser
);

module.exports = router;
