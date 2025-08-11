import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    watchhistory: {
        type: Schema.Types.ObjectId,
        ref: "Video"
    },
    refreshToken: {
        type: String,
    },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName,

    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    });
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    });
};

const User = mongoose.model("User", userSchema);

export default User;
// This code defines a Mongoose schema and model for a User entity in a MongoDB database.
// The schema includes fields for name, email, and password, with appropriate validation rules.