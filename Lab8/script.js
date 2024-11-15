let clickTimeout;

document.getElementById('clickBox').addEventListener('click', function() {
    // Impede o clique simples se um duplo clique ocorrer dentro de 300ms
    if (clickTimeout) {
        clearTimeout(clickTimeout);
        clickTimeout = null;
    } else {
        clickTimeout = setTimeout(function() {
            alert('Você clicou na caixa!');
        }, 300); // Tempo limite de 300ms para o clique simples
    }
});

// Evento de Rato (dblclick)
document.getElementById('clickBox').addEventListener('dblclick', function() {
    clearTimeout(clickTimeout); // Cancela o clique simples
    clickTimeout = null; // Reinicia o timeout
    alert('Você deu um duplo clique na caixa!');
});

// Evento de Rato (mouseover)
document.getElementById('clickBox').addEventListener('mouseover', function() {
    document.getElementById('clickBox').style.backgroundColor = 'blue';
});

// Evento de Rato (mouseout)
document.getElementById('clickBox').addEventListener('mouseout', function() {
    document.getElementById('clickBox').style.backgroundColor = 'lightblue';
});

// Evento de Rato (mousemove)
document.querySelector("body").addEventListener('mousemove', function(event) {
   document.querySelector("#coords").textContent='Coordenadas do mouse: X = ' + event.clientX + ', Y = ' + event.clientY;
});

// Evento de Teclado (keydown)
document.getElementById('keyInput').addEventListener('keydown', function(event) {
    document.querySelector("#tecladown").textContent='Tecla pressionada: ' + event.key;
});

// Evento de Teclado (keyup)
document.getElementById('keyInput').addEventListener('keyup', function(event) {
    document.querySelector("#teclaup").textContent='Tecla solta: ' + event.key;
});

// Evento de Formulário (change)
document.getElementById('textField').addEventListener('change', function() {
    alert('O valor foi alterado!');
});

// Evento de Formulário (submit)
document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário
    alert('Formulário enviado!');
});

// Alteração de Elemento (textContent)
document.getElementById('changeTextBtn').addEventListener('click', function() {
    alert('Texto alterado com sucesso!');
});

// Alteração de Elemento (innerHTML)
document.getElementById('changeTextBtn').addEventListener('click', function() {
    document.getElementById('textElement').innerHTML = '<strong>Texto alterado com JAVASCRIPT!</strong>';
});

