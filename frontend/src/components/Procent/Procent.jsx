import React, { useRef } from "react";
import axios from "axios";
import "./Procent.css";
export const Procent = () => {
  const mailAddress = useRef(null);
  const currency = useRef(null);
  const up_down = useRef(null);
  const declaredPercentage = useRef(null);
  const declaredTime = useRef(null);
  const handleSubmit = () => {
    const payload = {
      mailAddress: mailAddress.current.value,
      currency: currency.current.value,
      up_down: up_down.current.value,
      declaredPercentage: declaredPercentage.current.value,
      declaredTime: declaredTime.current.value,
    };
    axios
      .post("//localhost:8000/procent", payload)
      .then((res) => {
        if (res.data === 0) {
          alert(`Unknown Server Error`);
        }
      })
      .catch((err) => alert(`Unknown Server Error ${err}`));
  };
  return (
    <section className="main-section">
      <div className="left-section">
        <h1>Sygnał procentowy</h1>
        <h6>
          Zostań powiadomiony kiedy cena aktywa wzrośnie lub spadnie o określoną
          liczbę procent.
        </h6>
        <form>
          <span> Wyślij mi maila na adres </span>
          <input
            type="text"
            id="inputField"
            name="inputField"
            placeholder="przykładowy@mail.test"
            ref={mailAddress}
          ></input>
          <span> jak tylko cena </span>
          <select id="wybor" name="wybor" ref={currency}>
            <option value="1">BTC</option>
            <option value="2">ETH</option>
            <option value="3">XRP</option>
          </select>
          <select id="wybor" name="wybor" ref={up_down}>
            <option value="up">Wzrośnie </option>
            <option value="down">Spadnie </option>
          </select>
          <span> o </span>
          <input
            type="text"
            id="inputField"
            name="inputField"
            placeholder="10"
            ref={declaredPercentage}
          ></input>
          <span> procent w ciągu ostatnich/ej </span>
          <select id="wybor" name="wybor" ref={declaredTime}>
            <option value="5min">5 minut</option>
            <option value="15min">15 minut</option>
            <option value="1hr">1 godziny</option>
            <option value="4hr">4 godzin</option>
            <option value="12hr">12 godzin</option>
            <option value="24hr">24 godzin</option>
          </select>{" "}
          <button type="button" onClick={handleSubmit}>
            Ustaw alert
          </button>
        </form>
      </div>
      <div className="right-section">
        <h1>Informacje</h1>
        <h4>
          Zdeklaruj sposób komunikacji, aktywo, warunki sygnału i zatwierdź, aby
          zostać powiadomionym kiedy wybrane przez Ciebie aktywo wzrośnie lub
          spadnie o określoną liczbę procent.
        </h4>
      </div>
    </section>
  );
};
