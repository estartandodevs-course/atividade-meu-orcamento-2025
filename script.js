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

  adicionarTransacao(descricao, valor);
  renderizar();

  inputDescricao.value = "";
  inputValor.value = "";
});

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function atualizarResumo() {
  const receitas = transacoes
    .filter((t) => t.valor > 0)
    .reduce((acc, t) => acc + t.valor, 0);

  const despesas = transacoes
    .filter((t) => t.valor < 0)
    .reduce((acc, t) => acc + t.valor, 0);

  const saldo = receitas + despesas;

  spanReceitas.textContent = formatarMoeda(receitas);
  spanDespesas.textContent = formatarMoeda(despesas);
  spanSaldo.textContent = formatarMoeda(saldo);
}

function renderizarListaTransacoes() {
  listaTransacoes.innerHTML = "";

  const htmlTransacoes = transacoes
    .map(
      (transacao) => `
      <li class="${transacao.valor > 0 ? "receita" : "despesa"}">
        ${transacao.descricao} - ${formatarMoeda(transacao.valor)}
        <button class="remover" data-id="${transacao.id}">X</button>
      </li>
    `
    )
    .join("");

  listaTransacoes.innerHTML = htmlTransacoes;
}

function renderizar() {
  renderizarListaTransacoes();
  atualizarResumo();
}

carregarTransacoes();
renderizar();
