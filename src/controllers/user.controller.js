import { asyncHandler } from "../utils/asynchandeler.js"
import { ApiError } from "../utils/ApiErrror.js"
import { User } from "../models/user.model.js"
import { uploadonCloudinary } from "../utils/cloudinary.js"
import { Apiresponse } from "../utils/ApiResponse.js"

const registeruser = asyncHandler(async (req, res) => {

    // get user details from frontend
    // validation -not empty
    // check if user already exists
    // check for images,check for avatar
    // upload image to cloudinary
    // create user object-create entry in database
    // remove password and refresh token from user object
    // check for user creation success
    // return response to frontend

    const { fullName, email, username, password } = req.body;

    if ([name, email, password, avatar].some((fields) => fields?.trim() === "")) {
        throw new ApiError("All fields are required", 400);
    }

    const existeduser = User.findOne({
        $or: [{ username }, { email }]
    })

    if (existeduser) {
        throw new ApiError("User already exists", 409);
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if (!avatarLocalPath) {
        throw new ApiError("Avatar Image is Required", 400);
    }

    const avatar = await uploadonCloudinary(avatarLocalPath)

    if (!avatar) {
        throw new ApiError("Avatar Image is Required", 409)
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
    )

    if (!createdUser) {
        throw new ApiError(500, "User creation failed");
    }

    return res.status(201).json(new Apiresponse("User created successfully", createdUser, 200));

});

export { registeruser };