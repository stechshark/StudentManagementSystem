import express from 'express'
import dotenv from 'dotenv'
import cors from "cors";
import path from "path";
import { connectDB } from "./config/db.js";

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()
const __dirname = path.resolve();

app.get('/', (req,res)=>{
    res.send('Hello from server home slash route ')
})

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
    if(process.env.NODE_ENV === "production") job.start();
  });
});
