

const projetos = [
    {
        titulo: "Conversor de unidades",
        categoria: "Exercício de programação",
        descricao: "Exercício de conversão de medidas e prática de cálculos.",
        tecnologias: ["Python"],
        filtro: ["python"],
        icone: "🐍",
        link: ""
    },
    {
        titulo: "Página web pessoal",
        categoria: "Prática front-end",
        descricao: "Página para praticar estrutura HTML e estilos com CSS.",
        tecnologias: ["HTML", "CSS"],
        filtro: ["web"],
        icone: "🌐",
        link: ""
    },
    {
        titulo: "Formulário interativo",
        categoria: "Exercício de interface",
        descricao: "Formulário para praticar campos, eventos e validação.",
        tecnologias: ["HTML", "CSS", "JavaScript"],
        filtro: ["javascript", "web"],
        icone: "📝",
        link: ""
    }
];

const botaoMenu = document.getElementById("botao-menu");
const linksMenu = document.getElementById("links-menu");
const botaoTema = document.getElementById("botao-tema");
const textoTema = document.getElementById("texto-tema");
const formulario = document.getElementById("formulario-contato");
const mensagemFormulario = document.getElementById("mensagem-formulario");
const botaoTopo = document.getElementById("botao-topo");
const listaProjetos = document.getElementById("lista-projetos");

// Retorna uma saudação de acordo com a hora informada.
function obterSaudacao(hora) {
    if (hora >= 5 && hora < 12) {
        return "Bom dia!";
    } else if (hora >= 12 && hora < 18) {
        return "Boa tarde!";
    } else {
        return "Boa noite!";
    }
}

// Atualiza a saudação usando o horário atual do computador.
function atualizarSaudacao() {
    const horaAtual = new Date().getHours();
    document.getElementById("saudacao").textContent =
        obterSaudacao(horaAtual);
}

// Abre ou fecha o menu e atualiza aria-expanded.
function alternarMenu() {
    const menuAberto = linksMenu.classList.toggle("aberto");

    botaoMenu.setAttribute("aria-expanded", String(menuAberto));
    botaoMenu.setAttribute(
        "aria-label",
        menuAberto ? "Fechar menu" : "Abrir menu"
    );

    botaoMenu.textContent = menuAberto ? "✕" : "☰";
}

// Fecha o menu depois de clicar em um link.
function fecharMenu() {
    linksMenu.classList.remove("aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-label", "Abrir menu");
    botaoMenu.textContent = "☰";
}

// Carrega o tema salvo no navegador, quando disponível.
function carregarTema() {
    let temaSalvo = null;

    try {
        temaSalvo = localStorage.getItem("tema-portfolio");
    } catch (erro) {
        temaSalvo = null;
    }

    if (temaSalvo === "claro") {
        document.body.classList.add("tema-claro");
    }

    atualizarBotaoTema();
}

// Alterna entre tema escuro e claro.
function alternarTema() {
    const temaClaro = document.body.classList.toggle("tema-claro");

    try {
        localStorage.setItem(
            "tema-portfolio",
            temaClaro ? "claro" : "escuro"
        );
    } catch (erro) {
        // O site continua funcionando se o navegador bloquear o armazenamento.
    }

    atualizarBotaoTema();
}

// Atualiza o texto acessível do botão de tema.
function atualizarBotaoTema() {
    const temaClaro = document.body.classList.contains("tema-claro");

    textoTema.textContent = temaClaro ? "Modo escuro" : "Modo claro";

    botaoTema.setAttribute(
        "aria-label",
        temaClaro ? "Ativar modo escuro" : "Ativar modo claro"
    );
}

