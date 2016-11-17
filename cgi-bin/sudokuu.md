# SUDOKUU.PY

Script em Python para fornecer um jogo de Sudoku **aleatório** dentro de um conjunto de possibilidades para cada **dificuldade** dando uma resposta como a seguinte:
```
419006780
207500304
650074010
100000807
875300692
960000031
000600103
706003520
320485970
```
Os **zeros** representam os espaços que o jogador deve preencher no jogo.

### Geração dos Jogos
Os jogos fornecidos são apenas o resultado de um sorteio dentro de um conjunto limitado de jogos possíveis previamente gerados provenientes de várias fontes, como revistas, jornais e jogos eletrônicos.

### Utilização

A chamada para o script tem apenas um argumento, a **dificuldade**, que é um número, **0**, **1** ou **2**.
 *Ex:*
```
sudokuu.py?dificuldade=0
```
Os números **0**, **1** e **2** representam as dificuldades **fácil**, **médio** e **difícil**, respectivamente.
