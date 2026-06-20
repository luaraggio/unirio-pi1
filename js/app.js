document.addEventListener("DOMContentLoaded", () => {
    const session = JSON.parse(localStorage.getItem("session"));
    const currentPage = window.location.pathname;

    const isLoginPage = currentPage.includes("login.html");
    const isRegisterPage = currentPage.includes("register.html");

    if (!session && !isLoginPage && !isRegisterPage) {
        const insidePages = currentPage.includes("/pages/");
        window.location.href = insidePages ? "login.html" : "pages/login.html";
        return;
    }

    const welcomeMessage = document.getElementById("welcome-message");
    if (session && welcomeMessage) {
        welcomeMessage.textContent = `Bem-vindo(a), ${session.firstName}!`;
    }
});

// 1. BANCO DE DADOS SIMULADO (Corrigido com vírgulas e chaves únicas)
const oportunidadesData = [
    // --- MONITORIAS ---
    { id: 1, tipo: "monitoria", titulo: "Cálculo I", descricao: "Apoio em exercícios e monitorias presenciais.", prof: "João Silva", carga: 8, vagas: 5, destaque: true, badge: "Alta demanda" },
    { id: 2, tipo: "monitoria", titulo: "Programação em C", descricao: "Auxílio em lógica e desenvolvimento de algoritmos.", prof: "Maria Souza", carga: 6, vagas: 4, destaque: true, badge: "Novo" },
    { id: 3, tipo: "monitoria", titulo: "Banco de Dados", descricao: "Modelagem e SQL.", prof: "Carlos Lima", carga: 6, vagas: 3, destaque: false, badge: null },
    { id: 4, tipo: "monitoria", titulo: "Estruturas de Dados", descricao: "Listas, árvores e algoritmos.", prof: "Fernanda Rocha", carga: 8, vagas: 4, destaque: false, badge: null },
    { id: 5, tipo: "monitoria", titulo: "Sistemas Operacionais", descricao: "Processos e gerenciamento de memória.", prof: "André Martins", carga: 6, vagas: 3, destaque: false, badge: null }, // <--- VÍRGULA ADICIONADA

    // --- ESTÁGIOS ---
    { id: 1, tipo: "estagio", titulo: "Desenvolvimento Web Júnior", descricao: "Atue na criação de sites e sistemas com tecnologias modernas.", empresa: "CodeLab Brasil", local: "Remoto", salario: "R$1.200,00", carga: "20h semanais", vagas: 3, destaque: true, badge: "Novo" },
    { id: 2, tipo: "estagio", titulo: "Suporte Técnico em TI", descricao: "Auxilie usuários, resolva problemas técnicos e dê suporte a sistemas internos.", empresa: "Tech4All", local: "Rio de Janeiro - RJ, Botafogo", salario: "R$1.000,00", carga: "30h semanais", vagas: 4, destaque: false, badge: null },
    { id: 3, tipo: "estagio", titulo: "UX/UI Design", descricao: "Crie interfaces modernas e melhore a experiência do usuário.", empresa: "WebMakers Studio", local: "Rio de Janeiro - RJ, Flamengo", salario: "R$1.300,00", carga: "20h semanais", vagas: 2, destaque: false, badge: null },
    { id: 4, tipo: "estagio", titulo: "Análise de Dados Júnior", descricao: "Trabalhe com planilhas, dashboards e análise de informações.", empresa: "DataMiind Analytics", local: "Rio de Janeiro - RJ, Tijuca", salario: "R$1.500,00", carga: "30h semanais", vagas: 1, destaque: true, badge: "Última vaga" },
    { id: 5, tipo: "estagio", titulo: "Desenvolvimento Mobile", descricao: "Participe da criação de aplicativos Android e IOS.", empresa: "DevStar", local: "Híbrido, Rio de Janeiro - RJ, Barra da Tijuca", salario: "a combinar", carga: "25h semanais", vagas: 3, destaque: false, badge: null }, // <--- VÍRGULA ADICIONADA

    // --- EXTENSÃO ---
    { id: 1, tipo: "extensao", titulo: "Tech nas comunidades", descricao: "Projeto de inclusão digital com foco em capacitação básica em tecnologia.", coordenacao: "Profa. Mariana Alves", parceria_local: "ONG Conecta RJ", carga: "10h semanais", vagas: 8, destaque: true, badge: "Inscrições abertas" },
    { id: 2, tipo: "extensao", titulo: "Dados para o Bem Público", descricao: "Projeto de análise de indicadores sociais para apoio a políticas públicas.", coordenacao: "Prof. Rafael Mendes", parceria_local: "Prefeitura do Rio", carga: "8h semanais", vagas: 6, destaque: false, badge: null },
    { id: 3, tipo: "extensao", titulo: "Educação Tecnológica para Jovens", descricao: "Ensino de lógica e programação para alunos de rede pública.", coordenacao: "Profa. Juliana Rocha", parceria_local: "Escola Estadual Machado de Assis", carga: "6h semanais", vagas: 10, destaque: false, badge: null },
    { id: 4, tipo: "extensao", titulo: "Saúde Digital Comunitária", descricao: "Desenvolvimento de soluções digitais para clínicas populares.", coordenacao: "Prof. André Costa", parceria_local: "Clínica Popular da Zona Sul", carga: "8h semanais", vagas: 5, destaque: true, badge: "Novo" },
    { id: 5, tipo: "extensao", titulo: "Inclusão Digital para Idosos", descricao: "Oficinas de ensino do uso de tecnologia para população de terceira idade.", coordenacao: "Profa. Ana Beatriz Lima", parceria_local: "Centro Comunitário da Urca", carga: "4h semanais", vagas: 12, destaque: false, badge: null },
    { id: 6, tipo: "extensao", titulo: "Laboratório Aberto de Tecnologia", descricao: "Desenvolvimento de soluções para demandas reais da sociedade.", coordenacao: "Prof. Carlos Henrique", parceria_local: "UNIRIO - Campus Urca", carga: "12h semanais", vagas: 7, destaque: false, badge: null }, // <--- VÍRGULA ADICIONADA

    // --- PESQUISA (Chave 'tipo' duplicada corrigida para 'modalidade') ---
    { id: 1, tipo: "pesquisa", titulo: "Iniciação Científica em Tecnologia", descricao: "Participe de um projeto de pesquisa voltado ao desenvolvimento de soluções tecnológicas inovadoras.", instituicao: "UNIRIO", orientador: "Prof. João Silva", area: "Desenvolvimento de Sistemas", modalidade: "Voluntário", carga: "12h semanais", vagas: 3, destaque: true, badge: "Inscrições abertas" },
    { id: 2, tipo: "pesquisa", titulo: "Iniciação Científica em Análise de Dados", descricao: "Atue com coleta, organização e interpretação de dados em pesquisas acadêmicas.", instituicao: "UNIRIO", orientador: "Profa. Fernanda Lima", area: "Ciência de Dados", modalidade: "Bolsista", carga: "15h semanais", vagas: 2, destaque: false, badge: null },
    { id: 3, tipo: "pesquisa", titulo: "Iniciação Científica em Inteligência Artificial", descricao: "Auxilie no desenvolvimento de modelos de IA e análise de dados para projetos acadêmicos.", instituicao: "UFRJ", orientador: "Prof. Carlos Mendes", area: "Inteligência Artificial", modalidade: "Bolsista", carga: "12h semanais", vagas: 2, destaque: false, badge: null },
    { id: 4, tipo: "pesquisa", titulo: "Pesquisa em Cibersegurança", descricao: "Auxilie na identificação de vulnerabilidades e proteção de sistemas.", instituicao: "UFF", orientador: "Profa. Renata Alves", area: "Segurança da Informação", modalidade: "Bolsista", carga: "12h semanais", vagas: 1, destaque: true, badge: "Última vaga" }
];

