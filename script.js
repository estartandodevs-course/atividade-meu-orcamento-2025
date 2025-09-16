document.addEventListener("DOMContentLoaded", () => {
  let transacoes = []

  function carregarTransacoes() {
    try {
      const dados = localStorage.getItem('transacoes');
      if (dados) {
        transacoes = JSON.parse(dados);
      } else {
        transacoes = [];
      }
    } catch (error) {
      console.error("Erro ao carregar transações: ", error);
      transacoes = [];
    }
  };

  function salvarTransacoes() {
    try {
      localStorage.setItem("transacoes", JSON.stringify(transacoes));
    } catch (error) {
      console.error("Erro ao salvar transações: ", error);
    }
  };

  const formulario = document.getElementById('form-transacao')
  .addEventListener('submit', (event) => {
    event.preventDefault();

    const inputDescricao = document.getElementById('input-descricao');
    const descricao = inputDescricao.value;
    const inputValor = document.getElementById('input-valor');
    const valor = Number(inputValor.value);
    
    if (!descricao.trim() || !valor) {
      alert('Por favor preencha os campos com valor válido.');
      return;
    }

    let transacao = {
      id: new Date().getTime(),
      descricao: descricao,
      valor: valor,
    };

    transacoes.push(transacao);

    salvarTransacoes();
    inputDescricao.value= '';
    inputValor.value = '';
  });
  
  
});
