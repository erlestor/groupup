import mongoose from "mongoose";
import express from "express";
import Cors from "cors"
import Users from "./schemas/dbUser.js"
import bodyparser from "body-parser";
//mongoDB pw: 

//Config
const app = express();

const port = process.env.port || 8001;
const connectionUrl = "mongodb+srv://admin:Ja5kj02gFMoamDUf@cluster0.s0siz.mongodb.net/groupupdb?retryWrites=true&w=majority"

app.use(express.json());
app.use(Cors());
app.use(bodyparser.json());

mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//API Endpoints


//Post for single user - register
app.post("/register", (req, res) => {
    const dbUser = req.body;

    Users.findOne({email: req.body.email}, function(err, user) {
        if (user) {
            res.status(400).send("This user already exists.")
        } else {
            Users.create(dbUser, (err, data) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                   res.status(200).send(data);
                }
            });
        }
    })
});

//Check for if user by that username is already registered in database
app.get("/userByName", (req, res) => {
    Users.findOne({email: req.query.email}, function (err, user) {
        if (err) {
            res.status(500).send(err);
        } else if (user) {
            res.status(400).send("This user already exists.");
        }
    });
});

//Get all users
app.get("/users", (req, res) => {
    Users.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});


//Login
//Check that user is in database and entered password is correct
app.get("/login", (req, res) => {
    Users.findOne({username: req.body.email, password: req.body.password}, function (err, user) {
        if (err) {
            res.status(500).send(err);
        }
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send("Wrong username or password.")
        }
    });
});

app.listen(port, () => console.log(`listening on localhost: ${port}`));
