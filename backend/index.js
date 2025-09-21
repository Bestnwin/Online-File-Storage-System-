const express = require("express");
const cors = require("cors");
require("dotenv").config();

const studentRoutes = require("./routes/studentRoutes");
const facultyRoutes = require("./routes/facultyRoutes");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Student routes -> /student/*
app.use("/student", studentRoutes);

// Faculty routes -> /faculty/*
app.use("/faculty", facultyRoutes);

app.listen(port, () => {
  console.log(`🚀 Backend running at http://localhost:${port}`);
});
