
// inicia um novo jogo com a dificuldade indicada
// 0 - facil
// 1 - medio
// 2 - dificil
function novoJogo(dificuldade) {
    //Mostra ao usuário a dificuldade em que ele está jogando
    switch (dificuldade) {
        case 0:
            document.getElementById("infodificuldade").innerHTML = "N&iacute;vel: F&aacute;cil";
        break;
        case 1:
            document.getElementById("infodificuldade").innerHTML = "N&iacute;vel: M&eacute;dio";
        break;
        case 2:
            document.getElementById("infodificuldade").innerHTML = "N&iacute;vel: Dif&iacute;cil";
        break;
    }

    document.getElementById("menu-dificuldade").style.display = "none";
    document.getElementById("jogo").style.display = "block";

    // pega o jogo
    $.get("cgi-bin/sudokuu.py?dificuldade=" + dificuldade, function(response) {

        var linha = 0;
        var caractere = 0;

        var jogo = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]];

        for(var i = 0; i < response.length; i++) {
            if (response[i] == '\n') {
                  linha++;
                  caractere = 0;
            }
            else {
                  jogo[linha][caractere] = response[i];
                  caractere++;
            }
        }

        //pega a tabela do jogo e coloca os eventos necessários e LIMPA todas as celulas
        for (var i = 0; i < 9; i++) {
            for(var j = 0; j < 9; j++) {
                  setEventsForCellNamed("a"+ i + j);
                  if(jogo[i][j] == 0)
                  {
                      setCellText("a"+ i + j, "");
                      celulasBrancas("a"+ i + j);
                  }
                  else
                  {
                      setCellText("a"+ i + j, jogo[i][j]);
                  }
            }
        }

        startTimer();
    });
}

// exibição da tela inicial
function telaInicial() {
  document.getElementById("menu-dificuldade").style.display = "block";
  document.getElementById("jogo").style.display = "none";
}

// onclick geral
window.onclick = function(event) {
    var chooser = document.getElementById("chooser-modal");
    if (event.target == chooser) {
        chooser.style.display = "none";
    }
}


// seta o texto de uma celula
function setCellText(cellName, text) {
    var cell = document.getElementById(cellName);
    cell.innerHTML = text;
}

// id da celula selecionada para escolher o numero
var selectedCell = "";

// evento onclick das celulas do jogo
function cellClick(p) {
    selectedCell = p.id;

    var chooser = document.getElementById("chooser-modal");
    chooser.style.display = "block";

    var content = chooser.children[0];
    var offsets = p.getBoundingClientRect();
    content.style.top = offsets.top + 35 + "px";
}

// escolha de um numero no painel
function chooseNumber(number) {
    setCellText(selectedCell, number);

    var chooser = document.getElementById("chooser-modal");
    chooser.style.display = "none";
    verifyTable(number);
}


// seta os eventos necessários da celula com o nome passado
function setEventsForCellNamed(name) {
    var cell = document.getElementById(name);
    cell.onclick = function(){cellClick(cell)};
}

function verifyTable(valor){
    var linha = selectedCell.charAt(1);
    var coluna = selectedCell.charAt(2);
    var cont = 0;
    for(var i = 0; i < 9; i++)
    {
        //verifica a linha
        if(selectedCell != ("a"+linha+i))
        {
            cont = cont + verificaLinha("a"+linha+i,valor);
        }
        if(selectedCell != ("a"+i+coluna))
        {
            cont = cont + verificaColuna("a"+i+coluna,valor);
        }
    }
    if(cont == 0){
        document.getElementById(selectedCell).style.backgroundColor = "white";
    }
    window.console.log(cont);
}
function verificaLinha (id, valor){
    var celula = document.getElementById(id);
    if(celula.innerHTML == valor){
        document.getElementById(selectedCell).style.backgroundColor = "#FF6A6A";
        return 1;
    }else {
        return 0;
    }
}
function verificaColuna (id, valor){
    var celula = document.getElementById(id);
    if(celula.innerHTML == valor){
        document.getElementById(selectedCell).style.backgroundColor = "#FF6A6A";
        return 1;
    }else {
        return 0;
    }
}

function celulasBrancas (userCell){
    if(document.getElementById(userCell).innerHTML == ""){
		document.getElementById(userCell).style.backgroundColor = "white";
    }
}

// momento inicial do timer
var startTime = 0;
var timerID = 0;

function startTimer() {
    // guarda o momento inicial
    startTime = new Date();
    // faz o primeiro tick
    tick();
}

// tick de cada segundo
function tick() {
    var now = new Date();
    var diff = now - startTime;
    diff = new Date(diff);

    var sec = diff.getSeconds();
    var min = diff.getMinutes();
    var hours = diff.getHours()-21;

    if(sec < 10){
        sec = "0" + sec;
    }
    if(min < 10){
        min = "0" + min;
    }

    var time = document.getElementById("time");
    time.innerHTML = hours + ":" + min + ":" + sec;
    setTimeout("tick()", 1000);
}
