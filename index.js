const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
dotenv.config();

const dbConnect = require("./utils/dbConnect");

const app = express();
const PORT = process.env.PORT || 8080;

const {auth} = require("./middlewares/auth.middleware")
const authRoute = require("./routes/auth.route");
const candidateRoute = require("./routes/candidate.route");
const employeeRoute = require("./routes/employee.route");
const attendanceRoute = require("./routes/attendance.route");
const leaveRoute = require("./routes/leave.route");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.status(200).json({
    status: "ok",
    message: "Welcome to API!",
  });
});

app.use("/auth", authRoute);
app.use("/candidate", auth, candidateRoute);
app.use("/employee", auth, employeeRoute);
app.use("/attendance", auth, attendanceRoute);
app.use("/leave", auth, leaveRoute);

app.use((req, res) => {
  return res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
  dbConnect();
});
