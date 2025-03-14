const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('common'));

app.use(express.static('public'));


const top10Movies = [
  {
    title: 'The Shawshank Redemption',
    director: 'Frank Darabont',
    year: 1994,
  },
  {
    title: 'The Godfather',
    director: 'Francis Ford Coppola',
    year: 1972,
  },
  {
    title: 'The Dark Knight',
    director: 'Christopher Nolan',
    year: 2008,
  },
  {
    title: 'Drive',
    director: 'Nicolas Winding Refn',
    year: 2011,
  },
  {
    title: 'Annihilation',
    director: 'Alex Garland',
    year: 2018,
  },
  {
    title: 'The Lord of the Rings: The Return of the King',
    director: 'Peter Jackson',
    year: 2003,
  },
  {
    title: 'Pulp Fiction',
    director: 'Quentin Tarantino',
    year: 1994,
  },
  {
    title: 'The Good, the Bad and the Ugly',
    director: 'Sergio Leone',
    year: 1966,
  },
  {
    title: 'Fight Club',
    director: 'David Fincher',
    year: 1999,
  },
  {
    title: 'Forrest Gump',
    director: 'Robert Zemeckis',
    year: 1994,
  },
];

app.get('/movies', (req, res) => {
  res.json(top10Movies);
});

app.get('/', (req, res) => {
    res.send('Welcome to my Movie API'); //customise msg
  });

  app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).send('Something went wrong!'); 
  });

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});