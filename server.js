const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes");
const blogRoutes = require("./routes/blogRoutes");
const collaborationRoutes = require("./routes/collaborationRoutes");
const issuesRoute = require("./routes/issuesRoutes");
const contactRoute = require("./routes/contactRoute");
const path = require("path");
dotenv.config();
connectDB();
// rest objects
const app = express();

// middlwares

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

// Replace with your exact frontend domain
const allowedOrigin = "https://www.pratikjojodewebworks.com";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/skills", skillRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/collaboration", collaborationRoutes);
app.use("/api/v1/issues", issuesRoute);
app.use("/api/v1/contact", contactRoute);

// routes
app.get("/", (req, res) => {
  res.status(200).send({
    message: "Server is Running",
  });
});

// server
const PORT = process.env.PORT || 8080;
const MODE = process.env.DEV_MODE || "development";
app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT} and mode is ${MODE}`.bgBlack.yellow
  );
});
