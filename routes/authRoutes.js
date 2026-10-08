const express = require("express");

const {
    register,
    login,
    logout,
    addMachine,
    getMachine,
    deleteMachine
} = require("../controllers/authController");

const router = express.Router();

// Delete Machine

router.delete("/deleteMachine/:id", deleteMachine)

// Get Machines
router.get("/getMachine",getMachine);

// Sign Up
router.post("/register", register);

// Login
router.post("/login", login);

// Logout
router.post("/logout", logout);

// To Machines
router.post("/addMachine", addMachine);

module.exports = router;