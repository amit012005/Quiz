import User from "../models/userModel.js";

async function authUser(req, res) {
  const { email, password } = req.body;
  console.log(`Email ${email}`);
  console.log(`password ${password}`);
  const user = await User.findOne({ email });
  console.log(user);
  if (user && (await user.matchPassword(password))) {
    res.status(200).send({
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      _id: user._id,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
}

async function registerUser(req, res) {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    console.log(user);
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
}
export { authUser, registerUser };
