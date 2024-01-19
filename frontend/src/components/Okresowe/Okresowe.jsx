import React from "react";
import "./Okresowe.css";
export const Okresowe = () => {
  return (
    <section className="main-section">
      <div className="left-section">
        <h1>Sygnał okresowy</h1>
        <h6>
          Zostań powiadomiony o cenie wybranego aktywa w regularnych odstępach
          czasowych.
        </h6>
        <form>
          <span>Wyślij mi </span>
          <select id="wybor" name="wybor">
            <option value="opcja1">Wiadomość na telegramie</option>
            <option value="opcja2">Opcja 2</option>
            <option value="opcja3">Opcja 3</option>
          </select>{" "}
          <span> co </span>
          <select id="wybor" name="wybor">
            <option value="opcja1">1 godzinę</option>
            <option value="opcja2">12 godzin</option>
            <option value="opcja3">24 godziny</option>
          </select>
          <span> z aktualną ceną </span>
          <select id="wybor" name="wybor">
            <option value="opcja1">BTC</option>
            <option value="opcja2">ETH</option>
          </select>
          <span> na </span>
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
          Zdeklaruj sposób komunikacji, okres czasowy, aktywo, platformę i
          zatwierdź, aby być powiadamianym regualnie o cenie wybranego aktywa.
        </h4>
      </div>
    </section>
  );
};
