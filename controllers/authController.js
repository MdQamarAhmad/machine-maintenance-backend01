
const User = require("../models/User");
const Machine = require("../models/Machine");
const bcrypt = require("bcryptjs");

// Delete Machine
const deleteMachine = async (req, res) => {
   try{
    let {id} = req.params;
   
   const machine = await Machine.findByIdAndDelete(id)
   if(!machine){
    return res.status(400).json({
        message:"Machine not found"
    })
   }else {
    return res.status(200).json({
        message:"Machine deleted successfully"
    })
   }}catch(error){
     console.error("Delete machine error",error)
     res.status(500).json({
        message:"Delete Machine error",
        error : error.message
     }
     )

   }


}

 // Get Machine
const getMachine = async (req, res) => {
  try {
    const machines = await Machine.find();

    res.status(200).json(machines);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch machines",
      error: error.message,
    });
  }
};

// To Machines
const addMachine = async (req, res) => {
  try {
    const {
      machineId,
      machineName,
      department,
      location,
      machineType,
      manufacturer,
      modelNumber,
      installationDate,
      status,
      description,
    } = req.body;

    // Check required fields
    if (
      !machineId ||
      !machineName ||
      !department ||
      !location ||
      !machineType
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    // Check duplicate machine ID
    const existingMachine = await Machine.findOne({
      machineId,
    });

    if (existingMachine) {
      return res.status(409).json({
        message: "Machine ID already exists",
      });
    }

    // Create machine
    const machine = await Machine.create({
      machineId,
      machineName,
      department,
      location,
      machineType,
      manufacturer,
      modelNumber,
      installationDate:
        installationDate || null,
      status,
      description,
    });

    res.status(201).json({
      message: "Machine added successfully",
      machine,
    });
  } catch (error) {
    console.error("Add Machine Error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

// REGISTER
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// LOGIN
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Compare password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        res.json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

// LOGOUT
const logout = (req, res) => {
    res.json({
        message: "Logout successful"
    });
};

// GET CURRENT USER
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            user
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    register,
    login,
    logout,
    getMe,
    addMachine,
    getMachine,
    deleteMachine,
};

