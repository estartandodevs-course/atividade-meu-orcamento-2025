let transacoes = [];

const form = document.querySelector("#form-transacao");
const inputDescricao = document.querySelector("#input-descricao");
const inputValor = document.querySelector("#input-valor");
const listaTransacoes = document.querySelector("#lista-transacoes");
const spanReceitas = document.querySelector("#valor-receitas");
const spanDespesas = document.querySelector("#valor-despesas");
const spanSaldo = document.querySelector("#valor-saldo");

function carregarTransacoes() {
  try {
    const existeDados = localStorage.getItem("transacoes");
    existeDados ? (transacoes = JSON.parse(existeDados)) : (transacoes = []);
  } catch (error) {
    console.log("Erro ao carregar transções", error);
    transacoes = [];
  }
  return transacoes;
}
function salvarTransacoes() {
  try {
    localStorage.setItem("transacoes", JSON.stringify(transacoes));
  } catch (error) {
    console.error("Erro ao salvar transacoes", error);
  }
}

function adicionarTransacao(descricao, valor) {
  const transacao = {
    id: new Date().getTime(),
    descricao,
    valor,
  };

  transacoes.push(transacao);
  salvarTransacoes();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const descricao = inputDescricao.value.trim();
  const valor = Number(inputValor.value);

  if (descricao === "") {
    alert("Prencha os campos da descrição corretamente");
    return;
  } else if (valor === 0 || isNaN(valor)) {
    alert("O valor precisa ser maior que 0, e não pode ser vazio.");
    return;
  }

  const transacao = {
    id: new Date().getTime(),
    descricao,
    valor,
  };

  transacoes.push(transacao);

  salvarTransacoes();

  renderizar();

  inputDescricao.value = "";
  inputValor.value = "";
});

function renderizar() {
  listaTransacoes.innerHTML = "";

  let receitas = 0;
  let despesas = 0;

  transacoes.forEach((transacao) => {
    const li = document.createElement("li");
    li.textContent = `${transacao.descricao} - R$ ${transacao.valor}`;

    li.classList.add(transacao.valor > 0 ? "receita" : "despesa");

    listaTransacoes.appendChild(li);

    if (transacao.valor > 0) {
      receitas += transacao.valor;
    } else {
      despesas += transacao.valor;
    }
  });

  const saldo = receitas + despesas;

  spanReceitas.textContent = `R$ ${receitas.toFixed(2)}`;
  spanDespesas.textContent = `R$ ${despesas.toFixed(2)}`;
  spanSaldo.textContent = `R$ ${saldo.toFixed(2)}`;
}

renderizar();
