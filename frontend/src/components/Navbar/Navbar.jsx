import React from "react";
import "./Navbar.css";
export const Navbar = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <a className="opcje" href="#">
              Alerty
            </a>
            <ul>
              <li>
                <a href="#">Cena</a>
              </li>
              <li>
                <a href="#">Procent</a>
              </li>
              <li>
                <a href="#">Wolumen</a>
              </li>
              <li>
                <a href="#">Kapitalizacja</a>
              </li>
            </ul>
          </li>
          <li>
            <a className="opcje" href="#">
              Informacje
            </a>
            <ul>
              <li>
                <a href="#">Cena gazu ETH</a>
              </li>
              <li>
                <a href="#">Cena gazu BNB</a>
              </li>
            </ul>
          </li>
          <li>
            <a className="opcje" href="#">
              Heatmapy
            </a>
          </li>
        </ul>
      </nav>
      <div id="logo">
        <div id="center-text">
          System analizy i przetwarzania danych statystycznych z rynku
          kryptowalut
        </div>
      </div>
    </header>
  );
};