document.addEventListener("DOMContentLoaded", () => {
    const tipoPagina = document.body.getAttribute('data-pagina');
    
    // Roteamento: decide qual lógica rodar dependendo da página
    if (tipoPagina === 'perfil') {
        inicializarPerfil();
    } else if (tipoPagina) {
        inicializarPagina(tipoPagina);
    }
    
    configurarLogout();
});

function inicializarPagina(tipoPagina) {
    const grids = document.querySelectorAll('.cards-grid');
    if (grids.length === 0) return;

    // Pega os dados apenas da categoria da página atual
    const dadosDaPagina = oportunidadesData.filter(op => op.tipo === tipoPagina);

    // Renderiza a lista inicial
    renderizarCards(dadosDaPagina, grids);
    atualizarEstatisticas(dadosDaPagina);

    // CONFIGURAÇÃO DA BARRA DE PESQUISA
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        // O evento 'input' dispara a cada letra digitada
        searchInput.addEventListener('input', (evento) => {
            const termo = evento.target.value.toLowerCase();
            
            // Filtra os dados checando se o termo existe no título ou na descrição
            const dadosFiltrados = dadosDaPagina.filter(op => 
                op.titulo.toLowerCase().includes(termo) || 
                op.descricao.toLowerCase().includes(termo)
            );
            
            // Limpa a tela e desenha apenas os filtrados
            renderizarCards(dadosFiltrados, grids);
        });
    }
}

