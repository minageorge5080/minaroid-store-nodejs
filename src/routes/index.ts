import express from "express";
import authRoute from "./express.auth.routes";
import profileRoute from "./express.profile.routes";
import productsRoute from "./express.products.routes";
import ordersRoute from "./express.orders.routes";

const routes = express.Router();

routes.use("/auth", authRoute);
routes.use("/profile", profileRoute);

routes.use("/products", productsRoute);
routes.use("/orders", ordersRoute);

export default routes;
