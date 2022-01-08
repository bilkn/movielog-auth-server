require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { AuthRouter } = require("./routes");
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 15,
});

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(limiter);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

app.get("/", (req, res) => {
  res.status(200).send({ success: true, message: "Succesful!" });
});

app.use("/auth", AuthRouter);
