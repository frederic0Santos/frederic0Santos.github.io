
document.addEventListener("DOMContentLoaded", function () {
    fetch("https://deisishop.pythonanywhere.com/products/")
        .then(response => response.json())
        .then(produtos => {
            carregarProdutos(produtos);
            configurarFiltros(produtos);
        })
        .catch(error => console.error('Erro ao carregar produtos:', error));
    carregarCategorias();
    carregarCesto();
});

function carregarProdutos(produtos) {
    const produtosContainer = document.querySelector("#produtos");
    produtos.forEach((produto) => {
        const article = criarProduto(produto);
        produtosContainer.appendChild(article);
    });
}

function atualizarProdutos(produtos) {
    const container = document.querySelector("#produtos");
    container.innerHTML = "";
    produtos.forEach((produto) => {
        const article = criarProduto(produto);
        container.appendChild(article);
    });
}

function carregarCategorias() {
    fetch("https://deisishop.pythonanywhere.com/categories/")
        .then(response => response.json())
        .then(categorias => {
            const filtroCategoria = document.querySelector("#filtroCategoria");
            const todasOption = document.createElement("option");
            todasOption.value = "todas";
            todasOption.textContent = "Todas as categorias";
            filtroCategoria.appendChild(todasOption);
            categorias.forEach(categoria => {
                const option = document.createElement("option");
                option.value = categoria;
                option.textContent = categoria;
                filtroCategoria.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao carregar categorias:', error));
}

function configurarFiltros(produtos) {
    document.querySelector("#filtroCategoria").addEventListener("change", function () {
        filtrarEAtualizarProdutos(produtos);
    });
    document.querySelector("#ordenarPreco").addEventListener("change", function () {
        filtrarEAtualizarProdutos(produtos);
    });
    document.querySelector("#pesquisaNome").addEventListener("keyup", function () {
        filtrarEAtualizarProdutos(produtos);
    });
}

function filtrarEAtualizarProdutos(produtos) {
    const categoriaSelecionada = document.querySelector("#filtroCategoria").value;
    const ordenacao = document.querySelector("#ordenarPreco").value;
    const pesquisa = document.querySelector("#pesquisaNome").value.toLowerCase();

    let produtosFiltrados = produtos;

    if (categoriaSelecionada !== "todas") {
        produtosFiltrados = produtosFiltrados.filter(produto => produto.category == categoriaSelecionada);
    }
    if (pesquisa) {
        produtosFiltrados = produtosFiltrados.filter(produto => produto.title.toLowerCase().includes(pesquisa));
    }
    if (ordenacao === "crescente") {
        produtosFiltrados.sort((a, b) => a.price - b.price);
    } else if (ordenacao === "decrescente") {
        produtosFiltrados.sort((a, b) => b.price - a.price);
    }

    atualizarProdutos(produtosFiltrados);
}

function criarProduto(produto) {
    
    const article = document.createElement("article");
    article.dataset.id = produto.id;

    const title = document.createElement("h2");
    title.textContent = produto.title;

    const image = document.createElement("img");
    image.src = produto.image;
    image.alt = produto.title;

    const description = document.createElement("p");
    description.textContent = produto.description;
    description.classList.add("descricao");

    const price = document.createElement("p");
    price.textContent = `Preço: ${produto.price} €`;
    price.classList.add("price");

    article.appendChild(title);
    article.appendChild(image);
    article.appendChild(description);
    article.appendChild(price);
   

    const button = document.createElement("button");
    button.textContent = "+ Adicionar ao Cesto";
    button.addEventListener("click", function () {
        adicionarAoCesto(produto);
    });

    article.appendChild(button);

    return article;
}

function adicionarAoCesto(produto) {
    const cestoContainer = document.querySelector("#cesto");
    const article = document.createElement("article");
    article.dataset.id = produto.id;

    const title = document.createElement("h2");
    title.textContent = produto.title;

    const image = document.createElement("img");
    image.src = produto.image;
    image.alt = produto.title;

    const description = document.createElement("p");
    description.textContent = produto.description;
    description.classList.add("descricao");

    const price = document.createElement("p");
    price.textContent = `Preço: ${produto.price} €`;
    price.classList.add("price");

    article.appendChild(title);
    article.appendChild(image);
    article.appendChild(description);
    article.appendChild(price);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remover do Cesto";
    removeButton.addEventListener("click", function () {
        removerDoCesto(produto, article);
    });

    article.appendChild(removeButton);

    cestoContainer.appendChild(article);

    salvarCesto();
    atualizarTotal();
    atualizarBotaoComprar();
}

function removerDoCesto(produto, article) {
    const cestoContainer = document.querySelector("#cesto");
    cestoContainer.removeChild(article);
    salvarCesto();
    atualizarTotal();
    atualizarBotaoComprar();
}

function salvarCesto() {
    const cestoContainer = document.querySelector("#cesto");
    const cesto = [];

    cestoContainer.querySelectorAll("article").forEach((article) => {
        const produto = {
            id: article.dataset.id,
            title: article.querySelector("h2").textContent,
            price: parseFloat(article.querySelector(".price").textContent.replace("Preço: ", "").replace(" €", "")),
            description: article.querySelector(".descricao").textContent,
            image: article.querySelector("img").src,
        };
        cesto.push(produto);
    });

    localStorage.setItem("cesto", JSON.stringify(cesto));
}

function carregarCesto() {
    const cesto = JSON.parse(localStorage.getItem("cesto"));
    if (cesto) {
        const cestoContainer = document.querySelector("#cesto");
        cestoContainer.innerHTML = ''; 

        cesto.forEach((produto) => {
            adicionarAoCesto(produto); 
        });

        atualizarTotal();
        atualizarBotaoComprar();
    } else {
        atualizarTotal();
        atualizarBotaoComprar();
    }
}


function atualizarTotal() {
    const cesto = JSON.parse(localStorage.getItem('cesto')) || [];
    let total = 0;
    let totalSection = document.querySelector("#total");
    if (cesto.length === 0) {
        const mensagemCestoVazio = document.createElement("p");
        mensagemCestoVazio.textContent = "O cesto está vazio.";
        totalSection.innerHTML = ''; 
        totalSection.appendChild(mensagemCestoVazio);
        return;
    }

    totalSection.innerHTML = '';

    cesto.forEach((produto) => {
        total += produto.price;
    });

    const totalHTML = document.createElement("p");
    totalHTML.classList.add("totalValue");
    totalHTML.textContent = `Total: ${total.toFixed(2)} €`;
    totalSection.appendChild(totalHTML);
}

function atualizarBotaoComprar() {
    const cesto = JSON.parse(localStorage.getItem('cesto')) || [];
    let comprarSection = document.querySelector("#comprar");

    if (cesto.length === 0) {
        if (comprarSection) {
            comprarSection.remove();
        }
        return; 
    }

    if (!comprarSection) {
        comprarSection = document.createElement("section");
        comprarSection.id = "comprar"; 
        const footer = document.querySelector("footer");
        if (footer) {
            footer.parentNode.insertBefore(comprarSection, footer); 
        } else {
            document.body.appendChild(comprarSection); 
        }
    }

    const existingButton = comprarSection.querySelector("button");
    if (existingButton) {
        comprarSection.removeChild(existingButton);
    }

    const existingAluno = comprarSection.querySelector(".se-aluno");
    const existingCupao = comprarSection.querySelector(".cupao");
    if (existingAluno) {
        comprarSection.removeChild(existingAluno);
    }
    if (existingCupao) {
        comprarSection.removeChild(existingCupao);
    }

    if (cesto.length > 0) {

        const seAluno = document.createElement("article");
        seAluno.textContent = "Se és aluno, tens desconto!";
        seAluno.classList.add("se-aluno");
        const seAlunoCheck = document.createElement("input");
        seAlunoCheck.type = "checkBox";
        seAluno.appendChild(seAlunoCheck);

        const cupao = document.createElement("input");
        cupao.type = "text";
        cupao.placeholder = "Digite o seu código de cupão";
        cupao.classList.add("cupao");

        const botaoComprar = document.createElement("button");
        botaoComprar.textContent = "Comprar";
        botaoComprar.classList.add("botao-comprar");

        botaoComprar.addEventListener("click", function () {
            const produtosIDS = cesto.map(produto => produto.id);

            const desconto = {
                products: produtosIDS,
                student: seAlunoCheck.checked,
                coupon: cupao.value, 
            };

            let valorApagar = document.createElement("p");
            let referencia = document.createElement("p");

            fetch('https://deisishop.pythonanywhere.com/buy/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(desconto),
            })
            .then(response => response.json())
            .then(dados => {
                valorApagar = document.querySelector("#valorApagar");
                referencia = document.querySelector("#referencia");

                if (!valorApagar) {
                    valorApagar = document.createElement("p");
                    valorApagar.id = "valorApagar"; 
                }
                if (!referencia) {
                    referencia = document.createElement("p");
                    referencia.id = "referencia"; 
                }

                valorApagar.textContent = `Valor final a pagar: ${dados.totalCost} €`;
                referencia.textContent = `Referência de pagamento: ${dados.reference}`;

                comprarSection.appendChild(valorApagar);
                comprarSection.appendChild(referencia);
            })
            .catch(error => {
                console.error('Erro:', error);

                valorApagar = document.querySelector("#valorApagar");
                referencia = document.querySelector("#referencia");

                if (!valorApagar) {
                    valorApagar = document.createElement("p");
                    valorApagar.id = "valorApagar";
                }
                if (!referencia) {
                    referencia = document.createElement("p");
                    referencia.id = "referencia";
                }

                valorApagar.textContent = `Erro na compra: ${error.message}`;
                referencia.textContent = '';

                comprarSection.appendChild(valorApagar);
                comprarSection.appendChild(referencia);
            });
        });

        comprarSection.appendChild(seAluno);
        comprarSection.appendChild(cupao);
        comprarSection.appendChild(botaoComprar);
    }
}
