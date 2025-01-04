import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import session from "express-session";
import env from "dotenv";


const app = express();
const port = 3000;
const saltRounds = 10;
const corsOptions = {
    origin: "http://localhost:5173"
  };


env.config();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json()); // Handles JSON data

app.use(passport.initialize());
app.use(passport.session());




const db = new pg.Client({
  user:process.env.PG_USER,//process.env.PG_USER,
  host:process.env.PG_HOST,// process.env.PG_HOST,
  database: process.env.PG_DATABASE,//process.env.PG_DATABASE,
  password:process.env.PG_PASSWORD,// process.env.PG_PASSWORD,
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

var user_id = -1;

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

 app.get("/portfolio/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await db.query("SELECT * FROM portfolios WHERE user_id = $1", [userId]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    res.status(500).json({ error: "Failed to fetch portfolios" });
  }
});


app.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [username]);
    if (checkResult.rows.length > 0) {
      res.redirect("/login");
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          const result = await db.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",[username, hash]);
          const user = result.rows[0];
          req.login(user, (err) => {
            console.log("success registering");
            res.redirect("/home");
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Authentication error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error("Login error:", err);
        return res.status(500).json({ error: "Failed to log in user" });
      }
      console.log("Login successful, user ", user.userid);
      return res.status(200).json({ message: "Login successful", userId: user.userid });
    });
  })(req, res, next);
});

app.post("/buy", async (req, res) => {
  const {userId, symbol, price, shares, action } = req.body;
  const date = getTodaysDate();

  console.log("AND THE ID IS", userId);

  // Validate all required fields
  if (!symbol || !price || !shares || !action) {
    return res.status(400).send({ 
      error: 'Invalid request data', 
      details: 'All fields (symbol, price, shares, action) are required' 
    });
  }

  try {
    // Generate a unique portfolio_id (you might want to implement your own logic)
    const portfolioId = Math.floor(Math.random() * 100000); // Example generation

    const query = `
      INSERT INTO portfolios (user_id, stock, quantity, buy_price, date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    
    const result = await db.query(query, [
      userId,
      symbol, 
      shares, 
      price, 
      date
    ]);

    res.status(200).send({ 
      message: 'Trade successful', 
      trade: result.rows[0]
    });
  } catch (error) {
    console.error("Error saving trade:", error);
    
    // More detailed error handling
    if (error.code === '23505') { // PostgreSQL unique violation error
      res.status(409).send({ error: 'Duplicate trade entry' });
    } else if (error.code === '23503') { // Foreign key violation
      res.status(400).send({ error: 'Invalid user ID' });
    } else {
      res.status(500).send({ 
        error: 'Failed to save trade',
        details: error.message
      });
    }
  }
});

// server.js - Updated sell endpoint
app.post("/sell", async (req, res) => {
  const { userId, symbol, price, shares, action } = req.body;
  if (!userId || !symbol || !price || !shares || !action) {
    return res.status(400).send({ error: 'Invalid request data' });
  }

  try {
    const result1 = await db.query(
      "SELECT quantity FROM portfolios WHERE stock = $1 AND user_id = $2",
      [symbol, userId]
    );
    
    if (result1.rows.length === 0) {
      return res.status(404).send({ error: 'Stock not found in portfolio' });
    }

    const ownedShares = result1.rows[0].quantity;
    if (shares > ownedShares) {
      return res.status(400).send({ error: 'Not enough shares' });
    }

    if ((ownedShares - shares) > 0) {
      await db.query(
        "UPDATE portfolios SET quantity = $1 WHERE stock = $2 AND user_id = $3",
        [ownedShares - shares, symbol, userId]
      );
    } else {
      await db.query(
        "DELETE FROM portfolios WHERE stock = $1 AND user_id = $2",
        [symbol, userId]
      );
    }
    res.status(200).send({ message: 'Trade successful' });
  } catch (error) {
    console.error("Error saving trade:", error);
    res.status(500).send({ error: 'Failed to save trade' });
  }
});


 
passport.use(
  "local",
  new Strategy(async function verify(username, password, cb) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, async (err, valid) => {
          if (err) {
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            if (valid) {
              console.log("correct password");
              const userdata = await db.query("SELECT userid FROM users WHERE email = $1 ", [username]);
              if (userdata.rows.length > 0) {
                user_id = userdata.rows[0].userid;
                console.log(user_id);
              } else {
                console.log("no user_id");
              }
              return cb(null, user);
            } else {
              console.log("Incorrect password");
              return cb(null, false);
            }
          }
        });
      } else {
        console.log("user not found");
        return cb("User not found");
      }
    } catch (err) {
      console.log(err);
    }
  })
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/secrets",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [
          profile.email,
        ]);
        if (result.rows.length === 0) {
          const newUser = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2)",
            [profile.email, "google"]
          );
          return cb(null, newUser.rows[0]);
        } else {
          return cb(null, result.rows[0]);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
