const User = require('../models/userModel');  


const deposit = async (req, res) => {
  try {
    const { email, amount } = req.body;
    
    
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    user.balance += amount;
    await user.save();

    
    res.status(200).json({ balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


const withdraw = async (req, res) => {
  try {
    const { email, amount } = req.body;
    
    
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    if (user.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    
    user.balance -= amount;
    await user.save();

    
    res.status(200).json({ balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { deposit, withdraw };
