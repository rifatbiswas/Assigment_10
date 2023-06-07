const User = require ("../model/user.js");
const {hashPassword, comparePassword} = require ("../helper/user.js")
const jwt = require ("jsonwebtoken");

exports.register = async (req, res) =>{
    try {
        const {name, email, password} = req.body;
        if(!name.trim()){
            return res.json({error:"Name is required"});
        }
        if(!email){
            return res.json({error:"Eamil is required"});
        }
        if(!password || password.length <6){
            return res.json({error:"Password must be at least 6 characters long"});
        };
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.json({error:"Email is already Taken"})
        }

        const hashedPassword = await hashPassword(password)

        const user = await new User({
            name:name,
            email:email,
            password:hashedPassword
        }). save();

        const generateToken = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"})

        res.json({
            user:{
                name:user.name,
                email:user.email,
                role:user.role,
                assress:user.address,
            },
            generateToken,

        });


    } catch (err) {
        console.log(err);
    }
};

exports.login = async (req, res) => {
    try {
        
        const { email, password } = req.body;
        
        if (!email) {
            return res.json({ error: "Email is required" });
        }
        if (!password || password.length < 6) {
            return res.json({ error: "Password must be at least 6 characters long" });
        }
        
        const user = await User.findOne({ email });
        console.log(user)
        if (!user) {
            return res.json({ error: "User not found" });
        }
        
        const match = await comparePassword(password, user.password);
       
        if (!match) {
            return res.json({ error: "Invalid email or password" });
        }
        
        const generateToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        
        res.json({
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                address: user.address,
            },
            generateToken,
        });
    } catch (err) {
        console.log(err);
    }
};