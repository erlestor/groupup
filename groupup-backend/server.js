import mongoose from "mongoose"
import express from "express"
import Cors from "cors"
import Users from "./schemas/dbUser.js"
import Groups from "./schemas/dbGroup.js"
import bodyparser from "body-parser"
//mongoDB pw:

//Config
const app = express()

const port = process.env.port || 8001
const connectionUrl =
  "mongodb+srv://admin:Ja5kj02gFMoamDUf@cluster0.s0siz.mongodb.net/groupupdb?retryWrites=true&w=majority"

app.use(express.json())
app.use(Cors())
app.use(bodyparser.json())

mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

//API Endpoints

//Post for single user - register
app.post("/register", (req, res) => {
  const dbUser = req.body

  Users.findOne({ email: req.body.email }, function (err, user) {
    if (user) {
      res.status(400).send("This user already exists.")
    } else {
      Users.create(dbUser, (err, data) => {
        if (err) {
          res.status(500).send(err)
        } else {
          res.status(200).send(data)
        }
      })
    }
  })
})

//Check for if user by that username is already registered in database
app.get("/userByName", (req, res) => {
  Users.findOne({ email: req.query.email }, function (err, user) {
    if (err) {
      res.status(500).send(err)
    } else if (user) {
      res.status(400).send("This user already exists.")
    }
  })
})

//Get all users
app.get("/users", (req, res) => {
  Users.find((err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  })
})

//Login
//Check that user is in database and entered password is correct
app.post("/login", (req, res) => {
  Users.findOne(
    { email: req.body.email, password: req.body.password },
    function (err, user) {
      if (err) {
        res.status(500).send(err)
      }
      if (user) {
        res.status(200).send(user)
      } else {
        res.status(404).send("Wrong username or password.")
      }
    }
  )
})

// gets all groups
app.get("/groups", (req, res) => {
  Groups.find((err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  })
})

app.get("/getGroup", (req, res) => {
  console.log("fuck d her da")
  const id = req.body.id

  Groups.findOne({ _id: id }, function (err, group) {
    if (err) {
      res.status(500).send(err)
    }
    if (group) {
      res.status(200).send(group)
    } else {
      res.status(404).send("No group with that id.")
    }
  })
})

// oppretter gruppe. sjekker at adminEmail er gyldig
app.post("/createGroup", (req, res) => {
  const dbGroup = req.body
  dbGroup.members = [req.body.adminEmail]

  Users.findOne({ email: req.body.adminEmail }, function (err, user) {
    if (user) {
      let age = dateToAge(user.birthDate)
      dbGroup.ageSpan = [age, age]
      // dette betyr at adminEmail er gyldig
      Groups.create(dbGroup, (err, data) => {
        if (err) {
          res.status(500).send(err)
        } else {
          res.status(200).send(data)
        }
      })
    } else {
      res.status(404).send("admin does not exist")
    }
  })
})

// body vil se slik ut: {userEmail: "some@email.no", groupId: "1231232132"}
app.put("/addUserToGroup", (req, res) => {
  Users.findOne({ email: req.body.userEmail }, function (err, user) {
    // user er brukeren som skal leggges til i gruppen
    if (user) {

      const userAge = dateToAge(user.birthDate)
      let updatedAgeSpan;
      
      Groups.findOne({_id: req.body.groupId}, (err, group) => {
        if (err) {
          res.status(500).send(err)
        }
        else {
          updatedAgeSpan = group["ageSpan"]

          if (parseInt(updatedAgeSpan[0]) > userAge) {
            updatedAgeSpan[0] = userAge
          }
    
          if (parseInt(updatedAgeSpan[1]) < userAge) {
            updatedAgeSpan[1] = userAge
          }

          Groups.findOneAndUpdate(
            { _id: req.body.groupId },
            {
              $addToSet: { members: user.email },
              $set: {ageSpan: updatedAgeSpan}
            },
            (err, data) => {
              if (err) res.status(500).send(err)
              else {
                res.status(200).send("Group was created.")
              }
            }
          )
        }
      })

      
    } else {
      res.status(404).send("user does not exist")
    }
  })
})

const dateToAge = (birthDate) => {
  const thisYear = new Date().getFullYear()
  const year = thisYear - parseInt(birthDate.split("-")[0])
  return year;
}

app.listen(port, () => console.log(`listening on localhost: ${port}`))
