const grade = document.getElementById("grade");

const verificar = document.getElementById("verificar");

const atualizar = document.getElementById("atualizar");

const resultado = document.getElementById("resultado");


// =========================================
// CONFIGURAÇÃO DA MATRIZ
// =========================================

const LINHAS = 4;

const COLUNAS = 4;


// =========================================
// GABARITO
// =========================================

/*
    Imagens corretas:

    Linha 1:
    coluna 1
    coluna 3

    Linha 2:
    coluna 4

    Linha 3:
    coluna 3

    Linha 4:
    coluna 1
    coluna 3
    coluna 4


    IMPORTANTE:

    Aqui estamos utilizando
    linha-coluna começando em 1.

    Exemplo:

    "1-1" = primeira linha,
            primeira coluna.
*/

const corretos = new Set([

    "1-1",

    "1-3",

    "2-4",

    "3-3",

    "4-1",

    "4-3",

    "4-4"

]);


// =========================================
// CRIAR MATRIZ 4 X 4
// =========================================

function criarGrade() {

    // Limpa a grade
    grade.innerHTML = "";

    // Limpa a mensagem
    resultado.textContent = "";

    resultado.className = "";


    /*
        Cria 4 linhas
    */

    for (let linha = 1; linha <= LINHAS; linha++) {


        /*
            Cria 4 colunas
        */

        for (let coluna = 1; coluna <= COLUNAS; coluna++) {


            // Cria o quadrado
            const quadrado = document.createElement("button");


            // Define como botão
            quadrado.type = "button";


            // Adiciona a classe
            quadrado.classList.add("quadrado");


            /*
                Guarda a posição.

                Exemplo:

                linha = 1
                coluna = 3

                teremos:

                data-linha="1"
                data-coluna="3"
            */

            quadrado.dataset.linha = linha;

            quadrado.dataset.coluna = coluna;


            /*
                Informação de acessibilidade
            */

            quadrado.setAttribute(
                "aria-label",
                `Linha ${linha}, coluna ${coluna}`
            );


            // =====================================
            // CLIQUE NA IMAGEM
            // =====================================

            quadrado.addEventListener("click", function () {

                /*
                    Seleciona ou desseleciona
                    a imagem.
                */

                quadrado.classList.toggle("selecionado");

            });


            // Adiciona o quadrado na grade
            grade.appendChild(quadrado);

        }

    }

}


// =========================================
// PEGAR IMAGENS SELECIONADAS
// =========================================

function obterSelecionados() {

    const selecionados = new Set();


    /*
        Procura todos os quadrados
        que foram selecionados.
    */

    document
        .querySelectorAll(".quadrado.selecionado")
        .forEach(function (quadrado) {


            const linha = quadrado.dataset.linha;

            const coluna = quadrado.dataset.coluna;


            /*
                Cria a posição:

                linha-coluna

                Exemplo:

                "1-3"
            */

            const posicao = `${linha}-${coluna}`;


            selecionados.add(posicao);

        });


    return selecionados;

}


// =========================================
// VERIFICAR CAPTCHA
// =========================================

function verificarResposta() {


    // Pega as imagens selecionadas
    const selecionados = obterSelecionados();


    /*
        Primeiro verificamos
        se a quantidade é igual.

        Temos 7 imagens corretas.

        Portanto, o usuário precisa
        selecionar exatamente 7.
    */

    let acertou =
        selecionados.size === corretos.size;


    /*
        Agora verificamos cada imagem
        selecionada.
    */

    selecionados.forEach(function (posicao) {


        /*
            Se a posição selecionada
            não estiver no gabarito,
            a resposta está errada.
        */

        if (!corretos.has(posicao)) {

            acertou = false;

        }

    });


    // =====================================
    // MOSTRAR RESULTADO NAS IMAGENS
    // =====================================

    document
        .querySelectorAll(".quadrado")
        .forEach(function (quadrado) {


            const linha =
                quadrado.dataset.linha;


            const coluna =
                quadrado.dataset.coluna;


            const posicao =
                `${linha}-${coluna}`;


            /*
                Se a imagem foi selecionada
                e está correta.
            */

            if (
                corretos.has(posicao) &&
                quadrado.classList.contains("selecionado")
            ) {

                quadrado.classList.add("correto");

            }


            /*
                Se a imagem foi selecionada
                mas está errada.
            */

            if (
                !corretos.has(posicao) &&
                quadrado.classList.contains("selecionado")
            ) {

                quadrado.classList.add("incorreto");

            }

        });


    // =====================================
    // MENSAGEM
    // =====================================

    if (acertou) {


        resultado.textContent =
            "PARABÉNS você é realmente fã da Gretchen!";


        resultado.className =
            "resultado-sucesso";


    } else {


        resultado.textContent =
            "ERRADO! Gretchen ficaria decepcionada.";


        resultado.className =
            "resultado-erro";

    }

}


// =========================================
// BOTÃO VERIFICAR
// =========================================

verificar.addEventListener(
    "click",
    verificarResposta
);


// =========================================
// BOTÃO ATUALIZAR
// =========================================

atualizar.addEventListener(
    "click",
    criarGrade
);


// =========================================
// INICIAR CAPTCHA
// =========================================

criarGrade();
