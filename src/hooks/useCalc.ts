import { swal } from 'sweetalert';
import { react } from '@vitejs/plugin-react';
import {useState} from 'react';
import useEventListener from "@use-it/event-listener";
//Importei minha regra de negocios para useCalc para separar os componentes
const useCalc = () => {
  const [valorTela, setValorTela] = useState("");
  const [resultado, setResultado] = useState("0");
  const [operacao, setOperacao] = useState(false);
  
  //Funções para operar a tela
  const limparTela = () => {
    setOperacao(false);
    setResultado("0");
    setValorTela("");
  };

  const adicionarDigitoNaTela = (digito: string) => {
    if ((digito === "+" || digito === "-" || digito === "*" || digito === "/") &&
      operacao
    ) {
      setOperacao(false);
      setValorTela((pValorTela) => pValorTela + digito);
      return;
    }

    if (operacao) {
      setOperacao(false);
      setValorTela(digito);
    }

    setValorTela(valorTela + digito);
  };

  const operar = (oper: string) => {
    if (oper === "bs") {
      let verTela = valorTela;
      verTela = verTela.substring(0, verTela.length - 1);
      setValorTela(verTela);
      setOperacao(false);
      return;
    }

    try {
      const r = eval(valorTela);
      setResultado(r);
      setOperacao(true);
    } catch (error) {
      setResultado("ERROR");
    }
  };

  const calcKey = [
    { digito: "AC", fn:() => limparTela() },
    { digito: "(", fn: () => adicionarDigitoNaTela("(") },
    { digito: ")", fn: () => adicionarDigitoNaTela(")") },
    { digito: "+", fn: () => adicionarDigitoNaTela("+") },
    { digito: "-", fn: () => adicionarDigitoNaTela("-") },
    { digito: "/", fn: () => adicionarDigitoNaTela("/") },
    { digito: "7", fn: () => adicionarDigitoNaTela("7") },
    { digito: "8", fn: () => adicionarDigitoNaTela("8") },
    { digito: "9", fn: () => adicionarDigitoNaTela("9") },
    { digito: "4", fn: () => adicionarDigitoNaTela("4") },
    { digito: "5", fn: () => adicionarDigitoNaTela("5") },
    { digito: "6", fn: () => adicionarDigitoNaTela("6") },
    { digito: "1", fn: () => adicionarDigitoNaTela("1") },
    { digito: "2", fn: () => adicionarDigitoNaTela("2") },
    { digito: "3", fn: () => adicionarDigitoNaTela("3") },
    { digito: "+", fn: () => adicionarDigitoNaTela("+") },
    { digito: "0", fn: () => adicionarDigitoNaTela("0") },
    { digito: ".", fn: () => adicionarDigitoNaTela(".") },
    { digito: "Del", fn: () => operar("bs") },
    { digito: "=", fn: () => operar("=") },
  ];

  //Função para manipular as teclas do teclado
  useEventListener("keydown", (e: KeyboardEvent) => {
    if (
      e.key === "+" ||
      e.key === "-" ||
      e.key === "*" ||
      e.key === "/" ||
      e.key === "="
    ) {
      if (e.key === "=") {
          operar("=");
          return
      }

      adicionarDigitoNaTela(e.key)
      return;
    }

    if (e.code.startsWith("Digit")) {
      adicionarDigitoNaTela(e.key)
      return;
    }

    if (
      e.code.startsWith("Shift") ||
      e.code.startsWith("Alt") ||
      e.code.startsWith("Control") ||
      e.code.startsWith("Meta")
    ) {
      return;
    }

  alert("Ops, somente números aqui!!!");
  });



  return{calcKey, valorTela, resultado};
}

export default useCalc;
