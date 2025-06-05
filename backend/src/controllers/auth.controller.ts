import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";


export const googleLoginCallback = asyncHandler(async (req: Request, res: Response) => {
    const currentWorkspace = req?.user?.currentWorkspace;

    if(!currentWorkspace) {
        return res.redirect(`${process.env.FRONTEND_GOOGLE_CALLBACK_URL}?status=success&workspace=${currentWorkspace}`);
    }

    return res.redirect(`${process.env.FRONTEND_ORIGIN}/workspace/${currentWorkspace}`);
})