document.addEventListener("DOMContentLoaded", () => {
  let transacoes = [];

  carregarTransacoes();
  atualizarResumo();

  function carregarTransacoes() {
    try {
      const dados = localStorage.getItem("transacoes");
      if (dados) {
        transacoes = JSON.parse(dados);
      } else {
        transacoes = [];
      }
    } catch (error) {
      console.error("Erro ao carregar transações: ", error);
      transacoes = [];
    }
  }

  function salvarTransacoes() {
    try {
      localStorage.setItem("transacoes", JSON.stringify(transacoes));
    } catch (error) {
      console.error("Erro ao salvar transações: ", error);
    }
  }

  const formulario = document
    .getElementById("form-transacao")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      const inputDescricao = document.getElementById("input-descricao");
      let descricao = inputDescricao.value;
      const inputValor = document.getElementById("input-valor");
      let valor = Number(inputValor.value);

      if (!descricao.trim() || !valor) {
        alert("Por favor preencha os campos com valor válido.");
        return;
      }

      let transacao = {
        id: new Date().getTime(),
        descricao: descricao,
        valor: valor,
      };

      transacoes.push(transacao);

      salvarTransacoes();
      inputDescricao.value = "";
      inputValor.value = "";
    });

  function atualizarResumo() {
    let somaReceita = transacoes
      .filter((obj) => obj.valor)
      .reduce((total, obj) => {
        return obj.valor > 0 ? total + obj.valor : total;
      }, 0);

    let somaDespesas = transacoes
      .filter((obj) => obj.valor)
      .reduce((total, obj) => {
        return obj.valor < 0 ? total + obj.valor : total;
      }, 0);

    let saldoFinal = somaReceita + somaDespesas;

    document.getElementById("valor-receitas").textContent = formatarMoeda(somaReceita);
    document.getElementById("valor-despesas").textContent = formatarMoeda(somaDespesas);
    document.getElementById("valor-saldo").textContent = formatarMoeda(saldoFinal);
  };

  function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
});
