let totalCartas = 0
let parrots = ['unicornparrot', 'unicornparrot', 'tripletsparrot', 'tripletsparrot', 'metalparrot', 'metalparrot', 'fiestaparrot', 'fiestaparrot', 'bobrossparrot', 'bobrossparrot', 'explodyparrot', 'explodyparrot', 'revertitparrot', 'revertitparrot']
let imagem1 = null
let imagem2 = null
let upCartas = []
let src1 = null
let src2 = null
let intervalo = null
let contador = 0
let totalJogadas = 0
let front = null
let back = null
let carta1 = null
let relogio = document.querySelector('.relogio')
let section = document.querySelector('section')
let naoVirarCarta = false

function iniciarJogo() {
    totalCartas = parseInt(prompt('Quantas cartas você deseja? (números pares de 4 à 14)'))
    let escolhas = [4, 6, 8, 10, 12, 14]
    let i = 0
    while (totalCartas !== escolhas[i]) {
        i++
        if (i === escolhas.length) {
            totalCartas = parseInt(prompt('Quantas cartas você deseja? (números pares de 4 à 14)'))
            i = 0
        }
    }

    parrots.splice(totalCartas, (14 - totalCartas));
    parrots.sort(comparador)

    for (let k = 0; k < totalCartas; k++) {
        section.innerHTML += `
    <div class="carta" onclick="virarCarta(this)" data-identifier="card">    
        <div class="face frontFace" data-identifier="front-face">
        <img src="imagens/${parrots[k]}.gif" alt="${parrots[k]}">
        </div>
        <div class="face backFace" data-identifier="back-face">
        <img src="imagens/front.png" alt="passaro">
        </div>
    </div>`
    }
}

function virarCarta(cartaSelecionada) {
    if (naoVirarCarta === false) {
        front = cartaSelecionada.querySelector('.frontFace')
        let selecionada = front.classList.contains('show-front-face')

        if (selecionada === false) {
            front.classList.add('show-front-face')
            back = cartaSelecionada.querySelector('.backFace')
            back.classList.add('hide-front-face')

            upCartas = document.querySelectorAll('.show-front-face')
            if (upCartas.length % 2 === 1) {
                imagem1 = cartaSelecionada.querySelector('img')
                src1 = imagem1.getAttribute('src')
                carta1 = cartaSelecionada
                src2 = null
            } else {
                imagem2 = cartaSelecionada.querySelector('img')
                src2 = imagem2.getAttribute('src')
            }
            totalJogadas += 1
            if (totalJogadas === 1) {
                intervalo = setInterval(cronometro, 1000)
            }

            if (src1 === src2) {
                contador += 2
            } else if (src1 !== src2 && src2 !== null) {
                naoVirarCarta = true
                setTimeout(desvirar, 1000)
            }

            if (contador === totalCartas) {
                setTimeout(finalizarJogo, 500)
            }
        }
    }
}

function comparador() {
    return Math.random() - 0.5;
}

function cronometro() {
    relogio.innerHTML = parseInt(relogio.innerHTML) + 1
}

function desvirar() {
    front.classList.remove("show-front-face")
    back.classList.remove("hide-front-face")
    front = carta1.querySelector('.frontFace')
    back = carta1.querySelector('.backFace')
    front.classList.remove('show-front-face')
    back.classList.remove('hide-front-face')
    naoVirarCarta = false
}

function finalizarJogo() {
    alert(`Você ganhou em ${totalJogadas} jogadas e em ${parseInt(relogio.innerHTML)} segundos!`)
    clearInterval(intervalo)
    jogarNovamente()
}

function jogarNovamente() {
    let queroJogar = prompt('Quer jogar novamente? (sim ou não)')
    while (queroJogar !== 'sim' && queroJogar !== 'Sim' && queroJogar !== 'não' && queroJogar !== 'nao' && queroJogar !== 'Não' && queroJogar !== 'Nao') {
        queroJogar = prompt('Quer jogar novamente? (sim ou não)')
    }

    if (queroJogar === 'sim' || queroJogar === 'Sim') {
        section.innerHTML = ''
        relogio.innerHTML = 0
        totalJogadas = 0
        contador = 0
        parrots = ['unicornparrot', 'unicornparrot', 'tripletsparrot', 'tripletsparrot', 'metalparrot', 'metalparrot', 'fiestaparrot', 'fiestaparrot', 'bobrossparrot', 'bobrossparrot', 'explodyparrot', 'explodyparrot', 'revertitparrot', 'revertitparrot']
        intervalo = null
        imagem1 = null
        imagem2 = null
        src1 = null
        src2 = null
        upCartas = []
        iniciarJogo()
    } else {
        naoVirarCarta = true
    }
}

iniciarJogo()