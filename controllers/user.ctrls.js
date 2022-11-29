const db = require("../models");
const jwt = require("jsonwebtoken");

// 1 day token
const timeLimit = 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SESSION_SECRET, {
    expiresIn: timeLimit,
  });
};

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message === "Incorrect Email")
    errors.email = "That email is not registered";

  if (err.message === "Incorrect Password")
    errors.password = "That password is incorrect";

  if (err.code === 11000) {
    errors.email = "Email is already Registered";
    // return errors; // return the error so the backend doesn't crash and the function ends there
  }
  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      // for each error in this function, we will destructure the properties of the function
      errors[properties.path] = properties.message; // the errors properties will then go through this function and find the error that matches and pass that message
    });
  }
  return errors;
};

const register = async (req, res, next) => {
  try {
    const user = await db.User.create(req.body);
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      timeLimit,
    });
    res.status(201).json({ user: user._id, name: user.name, created: true });
  } catch (err) {
    console.log(err); // console log the error
    const errors = handleErrors(err); // if an error was caught, show the error message that we created above
    res.json({ errors, created: false }); // the user wasn't created and an error is being read
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await db.User.login(email, password);
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      timeLimit,
    });
    res.status(200).json({
      user: user._id,
      name: user.name,
      myEvents: user.myEvents,
      myGroups: user.myGroups,
      isAdmin: user.isAdmin,
      loggedIn: true,
    });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, loggedIn: false });
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SESSION_SECRET, async (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        next();
      } else {
        const user = await db.User.findById(decodedToken.id);
        if (user) {
          res.json({
            status: true,
            user: user.email,
          });
        }
      }
    });
  } else {
    res.json({ status: false });
    next();
  }
};

const index = (req, res) => {
  db.User.find({}, (error, users) => {
    if (error) return res.status(400).json({ error: error.message });

    return res.status(200).json({
      users,
      requestedAt: new Date().toLocaleString(),
    });
  });
};

const show = (req, res) => {
  db.User.findById(req.params.id, (error, foundUser) => {
    if (error) return res.status(400).json({ error: error });

    return res.status(200).json({
      foundUser,
      requestedAt: new Date().toLocaleString(),
    });
  });
};

const update = (req, res) => {
  if ("isAdmin" in req.body) {
    if (req.body["isAdmin"] === "true") {
      req.body["isAdmin"] = true;
    } else {
      req.body["isAdmin"] = false;
    }
  }
  db.User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true },
    (err, updatedUser) => {
      if (err) return res.status(400).json({ error: err });
      return res.status(200).json(updatedUser);
    }
  );
};

module.exports = {
  register,
  signIn,
  checkUser,
  index,
  show,
  update,
};
