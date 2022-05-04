import express from "express";
import middleware from "./middleware/index";
import dotenv from "dotenv";
import profileRoutes from "./handlers/users.handler";
import ordersRoutes from "./handlers/orders.handler";
import productsRoutes from "./handlers/products.handler";

dotenv.config();


const app = express();

app.use(express.json());
app.use(middleware.loggingMiddleware);

profileRoutes(app);
ordersRoutes(app);
productsRoutes(app);

app.use(middleware.errorsMiddleware);

const port = process.env["SERVER_PORT"] ?? 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

export default app;
