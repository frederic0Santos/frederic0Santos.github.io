document.addEventListener("DOMContentLoaded", function () {
    carregarProdutos(produtos);
    carregarCesto();
});

function carregarProdutos(produtos) {
    const produtosContainer = document.querySelector("#produtos");

    produtos.forEach((produto) => {
        const article = criarProduto(produto);
        produtosContainer.appendChild(article); 
    });
}

function criarProduto(produto) {
    const article = document.createElement("article");

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
}

function removerDoCesto(produto, article) {
    const cestoContainer = document.querySelector("#cesto");
    cestoContainer.removeChild(article);
    atualizarTotal();
    salvarCesto();
}

function salvarCesto() {
    const cestoContainer = document.querySelector("#cesto");
    const cesto = [];

    cestoContainer.querySelectorAll("article").forEach((article) => {
        const title = article.querySelector("h2").textContent;
        const priceText = article.querySelector(".price").textContent;
        const price = parseFloat(priceText.replace("Preço: ", "").replace(" €", ""));
        const description = article.querySelector(".descricao").textContent;
        const image = article.querySelector("img").src;

        cesto.push({
            title,
            price,
            description,
            image
        });
    });

    localStorage.setItem("cesto", JSON.stringify(cesto));
}

function carregarCesto() {
    const cesto = JSON.parse(localStorage.getItem("cesto"));
    if (cesto) {
        const cestoContainer = document.querySelector("#cesto");

        cesto.forEach((produto) => {
            const article = criarProdutoNoCesto(produto);
            cestoContainer.appendChild(article);
        });

        atualizarTotal();
    }
}

function criarProdutoNoCesto(produto) {
    const article = document.createElement("article");

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

    return article;
}

function atualizarTotal() {
    const cestoContainer = document.querySelector("#cesto");
    let total = 0;

    cestoContainer.querySelectorAll("article").forEach((produto) => {
        const priceText = produto.querySelector(".price").textContent;
        const price = parseFloat(priceText.replace("Preço: ", "").replace(" €", ""));
        total += price;
    });

    const totalElement = document.querySelector("#total");
    totalElement.textContent = `Total: ${total.toFixed(2)} €`;
}
