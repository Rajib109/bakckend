import { Router } from "express";
import { changeCurrentPassword, getCurrentUser, getUserChannelProfile, getWatchHistory, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { VerifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([{ name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 }]),
    registerUser);

router.route("/login").post(loginUser)

// secured routes
router.route("/logout").post(VerifyJWT, logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").post(VerifyJWT, changeCurrentPassword)

router.route("/get-user").get(VerifyJWT, getCurrentUser)

router.route("/update-account-details").patch(VerifyJWT, updateAccountDetails)

router.route("/update-avatar").patch(VerifyJWT, upload.fields([{ name: "avatar", maxCount: 1 }]), updateUserAvatar)

router.route("/update-cover-image").patch(VerifyJWT, upload.fields([{ name: "coverImage", maxCount: 1 }]), updateUserCoverImage)

router.route("/c/:username").get(VerifyJWT,getUserChannelProfile)
router.route("/watch-history").get(VerifyJWT, getWatchHistory)

export default router;