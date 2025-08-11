import { ApiError } from "../utils/ApiErrror.js";
import { asyncHandler } from "../utils/asynchandeler.js";
import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

export const VerifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            throw new ApiError("Unothorized request", 401)
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?.id).select("-password -refreshToken")

        if (!user) {
            throw new ApiError("Invalid accessToken at finding user", 401)
        }

        req.user = user;
        next()

    } catch (error) {
        throw new ApiError(error?.message || "Invalid accessToken", 401)
    }
})