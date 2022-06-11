import useCalc from "./hooks/useCalc";
import "./Calculadora.css";
import swal from "sweetalert";


function Calculadora() {
  const { calcKey, valorTela, resultado } = useCalc();

  return (
    <div className="Calculadora">
        <div className="tela">
          <h2>{valorTela}</h2>
          <h1>{resultado}</h1>
        </div>
        <div className="grid-botoes">
          {calcKey.map((value: any) => (
            <button key={value.digito} type="button" onClick={() => value.fn()}>
              {value.digito}
            </button>
          ))}
        </div>
    </div>
  );
}

export default Calculadora;
