const keyboard = document.querySelector("#keyboard"); //se quiere ver el teclado en pantalla//
const grid = document.querySelector("#grid");
const keyboardLetters = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "delete"],
];

const listElements = [];
let myAnswer = []; //lo que yo escribire al presionar las letras del teclado//
const secretWord = ["p", "l", "a", "t", "z", "i"]; //palabra secreta//

let positions = []; //
let attempts = 0;

const rows = [];
for (let row = 0; row < 5; row++) {
  const list = document.createElement("ul");
  list.classList.add("grid-row");
  for (let column = 0; column < 6; column++) {
    const listItem = document.createElement("li");
    listItem.classList.add("row-item");
    listItem.id = `${row}-${column}`;
    list.appendChild(listItem);
  }
  rows.push(list);
}

grid.append(...rows);

keyboardLetters.map((letters) => {  //se tiene el teclado de letras y se va a iterar por cada letra: //
  const list = document.createElement("ul"); //una lista contenedora//
  letters.map((letter) => { //se tienen todas las teclas del teclado//
    const listItem = document.createElement("li"); //crear una lista con las teclas//
    switch (letter) {
      case "enter": //si presiono enter se revisa la palabra//
        listItem.innerHTML = `
          <button onclick="checkWord()" id=${letter}>${letter}</button>
        `;
        break;
      case "delete":  //si presiono delete se borra la palabra//
        listItem.innerHTML = `
          <button onclick="deleteLetter()" id=${letter}>${letter}</button>
        `;
        break;
      default: //si presiono una letra se escribe //
        listItem.innerHTML = `
          <button onclick="pressLetter()" id=${letter}>${letter}</button>
        `;
        break;
    }
    list.appendChild(listItem); //appendChild hace que podamos agregarle a nuestro elemento lista otro elemento mas (listItem)//
  });
  listElements.push(list); //push hace que a nuestro array listElement le agreguemos un elemento al final//
});

keyboard.append(...listElements); //permite desde el array keyboard agregar toda la lista de elemento//

const checkWord = () => {  //revisa las palabras//
  if (positions.every((position) => position === "green")) { //si las teclas tienen verde entonces escribe en mensaje de felicidades//
    alert("Ya ganaste, salte de aqui por favor");
  }
  if (attempts === 5) { //si intenta más de 5 veces descubrir la palabra secreta//
    alert("Hey ya no tienes intentos");
    return;
  }
  if (myAnswer.length === 6) { //si la palabra escrita tiene 6 letras//
    attempts += 1;
    for (let i = 0; i < 6; i++) {
      switch (true) {
        case myAnswer[i] === secretWord[i]: //si se escribe la palabra secreta (platzi) marca con verde las teclas donde va la palabra 
          positions.push("green");
          break;
        case secretWord.includes(myAnswer[i]): //si escribe una palabra de 6 letras y contiene letras iguales a las de "platzi" las marca con color cafe//
          positions.push("marron");
          break;
        default: //si escribe una palabra de 6 letras y no contiene ninguna letra igual a "platzi" marca con gris las teclas donde va la palabra//
          positions.push("gray");
          break;
      }
    }
    positions.map((color, id) => {
      const item = document.getElementById(`${attempts - 1}-${id}`);
      item.classList.add(color);
    });
    myAnswer = [];
    positions = [];
  } else {
    alert(`Hey, tu respuesta tiene solo ${myAnswer.length} caracteres`);
  }
};

const deleteLetter = () => { //funcion para borrar letras//
  if (myAnswer.length === 0) {  //si la presiono y no hay nada escrito aparece un mensaje//
    alert("Hey no tienes nada escrito");
  }
  const item = document.getElementById(`${attempts}-${myAnswer.length - 1}`);
  item.textContent = "";
  myAnswer.pop();
};

const pressLetter = () => { //funcion al presionar una tecla//
  const button = event.target; //cuando se hace click a un elemento target es el elemento (boton) el event.tarjet es para seleccionar el elemento al cual le estamos haciendo click//
  if (myAnswer.length < 6) { //si la palabra tiene menos de 6 caracteres//
    const currentItem = document.getElementById(
      `${attempts}-${myAnswer.length}`
    );
    currentItem.textContent = button.textContent;
    myAnswer.push(button.id);
  } else { //si escribe más de 6 letras manda el mensaje: //
    alert("Hey, tu palabra ya está completa");
  }
};

const reset = () => {
  event.target.disabled = true;
  for (let row = 0; row < 5; row++) {
    for (let column = 0; column < 6; column++) {
      const item = document.getElementById(`${row}-${column}`);
      item.textContent = "";
      item.classList.remove("green");
      item.classList.remove("marron");
      item.classList.remove("gray");
    }
  }
  attempts = 0;
};