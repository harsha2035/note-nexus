const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  const { name, email, mobile, uname, password } = req.body;

  try {

    const existingUser = await User.findOne({ uname });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      mobile,
      uname,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const signin = async (req, res) => {
  const { uname, password } = req.body;

  try {
    const user = await User.findOne({ uname });
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ Error: 'Username Not Found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); 
    if (!isPasswordValid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ Error: 'Wrong Password' });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(StatusCodes.OK).json({ token, name: user.name, username: user.uname, message: "Login Successfull!!"  }); 
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Error: 'Error signing in', error });
  }
};

const add_note = async (req, res) => {
  try {
    const { title, content } = req.body;

    const owner = req.body.owner || req.user.name; 

    const newNote = new Note({
      title,
      content,
      owner, 
      lastEditedBy: owner
    });

    const savedNote = await newNote.save();

    res.status(201).json({
      message: 'Note added successfully',
      note: savedNote,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error adding note',
      error: error.message,
    });
  }
};

module.exports = { signup, signin, add_note};