// Função separada para desenhar os cards, assim a pesquisa pode reutilizá-la
function renderizarCards(dados, grids) {
    grids.forEach(grid => grid.innerHTML = ''); // Limpa a tela

    if (dados.length === 0) {
        grids[0].innerHTML = '<p style="padding: 20px;">Nenhuma oportunidade encontrada com este termo.</p>';
        return;
    }

    dados.forEach(oportunidade => {
        const cardHTML = criarCardHTML(oportunidade);
        
        if (grids.length >= 2) {
            if (oportunidade.destaque) {
                grids[0].insertAdjacentHTML('beforeend', cardHTML);
            } else {
                grids[1].insertAdjacentHTML('beforeend', cardHTML);
            }
        } else {
            grids[0].insertAdjacentHTML('beforeend', cardHTML);
        }
    });

    // Como os botões foram recriados, precisamos religar os eventos de clique
    configurarBotoesParticipar();
}

function inicializarPerfil() {
    // Encontra a div principal onde vamos colocar tudo (mantenha a <div id="grid-perfil"></div> no seu HTML)
    const containerPerfil = document.querySelector('#grid-perfil');
    if (!containerPerfil) return;

    // Busca as inscrições salvas no localStorage
    const minhasInscricoes = JSON.parse(localStorage.getItem('inscricoesAluno')) || [];

    // Limpa o conteúdo anterior
    containerPerfil.innerHTML = '';

    // Se não houver inscrições, exibe a mensagem padrão e para por aqui
    if (minhasInscricoes.length === 0) {
        containerPerfil.innerHTML = '<p>Você ainda não se inscreveu em nenhuma oportunidade.</p>';
        return;
    }

    // Dicionário para traduzir o 'tipo' do código para um Título bonito na tela
    const nomesCategorias = {
        monitoria: "Monitorias",
        estagio: "Estágios",
        extensao: "Projetos de Extensão",
        pesquisa: "Projetos de Pesquisa"
    };

    // Variável para ir guardando o HTML que vamos construir
    let htmlFinal = '';

    // O loop passa por cada tipo (monitoria, estagio, extensao, pesquisa)
    for (const tipo in nomesCategorias) {
        
        // Filtra a lista do aluno para pegar apenas as inscrições da categoria atual do loop
        const inscricoesDestaCategoria = minhasInscricoes.filter(op => op.tipo === tipo);

        // Se o aluno tiver alguma inscrição nesta categoria, criamos a seção dela!
        if (inscricoesDestaCategoria.length > 0) {
            
            // Cria um título com uma linha embaixo para separar visualmente
            htmlFinal += `
                <h3 style="margin-top: 30px; margin-bottom: 15px; color: #004488; border-bottom: 2px solid #ccc; padding-bottom: 5px;">
                    ${nomesCategorias[tipo]}
                </h3>
            `;
            
            // Abre uma nova grid de cards para esta categoria
            htmlFinal += `<div class="cards-grid">`;
            
            // Adiciona cada card dentro desta nova grid
            inscricoesDestaCategoria.forEach(oportunidade => {
                htmlFinal += criarCardHTML(oportunidade, true); // O 'true' avisa que é perfil (mostra 'Em análise')
            });
            
            // Fecha a grid
            htmlFinal += `</div>`;
        }
    }

    // Injeta todo esse HTML estruturado de uma vez só dentro da div principal
    containerPerfil.innerHTML = htmlFinal;

    // REMOVA a classe 'cards-grid' da div principal, pois agora criamos grids internas!
    containerPerfil.classList.remove('cards-grid');
}

