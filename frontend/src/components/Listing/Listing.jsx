import React from "react";
import "./Listing.css";
export const Listing = () => {
  return (
    <section className="main-section">
      <div className="left-section">
        <h1>Sygnał listingu</h1>
        <h6>
          Zostań powiadomiony kiedy na wybranej przez Ciebie platformie zostanie
          dodana kryptowaluta.
        </h6>
        <form>
          <span>Wyślij mi </span>
          <select id="wybor" name="wybor">
            <option value="opcja1">Wiadomość na telegramie</option>
            <option value="opcja2">Opcja 2</option>
            <option value="opcja3">Opcja 3</option>
          </select>{" "}
          <span> jak tylko </span>
          <select id="wybor" name="wybor">
            <option value="opcja1">BTC</option>
            <option value="opcja2">ETH</option>
            <option value="opcja3">Dowolny token</option>
          </select>
          <span> zostanie zlistowany na </span>
          <select id="wybor" name="wybor">
            <option value="opcja1">Binance</option>
            <option value="opcja2">OKX</option>
          </select>
          <button type="submit">Ustaw alert</button>
        </form>
      </div>
      <div className="right-section">
        <h1>Informacje</h1>
        <h4>
          Zdeklaruj sposób komunikacji, aktywo oraz platformę, aby zostać
          powiadomionym kiedy wybrane przez Ciebie aktywo zostanie zlistowane na
          wybranej platformie.
        </h4>
      </div>
    </section>
  );
};
