let transacoes = [];
let lista = document.getElementById("lista-transacoes");

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

    if (!descricao.trim() || isNaN(valor) || !valor) {
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

    renderizarListaTransacoes();
    atualizarResumo();
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

  document.getElementById("valor-receitas").textContent =
    formatarMoeda(somaReceita);
  document.getElementById("valor-despesas").textContent =
    formatarMoeda(somaDespesas);
  document.getElementById("valor-saldo").textContent =
    formatarMoeda(saldoFinal);
}

function renderizarListaTransacoes(listaFiltrada = transacoes) {
  lista.innerHTML = "";

  listaFiltrada.forEach((transacao) => {
    const li = document.createElement("li");
    li.className = transacao.valor > 0 ? "receita" : "despesa";

    li.innerHTML = `
      <p>${transacao.descricao} - ${formatarMoeda(transacao.valor)}</p>
      <button class='btn-editar' data-id='${transacao.id}'>Editar</button>
      <button class='btn-remover' data-id='${transacao.id}'>Remover</button>
    `;
    lista.appendChild(li);

    setTimeout(() => {
      li.classList.add("mostrar");
    }, 10);
  });
}

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

lista.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-remover")) {
    let idParaRemover = Number(event.target.dataset.id);

    const elementoLi = event.target.closest("li");
    
    elementoLi.classList.add("removendo");
    elementoLi.classList.remove("mostrar");

    setTimeout(() => {
      transacoes = transacoes.filter(
        (transacao) => transacao.id !== idParaRemover
      );
      salvarTransacoes();
      atualizarResumo();
      renderizarListaTransacoes();
    }, 500);
  }
});

// Desafios Adicionais

lista.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-editar")) {
    let idParaEditar = Number(event.target.dataset.id);
    let transacaoParaEditar = transacoes.find(
      (transacao) => transacao.id === idParaEditar
    );
    const elementoLi = event.target.closest("li");

    elementoLi.innerHTML = `
      <input type='text' value='${transacaoParaEditar.descricao}' id='nova-descricao'>
      <input type='number' value='${transacaoParaEditar.valor}' id='novo-valor'>
      <button class='btn-salvar' data-id='${idParaEditar}'>Salvar</button>
      <button class='btn-cancelar' data-id='${idParaEditar}'>Cancelar</button>
    `;
  } else if (event.target.classList.contains("btn-salvar")) {
    const idParaEditar = Number(event.target.dataset.id);
    const elementoLi = event.target.closest("li");

    let inputNovaDescricao = elementoLi.querySelector("#nova-descricao");
    let inputNovoValor = elementoLi.querySelector("#novo-valor");
    let novaDescricao = inputNovaDescricao.value;
    let novoValor = Number(inputNovoValor.value);

    if (!novaDescricao.trim() || isNaN(novoValor) || novoValor === 0) {
      alert("Por favor, insira valores válidos.");
      return;
    }

    transacoes = transacoes.map((transacao) => {
      if (transacao.id === idParaEditar) {
        return {
          ...transacao,
          descricao: novaDescricao,
          valor: novoValor,
        };
      }
      return transacao;
    });

    salvarTransacoes();
    renderizarListaTransacoes();
    atualizarResumo();
  } else if (event.target.classList.contains("btn-cancelar")) {
    renderizarListaTransacoes();
  }
});

const secaoTransacoes = document.querySelector(".transacoes");
const ulTransacoes = document.getElementById("lista-transacoes");

const areaFiltros = document.createElement("div");
areaFiltros.id = "area-filtros";

const nomesBotoes = ["Filtrar Receitas", "Filtrar Despesas", "Mostrar Tudo"];

nomesBotoes.forEach((nome, index) => {
  const botao = document.createElement("button");
  botao.textContent = nome;
  botao.style.marginRight = "10px";
  botao.className = "btn-filtro";

  botao.addEventListener("click", (event) => {
    switch (index) {
      case 0:
        let receitas = transacoes.filter((obj) => obj.valor > 0);
        renderizarListaTransacoes(receitas);
        break;
      case 1:
        let despesas = transacoes.filter((obj) => obj.valor < 0);
        renderizarListaTransacoes(despesas);
        break;
      case 2:
        renderizarListaTransacoes();
        break;
    }
  });
  areaFiltros.appendChild(botao);
});
secaoTransacoes.insertBefore(areaFiltros, ulTransacoes);

function init() {
  carregarTransacoes();
  atualizarResumo();
  renderizarListaTransacoes();
}

init();
