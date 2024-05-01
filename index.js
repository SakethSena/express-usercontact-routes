const express = require("express");
const connectDb = require("../config/db");
const app = express();
<<<<<<< HEAD
=======
const middleware = require("../middleware/errorHandler")
const dotenv = require("dotenv").config();
>>>>>>> bd5f013 (backend)

connectDb();
app.use(express.json());

const port = process.env.PORT || 5000;


<<<<<<< HEAD
=======
app.use("/api/user", userRouter);
app.use("/api/contact", contactRouter);
app.use(errorHandler);


>>>>>>> bd5f013 (backend)
app.listen(port, () => {
    console.log(`Port listening at ${port}`);
});

