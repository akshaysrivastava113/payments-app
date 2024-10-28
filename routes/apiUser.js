const express = require("express");
const { userAuth } = require("../middleware/userAuth");
const { z } = require("zod");
const { User } = require("../db/db");
const router = express.Router();
const stringSchema = z.string();

router.get('/', (req,res) => {
    res.json({
        "msg": "API routes"
    })
});

router.put('/', userAuth, async (req,res) => {
    const userId = req.userId;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const userIdSanitized = stringSchema.safeParse(userId).data;
    const passwordSanitized = stringSchema.safeParse(password).data;
    const firstNameSanitized = stringSchema.safeParse(firstName).data;
    const lastNameSanitized = stringSchema.safeParse(lastName).data;

    if(!userIdSanitized){
        return res.status(411).json({
            "msg": "userId not verified"
        });
    }

    //Check of what all has been received to be updated
    //Collect it one place > Update in the db only once

    const filter = {"_id": userIdSanitized};
    const update = {};

    if(passwordSanitized){
        update["password"] = passwordSanitized;
    }
    if(firstNameSanitized){
        update["firstName"] = firstNameSanitized;
    }
    if(lastNameSanitized){
        update["lastName"] = lastNameSanitized;
    }

    try {
        const userUpdated = await User.findOneAndUpdate(filter, update);
        if(userUpdated) {
            return res.status(200).json({
                "msg": "Updated successfully"
            })
        }
    } catch(e) {
        console.error(e);
    }
    res.status(411).json({
        "msg": "Something went wrong"
    });

});

router.get('/bulk', userAuth, async (req,res) => {
    //Accept parameter, store as searchableUsername
    //use findAll in mongoose - Yes, return all in an Array? : No, no entries found
    const searchableName = req.query.filter;

    //Search with firstName first
    const firstNameUsersFound = await User.find({firstName: searchableName});
    
    const lastNameUsersFound = await User.find({lastName: searchableName})
    
    const allUsers = firstNameUsersFound.concat(lastNameUsersFound);
    const responseObj = {};
    responseObj["users"] = allUsers;

    if(allUsers.length === 0){
        return res.status(411).json({
            "msg": "Not found"
        });
    }

    res.status(200).json(responseObj);
});



module.exports = router;