// Cria uma ilustração SVG para ser usada como imagem do projeto.
function criarImagemProjeto(icone, titulo) {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 320">
            <rect width="640" height="320" rx="24" fill="#17223b"/>
            <circle cx="320" cy="145" r="95" fill="#70e7f2" opacity="0.12"/>
            <text x="320" y="165" font-size="86"
                text-anchor="middle">${icone}</text>
            <text x="320" y="260" font-family="Arial"
                font-size="25" font-weight="bold"
                text-anchor="middle" fill="#f3f6ff">${titulo}</text>
        </svg>
    `;

    return "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(svg);
}

// Gera os cards de projetos usando o array e forEach.
function mostrarProjetos(filtro = "todos") {
    listaProjetos.innerHTML = "";

    const projetosFiltrados = projetos.filter(function (projeto) {
        return filtro === "todos" || projeto.filtro.includes(filtro);
    });

    if (projetosFiltrados.length === 0) {
        const aviso = document.createElement("p");
        aviso.className = "sem-projetos";
        aviso.textContent = "Nenhum projeto encontrado.";
        listaProjetos.appendChild(aviso);
        return;
    }

    projetosFiltrados.forEach(function (projeto) {
        const card = document.createElement("article");
        card.className = "cartao cartao-projeto";

        const imagem = document.createElement("img");
        imagem.className = "imagem-projeto";
        imagem.src = criarImagemProjeto(projeto.icone, projeto.titulo);
        imagem.alt = "Ilustração do projeto " + projeto.titulo;
        card.appendChild(imagem);

        const categoria = document.createElement("span");
        categoria.className = "rotulo-projeto";
        categoria.textContent = projeto.categoria;
        card.appendChild(categoria);

        const titulo = document.createElement("h3");
        titulo.textContent = projeto.titulo;
        card.appendChild(titulo);

        const descricao = document.createElement("p");
        descricao.textContent = projeto.descricao;
        card.appendChild(descricao);

        const tecnologias = document.createElement("div");
        tecnologias.className = "tecnologias-projeto";

        projeto.tecnologias.forEach(function (tecnologia) {
            const etiqueta = document.createElement("span");
            etiqueta.textContent = tecnologia;
            tecnologias.appendChild(etiqueta);
        });

        card.appendChild(tecnologias);

        const link = document.createElement("a");
        link.className = "link-projeto";

        if (projeto.link) {
            link.href = projeto.link;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = "Ver projeto ↗";
        } else {
            link.href = "#contato";
            link.textContent = "Em breve";
        }

        card.appendChild(link);
        listaProjetos.appendChild(card);
    });
}

// Aplica o filtro escolhido pelo usuário.
function filtrarProjetos(evento) {
    const botaoSelecionado = evento.currentTarget;
    const filtro = botaoSelecionado.dataset.filtro;

    document.querySelectorAll(".filtro").forEach(function (botao) {
        const selecionado = botao === botaoSelecionado;

        botao.classList.toggle("ativo", selecionado);
        botao.setAttribute("aria-pressed", String(selecionado));
    });

    mostrarProjetos(filtro);
}

// Exibe a mensagem de erro abaixo de um campo.
function mostrarErro(campo, mensagem) {
    const elementoErro = document.getElementById("erro-" + campo.id);

    elementoErro.textContent = mensagem;
    campo.setAttribute("aria-invalid", mensagem ? "true" : "false");
}

// Verifica os campos e retorna true ou false.
function validarFormulario() {
    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const mensagem = document.getElementById("mensagem");
    const consentimento = document.getElementById("consentimento");

    let valido = true;

    mensagemFormulario.textContent = "";

    [nome, email, mensagem].forEach(function (campo) {
        mostrarErro(campo, "");
    });

    document.getElementById("erro-consentimento").textContent = "";

    consentimento.setAttribute("aria-invalid", "false");

    if (nome.value.trim() === "") {
        mostrarErro(nome, "Preencha seu nome.");
        valido = false;
    }

    if (email.value.trim() === "") {
        mostrarErro(email, "Preencha seu e-mail.");
        valido = false;
    } else if (
        !email.value.includes("@") ||
        !email.value.includes(".")
    ) {
        mostrarErro(email, 'O e-mail precisa conter "@" e ".".');
        valido = false;
    }

    if (mensagem.value.trim() === "") {
        mostrarErro(mensagem, "Escreva uma mensagem.");
        valido = false;
    } else if (mensagem.value.trim().length < 20) {
        mostrarErro(
            mensagem,
            "A mensagem deve ter pelo menos 20 caracteres."
        );
        valido = false;
    }

    if (!consentimento.checked) {
        document.getElementById("erro-consentimento").textContent =
            "Marque a caixa de consentimento.";

        consentimento.setAttribute("aria-invalid", "true");
        valido = false;
    }

    return valido;
}

// Processa o formulário sem enviar dados para um servidor.
function processarFormulario(evento) {
    evento.preventDefault();

    if (validarFormulario()) {
        mensagemFormulario.textContent =
            "Formulário validado com sucesso! Nenhum dado foi enviado.";

        formulario.reset();
    } else {
        mensagemFormulario.textContent =
            "Confira os campos destacados e tente novamente.";

        const primeiroInvalido =
            formulario.querySelector('[aria-invalid="true"]');

        if (primeiroInvalido) {
            primeiroInvalido.focus();
        }
    }
}

// Mostra o botão de topo quando a página é rolada.
function controlarBotaoTopo() {
    botaoTopo.classList.toggle("visivel", window.scrollY > 450);
}

// Leva o usuário ao início da página.
function voltarAoTopo() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Insere o ano atual no rodapé.
function inserirAnoAtual() {
    document.getElementById("ano-atual").textContent =
        new Date().getFullYear();
}

botaoMenu.addEventListener("click", alternarMenu);

linksMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", fecharMenu);
});

botaoTema.addEventListener("click", alternarTema);

document.querySelectorAll(".filtro").forEach(function (botao) {
    botao.addEventListener("click", filtrarProjetos);
});

formulario.addEventListener("submit", processarFormulario);
window.addEventListener("scroll", controlarBotaoTopo);
botaoTopo.addEventListener("click", voltarAoTopo);

atualizarSaudacao();
carregarTema();
mostrarProjetos();
inserirAnoAtual();