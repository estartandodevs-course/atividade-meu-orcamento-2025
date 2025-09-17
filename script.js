let transacoes = [];

const form = document.getElementById("form-transacao");
const inputDescricao = document.getElementById("input-descricao");
const inputValor = document.getElementById("input-valor");
const lista = document.getElementById("lista-transacoes");
const spanReceitas = document.getElementById("valor-receitas");
const spanDespesas = document.getElementById("valor-despesas");
const spanSaldo = document.getElementById("valor-saldo");

function carregarTransacoes() {
  try {
    const dados = localStorage.getItem("transacoes");
    return dados ? JSON.parse(dados) : [];
  } catch (e) {
    console.error("Erro ao carregar do localStorage:", e);
    return [];
  }
}

function salvarTransacoes() {
  localStorage.setItem("transacoes", JSON.stringify(transacoes));
}

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function redenrizarListaTransacoes() {
    lista.innerHTML = "";

    transacoes.forEach((transacao) => {
        const li = document.createElement("li");
        li.classList.add(transacao.valor >= 0 ? "receita" : "despesa");

        li.innerHTML = `
            <span>${transacao.descricao} - ${formatarMoeda(transacao.valor)}</span>
            <button class="botao-remover" data-id="${transacao.id}">x</button>
        `;

        lista.appendChild(li);
    });
}

function adicionarTransacao(evento) {
  evento.preventDefault();

  const descricao = inputDescricao.value.trim();
  const valor = Number(inputValor.value);

  if (descricao === "" || isNaN(valor) || valor === 0) {
    alert("Preencha todos os campos corretamente!");
    return;
  }

  const novaTransacao = {
    id: new Date().getTime(),
    descricao: descricao,
    valor: valor,
  };

  transacoes.push(novaTransacao);
  salvarTransacoes();
  atualizarTela();

  inputDescricao.value = "";
  inputValor.value = "";
}