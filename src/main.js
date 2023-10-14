/*
    1-Crear las tarjetas
        a-Armar array con las distintas variedades (colores, imagenes, etc...)
        b-Duplicar array 
        c-Mezclar el orden 
        d-Asignar a cada cuadro del tablero un elemento del array
    2-Comenzar juego
        a-jugador hace click en cuadro y se muestra lo que contiene
        b-se repite paso anterior
        c-compara contenido de ambos cadros clickeados
            si: -el jugador clickeo las 2 veces el mismo cuadro, espero que seleccione otro
            sino: -el contenido de los cuadros es igual, desaparecen
            sino: -el contenido de los cuadros es diferente, se oculta el contenido del cuadro nuevamente
        d-se repite el proceso (vuelvo a paso a)
    3-Fin del juego
        a-Cada vez que el jugador encuentra un par verifico que queden cuadros en el tablero
        b-Si no quedan mas cuadros finaliza el juego
*/
let $firstSquare = null;
let roundNumber = 0;

document.querySelector("#start").onclick = startGame;

function startGame() {
  const colors = setColors();
  setSquares(colors);
  handleInterface("playerTurn");
  handleGame();
}

function handleInterface(key) {
  if (key === "playerTurn") {
    handleHeaderMessage(`Round N° ${roundNumber}`);
    handleButtonView(false);
  } else if (key === "endGame") {
    handleHeaderMessage(`Congrats! you won the game in ${roundNumber} rounds`);
  }
}

function handleHeaderMessage(message) {
  document.querySelector("#header-message").innerText = message;
}

function handleButtonView(state) {
  if (state) {
    document.querySelector("#start").classList.remove("d-none");
  } else {
    document.querySelector("#start").classList.add("d-none");
  }
}

function setColors() {
  const baseColors = ["red", "green", "blue", "yellow", "black", "pink"];
  const repeatColors = baseColors.concat(baseColors);

  const randomColors = repeatColors.sort(function () {
    return 0.5 - Math.random();
  });

  return randomColors;
}

function setSquares(colors) {
  const $squares = document.querySelectorAll(".square");
  colors.forEach(function (color, i) {
    $squares[i].classList.add(color);
  });
}

function handleGame() {
  document.querySelectorAll(".square").forEach(($square) => {
    $square.onclick = handleUserClick;
  });
}

function handleUserClick(e) {
  const $newSquare = e.target;
  console.log($newSquare);
  showSquare($newSquare);

  if ($firstSquare === null) {
    $firstSquare = $newSquare;
  } else {
    roundNumber++;
    if ($firstSquare === $newSquare) {
      return;
    } else if ($firstSquare.className === $newSquare.className) {
      deleteSquare($firstSquare, $newSquare);
      evaluateEndGame();
    } else {
      hiddenSquare($firstSquare, $newSquare);
    }
    $firstSquare = null;
    handleInterface("playerTurn");
  }
}

function showSquare(square) {
  square.classList.add("active");
}

function deleteSquare(square1, square2) {
  setTimeout(function () {
    square1.parentElement.classList.add("delete");
    square2.parentElement.classList.add("delete");
    square1.remove();
    square2.remove();
  }, 500);
}

function hiddenSquare(square1, square2) {
  setTimeout(function () {
    square1.classList.remove("active");
    square2.classList.remove("active");
  }, 500);
}

function evaluateEndGame() {
  setTimeout(function () {
    if (document.querySelectorAll(".square").length === 0) {
      handleInterface("endGame");
    }
  }, 500);
  return;
}
