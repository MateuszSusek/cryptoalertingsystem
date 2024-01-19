const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const mysql = require("mysql");
const axios = require("axios");
const nodemailer = require("nodemailer");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root", // replace with your MySQL username
  password: "", // replace with your MySQL password
  database: "inzynierka",
  port: 3306,
});

conn.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL database:", error);
    return;
  }
  console.log("Connected to the MySQL server.");
});

app.use(cors());

app.all("/", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

const fetchPriceAndVolume = async (symbol, token_id) => {
  try {
    const priceResponse = await axios.get(
      `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`
    );
    const response = await axios.get(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1m`
    );
    const price = priceResponse.data.price;
    const currentVolume = parseFloat(response.data[0][5]);
    insertData(symbol, token_id, price, currentVolume);
  } catch (error) {
    console.error(
      `Błąd podczas pobierania ceny i wolumenu ${symbol}: ${error}`
    );
  }
};

const insertData = (symbol, token_id, price, currentVolume) => {
  // Przygotowanie zapytania SQL dla ceny
  const sqlPrice =
    "INSERT INTO price_history (token_id, exchange_id, timestamp, price) VALUES (?, ?, ?, ?)";
  const valuesPrice = [token_id, 1, new Date(), price];

  // Przygotowanie zapytania SQL dla wolumenu
  const sqlVolume =
    "INSERT INTO volume_history (token_id, exchange_id, timestamp, volume) VALUES (?, ?, ?, ?)";
  const valuesVolume = [token_id, 1, new Date(), currentVolume];

  // Wykonanie zapytania SQL
  conn.query(sqlPrice, valuesPrice, (err, result) => {
    if (err) throw err;
    console.log(`Dodano cenę ${symbol} do bazy danych`);
  });

  conn.query(sqlVolume, valuesVolume, (err, result) => {
    if (err) throw err;
    console.log(`Dodano wolumen ${symbol} do bazy danych`);
  });
};

const assets = [
  { symbol: "BTC", token_id: 1 },
  { symbol: "ETH", token_id: 2 },
  { symbol: "XRP", token_id: 3 },
];

setInterval(() => {
  assets.forEach((asset) => fetchPriceAndVolume(asset.symbol, asset.token_id));
}, 10000);

const fetchMarketCap = async (symbol, token_id) => {
  try {
    const response = await axios.get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": "43aa1a79-4048-4807-9c03-a06d462f81b8",
        },
      }
    );
    const marketCap = response.data.data[symbol].quote.USD.market_cap;
    insertMarketCapData2(token_id, marketCap);
  } catch (error) {
    console.error(
      `Błąd podczas pobierania kapitalizacji rynkowej ${symbol}: ${error}`
    );
  }
};

const insertMarketCapData2 = (token_id, marketCap) => {
  const sqlMarketCap =
    "INSERT INTO marketcap_history (token_id, value, timestamp) VALUES (?, ?, ?)";
  const valuesMarketCap = [token_id, marketCap, new Date()];

  conn.query(sqlMarketCap, valuesMarketCap, (err, result) => {
    if (err) throw err;
    console.log(`Dodano kapitalizację rynkową do bazy danych`);
  });
};

const assets2 = [
  { symbol: "BTC", token_id: 1 },
  { symbol: "ETH", token_id: 2 },
  { symbol: "XRP", token_id: 3 },
];

setInterval(() => {
  assets2.forEach((asset) => fetchMarketCap(asset.symbol, asset.token_id));
}, 10000);

app.post("/cena", jsonParser, (req, res) => {
  const daneKlienta = req.body;
  console.log(daneKlienta);

  const sqlCheckUserExists = "SELECT * FROM user WHERE email = ?";
  const valuesCheckUserExists = [daneKlienta.mailAddress];
  conn.query(sqlCheckUserExists, valuesCheckUserExists, (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      // Użytkownik nie istnieje, więc dodaj go do bazy danych
      const sqlInsertUser = "INSERT INTO user (username, email) VALUES (?, ?)";
      const valuesInsertUser = ["user", daneKlienta.mailAddress];

      conn.query(sqlInsertUser, valuesInsertUser, (err, result) => {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);

        const sql2 =
          "INSERT INTO price_alert (user_id, token_id, exchange_id, declared_price, up_down) SELECT user_id, ?, ?, ?, ? FROM user WHERE email = ? LIMIT 1;";
        const values2 = [
          daneKlienta.currency,
          1,
          daneKlienta.declaredPrice,
          daneKlienta.up_down,
          daneKlienta.mailAddress,
        ];
        conn.query(sql2, values2, (err, result) => {
          if (err) throw err;
          console.log("Number of records inserted: " + result.affectedRows);
          res.sendStatus(200);
        });
      });
    } else {
      const sql2 =
        "INSERT INTO price_alert (user_id, token_id, exchange_id, declared_price, up_down) SELECT user_id, ?, ?, ?, ? FROM user WHERE email = ? LIMIT 1;";
      const values2 = [
        daneKlienta.currency,
        1,
        daneKlienta.declaredPrice,
        daneKlienta.up_down,
        daneKlienta.mailAddress,
      ];
      conn.query(sql2, values2, (err, result) => {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        res.sendStatus(200);
      });
      console.log("Użytkownik już istnieje");
    }
  });
});

app.post("/kapitalizacja", jsonParser, (req, res) => {
  const daneKlienta = req.body;
  console.log(daneKlienta);

  const sqlCheckUserExists = "SELECT * FROM user WHERE email = ?";
  const valuesCheckUserExists = [daneKlienta.mailAddress];
  conn.query(sqlCheckUserExists, valuesCheckUserExists, (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      // Użytkownik nie istnieje, więc dodaj go do bazy danych
      const sqlInsertUser = "INSERT INTO user (username, email) VALUES (?, ?)";
      const valuesInsertUser = ["user", daneKlienta.mailAddress];

      conn.query(sqlInsertUser, valuesInsertUser, (err, result) => {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);

        const sql2 =
          "INSERT INTO marketcap_alert (user_id, token_id, declared_value, up_down) SELECT user_id, ?, ?, ? FROM user WHERE email = ? LIMIT 1;";
        const values2 = [
          daneKlienta.currency,
          daneKlienta.declaredValue,
          daneKlienta.up_down,
          daneKlienta.mailAddress,
        ];
        conn.query(sql2, values2, (err, result) => {
          if (err) throw err;
          console.log("Number of records inserted: " + result.affectedRows);
          return res.sendStatus(200);
        });
      });
    } else {
      const sql2 =
        "INSERT INTO marketcap_alert (user_id, token_id, declared_value, up_down) SELECT user_id, ?, ?, ? FROM user WHERE email = ? LIMIT 1;";
      const values3 = [
        daneKlienta.currency,
        daneKlienta.declaredValue,
        daneKlienta.up_down,
        daneKlienta.mailAddress,
      ];
      conn.query(sql2, values3, (err, result) => {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        console.log("Użytkownik już istnieje");
        return res.sendStatus(200);
      });
    }
  });
});

app.post("/procent", jsonParser, (req, res) => {
  const daneKlienta = req.body;
  console.log(daneKlienta);

  const sqlCheckUserExists = "SELECT * FROM user WHERE email = ?";
  const valuesCheckUserExists = [daneKlienta.mailAddress];
  conn.query(sqlCheckUserExists, valuesCheckUserExists, (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      // Użytkownik nie istnieje, więc dodaj go do bazy danych
      const sqlInsertUser = "INSERT INTO user (username, email) VALUES (?, ?)";
      const valuesInsertUser = ["user", daneKlienta.mailAddress];

      conn.query(sqlInsertUser, valuesInsertUser, (err, result) => {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);

        const sql2 =
          "INSERT INTO percentage_alert (user_id, token_id, exchange_id, declared_percentage,declared_time, up_down) SELECT user_id, ?, ?, ?, ?, ? FROM user WHERE email = ? LIMIT 1;";
        const values2 = [
          daneKlienta.currency,
          1,
          daneKlienta.declaredPercentage,
          daneKlienta.declaredTime,
          daneKlienta.up_down,
          daneKlienta.mailAddress,
        ];
        conn.query(sql2, values2, (err, result) => {
          if (err) throw err;
          console.log("Number of records inserted: " + result.affectedRows);
          return res.sendStatus(200);
        });
      });
    } else {
      const sql2 =
        "INSERT INTO percentage_alert (user_id, token_id, exchange_id, declared_percentage,declared_time, up_down) SELECT user_id, ?, ?, ?, ?, ? FROM user WHERE email = ? LIMIT 1;";
      const values3 = [
        daneKlienta.currency,
        1,
        daneKlienta.declaredPercentage,
        daneKlienta.declaredTime,
        daneKlienta.up_down,
        daneKlienta.mailAddress,
      ];
      conn.query(sql2, values3, (err, result) => {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        console.log("Użytkownik już istnieje");
        return res.sendStatus(200);
      });
    }
  });
});

app.post("/wolumen", jsonParser, (req, res) => {
  const daneKlienta = req.body;
  console.log(daneKlienta);

  const sqlCheckUserExists = "SELECT * FROM user WHERE email = ?";
  const valuesCheckUserExists = [daneKlienta.mailAddress];
  conn.query(sqlCheckUserExists, valuesCheckUserExists, (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      // Użytkownik nie istnieje, więc dodaj go do bazy danych
      const sqlInsertUser = "INSERT INTO user (username, email) VALUES (?, ?)";
      const valuesInsertUser = ["user", daneKlienta.mailAddress];

      conn.query(sqlInsertUser, valuesInsertUser, (err, result) => {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);

        const sql2 =
          "INSERT INTO volume_alert (user_id, token_id, exchange_id, multiplier, declared_time) SELECT user_id, ?, ?, ?, ? FROM user WHERE email = ? LIMIT 1;";
        const values2 = [
          daneKlienta.currency,
          1,
          daneKlienta.multiplier,
          daneKlienta.declaredTime,
          daneKlienta.mailAddress,
        ];
        conn.query(sql2, values2, (err, result) => {
          if (err) throw err;
          console.log("Number of records inserted: " + result.affectedRows);
          return res.sendStatus(200);
        });
      });
    } else {
      const sql2 =
        "INSERT INTO volume_alert (user_id, token_id, exchange_id, multiplier, declared_time) SELECT user_id, ?, ?, ?, ? FROM user WHERE email = ? LIMIT 1;";
      const values3 = [
        daneKlienta.currency,
        1,
        daneKlienta.multiplier,
        daneKlienta.declaredTime,
        daneKlienta.mailAddress,
      ];
      conn.query(sql2, values3, (err, result) => {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        console.log("Użytkownik już istnieje");
        return res.sendStatus(200);
      });
    }
  });
});

let fetchedRecords = [];

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "cryptoalertingsystem@gmail.com",
    pass: "wyzb bbmn ngam mvdg",
  },
});

setInterval(() => {
  conn.query(
    "SELECT wyniki.wynik, user.email FROM wyniki JOIN user ON wyniki.user_id = user.user_id",
    (err, rows) => {
      if (err) throw err;
      rows.forEach((row) => {
        const recordKey = `${row.wynik}-${row.user_id}`;
        if (!fetchedRecords.includes(recordKey)) {
          console.log(`Wynik: ${row.wynik}, Email: ${row.email}`);
          const mailOptions = {
            from: "CASS",
            to: row.email,
            subject: "CAS wynik",
            text: `Twój wynik to: ${row.wynik}`,
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
          fetchedRecords.push(recordKey);
        } else {
          console.log(`Ten rekord już został pobrany.`);
        }
      });
    }
  );
}, 5000);

//nie wiem jak ogarnac phpmyadmin z nodejsem xD, jak skoncze pisac inzynierke moja to ci pomoge z tym
app.listen(8000, () => {
  console.log("App is running on port 8000");
});
