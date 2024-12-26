import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
import pg from "pg";
// import bcrypt from "bcrypt";
// import passport from "passport";
// import { Strategy } from "passport-local";
// import GoogleStrategy from "passport-google-oauth2";
// import session from "express-session";
import env from "dotenv";


const app = express();
const port = 3000;
const corsOptions = {
    origin: "http://localhost:5173"
  };

env.config();

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json()); // Handles JSON data




const db = new pg.Client({
  user:"postgres",//process.env.PG_USER,
  host:"localhost",// process.env.PG_HOST,
  database: "stockproject",//process.env.PG_DATABASE,
  password:"postgresjai",// process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect();


function getTodaysDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}


var data = {"investmentValue": 11000.00, "portfolioValue": 16650.44, "profitLoss": 4650.44};
const portfolio =[
  {id: 1,stockSymbol: 'AAPL',stockQty: 10,buyPrice: 150.00,date: '2023-11-01'},
  {id: 2,stockSymbol: 'TSLA',stockQty: 5, buyPrice: 200.00,date: '2023-10-15'},
  {id: 3,stockSymbol: 'GOOGL',stockQty: 8,buyPrice: 110.00,date: '2023-09-25'},
  {id: 4,stockSymbol: 'MSFT',stockQty: 12,buyPrice: 280.00,date: '2023-07-18'},
  {id: 5,stockSymbol: 'AMZN',stockQty: 6,buyPrice: 2500.00,date: '2023-08-10'}];

app.get("/home", (req, res) => {
 res.json(data);
});

app.get("/portfolio", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM portfolios");
    //console.log(result.rows); // Debug logging
    res.json(result.rows); // Adjust based on your DB library
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    res.status(500).json({ error: "Failed to fetch portfolios" });
  }
 });


 app.post("/buy", async (req, res) => {
  const { symbol, price, shares, action } = req.body;
  const date = getTodaysDate()
  if (!symbol || !price || !shares || !action) {
    return res.status(400).send({ error: 'Invalid request data' });
  }

  try {
    const query = `
      INSERT INTO portfolios (portfolio_id, user_id, stock, quantity, buy_price, date)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const result = await db.query(query, [14,15, symbol, shares, price, date]);

    res.status(200).send({ message: 'Trade successful', trade: result.rows[0] });
  } catch (error) {
    console.error("Error saving trade:", error);
    res.status(500).send({ error: 'Failed to save trade' });
  }
});

app.post("/sell", async (req, res) => {
  const { symbol, price, shares, action } = req.body;
  if (!symbol || !price || !shares || !action) {
    return res.status(400).send({ error: 'Invalid request data' });
  }
  try {
    const result1 = await db.query("SELECT quantity FROM portfolios WHERE stock = $1", [symbol]);
    const ownedShares = result1.rows[0].quantity;
    if ((ownedShares - shares) > 0) {
      const result = db.query("UPDATE portfolios SET quantity = $1 WHERE stock = $2", [ownedShares - shares, symbol]);
    } else {
      const result = db.query("DELETE FROM portfolios WHERE stock = $2", [ownedShares - shares, symbol]);
    }
    res.status(200).send({ message: 'Trade successful'});
  } catch (error) {
    console.error("Error saving trade:", error);
    res.status(500).send({ error: 'Failed to save trade' });
  }
});


 



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
