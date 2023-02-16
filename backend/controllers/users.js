const { User } = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { ErrorResponse } = require("../utils/ErrorResponse");

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) throw new ErrorResponse("User already exists", 400);

    const hash = await bcrypt.hash(password, 6);
    const newUser = await User.create({ email, password: hash });
    const payload = { id: newUser, email: newUser.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
      })
      .send(payload);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user)
      throw new ErrorResponse(
        "No account associated with the email address",
        404
      );

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new ErrorResponse("Invalid password", 401);

    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
      })
      .send(payload);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  res
    .cookie("access_token", "", {
      httpOnly: true,
      maxAge: 0,
    })
    .send("ok");
};

const getProfile = async (req, res, next) => {
  try {
    const { email, id } = req.user;
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, description, name, location, profilePic } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { email, description, name, location, profilePic },
      { new: true }
    );
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json([users]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  logout,
  getProfile,
  updateUser,
  getUsers,
};