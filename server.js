const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const cors = require("cors");

const ObjectId = mongodb.ObjectId;
const RECIPES_COLLECTION = "recipes";

const app = express();
app.use(bodyParser.json());

const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// database variable outside of the database connection callback to reuse the connection pool in the app
let db;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// connect to the db befor starting the application server
mongodb.MongoClient.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/test",
  options,
  (err, client) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    // save db object from the callback to reuse
    db = client.db();
    console.log("Database connection ready");

    // initialize the app
    const server = app.listen(process.env.PORT || 8080, () => {
      const port = server.address().port;
      console.log(`App now running on port ${port}`);
    });
  }
);

/**
 * RECIPES API ROUTES BELOW
 */

function handleError(res, reason, msg, code) {
  console.log(`ERROR: ${reason}`);
  res.status(code || 500).json({ error: msg });
}

/**
 * "/api/recipes"
 *  GET: find all recipes
 *  POST: create a new recipe
 */

app.get("/api/recipes", (req, res) => {
  db.collection(RECIPES_COLLECTION)
    .find({})
    .toArray((err, doc) => {
      if (err) {
        handleError(res, err.message, "Failed to get recipes");
      } else {
        res.status(200).json(doc);
      }
    });
});

app.post("/api/recipes", (req, res) => {
  const newRecipe = req.body;
  newRecipe.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid name input", "Must provide a name", 400);
  } else {
    db.collection(RECIPES_COLLECTION).insertOne(newRecipe, (err, doc) => {
      if (err) {
        handleError(res, err.message, "Failed to create a new recipe");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

/**
 * "/api/recipes/:id"
 *  GET: find recipe by id
 *  PUT: update recipe by id
 *  DELETE: delete recipe by id
 */

app.get("/api/recipes/:id", (req, res) => {
  db.collection(RECIPES_COLLECTION).findOne(
    { _id: new ObjectId(req.params.id) },
    (err, doc) => {
      if (err) {
        handleError(res, err.message, "Failed to get recipe");
      } else {
        res.status(200).json(doc);
      }
    }
  );
});

app.put("/api/recipes/:id", (req, res) => {
  let updatedDoc = req.body;
  delete updatedDoc._id;

  db.collection(RECIPES_COLLECTION).updateOne(
    { _id: new ObjectId(req.params.id) },
    updatedDoc,
    (err, doc) => {
      if (err) {
        handleError(res, err.message, "Failed to update recipe");
      } else {
        updatedDoc._id = req.params.id;
        res.status(200).json(updatedDoc);
      }
    }
  );
});

app.delete("/api/recipes/:id", (req, res) => {
  db.collection(RECIPES_COLLECTION).deleteOne(
    { _id: new ObjectId(req.params.id) },
    (err, result) => {
      if (err) {
        handleError(res, err.message, "Failed to delete recipe");
      } else {
        res.status(200).json(req.params.id);
      }
    }
  );
});
