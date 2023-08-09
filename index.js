const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const EmployeeModel = require('./Models/Employee');


const app = express();
app.use(express.json())

app.use(cors()); 

const mediaRoutes = require('./routes/media');


app.use("/api/v1/media", mediaRoutes);
app.use('/public', express.static(path.join(__dirname, 'public')))

const mongodbURL = "mongodb+srv://balaji-capstone:balaji-capstone@cluster0.mppoiq8.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongodbURL, {
    useNewUrlParser: true,
});

app.post("/login", (req, res) =>{
    const {email, password} = req.body;
    EmployeeModel.findOne({email:email})
    .then(user => {
        if(user) {
            if(user.password === password) {
                res.json("success")
            }else{
                res.json("the password is incorrect")
            }
        }else{
            res.json("No recods found")
        }
    })
})

app.post('/register', (req, res) =>{
    EmployeeModel.create(req.body)
    .then(Employees => res.json(Employees))
    .catch(err => res.json(err))
})

mongoose.connection.on("connected", () => {
    console.log("connected to server...");
});

mongoose.connection.on("error", (err) =>{
    console.log("Error connecting to mongoDB", err);
});



app.listen(8000, () => {
    console.log("App is running on PORT 8000 ")
})