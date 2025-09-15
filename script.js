// Etapa 1: Estrutura Inicial e localStorage


const form = document.getElementById('form-transacao');
const inputDescricao = document.getElementById('input-descricao');
const inputValor = document.getElementById('input-valor');
const listaTransacoes = document.getElementById('lista-transacoes');

let transacoes = [];

function salvarTransacoes() {
    localStorage.setItem('transacoes', JSON.stringify(transacoes));
}

function carregarTransacoes()
{
    const transacoesSalvas = localStorage.getItem('transacoes');
    try
    {
        if (transacoesSalvas) {
            transacoes = JSON.parse(transacoesSalvas);
            //transacoes.forEach(adicionarTransacaoNaLista);
        }
    }
    catch (e)
    {
        console.error('Erro ao carregar transações:', e);
    }   
}

// Etapa 2: Adicionar Novas Transações

function adicionarTransacaoNaLista(transacao)
{
    const itemLista = document.createElement('li');
    itemLista.classList.add(transacao.valor < 0 ? 'despesa' : 'receita');
    itemLista.innerHTML = `
        ${transacao.descricao} <span>${formatarMoeda(transacao.valor)}</span>
        <button class="deletar" data-id="${transacao.id}">x</button>
    `;
    listaTransacoes.appendChild(itemLista);
}



// Etapa 3: Exibir os Dados na Tela (map e reduce)

function formatarMoeda(valor)
{
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function atualizarResumo()
{
    
    const receitas = transacoes.filter(transacao => transacao.valor > 0).reduce((acc, transacao) => acc + transacao.valor, 0);
    const despesas = transacoes.filter(transacao => transacao.valor < 0).reduce((acc, transacao) => acc + transacao.valor, 0);
    const total = receitas + despesas;

    document.getElementById('valor-receitas').textContent = formatarMoeda(receitas);
    document.getElementById('valor-despesas').textContent = formatarMoeda(despesas);
    document.getElementById('valor-saldo').textContent = formatarMoeda(total);

}

function renderizarListaTransacoes(lista = transacoes)
{
    listaTransacoes.innerHTML = '';
    lista.map(transacao => {
     const receitas = `
        <li class="${transacao.valor < 0 ? 'despesa' : 'receita'}">
            ${transacao.descricao} <span>${formatarMoeda(transacao.valor)}</span>
            <button class="deletar" data-id="${transacao.id}">x</button>
            <button class="editar" data-id="${transacao.id}">✎</button>
        </li>
     `;
     
     listaTransacoes.innerHTML += receitas;
    })
    atualizarResumo();
    animarItensLista();
}

// Etapa 4: Remover Transações (filter e Delegação de Eventos)

function deletarTransacao(id)
{
    transacoes = transacoes.filter(transacao => transacao.id !== id);
    salvarTransacoes();
    renderizarListaTransacoes();
}

// Etapa 5: Inicialização da Aplicação

function init()
{
    carregarTransacoes();
    renderizarListaTransacoes();
    animarItensLista();

    // Adicionar nova transação
    form.addEventListener('submit', (evento) =>
    {
        evento.preventDefault();

        const descricao = inputDescricao.value.trim();
        const valor = parseFloat(inputValor.value.trim());

        if (descricao === '' || isNaN(valor) || valor === 0)return
        if(transacaoEmEdicao) {
            transacaoEmEdicao.descricao = descricao;
            transacaoEmEdicao.valor = valor;
            transacaoEmEdicao = null;
            form.querySelector('button[type="submit"]').textContent = 'Adicionar Transação';
        }else
        {
            const novaTransacao = {
                id: Date.now(),
                descricao,
                valor
            };
            transacoes.push(novaTransacao);
            if(valor > 0) mostrarMensagem('Transação adicionada com sucesso!', 'receita');
            else mostrarMensagem('Despesa adicionada com sucesso!', 'despesa');

        }
        salvarTransacoes();
        renderizarListaTransacoes();
        form.reset();
    });
      // Deletar transação
        listaTransacoes.addEventListener('click', (evento) =>{
        if(evento.target.classList.contains('deletar')) {
            const id = parseInt(evento.target.dataset.id);
            deletarTransacao(id);
        }
        // Editar transação
        if(evento.target.classList.contains('editar')) {
            const id = parseInt(evento.target.dataset.id);
            editarTransacao(id);
        }
    });
}

init();



// Extras

// Etapa 6:  Editar Transações

let transacaoEmEdicao = null;

function editarTransacao(id)
{
    transacaoEmEdicao = transacoes.find(transacao => transacao.id === id);
    if (transacaoEmEdicao) {
        inputDescricao.value = transacaoEmEdicao.descricao;
        inputValor.value = transacaoEmEdicao.valor;
        form.querySelector('button[type="submit"]').textContent = 'Salvar Edição';
    }
}

// Etapa 7: Filtrar por Tipo

function filtrarTransacoes(tipo)
{
    let transacoesFiltradas = transacoes;

    if(tipo === 'receitas') transacoesFiltradas = transacoes.filter(t => t.valor > 0);
    if(tipo === 'despesas') transacoesFiltradas = transacoes.filter(t => t.valor < 0);

    renderizarListaTransacoes(transacoesFiltradas);
}   



document.getElementById('receitaFiltrada').addEventListener('click', () => filtrarTransacoes('receitas'));
document.getElementById('despesaFiltrada').addEventListener('click', () => filtrarTransacoes('despesas'));
document.getElementById('mostrarTodas').addEventListener('click', () => renderizarListaTransacoes());


// Etapa 8: Animações Suaves

function animarItensLista()
{
    const itens =document.querySelectorAll('#lista-transacoes li');
    itens.forEach(item =>{
        item.classList.add('escondido');
        setTimeout(() => item.classList.remove('escondido'), 10);
    })
}


// Etapa 9: Mensagens de Feedback:

function mostrarMensagem(mensagem, tipo = 'receita')
{
    const divMensagem = document.createElement('div');
    divMensagem.className = `mensagem ${tipo}`;
    divMensagem.textContent = mensagem;

    const containerMensagens = document.getElementById('mensagem');
    containerMensagens.appendChild(divMensagem);

    setTimeout(() => divMensagem.remove(), 3000);
}