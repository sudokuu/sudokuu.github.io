
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
    //Funcao que verifica o numero recem colocado
    verificaTabela();
}

// seta os eventos necessários da celula com o nome passado
function setEventsForCellNamed(name) {
    var cell = document.getElementById(name);
    cell.onclick = function(){cellClick(cell)};
}

// Esse metodo recebe uma matrix que vai ficar no lugar de tabelaC
function verificaTabela(){
    var tabelaC= [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [2, 3, 4, 5, 6, 7, 8, 9, 1],
        [3, 4, 5, 6, 7, 8, 9, 1, 2],
        [4, 5, 6, 7, 8, 9, 1, 2, 3],
        [5, 6, 7, 8, 9, 1, 2, 3, 4],
        [6, 7, 8, 9, 1, 2, 3, 4, 5],
        [7, 8, 9, 1, 2, 3, 4, 5, 6],
        [8, 9, 1, 2, 3, 4, 5, 6, 7],
        [9, 1, 2, 3, 4, 5, 6, 7, 8]];

    for (var i = 0; i < 9; i++) {
        for(var j = 0; j < 9; j++){
            comparaCelulas("a"+i+j, tabelaC[i][j]);
        }
    }
}

function comparaCelulas(userCell, serverCell){
    var tabelaUsuario = document.getElementById(userCell);
    if(tabelaUsuario.innerHTML == ""){
    } else
    if(tabelaUsuario.innerHTML == serverCell)
    {
        tabelaUsuario.style.backgroundColor = "white";
    }else
    if(tabelaUsuario.innerHTML != serverCell){
        tabelaUsuario.style.backgroundColor = "#FF6A6A";
    }
}