const User = require('../Models/users.model')
const bcrypt = require('bcryptjs');
const errorHandler  = require('../utils/error');
const jwt = require('jsonwebtoken')


const signUp = async (req, res, next) => {

    // const { username, email, password } = req.body;
    // const hashedPassword = bcrypt.hashSync(password, 10);
    // const newUser = new User({ username, email, password: hashedPassword });
    // try {
    //     await newUser.save();
    //     res.status(201).json('User created successfully!')

    // } catch (error) {
    //     next(error);
    // }

    const { username, email, password } = req.body;

  try {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hashSync(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ success: true, message: 'User created successfully!' });

  } catch (error) {

    res.status(500).json({ success: false, message: 'Server error', error: error.message });
    next(error);
  }

}

const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
       
        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
           
        }
        const validPassword = bcrypt.compareSync(password, validUser.password)
        if (!validPassword) {
            return next(errorHandler(401, 'Check credentials'));
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY)
        const { password: pass, ...rest } = validUser._doc;
        
        res
            .cookie('access_token', token, {httpOnly: true })
            .status(200)
            .json(rest);
           
    } catch (error) {
        next(error);
       
    }
    
}


const google = async (req, res, next) => {
    
    try {

        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
            const { password: pass, ...rest } = user._doc;
            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest);

        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

            const newUser = new User({
                username:
                    req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo,
            });

            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
            const { password: pass, ...rest } = newUser._doc;

            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest);
                console.log(token);
        }

    } catch (error) {
        next(error);
    }
}

const signOut = async  (req, res, next ) =>{

    try {
        
        res.clearCookie('access_token');
        res.status(200).json('User successfully Logged Out');
    } catch (error) {
        next(error)
    }
}


module.exports = {
    signUp,
    signIn,
    google,
    signOut,
    
}
