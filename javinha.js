


var varDificuldade;

// estado
var pausado = 0;

//Tabela Completo
var tabelaCompleto = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]];

// inicia um novo jogo com a dificuldade indicada
// 0 - facil
// 1 - medio
// 2 - dificil
function novoJogo(dificuldade) {

    varDificuldade = dificuldade;

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
    $.get("http://ec2-52-67-171-250.sa-east-1.compute.amazonaws.com/cgi-bin/sudokuu.py?dificuldade=" + dificuldade, function(response) {

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
            if(linha < 9) {
                if (response[i] == '\n') {
                      linha++;
                      caractere = 0;
                }
                else {
                      jogo[linha][caractere] = response[i];
                      caractere++;
                }
            }
            else {
                if (response[i] == '\n') {
                      linha++;
                      caractere = 0;
                }
                else {
                      tabelaCompleto[linha-9][caractere] = response[i];
                      caractere++;
                }
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
        pausado = 0;

        // primeiro tick
        tick();
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

    verifyTable(number, selectedCell);
    //VERIFICA AS CELULAS VERMELHAS
    if(varDificuldade ==  1){
        verificaVermelho();
    }

    //Verifica se todas as celulas tem algum valor, se todas elas tiverem verifica se os valores estão corretos
    verifyTableIsCorrect(verificaCompletude());
}
//Dá parabens para o jogador ARRUMA AS PARADAS
function parabens (){
    var parabens = document.getElementById("parabens");
    parabens.style.display = "block";

    pausado = 1;

    if($('#tempoVitoria').is(':visible'))
    {
        var time = document.getElementById("time").innerHTML;
        $('#tempoVitoria').html(time);

        var nivel;
        switch (varDificuldade) {
            case 0:
                nivel = "F&aacute;cil";
            break;
            case 1:
                nivel = "M&eacute;dio";
            break;
            case 2:
                nivel = "Dif&iacute;cil";
            break;
        }

        $('#nivelVitoria').html(nivel);
    }
}

function escondeParabens() {
    var parabens = document.getElementById("parabens");
    parabens.style.display = "none";
}

//verifica se o jogo está correto - Se estiver ele chama função parabens
function verifyTableIsCorrect(completo){
    if(completo == 1)
    {
        for(var i = 0; i < 9; i ++){
            for(var j = 0; j < 9; j ++){
                if(document.getElementById("a"+i+j).innerHTML != tabelaCompleto[i][j]){
                    return 0;
                }
            }
        }
        parabens();
    }
}

//Verica se todas as celulas tem algum valor qualquer
function verificaCompletude (){
    for(var i = 0; i < 9 ; i++){
        for(var j = 0; j < 9; j++){
            if(document.getElementById("a"+i+j).innerHTML == ""){
                return 0;
            }
        }
    }
    return 1;
}

// seta os eventos necessários da celula com o nome passado
function setEventsForCellNamed(name) {
    var cell = document.getElementById(name);
    cell.onclick = function(){cellClick(cell)};
}

function verifyTable(valor, varSelectedCell){
    var linha = varSelectedCell.charAt(1);
    var coluna = varSelectedCell.charAt(2);

    //Se estiver com a dificuldade facil irá vir para aqui
    if(varDificuldade == 0){
        if(document.getElementById(selectedCell).innerHTML == tabelaCompleto[linha][coluna]){
            document.getElementById(selectedCell).style.backgroundColor = "white";
        }else
            document.getElementById(selectedCell).style.backgroundColor = "#FF6A6A";

    }
    //Se estiver com a dificuldade media irá vir para aqui
    if(varDificuldade == 1){
        var cont = 0;
        cont = cont + verfica3x3 (linha, coluna, varSelectedCell);
        for(var i = 0; i < 9; i++)
        {
            //verifica a linha
            if(varSelectedCell != ("a"+linha+i))
            {
                cont = cont + verificaLinha("a"+linha+i,valor, varSelectedCell);
            }
            //Verifica coluna
            if(varSelectedCell != ("a"+i+coluna))
            {
                cont = cont + verificaColuna("a"+i+coluna,valor, varSelectedCell);
            }
        }
        if(cont == 0){
            document.getElementById(varSelectedCell).style.backgroundColor = "white";
        }

    }
    //Se estiver com a dificuldade dificil irá vir para aqui
    if(varDificuldade == 2){
        //ACHO QUE NÃO PRECISA VERIFICAR AQUI LELEK
    }
}

//Verifica 3x3 - QUERO SÓ VÊ
function verfica3x3 (linha, coluna, varSelectedCell)
{
    if((linha >= 0 && linha <3) && (coluna >= 0 && coluna < 3)){
        for(var i = 0; i < 3 ;i ++){
            for(var j = 0; j < 3; j++)
            {
                if(linha != i && coluna != j){
                    if(document.getElementById(varSelectedCell).innerHTML ==  document.getElementById("a"+i+j).innerHTML)
                    {
                        document.getElementById(varSelectedCell).style.backgroundColor = "#FF6A6A";
                        return 1;
                    }
                }
            }
        }
    }else if((linha >= 0 && linha <3) && (coluna >= 3 && coluna < 6)){
        for(var i = 0; i < 3 ;i ++){
            for(var j = 3; j < 6; j++)
            {
                if(linha != i && coluna != j){
                    if(document.getElementById(varSelectedCell).innerHTML ==  document.getElementById("a"+i+j).innerHTML)
                    {
                        document.getElementById(varSelectedCell).style.backgroundColor = "#FF6A6A";
                        return 1;
                    }
                }
            }
        }
    }else if((linha >= 0 && linha <3) && (coluna >= 6 && coluna < 9)){
        for(var i = 0; i < 3 ;i ++){
            for(var j = 6; j < 9; j++)
            {
                if(linha != i && coluna != j){
                    if(document.getElementById(varSelectedCell).innerHTML ==  document.getElementById("a"+i+j).innerHTML)
                    {
                        document.getElementById(varSelectedCell).style.backgroundColor = "#FF6A6A";
                        return 1;
                    }
                }
            }
        }
    }else if((linha >= 3 && linha <6) && (coluna >= 0 && coluna < 3)){
        for(var i = 3; i < 6 ;i ++){
            for(var j = 0; j < 3; j++)
            {
                if(linha != i && coluna != j){
                    if(document.getElementById(varSelectedCell).innerHTML ==  document.getElementById("a"+i+j).innerHTML)
                    {
                        document.getElementById(varSelectedCell).style.backgroundColor = "#FF6A6A";
                        return 1;
                    }
                }
            }
        }
    }else if((linha >= 3 && linha <6) && (coluna >= 3 && coluna < 6)){
        for(var i = 3; i < 6 ;i ++){
            for(var j = 3; j < 6; j++)
            {
                if(linha != i && coluna != j){
                    if(document.getElementById(varSelectedCell).innerHTML ==  document.getElementById("a"+i+j).innerHTML)
                    {
                        document.getElementById(varSelectedCell).style.backgroundColor = "#FF6A6A";
                        return 1;
                    }
                }
            }
        }
    }else if((linha >= 3 && linha <6) && (coluna >= 6 && coluna < 9)){
        for(var i = 3; i < 6 ;i ++){
            for(var j = 6; j < 9; j++)
            {
                if(linha != i && coluna != j){
                    if(document.getElementById(varSelectedCell).innerHTML ==  document.getElementById("a"+i+j).innerHTML)
                    {
                        document.getElementById(varSelectedCell).style.backgroundColor = "#FF6A6A";
                        return 1;
                    }
                }
            }
        }
    }else if((linha >= 6 && linha <9) && (coluna >= 0 && coluna < 3)){
        for(var i = 6; i < 9 ;i ++){
            for(var j = 0; j < 3; j++)
            {
                if(linha != i && coluna != j){
                    if(document.getElementById(varSelectedCell).innerHTML ==  document.getElementById("a"+i+j).innerHTML)
                    {
                        document.getElementById(varSelectedCell).style.backgroundColor = "#FF6A6A";
                        return 1;
                    }
                }
            }
        }
    }else if((linha >= 6 && linha <9) && (coluna >= 3 && coluna < 6)){
        for(var i = 6; i < 9 ;i ++){
            for(var j = 3; j < 6; j++)
            {
                if(linha != i && coluna != j){
                    if(document.getElementById(varSelectedCell).innerHTML ==  document.getElementById("a"+i+j).innerHTML)
                    {
                        document.getElementById(varSelectedCell).style.backgroundColor = "#FF6A6A";
                        return 1;
                    }
                }
            }
        }
    }else if((linha >= 6 && linha <9) && (coluna >= 6 && coluna < 9)){
        for(var i = 6; i < 9 ;i ++){
            for(var j = 6; j < 9; j++)
            {
                if(linha != i && coluna != j){
                    if(document.getElementById(varSelectedCell).innerHTML ==  document.getElementById("a"+i+j).innerHTML)
                    {
                        document.getElementById(varSelectedCell).style.backgroundColor = "#FF6A6A";
                        return 1;
                    }
                }
            }
        }
    }
    return 0;
}

//Verifica linha  - só funciona com o usuário
function verificaLinha (id, valor, varSelectedCell){
        var celula = document.getElementById(id);
    if(celula.innerHTML == valor){
        document.getElementById(varSelectedCell).style.backgroundColor = "#FF6A6A";
        return 1;
    }else {
        return 0;
    }
}

//Verifica coluna - só funciona com o usuário
function verificaColuna (id, valor, varSelectedCell){
    var celula = document.getElementById(id);
    if(celula.innerHTML == valor){
        document.getElementById(varSelectedCell).style.backgroundColor = "#FF6A6A";
        return 1;
    }else {
        return 0;
    }
}

function verificaVermelho(){
    for(var i = 0; i < 9 ; i++){
        for(var j = 0; j < 9; j++){
            if(document.getElementById("a"+i + j).innerHTML != ""){
                verifyTable(document.getElementById("a"+i + j).innerHTML,"a"+i + j);
            }
        }
    }
}

// EU TIREI O IF PQ ELE NÃO FAZ SENTIDO... eu acho
function celulasBrancas (userCell){
    //if(document.getElementById(userCell).innerHTML == ""){
		document.getElementById(userCell).style.backgroundColor = "white";
    //}
}

// momento inicial do timer
var startTime = 0;
var timerID = 0;

// guarda o momento da pausa pra diminuir e continuar depois
var pausaTime;

function startTimer() {
    // guarda o momento inicial
    startTime = new Date();
}

// tick de cada segundo
function tick() {
    if(pausado == 0) {
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
}

// pausa o relógio do jogo
function pausa() {
    // guarda o momento
    pausaTime = new Date();

    pausado = 1;
}

// continua o jogo, volta a contar o relógio
function continuar() {
    var now = new Date();
    // pega o tempo total de pausa
    var diff = now.getTime() - pausaTime.getTime() + startTime.getTime();
    startTime = new Date(diff);

    pausado = 0;
    // volta a contar
    tick();
}

// mostra o tempo no modal
function mostraTempo() {
    if($('#tempoPausa').is(':visible'))
    {
        // pausa o jogo
        pausa();

        // pega o tempo e coloca no modal
        var time = document.getElementById("time").innerHTML;
        $('#tempoPausa').html("Seu tempo: " + time);
    }
}
