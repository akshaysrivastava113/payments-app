const express = require("express");
const {z} = require("zod");
const {User, Account} = require("../db/db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const {userAuth} = require("../middleware/userAuth");

const stringSchema = z.string();

router.post('/signup', async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    let token = "";
    const usernameSanitized = stringSchema.safeParse(username).data;
    const passwordSanitized = stringSchema.safeParse(password).data;
    const firstNameSanitized = stringSchema.safeParse(firstName).data;
    const lastNameSanitized = stringSchema.safeParse(lastName).data;

    if(!usernameSanitized){
        return res.status(411).json({
            "msg": "Incorrect inputs"
        })
    }

    if(!passwordSanitized){
        return res.status(411).json({
            "msg": "Incorrect inputs"
        })
    }

    //Check for the user in users table in the db, if not present > add a new one ; error out if present

    try {
        const foundUser = await User.findOne({
            username: usernameSanitized
        });

        if(foundUser){
            return res.status(411).json({
                "msg": "Looks like a user with the username already exists. Please try signing in"
            });
        }

        let createdUser;
        try{
            createdUser = await User.create(
                {
                    username: usernameSanitized,
                    firstName: firstNameSanitized,
                    lastName: lastNameSanitized,
                    password: passwordSanitized
                }
            );
            console.log("Added new user", createdUser);
        } catch(e) {
            console.error(e);
        }
        let userId = createdUser._id;

        try{
            const createAccount = await Account.create({
                userId: userId,
                balance: Math.floor(Math.random()*100000-Math.random()*10)
            });
            if(!createAccount){
                return res.status(411).json({
                    "msg": "Could not populate balance"
                });
            }
        } catch(e){
            console.error(e);
        }

        token = jwt.sign({
            userId: userId,
        }, JWT_SECRET);
        

    } catch(e){
        console.error(e);
    }

    res.status(200).json({
        "msg": "All OK",
        "token": token
    });

});

router.post('/signin', async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    let token = "";

    const usernameSanitized = stringSchema.safeParse(username).data;
    const passwordSanitized = stringSchema.safeParse(password).data;

    if(!usernameSanitized){
        return res.status(411).json({
            "msg": "Incorrect inputs"
        })
    }

    if(!passwordSanitized){
        return res.status(411).json({
            "msg": "Incorrect inputs"
        })
    }

    try{
        const foundUser = await User.findOne({
            username: usernameSanitized
        });
    
        if(!foundUser){
            return res.status(411).json({
                "msg": "User not found. Please sign up to register"
            });
        }

        try {
            if(foundUser.username === usernameSanitized && foundUser.password === passwordSanitized){
                token = jwt.sign({
                    userId: foundUser._id
                }, JWT_SECRET)
            } else {
                return res.status(411).json({
                    "msg": "Username or password incorrect"
                })
            }
        } catch(e){
            console.error(e);
            return res.status(411).json({
                "msg": "Username or password incorrect"
            })
        }
    } catch(e){
        console.error(e);
        return res.status(411).json({
            "msg": "Something went wrong"
        })
    }

    res.status(200).json({
        "msg": "All OK",
        "token": token
    });

})

module.exports = router