const Auth = require("../models/auth-model");

const Register = async (req, res) => {
 try {
    const { name, email, password } = req.body;
    const userExists = await Auth.findOne({ email });
  
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }
  
    const auth = await Auth.create({ name, email, password });
  
    await auth.save();
  
    res.status(200).json({
      userId: auth._id.toString(),
      token: await auth.generateToken(),
      data: auth,
      success: true,
      message: "User created successfully",
    });
 } catch (error) {
    res.status(500).json({ message: error.message, success: false });
 }
};

const Login = async (req, res) => {
 try {
    const { email, password } = req.body;

    const user = await Auth.findOne({ email });
  
    if (!user) {
      return res.status(400).json({ message: "User not found", success: false });
    }
  
    if (user.password !== password) {
      return res
        .status(400)
        .json({ message: "Incorrect password", success: false });
    }
  
    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      data: user,
      token: await user.generateToken(),
      userId: user._id.toString(),
    });
 } catch (error) {
    res.status(500).json({message: "Something went wrong", success: false});
 }
};

module.exports = {
  Register,
  Login,
};
