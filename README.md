# Bull&Bear: A Stock Portfolio Simulator

# Description
Full-stack web application for tracking stock investments and managing portfolios.

---

## App Screenshots
### Home Page
![Home Page](./screenschots/home.png)

### Portfolio Page
![Portfolio Page](./images/portfolio.png)

### Stock Info Page
![Stock Details](./images/stock.png)

---

# Features
* Real-time stock price tracking via Financial Modeling Prep API
* User authentication and personalized portfolios
* Buy/sell stock functionality
* Portfolio performance and distribution visualization

# Tech Stack
* Frontend: React, Material-UI
* Backend: Express.js, Node.js
* Database: PostgreSQL
* Authentication: Passport.js
* API: Financial Modeling Prep

# Database Setup
```sql
CREATE DATABASE stockproject;

CREATE TABLE users (
    userid SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE portfolios (
    portfolio_id INTEGER PRIMARY KEY,
    user_id INTEGER REFERENCES users(userid),
    stock VARCHAR(10) NOT NULL,
    quantity INTEGER NOT NULL,
    buy_price DECIMAL(10,2) NOT NULL,
    date DATE NOT NULL
);
```

# Installation
1. Clone the repository:
```bash
git clone https://github.com/yourusername/stock-portfolio-tracker.git
cd stock-portfolio-tracker
```

2. Install dependencies:
```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

3. Create .env file in server directory:
```
PG_USER=postgres
PG_HOST=localhost
PG_DATABASE=stockproject
PG_PASSWORD=your_password
PG_PORT=5432
SESSION_SECRET=your_session_secret
FMP_API_KEY=your_financial_modeling_prep_api_key
```

4. Start the application:
```bash
# Backend (from server directory)
npm start

# Frontend (from client directory)
npm run dev
```

# API Endpoints
* POST /register - User registration
* POST /login - User authentication 
* GET /portfolio/:userId - Get user's portfolio
* POST /buy - Purchase stocks
* POST /sell - Sell stocks

# Future Improvements
* Portfolio diversification analysis
* Historical performance tracking
* Mobile responsiveness improvements

# Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

# License
MIT License
