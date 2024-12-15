import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3000;
const corsOptions = {
    origin: "http://localhost:5173"
  };

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));




app.get("/home", (req, res) => {
 res.json({investmentValue: 10000.00, portfolioValue: 12650.44, profitLoss: 2650.44});
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
