require("dotenv/config");
require("./db");

const path = require("path");
const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");

const { authRouter } = require("./routes/auth");
const { userRouter } = require("./routes/users");
const { eventRouter } = require("./routes/events");
const { categoriesRouter } = require("./routes/categories");
const { bookingRouter } = require("./routes/booking");

const { errorHandler } = require("./middlewares/errorHandler");

const app = express();
const port = process.env.PORT || 3001;
app.use(express.json({ limit: "10mb" }));

app.use(express.static(path.resolve(__dirname, "..", "frontend", "build")));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRouter);

app.use("/events", eventRouter);
app.use("/categories", categoriesRouter);
app.use("/booking", bookingRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running`);
});
