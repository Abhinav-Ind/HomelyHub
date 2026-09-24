import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "node:crypto"

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"],
            trim: true, // Used to remove extra unnecessary spaces
            maxLength: [50, "Character limit excedded"]
        },
        email: {
            type: String,
            required: [true, "Please enter your email"],
            unique: true,
            lowercase: true,
            trim: true,
            validate: [validator.isEmail, "Please enter valid email ID"]
        },
        password: {
            type: String,
            required: [true, "Please enter the password"],
            minLength: [6, "Password must be minimum of 6 characters"],
            select: false
        },
        passwordConfirm: {
            type: String,
            required: [true, "Please confirm the password"],
            validate: {
                validator: function (confirmPassword) {
                    return confirmPassword === this.password
                },
                message: "Password does not match"
            }
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        avatar: {
            url: { type: String },
            public_id: { type: String }
        },
        passwordChangedAt: {
            type: Date
        },
        passwordResetToken: {
            type: String,
            select: false,
            index: true
        },
        passwordResetExpires: {
            type: Date,
            select: false
        },
    },
    { timestamps: true }
)

userSchema.set("toJSON", {
    transform: function (doc, ret) {
        delete ret.password;
        delete ret.passwordConfirm;
        delete ret.passwordResetToken;
        delete ret.passwordResetExpires;
        delete ret.__v;
        return ret;
    }
})

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }
    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined;
})

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp
    }
    return false
}

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash("sha256")
        .update(resetToken)
        .digest(hex);

    this.passwordResetExpires = Date.now() + 10 * 60 * 6000;
    return resetToken;
}

const User = mongoose.model("User", userSchema);
export { User };