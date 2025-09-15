let transacoes = [];

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
