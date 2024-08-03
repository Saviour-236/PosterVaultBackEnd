import type { Request, Response } from 'express';
import UserOfTileSite from '../modling/user_schema.ts';
import jwt from 'jsonwebtoken';



// Handle sign-up controller
const signUp = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
  //check if user already exist or not
    res.status(200).json({message:'sign up successfull'})
};



// sign in controller 
const signIn = async (req: Request, res: Response) => {
  
  
  
    // check if user exsit or not
    const user = await UserOfTileSite.findOne({ email: req.body.email });
    if (!user) {
        return (res.status(400).json({ message: ' User not found please sign up first' }));
    }


    // chek  password correct or not 
    if (user.password !== req.body.password) {
        return res.status(400).json({ message: ' wrong password ' })
    }


    // generate token
    const token = jwt.sign( { user }, 
        process.env.AUTH_TOKEN_SECRET_KEY as string ,
        { expiresIn: '1h' }
    )


    //send token in cookies
    const {password, ...userWithoutPassword} = user._doc;
    return res.status(200).cookie('authtoken', token, {
        httpOnly: true,
        maxAge: 3600000, // 1 hour in milliseconds
        // secure: true, // Uncomment in production with HTTPS
        // sameSite: 'strict', // Uncomment if you want CSRF protection
      }).json(userWithoutPassword);
};

export {signIn, signUp}
