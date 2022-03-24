import mongoose from "mongoose"
import express from "express"
import Cors from "cors"
import Users from "./schemas/dbUser.js"
import Groups from "./schemas/dbGroup.js"
import bodyparser from "body-parser"
import Matches from "./schemas/dbMatch.js"
import Reviews from "./schemas/dbReview.js"
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
      let updatedAgeSpan

      Groups.findOne({ _id: req.body.groupId }, (err, group) => {
        if (err) {
          res.status(500).send(err)
        } else {
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
              $set: { ageSpan: updatedAgeSpan },
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

const dateToAge = (birthDate) => {
  const thisYear = new Date().getFullYear()
  const year = thisYear - parseInt(birthDate.split("-")[0])
  return year
}

//Add groupId to another group's likedBy array
/**
 *
 * body = {
 *  groupIdToBeAdded: String,
 *  groupIdToAddTo: String,
 *  superlike: Boolean
 * }
 *
 */
app.put("/matchGroups", (req, res) => {
  if (req.body.groupIdToAddTo === req.body.groupIdToBeAdded) {
    res.status(400).send("Cannot match with self.")
    return
  }
  Groups.find(
    { _id: { $in: [req.body.groupIdToAddTo, req.body.groupIdToBeAdded] } },
    (err, groups) => {
      if (err) {
        res.send(500).status("Internal server error.")
      }
      const groupToBeAdded = groups.filter(
        (g) => g._id === req.body.groupIdToBeAdded
      )[0]

      if (
        groupToBeAdded.likedBy.includes(req.body.groupIdToAddTo) ||
        groupToBeAdded.superLikedBy.includes(req.body.groupIdToAddTo)
      ) {
        Matches.create(
          {
            matcherID: req.body.groupIdToBeAdded,
            matchedID: req.body.groupIdToAddTo,
          },
          (err, data) => {
            if (err) {
              res.status(500).send(err)
            } else {
              Groups.findByIdAndUpdate(
                { _id: req.body.groupIdToBeAdded },
                {
                  $pull: {
                    likedBy: req.body.groupIdToAddTo,
                    superLikedBy: req.body.groupIdToAddTo,
                  },
                },
                (err, data) => {
                  if (err) {
                    res.status(500).send(err)
                  } else {
                    res.status(200).send(data)
                  }
                }
              )
            }
          }
        )
      } else {
        const liked = Boolean(req.body.superLike)
          ? { superLikedBy: req.body.groupIdToBeAdded }
          : { likedBy: req.body.groupIdToBeAdded }
        Groups.findByIdAndUpdate(
          { _id: req.body.groupIdToAddTo },
          { $addToSet: liked },
          (err, data) => {
            if (err) {
              res.status(500).send(err)
            } else {
              res.status(200).send(data)
            }
          }
        )
      }
    }
  )
})

/**
 * Gets all groups that have superliked req.body.groupId
 *
 * body = {
 *    groupId: String
 * }
 *
 */
app.get("/getAllSuperLikedBy", (req, res) => {
  Groups.findById({ _id: req.body.groupId }, (err, group) => {
    if (err) {
      res.status(500).send("Internal server error")
    } else {
      Groups.find({ _id: { $in: group.superLikedBy } }, (err, groups) => {
        if (err) {
          res.status(500).send(err)
        } else {
          res.status(200).send(groups)
        }
      })
    }
  })
})

/**
 * Get all matches for a given group id
 *
 * body = {
 *    groupId: String
 * }
 */

app.post("/getMatchesById", (req, res) => {
  Matches.find(
    { $or: [{ matcherID: req.body.groupId }, { matchedID: req.body.groupId }] },
    (err, matches) => {
      if (err) {
        res.status(500).send("Internal server error.")
      } else {
        res.status(200).send(matches)
      }
    }
  )
})

/**
 * Get groups by list of ids
 *
 * body = {
 *
 *  idList = [id1, id2, ..]
 * }
 */
app.post("/getGroupsByIds", (req, res) => {
  Groups.find({ _id: { $in: req.body.idList } }, (err, groups) => {
    if (err) {
      res.status(500).send("Internal server error. ")
    } else {
      res.status(200).send(groups)
    }
  })
})

app.post("/createReview", (req, res) => {

  if (req.body.reviewerID === req.body.reviewedID) {
    res.status(400).send("Group cannot review itself.")
  }

  const dbReview = req.body;
  Reviews.create(dbReview, (err, data) => {
    if (err) {
      res.status(500).send("Internal server error.")
    } else {
      res.status(200).send(data)
    }
  })

})

app.post("/getReviewsByReviewed", (req, res) => {
  Reviews.find({ReviewedID: req.body.reviewedID}, (err, data) => {
    if (err) {
      res.status(500).send("Internal server error.")
    } else {
      res.status(200).send(data)
    }
  })
})

app.listen(port, () => console.log(`listening on localhost: ${port}`))
