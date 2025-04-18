const User = require("../models/user.model");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validate } = require("email-validator")

const loginController = async (req, res) => {
    try {
        const {email, password} = req.body ;
        if (!email || !password) {
            return res.status(400).json({
                status: "error",
                message: "Please enter all fields"
            })
        }
        const user = await User.findOne({email});

        if (!user){
            return res.status(400).json({
                status: "error",
                message: "Invalid login credentials"
            })
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword){
            return res.status(400).json({
                status: "error",
                message: "Invalid login credentials"
            })
        }

        const accessToken = jwt.sign(
            { 
                id: user._id ,
                role: user.role
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "2h",
            }
        )

        res.cookie('token', accessToken, {
            httpOnly: true,
            maxAge: 2 * 60 * 60 * 1000, // 2 hour
            secure: process.env.NODE_ENV === 'production',
            path: '/',
        })

        return res.status(200).json({
            status:"ok", 
            message:"Logged in Successfully", 
            accessToken,
        })
    } catch (error) {
        console.error(`Error on loginController ${error.stack || error.message}`)
        res.status(500).json({
            status:"error",
            message: "Internal Server Error"
        });
    }
}


const registerController = async (req, res) => {
    try {
        const {name, email, password} = req.body ;
        let role = "hr";

        if (!name || !email || !password ) {
            return res.status(400).json({
                status:"error",
                message: "Please fill all the fields"
            })
        }

        if (!validate(email)){
            return res.status(400).json({
                status: "error",
                message: "Invalid email address"
            })
        }

        const userExist = await User.findOne({email}) ;
        if (userExist) {
            if (userExist.email === email) {
                return res.status(400).json({
                    status: "error",
                    message: "Email already exists"
                });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10) ;

        const result = await User.create({name, email, password:hashedPassword, role}) ;

        return res.status(201).json({
            status: "ok",
            message: "User registered successfull, You may login now",
            userId: result._id
        })
        
    } catch (error) {
        console.error(`Error in registerController : ${error.stack || error.message}`);
        return res.status(500).json({
            status:"error", 
            message: "Internal Server Error" 
        });
    }
}


const logoutController = async (req, res) => {
    try {
        res.cookie('token', '', {
            maxAge: 0, 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            path: '/'
        });

        return res.status(200).json({
            status: "ok",
            message: "Logged out successfully"
        });

    } catch (error) {
        console.error(`Error in logoutController: ${error.stack || error.message}`);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error"
        });
    }
};


module.exports = {
    loginController,
    registerController,
    logoutController,
}