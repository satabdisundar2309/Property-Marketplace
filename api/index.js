import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import dotenv from "dotenv";
dotenv.config();
import path from 'path'

const port = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connection successful");
  })
  .catch((e) => {
    console.log("DB Connection failed ", e);
  });

  const __dirname = path.resolve();

const app = express();
app.use(express.json())
app.use(cors())

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/listing', listingRouter)


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });
