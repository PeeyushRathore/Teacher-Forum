const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

require("./db");

// ✅ Explicitly list allowed origins
const allowedOrigins = [
  "http://localhost:5000", // deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // ✅ required if you use cookies or Authorization headers
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Handle preflight requests
app.options("*", cors());

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
