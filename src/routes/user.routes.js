const express=require("express")

const{
    createUser,
    loginUser,
    updateUser,
    deleteUser,
}=require("../controller/user.controller");

const router=express.Router()

// router.get("/",getUser)
router.post("/signup",createUser)
router.post("/login",loginUser);
router.put("/update",updateUser);
router.delete("/delete",deleteUser);

module.exports=router;