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
