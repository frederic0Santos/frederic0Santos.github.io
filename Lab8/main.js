
const hoverJS = document.querySelector(".hoverJS");
hoverJS.addEventListener("mouseover", () => {
    hoverJS.textContent = "Obrigado por passar!";
});
hoverJS.addEventListener("mouseout", () => {
    hoverJS.textContent = "Passa por aqui!";
});

const textColor = document.getElementById("textColor");
const colorButtons = [
    { id: "textRed", color: "red" },
    { id: "textGreen", color: "green" },
    { id: "textBlue", color: "blue" }
];

colorButtons.forEach(button => {
    document.getElementById(button.id).addEventListener("click", () => {
        textColor.style.color = button.color;
    });
});

if (!localStorage.getItem('count')) {
    localStorage.setItem('count', 0);
}

document.getElementById('contador1').textContent = localStorage.getItem('count');


document.querySelector("#clickContador").addEventListener("click", () => {
    let count = parseInt(localStorage.getItem('count')); 
    count++;
    document.getElementById('contador1').textContent = count;
    localStorage.setItem('count', count);
});
document.querySelector('#contador1').textContent = localStorage.getItem('count');

const escrever = document.querySelector("#escrever");
function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
}

escrever.addEventListener("input", function () {
    escrever.style.backgroundColor = getRandomColor();
});

document.querySelector('form').onsubmit = (e) => {
    e.preventDefault();
    const nome = document.querySelector('#nome').value;
    const idade = document.querySelector('#idade').value;
    const message = `Olá, o ${nome} tem ${idade} anos!`;
    document.querySelector('#message').textContent = message;
};

document.querySelector('select').onchange = function () {
    document.body.style.backgroundColor = this.value;
};

const contador = document.querySelector("#contador");
let counterValue = 0;

function incrementCounter() {
    counterValue++;
    contador.textContent = counterValue;
}
setInterval(incrementCounter, 1000);
