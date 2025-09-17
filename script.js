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