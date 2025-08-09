import { asyncHandler } from "../utils/asynchandeler.js"
import { ApiError } from "../utils/ApiErrror.js"
import User from "../models/user.model.js"
import { uploadonCloudinary } from "../utils/cloudinary.js"
import { Apiresponse } from "../utils/ApiResponse.js"


const registeruser = asyncHandler(async (req, res) => {
    const { fullName, email, username, password } = req.body;

    let avatarLocalPath;
    let coverImageLocalPath;

    try {
        if ([username, email, password, fullName].some((field) => field?.trim() === "")) {
            throw new ApiError("All fields are required", 400);
        }

        const existeduser = await User.findOne({
            $or: [{ username }, { email }]
        });

        avatarLocalPath = req.files?.avatar?.[0]?.path;
        if (req.files?.coverImage?.[0]) {
            coverImageLocalPath = req.files.coverImage[0].path;
        }

        if (existeduser) {
            throw new ApiError("User already exists", 409);
        }

        if (!avatarLocalPath) {
            throw new ApiError("Avatar Image is Required", 400);
        }

        const avatar = await uploadonCloudinary(avatarLocalPath);
        const coverImage = coverImageLocalPath
            ? await uploadonCloudinary(coverImageLocalPath)
            : null;

        if (!avatar) {
            throw new ApiError("Avatar upload failed", 409);
        }

        const user = await User.create({
            fullName,
            email,
            username: username.toLowerCase(),
            password,
            avatar: avatar.url,
            coverImage: coverImage?.url || ""
        });

        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        );

        if (!createdUser) {
            throw new ApiError("User creation failed", 500);
        }

        return res
            .status(201)
            .json(new Apiresponse("User created successfully", createdUser, 201, true));

    } finally {
        if (avatarLocalPath && fs.existsSync(avatarLocalPath)) {
            fs.unlinkSync(avatarLocalPath);
        }
        if (coverImageLocalPath && fs.existsSync(coverImageLocalPath)) {
            fs.unlinkSync(coverImageLocalPath);
        }
    }
});

export { registeruser };