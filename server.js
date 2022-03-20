const express = require("express");
require("dotenv").config();
var cors = require('cors')

// console.log();
// const ejs = require('ejs');

// routes
const routes = require("./routes/routes");
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

const bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cors())


// app.use(express.json());
// app.use(express.static("public"));
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'ejs');

app.get('/', function (req, res) {

  // console.log(req.params.token_id)
  return res.send({ success: true, message: "Welcome to holon" });
});

app.get('/test', function (req, res) {

  // console.log(req.params.token_id)
  return res.send({ success: true });
});

app.use("/api", routes);



// // Render index.ejs file
// app.get('/image/:token_id', function (req, res) {

//   const tokenId = req.params.token_id;


//   // Render page using renderFile method
//   ejs.renderFile('./views/indexx.ejs', {}, 
//       {}, function (err, template) {
//       if (err) {
//         console.log("----------------------------------e1: ", err)
//           throw err;
//       } else {

//         let result = template.replace('$TOKEN_HASH', "0x12w4tre22222222222234tr32222tr3rt")
//         console.log("--------------------------c1: ", result)
//           res.end(result);
//       }
//   });
// });

const listener = app.listen(PORT, () =>
  console.log(`Hello world app listening on port ${listener.address().port}!`)
);
