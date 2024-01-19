import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import { Cena } from "./components/Cena/Cena";
import { Kapitalizacja } from "./components/Kapitalizacja/Kapitalizacja";
import { Procent } from "./components/Procent/Procent";
import { Wolumen } from "./components/Wolumen/Wolumen";
import { Heatmaps } from "./components/Heatmaps/Heatmaps";
function App() {
  return (
    <div id="main_site">
      <Navbar></Navbar>
      <Cena></Cena>
      <Kapitalizacja></Kapitalizacja>
      <Procent></Procent>
      <Wolumen></Wolumen>
      <Heatmaps></Heatmaps>
      <Footer></Footer>
    </div>
  );
}

export default App;
