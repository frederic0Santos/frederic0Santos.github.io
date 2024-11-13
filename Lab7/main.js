    const hoverJS = document.querySelector(".hoverJS");
    hoverJS.addEventListener("mouseover", function() {
        hoverJS.textContent = "Obrigado por passar!";
    });
    document.querySelector(".hoverJS").addEventListener("mouseout", function() {
        document.querySelector(".hoverJS").textContent = "Passa por aqui!";
    });

   const textColor = document.getElementById("textColor");
   document.getElementById("textRed").addEventListener("click", function() {
    textColor.style.color = "red";
   }   
   );
   document.getElementById("textGreen").addEventListener("click", function() {
    textColor.style.color = "green";
}
   );
   document.getElementById("textBlue").addEventListener("click", function() {
    textColor.style.color = "blue";
   }
);

const escrever = document.querySelector("#escrever");
function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}
escrever.addEventListener("input", function() {

    escrever.style.backgroundColor = getRandomColor();
});

document.querySelector("#sumbit").addEventListener("click", function() {
    const value = document.querySelector("#cor_escrita").value;
   document.body.style.backgroundColor = value;
    document.querySelector("#cor_escrita").value = "";
});
const contador = document.querySelector("#contador");
document.querySelector("#contar").addEventListener("click", function() {
    contador.textContent = contador.textContent * 1 + 1;
});
