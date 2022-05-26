const  express = require('express');
const cors = require('cors');
const usersRouter = require(  "./routes/users");
const postRouter = require('./routes/posts')
const app = express();
const port = 3000;

app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true,}));


const apiVersion = "/api/1.0"
app.use(apiVersion + "/users", usersRouter);
app.use(apiVersion + "/posts", postRouter)

app.get("/", (req , res ) => {
  res.json({ message: "ok" });
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});



