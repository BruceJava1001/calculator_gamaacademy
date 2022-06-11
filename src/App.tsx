import logo from "./logo.svg";
import "./App.css";
import Calculadora from "./Calculadora";
import swal from 'sweetalert';

(window as any).global = window;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>CRIPTO DEV</h2>
        <h2>Calculator</h2>
        <Calculadora />
      </header>
    </div>
  );
}

export default App;
