const dataValidationInterceptor = require("../middlewares/dataValidationInterceptor");
import User from ('../models/User');


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({ data: users });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

exports.createUser = async (req, res) => {
    // Validate user data using interceptor
    await dataValidationInterceptor.intercept(req, res);
  
    // Create new user
    const { username, email, password } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
      res.status(201).send({
   
  message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error' });
    }
  };

exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send({ message: 'User not found' });
      return;
    }
    res.status(200).send({ data: user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const updates = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
    if (!updatedUser) {
      res.status(404).send({ message: 'User not found' });
      return;
    }
    res.status(200).send({ data: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    await User.findByIdAndDelete(userId);
    res.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
};
