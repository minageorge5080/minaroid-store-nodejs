import express from "express";
import middleware from "./middleware/index";
import dotenv from "dotenv";
import profileRoutes from "./handlers/user/users.handler";
import authRoutes from "./handlers/user/auth.handler";
import ordersRoutes from "./handlers/user/orders.handler";
import productsRoutes from "./handlers/user/products.handler";

dotenv.config();


const app = express();

app.use(express.json());
app.use(middleware.loggingMiddleware);
app.use(middleware.authMiddleware);

authRoutes(app);
profileRoutes(app);
ordersRoutes(app);
productsRoutes(app);

app.use(middleware.errorsMiddleware);

const port = process.env["SERVER_PORT"] ?? 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

export default app;
