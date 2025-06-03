import "dotenv/config";
import express, {NextFunction, Request, Response} from "express";
import cors from "cors";
import session from "cookie-session";
import { config } from "./config/app.config";
import { url } from "inspector";
import connectToDatabase from "./config/database.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { HTTPSTATUS } from "./config/http.config";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";

const app = express();

const BASE_PATH = config.BASE_PATH

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        name: "session",
        keys: [config.SESSION_SECRET],
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        secure: config.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
    })
);

app.use(
    cors({
        origin: config.FRONTEND_URL,
        credentials: true,
    })
);

app.get('/', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(HTTPSTATUS.OK).json({
        message: "Welcome to the Project Management API"
    });
}));

app.use(errorHandler);


app.listen(config.PORT, async () => {
    console.log(`Server is listening on ${config.PORT} in ${config.NODE_ENV} mode`);
    await connectToDatabase();
});