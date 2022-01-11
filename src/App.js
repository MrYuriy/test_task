import Map from "./Components/Map";
import Header from "./Components/Navbar.js";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <header className="header">
        <Header />
      </header>
      <Map />
    </div>
  );
}

export default App;
