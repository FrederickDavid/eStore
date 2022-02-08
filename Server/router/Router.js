const express = require("express");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
const storeModel = require("../model/storeModel");
const router = express.Router();

router.get("/users", async (req, res) => {
    try{
        const getUsers = await userModel.find();

        res.status(200).json({
            message: "Users found",
            totalUsers: getUsers.length,
            data: getUsers
        });
    } catch (error) {
        res.status(400).json({
            message: "No users found"
        });
    }
});
router.get("/store", async (req, res) => {
    try{
        const getStore = await storeModel.find();

        res.status(200).json({
            message: "All items found",
            totalUsers: getStore.length,
            data: getStore
        });
    } catch (error) {
        res.status(400).json({
            message: "No item found"
        });
    }
});

router.get("/users/:id", async (req, res) => {
    try{
        const getUser = await userModel.findById(req.params.id, req.body);

        res.status(200).json({
            message: "User found",
            totalUsers: getUser.length,
            data: getUser
        });
    } catch (error) {
        res.status(400).json({
            message: `No user with such id`
        });
    }
});
router.get("/store/:id", async (req, res) => {
    try{
        const getStore = await storeModel.findById(req.params.id, req.body);

        res.status(200).json({
            message: "Item found",
            totalItems: getStore.length,
            data: getStore
        });
    } catch (error) {
        res.status(400).json({
            message: `No item with such id`
        });
    }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(
            null,
            file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
        );
    },
});

const upload = multer ({ storage: storage }).single("image");

const verified = async (req, res, next) => {
    try{
        const authToken = req.headers.authorization;
        if(authToken) {
            const token = authToken.split(" ")[2];

            jwt.verify(token, "ThIsIsMySeCrEtKeY", 
            (error, payload) => {
                if(error) {
                    res.status(400).json({
                        message: "Please check your TOKEN again...!"
                    });
                } else {
                    req.user = payload;
                    next();
                }
            });
        } else {
            res.status(400).json({
                message: "Something is wrong with this TOKEN"
            });
        }
    } catch (error) {
        res.status(400).json({
            message: "You don't have right to this operation"
        });
    }
};

router.post("/register", upload, async (req, res) => {
    const { name, email, password, contact, address } = req.body;

    const saltPassword = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, saltPassword);

    try{
        const createUser = await userModel.create({
            name,
            email,
            address,
            contact,
            password: hashPassword,
            image: req.file.path,
        });
        res.status(200).json({
            message: "User Created Successfully",
            data: createUser,
        });
    } catch (error) {
        res.status(400).json({
            message: "Unable to create this user"
        });
    }
});

router.post("/Item", upload, async (req, res) => {
    try{
        const StoreItem = await storeModel.create({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.file.path,
        });
        res.status(201).json({
            message: "Item Created Successfully",
            data: StoreItem
        });
    } catch (error) {
        res.status(401).json({
            message: "Cannot create item"
        });
    }
});

router.post("/signIn", async (req, res) => {
    try{
        // const {email} = req.body;
        const user = await userModel.findOne({email: req.body.email});
        if(user){
            const checkPassword = await bcrypt.compare(req.body.password, user.password);
            if(checkPassword){
                const {password, ...data} = user._doc;

                const token = jwt.sign(
                    {
                        id: user._id,
                        email: user.email,
                        name: user.name,
                        isAdmin: user.isAdmin,
                    }, 
                    "ThIsIsMySeCrEtKeY", 
                    {expiresIn: "2d"}
                );
                res.status(201).json({
                    message: `Welcome Back ${user.name}`,
                    data: {...data, token},
                });
            } else {
                res.status(401).json({
                    message: "Password is incorrect"
                });
            }
        } else {
            res.status(401).json({
                message: "User not found"
            });
        }
    } catch (error) {
        res.status(401).json({
            message: error.message
        });
    }
});

router.patch("/users/:id", verified, async (req, res) => {
    try {
        if(req.user.id === req.params.id || req.user.isAdmin){
            const user = await userModel.findByIdAndUpdate(req.params.id,
                {
                    name: req.body.name,
                    email: req.body.email,
                    address: req.body.address,
                    contact: req.body.contact,
                    // image: req.file.path,
                },
                {new: true}
            );
            res.status(200).json({
                message: "User Updated Successfully",
                data: user,
            });
        }
    } catch (error) {
        res.status(400).json({
            message: "You don't have right to this operation"
        });
    }
});

router.patch("/store/:id", verified, async (req, res) => {
    try {
        if(req.user.isAdmin){
            const user = await storeModel.findByIdAndUpdate(req.params.id,
                {
                    name: req.body.name,
                    description: req.body.description,
                    price: req.body.address,
                    // image: req.file.path,
                },
                {new: true}
            );
            res.status(200).json({
                message: "Item Updated Successfully",
                data: user,
            });
        }
    } catch (error) {
        res.status(400).json({
            message: "You don't have right to this operation"
        });
    }
});



router.delete("/users/:id", verified, async (req, res) => {
    try{
        if (req.user.isAdmin){
           await userModel.findByIdAndRemove(req.params.id, req.body);
            res.status(200).json({
                message: "User Deleted Successfully"
            });
        } else {
            res.status(400).json({
                message: "Only Admin can perform this operation"
            });
        }
    } catch (error) {
        res.status(400).json({
            message: "You don't have right to perform this operation"
        });
    } 
});

router.delete("/store/:id", verified, async (req, res) => {
    try{
        if (req.user.isAdmin){
           await storeModel.findByIdAndRemove(req.params.id, req.body);
            res.status(200).json({
                message: "Item Deleted Successfully"
            });
        } else {
            res.status(400).json({
                message: "Only Admin can perform this operation"
            });
        }
    } catch (error) {
        res.status(400).json({
            message: "You don't have right to perform this operation"
        });
    } 
});

module.exports = router;