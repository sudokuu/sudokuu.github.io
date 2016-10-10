
// inicia um novo jogo com a dificuldade indicada
// 0 - facil
// 1 - medio
// 2 - dificil
function novoJogo(dificuldade) {

  document.getElementById("menu-dificuldade").style.display = "none";
  document.getElementById("jogo").style.display = "block";

  // pega a tabela do jogo e coloca os eventos necessários e LIMPA todas as celulas
  for (var i = 0; i < 9; i++) {
      for(var j = 0; j < 9; j++) {
          setEventsForCellNamed("a"+ i + j);
          setCellText("a"+ i + j, "");
      }
  }

  // inicia o tempo
  startTimer();
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
}

// seta os eventos necessários da celula com o nome passado
function setEventsForCellNamed(name) {
    var cell = document.getElementById(name);
    cell.onclick = function(){cellClick(cell)};
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
