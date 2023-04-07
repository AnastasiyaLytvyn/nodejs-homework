const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const { AppError } = require("../utils/errorHandler");
const { catchAsync } = require("../utils/catchAsync");
const { authValidators } = require("../utils/validators");

/**
 * Check signup user data
 */
const checkSignupData = catchAsync(async (req, res, next) => {
  const { error, value } = authValidators.signupUserValidator(req.body);

  if (error) return next(new AppError(400, error.details[0].message));

  const { email } = value;

  const userExists = await User.exists({ email });

  if (userExists)
    return next(new AppError(409, "User with this email already exists"));

  req.body = value;

  next();
});

/**
 * Check login user data
 */
const checkLoginData = catchAsync(async (req, res, next) => {
  const { error, value } = authValidators.loginUserValidation(req.body);

  if (error) return next(new AppError(400, error.details[0].message));

  req.body = value;

  next();
});

/**
 * Middleware to allow only login users
 */
const protect = catchAsync(async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer") &&
    req.headers.authorization.split(" ")[1];

  if (!token) return next(new AppError(401, "Not authorized"));

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decodedToken.id);

  if (!currentUser || !currentUser.token)
    return next(new AppError(401, "Not authorized"));

  req.user = currentUser;

  next();
});

module.exports = { checkSignupData, checkLoginData, protect };
