
const bcrypt = require('bcrypt');
const User = require('../models/userModel'); 

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Password Incorrect' });
    }

    
    res.status(200).json({ message: 'Login successful',user: {
      fullName: user.fullName,
      email: user.email,
      balance: user.balance, 
    }, });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { login };
