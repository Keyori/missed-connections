const  express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const usersRouter = require(  "./routes/users");
const postRouter = require('./routes/posts')
const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true,}));


const apiVersion = "/api/1.0"
app.use(apiVersion + "/users", usersRouter);
app.use(apiVersion + "/posts", postRouter)

app.get("/", (req , res ) => {
  // res.send('<h4 style="margin: 25vh;text-align:center;font-family:sans-serif">missed connections 🚀😡🌑</h4>')
  res.send({ "predictions": [ { "description": "Busch Faculty Dining Hall, Rutgers–New Brunswick, Bartholomew Road, Piscataway, NJ, USA", "matched_substrings": [ { "length": 25, "offset": 0 } ], "place_id": "ChIJiVrwZQvHw4kR2WXOmK3pXBo", "reference": "ChIJiVrwZQvHw4kR2WXOmK3pXBo", "structured_formatting": { "main_text": "Busch Faculty Dining Hall", "main_text_matched_substrings": [ { "length": 25, "offset": 0 } ], "secondary_text": "Rutgers–New Brunswick, Bartholomew Road, Piscataway, NJ, USA" }, "terms": [ { "offset": 0, "value": "Busch Faculty Dining Hall" }, { "offset": 27, "value": "Rutgers–New Brunswick" }, { "offset": 50, "value": "Bartholomew Road" }, { "offset": 68, "value": "Piscataway" }, { "offset": 80, "value": "NJ" }, { "offset": 84, "value": "USA" } ], "types": [ "restaurant", "food", "point_of_interest", "establishment" ] }, { "description": "Michael Digaetano, Busch Campus, Hoes Lane West, Piscataway, NJ, USA", "matched_substrings": [ { "length": 2, "offset": 8 }, { "length": 5, "offset": 19 } ], "place_id": "ChIJyTxwZBPHw4kRrkahm-q6M8A", "reference": "ChIJyTxwZBPHw4kRrkahm-q6M8A", "structured_formatting": { "main_text": "Michael Digaetano", "main_text_matched_substrings": [ { "length": 2, "offset": 8 } ], "secondary_text": "Busch Campus, Hoes Lane West, Piscataway, NJ, USA", "secondary_text_matched_substrings": [ { "length": 5, "offset": 0 } ] }, "terms": [ { "offset": 0, "value": "Michael Digaetano" }, { "offset": 19, "value": "Busch Campus" }, { "offset": 33, "value": "Hoes Lane West" }, { "offset": 49, "value": "Piscataway" }, { "offset": 61, "value": "NJ" }, { "offset": 65, "value": "USA" } ], "types": [ "health", "university", "university", "point_of_interest", "establishment" ] }, { "description": "Division of Life Sciences, Busch Campus, Piscataway, NJ, USA", "matched_substrings": [ { "length": 2, "offset": 0 }, { "length": 5, "offset": 27 } ], "place_id": "ChIJSfv1c1TGw4kR5rMAJMJS0s0", "reference": "ChIJSfv1c1TGw4kR5rMAJMJS0s0", "structured_formatting": { "main_text": "Division of Life Sciences", "main_text_matched_substrings": [ { "length": 2, "offset": 0 } ], "secondary_text": "Busch Campus, Piscataway, NJ, USA", "secondary_text_matched_substrings": [ { "length": 5, "offset": 0 } ] }, "terms": [ { "offset": 0, "value": "Division of Life Sciences" }, { "offset": 27, "value": "Busch Campus" }, { "offset": 41, "value": "Piscataway" }, { "offset": 53, "value": "NJ" }, { "offset": 57, "value": "USA" } ], "types": [ "university", "point_of_interest", "establishment" ] }, { "description": "Anheuser-Busch U.S. Corporate Office, West 24th Street, New York, NY, USA", "matched_substrings": [ { "length": 5, "offset": 9 }, { "length": 8, "offset": 56 } ], "place_id": "ChIJzfGm36RZwokRTUuScydpYmU", "reference": "ChIJzfGm36RZwokRTUuScydpYmU", "structured_formatting": { "main_text": "Anheuser-Busch U.S. Corporate Office", "main_text_matched_substrings": [ { "length": 5, "offset": 9 } ], "secondary_text": "West 24th Street, New York, NY, USA", "secondary_text_matched_substrings": [ { "length": 8, "offset": 18 } ] }, "terms": [ { "offset": 0, "value": "Anheuser-Busch U.S. Corporate Office" }, { "offset": 38, "value": "West 24th Street" }, { "offset": 56, "value": "New York" }, { "offset": 66, "value": "NY" }, { "offset": 70, "value": "USA" } ], "types": [ "food", "point_of_interest", "establishment" ] }, { "description": "Anheuser-Busch Sales of NJ, Linden Avenue East, Jersey City, NJ, USA", "matched_substrings": [ { "length": 5, "offset": 9 }, { "length": 11, "offset": 48 } ], "place_id": "ChIJNxcyuKlRwokRcnVDTB20y74", "reference": "ChIJNxcyuKlRwokRcnVDTB20y74", "structured_formatting": { "main_text": "Anheuser-Busch Sales of NJ", "main_text_matched_substrings": [ { "length": 5, "offset": 9 } ], "secondary_text": "Linden Avenue East, Jersey City, NJ, USA", "secondary_text_matched_substrings": [ { "length": 11, "offset": 20 } ] }, "terms": [ { "offset": 0, "value": "Anheuser-Busch Sales of NJ" }, { "offset": 28, "value": "Linden Avenue East" }, { "offset": 48, "value": "Jersey City" }, { "offset": 61, "value": "NJ" }, { "offset": 65, "value": "USA" } ], "types": [ "point_of_interest", "establishment" ] } ], "status": "OK" })
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});



