import React, { useRef } from "react";
import axios from "axios";
import "./Cena.css";
export const Cena = () => {
  const mailAddress = useRef(null);
  const currency = useRef(null);
  const up_down = useRef(null);
  const declaredPrice = useRef(null);
  const handleSubmit = () => {
    const payload = {
      mailAddress: mailAddress.current.value,
      currency: currency.current.value,
      up_down: up_down.current.value,
      declaredPrice: declaredPrice.current.value,
    };
    axios
      .post("//localhost:8000/cena", payload)
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
        <h1>Sygnał cenowy</h1>
        <h6>
          Zostań powiadomiony kiedy cena wzrośnie powyżej lub spadnie poniżej
          progu cenowego.
        </h6>
        <form>
          <span>Wyślij mi maila na adres </span>
          <input
            type="text"
            id="inputField"
            name="inputField"
            placeholder="przykładowy@mail.test"
            ref={mailAddress}
          ></input>
          <span> jak tylko cena</span>
          <select id="wybor" name="wybor" ref={currency}>
            <option value="1">BTC</option>
            <option value="2">ETH</option>
            <option value="3">XRP</option>
          </select>
          <select id="wybor" name="wybor" ref={up_down}>
            <option value="up">Wzrośnie powyżej</option>
            <option value="down">Spadnie poniżej</option>
          </select>
          <input
            type="text"
            id="inputField"
            name="inputField"
            placeholder="20000"
            ref={declaredPrice}
          ></input>
          <span> dolarów </span>
          <button type="button" onClick={handleSubmit}>
            Ustaw alert
          </button>
        </form>
      </div>
      <div className="right-section">
        <h1>Informacje</h1>
        <h4>
          Zdeklaruj sposób komunikacji, aktywo, warunki sygnału i zatwierdź, aby
          zostać powiadomionym kiedy wybrane przez Ciebie aktywo osiągnie
          wskazany próg cenowy.
        </h4>
      </div>
    </section>
  );
};