// Adicionamos o parâmetro `isPerfil` (falso por padrão) para mudar o visual do card no perfil
function criarCardHTML(oportunidade, isPerfil = false) {
    const badgeHTML = oportunidade.badge ? `<span class="badge">${oportunidade.badge}</span>` : '';
    const highlightClass = oportunidade.destaque ? 'highlight' : '';

    let detalhesHTML = '';
    if (oportunidade.tipo === "monitoria") {
        detalhesHTML = `<p><strong>Professor:</strong> ${oportunidade.prof}</p><p><strong>Carga horária:</strong> ${oportunidade.carga}h semanais</p>`;
    } else if (oportunidade.tipo === "estagio") {
        detalhesHTML = `<p><strong>Empresa:</strong> ${oportunidade.empresa} (${oportunidade.local})</p><p><strong>Salário/Bolsa:</strong> ${oportunidade.salario}</p>`;
    } else if (oportunidade.tipo === "extensao") {
        detalhesHTML = `<p><strong>Coordenação:</strong> ${oportunidade.coordenacao}</p><p><strong>Parceria:</strong> ${oportunidade.parceria_local}</p>`;
    } else if (oportunidade.tipo === "pesquisa") {
        detalhesHTML = `<p><strong>Instituição:</strong> ${oportunidade.instituicao}</p><p><strong>Orientador:</strong> ${oportunidade.orientador}</p>`;
    }

    // Se estivermos no Perfil, mostramos um status em vez do botão de inscrição
    let botaoHTML = '';
    if (isPerfil) {
        botaoHTML = `<div style="margin-top: 15px; padding: 10px; background-color: #e9ecef; text-align: center; border-radius: 4px; color: #495057; font-weight: bold;">Status: Em análise</div>`;
    } else {
        botaoHTML = `<button class="btn-participar" data-id="${oportunidade.id}" data-tipo="${oportunidade.tipo}" style="cursor: pointer; padding: 10px; background-color: #004488; color: white; border: none; border-radius: 4px; margin-top: 10px; width: 100%;">Inscrever-se</button>`;
    }

    return `
        <div class="card ${highlightClass}">
            <h3>${oportunidade.titulo} ${badgeHTML}</h3>
            <p>${oportunidade.descricao}</p>
            ${detalhesHTML}
            ${!isPerfil ? `<p><strong>Vagas:</strong> <span id="vagas-${oportunidade.tipo}-${oportunidade.id}">${oportunidade.vagas}</span></p>` : ''}
            ${botaoHTML}
        </div>
    `;
}

function configurarBotoesParticipar() {
    const botoes = document.querySelectorAll('.btn-participar');
    botoes.forEach(botao => {
        botao.addEventListener('click', (evento) => {
            const id = evento.target.getAttribute('data-id');
            const tipo = evento.target.getAttribute('data-tipo');
            processarInscricao(parseInt(id), tipo, evento.target);
        });
    });
}

function processarInscricao(id, tipo, botaoClicado) {
    const oportunidade = oportunidadesData.find(op => op.id === id && op.tipo === tipo);

    // Recupera a lista atual de inscrições do aluno
    let minhasInscricoes = JSON.parse(localStorage.getItem('inscricoesAluno')) || [];
    
    // Verifica se o aluno já se inscreveu nisso antes
    const jaInscrito = minhasInscricoes.some(item => item.id === id && item.tipo === tipo);

    if (jaInscrito) {
        alert("Você já está inscrito nesta oportunidade!");
        return;
    }

    if (oportunidade && oportunidade.vagas > 0) {
        const confirma = confirm(`Deseja confirmar sua inscrição para: ${oportunidade.titulo}?`);
        
        if (confirma) {
            oportunidade.vagas -= 1;
            const elementoVagas = document.getElementById(`vagas-${tipo}-${id}`);
            if (elementoVagas) elementoVagas.innerText = oportunidade.vagas;
            
            // SALVA A INSCRIÇÃO NO LOCAL STORAGE
            minhasInscricoes.push(oportunidade);
            localStorage.setItem('inscricoesAluno', JSON.stringify(minhasInscricoes));
            
            botaoClicado.innerText = "Inscrito!";
            botaoClicado.style.backgroundColor = "#28a745"; 
            botaoClicado.disabled = true;
            botaoClicado.style.cursor = "not-allowed";

            alert("Inscrição realizada com sucesso! Você pode acompanhar no seu Perfil.");
            
            const dadosDaPagina = oportunidadesData.filter(op => op.tipo === tipo);
            atualizarEstatisticas(dadosDaPagina);
        }
    } else if (oportunidade && oportunidade.vagas === 0) {
        alert("Infelizmente não há mais vagas disponíveis.");
    }
}

function atualizarEstatisticas(dadosDaPagina) {
    const abertas = dadosDaPagina.filter(op => op.vagas > 0).length;
    const totalVagas = dadosDaPagina.reduce((soma, op) => soma + op.vagas, 0);

    const elementoAbertas = document.getElementById('stat-abertas');
    const elementoVagas = document.getElementById('stat-vagas');

    if (elementoAbertas) elementoAbertas.innerText = abertas;
    if (elementoVagas) elementoVagas.innerText = totalVagas;
}

function configurarLogout() {
    const btnLogout = document.getElementById('logout-btn');
    if (btnLogout) {
        btnLogout.addEventListener('click', (evento) => {
            evento.preventDefault();
            if (confirm("Tem certeza que deseja encerrar a sessão?")) {
                // Ao sair, podemos limpar as inscrições de teste, se quiser:
                // localStorage.removeItem('inscricoesAluno');
                window.location.href = '../index.html'; 
            }
        });
    }
}