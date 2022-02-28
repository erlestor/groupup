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
  const id = req.body._id

  Groups.findById(id, function (err, group) {
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
      Groups.findOneAndUpdate(
        { _id: req.body.groupId },
        { $addToSet: { members: user.email } },
        (err, data) => {
          if (err) res.status(500).send(err)
          else res.status(200).send(data)
        }
      )
    } else {
      res.status(404).send("user does not exist")
    }
  })
})

//DELETE bruker på email
app.delete("/deleteUser", (req, res) => {
  Users.findOneAndDelete({ email: req.body.email }, (err, data) => {
    if (data) {
      if (err) res.status(500).send(err)
      else res.status(200).send("User was deleted.")
    } else {
      res.status(404).send("User does not exist and therefore wasnt deleted")
    }
  })
})

//DELETE group på group id
app.delete("/deleteGroup", (req, res) => {
  Groups.findByIdAndDelete(req.body._id, (err, data) => {
    if (data) {
      if (err) res.status(500).send(err)
      else res.status(200).send("Group was deleted.")
    } else {
      res.status(404).send("Group does not exist and therefore wasnt deleted")
    }
  })
})

/*body vil se slik ut

body = {
  _id: "6214d63e73c69506cef4c790",
  updatedInfo: {
    name: "Updated name",
    interests: ["Klatring"],
    description: "Desc",
    date: "YYYY-MM-DD",
    location: "Viken",
    image: "imageUrl"
  }
}

*/
app.put("/editGroup", (req, res) => {
  //Dette gjør at adminEmail ikke overskrives dersom ny adminEmail blir passa inn i body
  //Kan være vi vil gjøre at admin for gruppe skal endres, da må vi gjøre om her
  if (req.body.adminEmail) {
    delete req.body.adminEmail
  }
  //Håndtering av sletting/invitering av gruppemedlemmer skjer ikke i edit group details
  //Hvis det skal det må dette endres
  if (req.body.members) {
    delete req.body.members
  }

  Groups.findByIdAndUpdate(req.body._id, req.body, (err, data) => {
    if (err) {
      res.status(500).send("Internal server error.")
      return
    }

    if (data) {
      res.status(200).send("Group was updated.")
    } else {
      res.status(404).send("No group with that id.")
    }
  })
})

// body vil se slik ut
//{
//  groupId: insertGroupToRemoveMemberFromIdHere,
//  adminEmail: "groupAdmin@email.no",
//  userEmail: "userToBeRemovedFromGroup@mail.no"
//}
app.put("/removeMember", (req, res) => {
  if (req.body.adminEmail === req.body.userEmail) {
    res.status(400).send("Cannot remove admin from group.")
    return
  }
  Users.findOne({ email: req.body.userEmail }, (err, user) => {
    if (err) res.status(500).send("Internal server error.")
    // user er brukeren som skal fjernes fra gruppen
    if (user) {
      Groups.findByIdAndUpdate(
        req.body.groupId,
        { $pull: { members: user.email } },
        (err, group) => {
          if (err) {
            res.status(500).send(err)
          } else {
            res.status(200).send(group)
          }
        }
      )
    } else {
      res.status(404).send("user does not exist")
    }
  })
})

app.listen(port, () => console.log(`listening on localhost: ${port}`))
