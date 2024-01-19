import React, { useRef } from "react";
import axios from "axios";
import "./Wolumen.css";
export const Wolumen = () => {
  const mailAddress = useRef(null);
  const currency = useRef(null);
  const multiplier = useRef(null);
  const declaredTime = useRef(null);
  const handleSubmit = () => {
    const payload = {
      mailAddress: mailAddress.current.value,
      currency: currency.current.value,
      multiplier: multiplier.current.value,
      declaredTime: declaredTime.current.value,
    };
    axios
      .post("//localhost:8000/wolumen", payload)
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
        <h1>Sygnał wolumenu</h1>
        <h6>
          Zostań powiadomiony kiedy wolumen aktywa nagle wzrośnie lub spadnie.
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
          <span> jak tylko walumen handlu </span>
          <select id="wybor" name="wybor" ref={currency}>
            <option value="1">BTC</option>
            <option value="2">ETH</option>
            <option value="3">XRP</option>
          </select>
          <span> wzrośnie o </span>
          <select id="wybor" name="wybor" ref={multiplier}>
            <option value="2">2x</option>
            <option value="3">3x </option>
            <option value="5">5x </option>
            <option value="10">10x </option>
            <option value="20">20x </option>
          </select>
          <span> procent w ciągu ostatnich/ej </span>
          <select id="wybor" name="wybor" ref={declaredTime}>
            <option value="5min">5 minut</option>
            <option value="15min">15 minut</option>
            <option value="30min">30 minut</option>
            <option value="1hr">1 godziny</option>
          </select>
          <button type="button" onClick={handleSubmit}>
            Ustaw alert
          </button>
        </form>
      </div>
      <div className="right-section">
        <h1>Informacje</h1>
        <h4>
          Zdeklaruj sposób komunikacji, aktywo, warunki sygnału i zatwierdź, aby
          zostać powiadomionym kiedy wolumen handlu wybranego aktywa nagle
          wzrośnie lub spadnie.
        </h4>
      </div>
    </section>
  );
};
