const errorHandler = require("../utils/error")
const bcrypt = require('bcryptjs')
const User = require('../Models/users.model')


const test = (req, res) => {
    res.json({
        message: 'Hey Babe',
    })
}

const updateUser = async (req, res, next) => {

    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, 'You can only update your own account !'));
    }

    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10)
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, { new: true })

        const { password, ...rest } = updatedUser._doc;

        res.status(200).json(rest);

    } catch (error) {
        next(error);
    }

}

const deleteUser = async (req, res, next) =>{
    
 if(req.user.id != req.params.id){
    return next(errorHandler(401, 'You can only delete your account !'))
 }

 try {
    await User.findByIdAndDelete(req.params.id);
    
    res.clearCookie('access_token');
    res.status(200).json({ message:'User deleted successfully !'});

 } catch (error) {
    next(error)
 }


}

module.exports = {
    test,
    updateUser,
    deleteUser,
}