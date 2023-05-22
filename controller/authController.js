
import userModel from "../models/userModel.js"
import {hashPassword} from '../helper/authHelper.js'
const registerController = async (req,res)=>{

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


export default registerController