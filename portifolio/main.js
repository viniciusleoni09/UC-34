/* =========================================================
   PORTFÓLIO - Vinicius
   Menu hambúrguer, saudação, tema, formulário e ano
   ========================================================= */

/* ===== 1. Menu hambúrguer ===== */
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

function fecharMenu() {
  menu.classList.remove("aberto");
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.setAttribute("aria-label", "Abrir menu");
}

menuBtn.addEventListener("click", () => {
  const aberto = menu.classList.toggle("aberto");
  menuBtn.setAttribute("aria-expanded", String(aberto));
  menuBtn.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
});

// Fecha o menu ao clicar em um link ou ao apertar Esc
menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", fecharMenu);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") fecharMenu();
});

/* ===== 2. Saudação dinâmica ===== */
const hora = new Date().getHours();
let saudacao;

if (hora >= 5 && hora < 12) {
  saudacao = "Bom dia";
} else if (hora >= 12 && hora < 18) {
  saudacao = "Boa tarde";
} else {
  saudacao = "Boa noite";
}

document.getElementById("saudacao").textContent =
  `${saudacao}, eu sou o Vinicius!`;

/* ===== 3. Modo claro/escuro ===== */
const temaBtn = document.getElementById("tema-btn");
const raiz = document.documentElement;

function aplicarTema(tema) {
  raiz.setAttribute("data-theme", tema);
  temaBtn.textContent = tema === "dark" ? "☀️" : "🌙";
  try {
    localStorage.setItem("tema", tema);
  } catch (e) {
    /* se o navegador bloquear o armazenamento, segue sem salvar */
  }
}

let temaSalvo = null;
try {
  temaSalvo = localStorage.getItem("tema");
} catch (e) {}

const prefereEscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
aplicarTema(temaSalvo || (prefereEscuro ? "dark" : "light"));

temaBtn.addEventListener("click", () => {
  const atual = raiz.getAttribute("data-theme");
  aplicarTema(atual === "dark" ? "light" : "dark");
});

/* ===== 4. Validação do formulário ===== */
const form = document.getElementById("form-contato");
const erro = document.getElementById("erro");
const sucesso = document.getElementById("sucesso");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  erro.textContent = "";
  sucesso.textContent = "";

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();
  const consentimento = document.getElementById("consentimento").checked;
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (nome.length < 3) {
    erro.textContent = "Digite seu nome (mínimo de 3 letras).";
    document.getElementById("nome").focus();
  } else if (!emailValido) {
    erro.textContent = "Digite um e-mail válido.";
    document.getElementById("email").focus();
  } else if (mensagem.length < 10) {
    erro.textContent = "Escreva uma mensagem com pelo menos 10 caracteres.";
    document.getElementById("mensagem").focus();
  } else if (!consentimento) {
    erro.textContent = "Marque o consentimento para enviar.";
    document.getElementById("consentimento").focus();
  } else {
    sucesso.textContent = "Mensagem validada com sucesso! Obrigado pelo contato.";
    form.reset();
  }
});

/* ===== 5. Ano automático ===== */
document.getElementById("ano").textContent = new Date().getFullYear();