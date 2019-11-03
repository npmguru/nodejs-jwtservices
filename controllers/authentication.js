const jwt    = require('jwt-simple');
const User   = require('../models/user');
const config = require('../config');

function tokenForAuth(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({  sub: user.id, iat : timestamp }, config.secret);
}


exports.signup = async (req,res,next) => {
    const {email,password} = req.body;
    
    if(!email || !password){
        res.status(404).send({message:'Information not getting completed'});
    }


    try{
        const userExist = await User.findOne({email : email});
        if(userExist){
            return res.status(404).send({message:'Error : Email Already Used'});
        }else{
            const user =  new User({
                email: email,
                password : password
            });
            try{
                const saveUser = await user.save();
                return res.status(200).send({message:'Success : User Saved', token : tokenForAuth(saveUser)});
            }catch(error){
                res.status(404).send({message:'User Not Save'});
            }
        }

    }catch(error){
        res.status(404).send({message:'Server Error'});
    }
    console.log("Email ",email,"Password",password);
   

    
}



exports.signin = (req,res,next) => {
    return res.status(200).send({message:'Success : User Saved', token : tokenForAuth(req.user)});

}