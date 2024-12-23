
const User = require('../models/userModel'); // Path to your user model

const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    
    const user = new User({
      fullName,
      email,
      password,
    });

    
    await user.save();

    res.status(201).json({
      message: 'User created successfully',
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { signup };
