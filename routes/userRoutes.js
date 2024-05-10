import express from "express";
const routerUser = express.Router();

import User from "../models/user.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - age
 *         - work
 *         - mobile
 *         - email
 *         - salary
 *       properties:
 *         name:
 *           type: string
 *           description: Stores the name of the user
 *         age:
 *           type: integer
 *           description: stores age of the user
 *         work:
 *           type: string
 *           description: stores employment detail
 *         mobile:
 *           type: string
 *           descripton: Stores mobile no. of the user
 *         email:
 *           type: string
 *           description: Stores email of the user
 *         address:
 *           type: string
 *           description: Stores address of the user
 *         salary:
 *           type: integer
 *           description: Stores salary of the user
 *       example:
 *         name: Nitesh
 *         age: 22
 *         work: Student
 *         mobile: 63265872352
 *         email: nitesh@gmail.com
 *         address: 124,swami sadan
 *         salary: 573616
 * 
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Returns all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: the list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       204:
 *         description: No users available
 */

routerUser.get("/", async(req,res)=>{
    try{
        const response = await User.find();
        if(response.length == 0){
            return res.sendStatus(204);
        }

        console.log("Users fetched");
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal Server Error
 */

routerUser.post("/", async(req,res)=>{
    try{
        const data = req.body;
        const newUser = new User(data);

        const response = await newUser.save();
        console.log("new user saved");
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
});


/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: updates user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         decsription: User was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: user was not found.
 *       500:
 *         description: Internal server error.
 *
 */

routerUser.put("/:id", async(req,res)=>{
    try{
        const userId = req.params.id;
        const updatedUserData = req.body;
        const response = await User.findByIdAndUpdate(userId, updatedUserData, {
            new: true,
            runValidators: true
        });
        if(!response){
            return res.status(404).json({error: "User Not Found"});
        }
        console.log("User Updated");
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
});


/**
 * @swagger
 *  /user/{id}:
 *    delete:
 *      summary: removes user
 *      tags: [User]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: user id
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: User was deleted successfully
 *        404:
 *          description: The user was not found
 *        500:
 *          description: Internal server error
 *
 */

routerUser.delete("/:id", async(req,res)=>{
    try{
        const userId = req.params.id;
        const response = await User.findByIdAndDelete(userId);
        if(!response){
            return res.status(404).json({error: "User not Found"});
        }
        console.log("User Deleted");
        res.status(200).json({message: "User deleted successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

export default routerUser;