import User from ("../models/User");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate user input
  if (!username || !email || !password) {
    return res.status(400).send({ message: "Missing required fields" });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send({ message: "Email already exists" });
  }

  // Hash password for security
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    // Validate user input
    if (!email || !password) {
      return res.status(400).send({ message: 'Missing required fields' });
    }
  
    // Check if user exists with the provided email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }
  
    // Compare password using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }
  
    // Generate and send JWT token on successful login
    const token = generateAuthToken(user);
    res.status(200).send({ token });
  };
  
