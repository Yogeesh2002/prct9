const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();


app.use(cors());
app.use(bodyParser.json()); 


mongoose.connect("mongodb://127.0.0.1:27017/userDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("MongoDB connection error:", err));


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

app.post("/api/users", async (req, res) => {
    try {
        const { name, email, age, gender } = req.body;
        const newUser = new User({ name, email, age, gender });
        await newUser.save();
        res.status(200).json({ message: "User saved successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error saving user", error: err });
    }
});

//
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
