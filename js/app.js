document.addEventListener("DOMContentLoaded", () => {
    // 1. AUTENTICAÇÃO E SESSÃO
    const session = JSON.parse(localStorage.getItem("session"));
    const currentPage = window.location.pathname;

    const isLoginPage = currentPage.includes("login.html");
    const isRegisterPage = currentPage.includes("register.html");

    if (!session && !isLoginPage && !isRegisterPage) {
        const insidePages = currentPage.includes("/pages/");
        window.location.href = insidePages ? "login.html" : "pages/login.html";
        return; // Para a execução se o usuário não estiver logado
    }

    const welcomeMessage = document.getElementById("welcome-message");
    if (session && welcomeMessage) {
        welcomeMessage.textContent = `Bem-vindo(a), ${session.firstName}!`;
    }

    // 2. ROTEAMENTO DE PÁGINAS (Constrói os cards)
    const tipoPagina = document.body.getAttribute('data-pagina');
    
    if (tipoPagina === 'perfil') {
        inicializarPerfil();
    } else if (tipoPagina) {
        inicializarPagina(tipoPagina);
    }
    
    // 3. INICIALIZADORES GERAIS
    configurarLogout();
    inicializarTema();
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
    configurarBotoesFavoritar();
}

// INICIALIZADOR DO PERFIL (Separando Inscrições e Favoritos)
function inicializarPerfil() {
    const containerInscricoes = document.getElementById('container-inscricoes');
    const containerFavoritos = document.getElementById('container-favoritos');

    const nomesCategorias = {
        monitoria: "Monitorias",
        estagio: "Estágios",
        extensao: "Projetos de Extensão",
        pesquisa: "Projetos de Pesquisa"
    };

    // 1. PROCESSAR SEÇÃO DE INSCRIÇÕES
    if (containerInscricoes) {
        const minhasInscricoes = JSON.parse(localStorage.getItem('inscricoesAluno')) || [];
        if (minhasInscricoes.length === 0) {
            containerInscricoes.innerHTML = '<p>Você ainda não se inscreveu em nenhuma oportunidade.</p>';
        } else {
            let htmlInscricoes = '';
            for (const tipo in nomesCategorias) {
                const filtrados = minhasInscricoes.filter(op => op.tipo === tipo);
                if (filtrados.length > 0) {
                    htmlInscricoes += `<h3 style="margin-top:20px; color:#004488; border-bottom:1px solid #ccc;">${nomesCategorias[tipo]}</h3>`;
                    htmlInscricoes += `<div class="cards-grid">`;
                    filtrados.forEach(op => htmlInscricoes += criarCardHTML(op, 'perfil-inscrito'));
                    htmlInscricoes += `</div>`;
                }
            }
            containerInscricoes.innerHTML = htmlInscricoes;
        }
    }

    // 2. PROCESSAR SEÇÃO DE FAVORITOS
    if (containerFavoritos) {
        const meusFavoritos = JSON.parse(localStorage.getItem('favoritosAluno')) || [];
        if (meusFavoritos.length === 0) {
            containerFavoritos.innerHTML = '<p>Você ainda não favoritou nenhuma oportunidade.</p>';
        } else {
            let htmlFavoritos = '';
            for (const tipo in nomesCategorias) {
                const filtrados = meusFavoritos.filter(op => op.tipo === tipo);
                if (filtrados.length > 0) {
                    htmlFavoritos += `<h3 style="margin-top:20px; color:#e67e22; border-bottom:1px solid #ccc;">${nomesCategorias[tipo]} (Salvas)</h3>`;
                    htmlFavoritos += `<div class="cards-grid">`;
                    filtrados.forEach(op => htmlFavoritos += criarCardHTML(op, 'perfil-favorito'));
                    htmlFavoritos += `</div>`;
                }
            }
            containerFavoritos.innerHTML = htmlFavoritos;
            configurarBotoesFavoritar(); // Permite desfavoritar direto do perfil
        }
    }
    configurarBotoesParticipar();
    configurarBotoesCancelar();
}

// FABRICA DE CARDS DINÂMICOS
function criarCardHTML(oportunidade, modo = 'vitrine') {
    const badgeHTML = oportunidade.badge ? `<span class="badge">${oportunidade.badge}</span>` : '';
    const highlightClass = oportunidade.destaque ? 'highlight' : '';

    let detalhesHTML = '';
    if (oportunidade.tipo === "monitoria") {
        detalhesHTML = `<p><strong>Professor:</strong> ${oportunidade.prof}</p><p><strong>Carga horária:</strong> ${oportunidade.carga}h semanais</p>`;
    } else if (oportunidade.tipo === "estagio") {
        detalhesHTML = `<p><strong>Empresa:</strong> ${oportunidade.empresa} (${oportunidade.local})</p><p><strong>Salário:</strong> ${oportunidade.salario}</p>`;
    } else if (oportunidade.tipo === "extensao") {
        detalhesHTML = `<p><strong>Coordenação:</strong> ${oportunidade.coordenacao}</p><p><strong>Parceria:</strong> ${oportunidade.parceria_local}</p>`;
    } else if (oportunidade.tipo === "pesquisa") {
        detalhesHTML = `<p><strong>Instituição:</strong> ${oportunidade.instituicao}</p><p><strong>Modalidade:</strong> ${oportunidade.modalidade}</p>`;
    }

    // Checa se o item atual já está favoritado para renderizar o botão com a cor certa
    const favoritosAtuais = JSON.parse(localStorage.getItem('favoritosAluno')) || [];
    const estaFavoritado = favoritosAtuais.some(f => f.id === oportunidade.id && f.tipo === oportunidade.tipo);
    
    const textoBotaoFav = estaFavoritado ? "★ Favoritado" : "☆ Favoritar";
    const corBotaoFav = estaFavoritado ? "#e67e22" : "#7f8c8d";

    let blocoBotoesHTML = '';

    if (modo === 'vitrine') {
        blocoBotoesHTML = `
            <p><strong>Vagas:</strong> <span id="vagas-${oportunidade.tipo}-${oportunidade.id}">${oportunidade.vagas}</span></p>
            <div style="display: flex; gap: 10px; margin-top: 10px;">
                <button class="btn-participar" data-id="${oportunidade.id}" data-tipo="${oportunidade.tipo}" style="flex: 2; cursor: pointer; padding: 10px; background-color: #004488; color: white; border: none; border-radius: 4px; font-weight: bold;">
                    Inscrever-se
                </button>
                <button class="btn-favoritar" data-id="${oportunidade.id}" data-tipo="${oportunidade.tipo}" style="flex: 1; cursor: pointer; padding: 10px; background-color: ${corBotaoFav}; color: white; border: none; border-radius: 4px; font-weight: bold;">
                    ${textoBotaoFav}
                </button>
            </div>
        `;
    } else if (modo === 'perfil-inscrito') {
        blocoBotoesHTML = `
            <div style="margin-top: 15px; padding: 10px; background-color: #e9ecef; text-align: center; border-radius: 4px; color: #495057; font-weight: bold; margin-bottom: 10px;">
                Status: Em análise
            </div>
            <button class="btn-cancelar" data-id="${oportunidade.id}" data-tipo="${oportunidade.tipo}" style="width: 100%; cursor: pointer; padding: 10px; background-color: #c0392b; color: white; border: none; border-radius: 4px; font-weight: bold;">
                ❌ Cancelar Inscrição
            </button>
        `;    
    } else if (modo === 'perfil-favorito') {
        // 1. Verifica se o aluno já está inscrito nesta oportunidade específica
        const minhasInscricoes = JSON.parse(localStorage.getItem('inscricoesAluno')) || [];
        const jaInscrito = minhasInscricoes.some(item => item.id === oportunidade.id && item.tipo === oportunidade.tipo);

        // 2. Decide qual visual o primeiro botão vai ter
        let botaoAcaoHTML = '';
        
        if (jaInscrito) {
            // Se já estiver inscrito, mostra a etiqueta cinza de status
            botaoAcaoHTML = `
                <div style="flex: 1; padding: 10px; background-color: #e9ecef; text-align: center; border-radius: 4px; color: #495057; font-weight: bold; display: flex; align-items: center; justify-content: center;">
                    Em análise
                </div>
            `;
        } else {
            // Se não estiver, mostra o botão azul de inscrição normal
            botaoAcaoHTML = `
                <button class="btn-participar" data-id="${oportunidade.id}" data-tipo="${oportunidade.tipo}" style="flex: 1; cursor: pointer; padding: 10px; background-color: #004488; color: white; border: none; border-radius: 4px; font-weight: bold;">
                    Inscrever-se
                </button>
            `;
        }

        // 3. Monta a linha com o botão escolhido + o botão vermelho de remover
        blocoBotoesHTML = `
            <div style="display: flex; gap: 10px; margin-top: 15px;">
                ${botaoAcaoHTML}
                <button class="btn-favoritar" data-id="${oportunidade.id}" data-tipo="${oportunidade.tipo}" style="flex: 1; cursor: pointer; padding: 10px; background-color: #c0392b; color: white; border: none; border-radius: 4px; font-weight: bold;">
                    ❌ Remover
                </button>
            </div>
        `;
    }

    return `
        <div class="card ${highlightClass}">
            <h3>${oportunidade.titulo} ${badgeHTML}</h3>
            <p>${oportunidade.descricao}</p>
            ${detalhesHTML}
            ${blocoBotoesHTML}
        </div>
    `;
}

function configurarBotoesParticipar() {
    document.querySelectorAll('.btn-participar').forEach(botao => {
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

            alert("Inscrição realizada com sucesso!");

            // SE ESTIVER NO PERFIL: Atualiza a tela inteira para mover o card
            if (document.body.getAttribute('data-pagina') === 'perfil') {
                inicializarPerfil();
            } else {
                // SE ESTIVER NA VITRINE: Atualiza só os números do cabeçalho
                const dadosDaPagina = oportunidadesData.filter(op => op.tipo === tipo);
                atualizarEstatisticas(dadosDaPagina);
            }
        }
        } else {
            alert("Infelizmente não há mais vagas disponíveis.");
        }
    }

// LÓGICA DE CANCELAMENTO DE INSCRIÇÃO
function configurarBotoesCancelar() {
    document.querySelectorAll('.btn-cancelar').forEach(botao => {
        botao.addEventListener('click', (evento) => {
            const id = parseInt(evento.target.getAttribute('data-id'));
            const tipo = evento.target.getAttribute('data-tipo');
            processarCancelamento(id, tipo);
        });
    });
}

function processarCancelamento(id, tipo) {
    if (confirm("Tem certeza que deseja cancelar sua inscrição nesta vaga?")) {
        // 1. Puxa as inscrições atuais do localStorage
        let minhasInscricoes = JSON.parse(localStorage.getItem('inscricoesAluno')) || [];
        
        // 2. Filtra a lista, removendo a oportunidade que o aluno clicou
        minhasInscricoes = minhasInscricoes.filter(op => !(op.id === id && op.tipo === tipo));
        
        // 3. Salva a nova lista atualizada no localStorage
        localStorage.setItem('inscricoesAluno', JSON.stringify(minhasInscricoes));

        // 4. Devolve a vaga preenchida para a tela principal (simulado)
        const oportunidade = oportunidadesData.find(op => op.id === id && op.tipo === tipo);
        if (oportunidade) {
            oportunidade.vagas += 1;
        }

        // 5. Atualiza a tela de perfil na hora para o card sumir
        alert("Sua inscrição foi cancelada.");
        inicializarPerfil();
    }
}

// LOGICA DE FAVORITAR (LIGA / DESLIGA)
function configurarBotoesFavoritar() {
    document.querySelectorAll('.btn-favoritar').forEach(botao => {
        botao.addEventListener('click', (evento) => {
            const id = parseInt(evento.target.getAttribute('data-id'));
            const tipo = evento.target.getAttribute('data-tipo');
            processarFavorito(id, tipo, evento.target);
        });
    });
}

function processarFavorito(id, tipo, botaoClicado) {
    let meusFavoritos = JSON.parse(localStorage.getItem('favoritosAluno')) || [];
    const index = meusFavoritos.findIndex(fav => fav.id === id && fav.tipo === tipo);

    // Se já estiver favoritado, remove da lista (Desfavoritar)
    if (index > -1) {
        meusFavoritos.splice(index, 1);
        localStorage.setItem('favoritosAluno', JSON.stringify(meusFavoritos));
        
        // Se o usuário clicar para remover de dentro da tela de perfil, atualiza a tela na hora
        if (document.body.getAttribute('data-pagina') === 'perfil') {
            inicializarPerfil();
        } else {
            botaoClicado.innerText = "☆ Favoritar";
            botaoClicado.style.backgroundColor = "#7f8c8d";
        }
    } 
    // Se não estiver na lista, adiciona (Favoritar)
    else {
        const oportunidade = oportunidadesData.find(op => op.id === id && op.tipo === tipo);
        if (oportunidade) {
            meusFavoritos.push(oportunidade);
            localStorage.setItem('favoritosAluno', JSON.stringify(meusFavoritos));
            
            botaoClicado.innerText = "★ Favoritado";
            botaoClicado.style.backgroundColor = "#e67e22"; // Cor laranja para destaque
        }
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
        // Usamos onclick para garantir que esta seja a ÚNICA ação do botão
        btnLogout.onclick = function(evento) {
            evento.preventDefault();
            
            // O confirm retorna 'true' para OK e 'false' para Cancelar
            const querSair = confirm("Tem certeza que deseja encerrar a sessão?");
            
            // Só executa o bloco abaixo se o aluno clicou em "OK" (true)
            if (querSair) { 
                localStorage.removeItem("session"); // Destrói o crachá de acesso
                
                const currentPage = window.location.pathname;
                const insidePages = currentPage.includes("/pages/");
                
                window.location.href = insidePages ? "login.html" : "pages/login.html";
            }
            // Se clicar em Cancelar, o if é ignorado e a página continua intacta.
        };
    }
}

// LÓGICA DO MODO NOTURNO
function inicializarTema() {
    const btnToggle = document.getElementById('btn-theme-toggle');
    const temaSalvo = localStorage.getItem('temaPreferido');

    // Se o usuário já tinha escolhido escuro antes, aplica logo de cara
    if (temaSalvo === 'dark') {
        document.body.classList.add('dark-mode');
        if(btnToggle) btnToggle.innerText = '☀️ Tema';
    }

    // Configura o clique do botão
    if (btnToggle) {
        btnToggle.addEventListener('click', (evento) => {
            evento.preventDefault();
            
            // Alterna a classe na tag body
            document.body.classList.toggle('dark-mode');
            
            // Verifica se ficou escuro ou claro e salva no navegador
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('temaPreferido', 'dark');
                btnToggle.innerText = '☀️ Tema';
            } else {
                localStorage.setItem('temaPreferido', 'light');
                btnToggle.innerText = '🌙 Tema';
            }
        });
    }
}