const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

require("./db");

const allowedOrigins = [process.env.FRONTEND_URL]; // Add more origins as needed

app.use(cors());
app.use(bodyParser.json());
app.use(
  cookieParser({
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 7,
    signed: true,
  })
);

const authRoutes = require("./routes/authRoutes");
const classroomRoutes = require("./routes/classroomRoutes");

app.use("/auth", authRoutes);
app.use("/class", classroomRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/getuserdata", (req, res) => {
  res.send("Harshal Jain , 45 , Male");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Mastersgang backend app listening on port ${port}`);
});
