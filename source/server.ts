import http from "http";
import express, { Express } from "express";
import morgan from "morgan";
import routes from "./routes/info";
import { ReasonPhrases, StatusCodes, getReasonPhrase } from "http-status-codes";

const router: Express = express();

router.use(morgan("dev"));

router.use(express.urlencoded({ extended: false }));

router.use(express.json());

/** RULES OF OUR API */
router.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET");
    return res.status(StatusCodes.OK).json(ReasonPhrases.OK);
  }
  next();
});

/** Routes */
router.use("/", routes);

/** Error handling */
router.use((req, res, next) => {
  return res.status(StatusCodes.NOT_FOUND).json({
    message: getReasonPhrase(StatusCodes.NOT_FOUND),
  });
});

/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 3000;
httpServer.listen(PORT, () =>
  console.log(`The server is running on port ${PORT}`)
);
