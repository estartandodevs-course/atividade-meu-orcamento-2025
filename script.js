document.addEventListener("DOMContentLoaded", () => {
  const transacao = {
    id: new Date().getTime(),
    descricao,
    valor,
  };
  
  let transacoes = [];

  function carregarTransacoes() {
    try {
      const dados = localStorage.getItem('transacoes');
      if (dados) {
        transacoes = JSON.parse(dados);
      } else {
        transacoes = [];
      }
    } catch (error) {
      console.error("Erro ao carregar transações: ", erro);
      transacoes = []
    }
  }
});

function salvarTransacoes() {
  try {
    localStorage.setItem('transacoes', JSON.stringify(trasacoes));
  } catch (error) {
    console.error('Erro ao salvar transações: ', erro)
  }
}
