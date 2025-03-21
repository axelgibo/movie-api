const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("common"));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/myFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const top10Movies = [
  {
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    year: 1994,
  },
  {
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: 1972,
  },
  {
    title: "The Dark Knight",
    director: "Christopher Nolan",
    year: 2008,
  },
  {
    title: "Drive",
    director: "Nicolas Winding Refn",
    year: 2011,
  },
  {
    title: "Annihilation",
    director: "Alex Garland",
    year: 2018,
  },
  {
    title: "The Lord of the Rings: The Return of the King",
    director: "Peter Jackson",
    year: 2003,
  },
  {
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    year: 1994,
  },
  {
    title: "The Good, the Bad and the Ugly",
    director: "Sergio Leone",
    year: 1966,
  },
  {
    title: "Fight Club",
    director: "David Fincher",
    year: 1999,
  },
  {
    title: "Forrest Gump",
    director: "Robert Zemeckis",
    year: 1994,
  },
];

app.get("/movies", (req, res) => {
  Movies.find({})
    .then((movies) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.get("/movies/:title", (req, res) => {
  Movies.findOne({ Title: req.params.title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.get("/genres/:name", (req, res) => {
  Movies.findOne({ "Genre.Name": req.params.name })
    .then((movie) => {
      res.json(movie.Genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.get("/directors/:name", (req, res) => {
  Movies.findOne({ "Director.Name": req.params.name })
    .then((movie) => {
      res.json(movie.Director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.post("/users", (req, res) => {
  Users.create({
    Username: req.body.Username,
    Password: req.body.Password,
    Email: req.body.Email,
    Birthday: req.body.Birthday,
  })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.put("/users/:username", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      },
    },
    { new: true }
  )
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.post("/users/:username/movies/:movieId", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.username },
    { $push: { FavoriteMovies: req.params.movieId } },
    { new: true }
  )
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.delete("/users/:username/movies/:movieId", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.username },
    { $pull: { FavoriteMovies: req.params.movieId } },
    { new: true }
  )
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.delete("/users/:username", (req, res) => {
  Users.findOneAndDelete({ Username: req.params.username })
    .then((user) => {
      res.send(req.params.username + " was deleted.");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
