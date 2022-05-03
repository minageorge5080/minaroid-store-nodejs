import express from "express";
import routes from "./routes/index";
import middleware from "./middleware/index";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(middleware.loggingMiddleware);
app.use(middleware.authMiddleware);

app.use("/public", express.static("./public"));
app.use(routes);

app.use(middleware.errorsMiddleware);

const port = process.env["SERVER_PORT"] ?? 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

export default app;
