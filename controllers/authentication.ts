import type { Request, Response } from 'express';
import User from '../modling/user_schema.ts';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


// Handle sign-up controller
const signUp = async (req: Request, res: Response) => {
    // console.log(req.body)
    // console.log('in sign up controller', req.body);
    //check if user already exist or not
    const user = await User.findOne({ email: req.body.email });
    // console.log('user',user);
    if (user) {
        // console.log('user already exist');
        return res.status(400).json({ message: 'User already exist' });
    }
    // console.log('user not exist');
    //crypting password  using bcrypt 
    // console.log('before hashing password');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    req.body.password = hashedPassword;
    // console.log('after hashing password');
    // create new user
    const newUser = new User(req.body); 
    // console.log('new user created');

    // save user in database getting only user without password
     const {password , ...savedUser} =  await newUser.save().then((user) => user.toObject());
    
    // token generation
    // console.log("saved user",savedUser);

    // console.log('before token generation');
    // console.log('jwt token secret key',process.env.JWT_TOKEN_SECRET_KEY);
    const accessToken = jwt.sign({user:savedUser}, process.env.JWT_TOKEN_SECRET_KEY as string, {expiresIn:'1h'});
    const refreshToken = jwt.sign({usre:savedUser}, process.env.JWT_TOKEN_SECRET_KEY as string, {expiresIn:'2d'});
    // console.log('after token generation');

    // sending resposne with token in cookies

    return res.status(200)
    .cookie('refreshToken',refreshToken,{
        httpOnly:true,
        maxAge: 172800000, // 2 days in milliseconds
        secure: true,
        sameSite: 'none',
    }).json({Accesstoken:accessToken,message:'sign up successfull'})
};



// sign in controller 
const signIn = async (req: Request, res: Response) => {
  
  
  
    // check if user exsit or not
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return (res.status(400).json({ message: ' User not found please sign up first' }));
    }


    // chek  password correct or not 
    if (! await bcrypt.compare(req.body.password, user.password)) {
        return res.status(400).json({ message: ' wrong password ' })
    }

    const { password, ...userInfo } = user.toObject();
    // generate token
    const accessToken = jwt.sign( { userInfo }, 
        process.env.JWT_TOKEN_SECRET_KEY as string ,
        { expiresIn: '1h' }
    )
    // console.log('token', token);
    const refreshToken = jwt.sign({ userInfo }, process.env.JWT_TOKEN_SECRET_KEY as string, {expiresIn:'2d'});


    //send token in cookies
    return res
    .status(200)
    .cookie(
        'refreshToken', 
        refreshToken, {
        httpOnly: true,
        maxAge: 172800000, // 1 hour in milliseconds
        secure: true,
        sameSite: 'none',
      })
      .json({token:accessToken,message:"sign in successfull"});
};

export {signIn, signUp}
