import mongoose from "mongoose";
import express from "express";
import Cors from "cors"
import Users from "./schemas/dbUser.js"
//mongoDB pw: 

//Config
const app = express();

const port = process.env.port || 8001;
const connectionUrl = "mongodb+srv://admin:<password>@cluster0.w8g0v.mongodb.net/groupupdb?retryWrites=true&w=majority"

app.use(express.json());
app.use(Cors());

mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//API Endpoints

//Bruker mongoose schema (se dbUser, bare en mal for objektene)
//Bruker create, find, o.l for å legge data inn eller å hente data fra MongoDB

//Post for single user
app.post("/groupup/user", (req, res) => {
    const dbUser = req.body;
    Users.create(dbUser, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
})

//Get all users
app.get("/groupup/users", (req, res) => {
    Users.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});


//Get user by username specified as param
app.get("/groupup/user", (req, res) => {
    Users.findOne({username: req.query.username}, function (err, user) {
        if (err) {
            res.status(500).send(err);
        } else if (user) {
            res.status(200).send(user);
        }
    });
});

app.listen(port, () => console.log(`listening on localhost: ${port}`));
