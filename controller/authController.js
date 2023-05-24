
import userModel from "../models/userModel.js"
import {hashPassword} from '../helper/authHelper.js'
import  Jwt  from "jsonwebtoken";
import { comparePassword } from "../helper/authHelper.js";

export const registerController = async (req,res)=>{

    try{
        const {name,email,password,phone,address} = req.body
        // validation
        if(!name){
            return res.send({error: 'Name is Required'})
        }
        if(!email){
            return res.send({error: 'email is Required'})
        }
        if(!password){
            return res.send({error: 'password is Required'})
        }
        if(!phone){
            return res.send({error: 'phone is Required'})
        }
        if(!address){
            return res.send({error: 'address is Required'})
        }

        // chaeck users
        const existingUser = await userModel.findOne({email});
        //existing user

        if(existingUser){
            return res.status(2000).send({
                success:true,
                message:"Already Register please login",
            })
        }

        //register user
        const hashedPassword = await hashPassword(password)

        // save
        const user = await new userModel({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
        }).save()
        res.status(201).send({
            success:true,
            message: "user registed sucessfully",
            user: {user}
        })
        
    }
    catch (error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Rgistration",
        })

    }

}
export const loginController = async (req,res)=>{
    
    try{
        const {email,password} = req.body
        
        if(!email){
            return res.send({email:"enter valid email"})
        }
        if(!password){
            return res.send({password:"enter valid passeord"})
        }
        
        // existing user
        const user = await userModel.findOne({email});
        if(!user){
            return res.send("user is not registered")
        }
        if(!comparePassword(user.password,password)){
            
            return res.send("password entered is invalid")
        }
        // token
        const token = await Jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        
        
        res.status(200).send({
            sucess:true,
            message:"login sucessfully",
            user:{
                name: user.name,
            email: user.email,
            password: user.password,
            phone: user.phone,
            address: user.address
            },
            token,
        });

    }
    catch(error){
        console.log("error occured")
        res.status(500).send({
            success: false,
            message: "error in login"
        })

    }
}

// test controller
export const testController = async (req,res) =>{
    try{
        res.send("Protected Routes");
    }
    catch(error){
        console.log("error occured");
        res.send({error});
    }
}














// export default {registerController,loginController};
