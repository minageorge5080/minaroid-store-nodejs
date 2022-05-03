import express from "express";
import authRoute from "./express.auth.routes";
import profileRoute from "./express.profile.routes";
import productsRoute from "./express.products.routes";
import ordersRoute from "./express.orders.routes";

const routes = express.Router();

routes.use("/api/auth", authRoute);
routes.use("/api/profile", profileRoute);

routes.use("/api/products", productsRoute);
routes.use("/api/orders", ordersRoute);

export default routes;
