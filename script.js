function logar(event){
    event.preventDefault();

    var login = document.getElementById('login').value;
    var password = document.getElementById('password').value;

    if (login === "admin" && password === "admin") {
        alert('Bem-Vindo de volta Moderador.');
        window.location.href = "cadprod.html";
    } else {
        alert('Bem-Vindo de volta Cliente.');
        window.location.href = "catalogo.html";
    }
}

function cadastrarProduto(event){
    event.preventDefault();

    var nome = document.getElementById('nome').value;
    var valor = parseFloat(document.getElementById('valor').value);
    var descricao = document.getElementById('descricao').value;
    var urlImagem = document.getElementById('imagem').value;

if (isNaN(valor)){
    alert("Valor deve ser um número!");
    return;
}

var produto = {
    id: Date.now(),
    nome: nome,
    valor: valor,
    descricao: descricao,
    urlImagem: urlImagem
};

    var produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.push(produto);
    localStorage.setItem('produtos', JSON.stringify(produtos));
    alert("Produto cadastrado com sucesso!");

    window.location.href = 'prodcad.html';
}

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('productForm').addEventListener('submit', cadastrarProduto);
});

document.addEventListener('DOMContentLoaded', function(){
    carregarProdutos();
});

document.addEventListener('DOMContentLoaded', function(){

function carregarProdutos(){
    var produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    var produtocad = document.getElementById('produtocad');
    if (!produtocad){
        console.error("Elemento 'produtocad' não encontrado.");
        return;
    }

    produtocad.innerHTML = '';

    if (produtos.length === 0){
        produtocad.innerHTML = '<p>Nenhum produto cadastrado.</p>';
        return;
    }

    produtos.forEach(function(produto, index){
    var produtoDiv = document.createElement('div');
    produtoDiv.className = 'produto';

    var img = document.createElement('img');
    img.src = produto.urlImagem;
    img.alt = produto.nome;

    var infoDiv = document.createElement('div');
    var valorFormatado = parseFloat(produto.valor).toFixed(2);
    infoDiv.innerHTML = '<h3>' + produto.nome + '</h3><p>' + produto.descricao + '</p><p>R$ ' + valorFormatado + '</p>';

    var editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.className = 'editar-produto';
    editButton.dataset.index = index;
          
    var removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.className = 'remover-produto';
    removeButton.dataset.index = index; // Armazena o índice do produto no atributo data-index

    produtoDiv.appendChild(img);
    produtoDiv.appendChild(infoDiv);
    produtoDiv.appendChild(editButton);
    produtoDiv.appendChild(removeButton);
    produtocad.appendChild(produtoDiv);
    });
}

function exibirFormularioEdicao(index){
    var produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    var produto = produtos[index];

    document.getElementById('editIndex').value = index;
    document.getElementById('editNome').value = produto.nome;
    document.getElementById('editValor').value = produto.valor;
    document.getElementById('editDescricao').value = produto.descricao;
    document.getElementById('editImagem').value = produto.urlImagem;
    document.getElementById('editForm').style.display = 'block';
}

document.addEventListener('click', function(event){
    if (event.target && event.target.className === 'editar-produto'){

        var index = parseInt(event.target.dataset.index);

        exibirFormularioEdicao(index);
    }
});

document.getElementById('editProductForm').addEventListener('submit', function(event){
    event.preventDefault();

    var index = parseInt(document.getElementById('editIndex').value);
    var novoNome = document.getElementById('editNome').value;
    var novoValor = parseFloat(document.getElementById('editValor').value);
    var novaDescricao = document.getElementById('editDescricao').value;
    var novaUrlImagem = document.getElementById('editImagem').value;
    var produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    produtos[index].nome = novoNome;
    produtos[index].valor = novoValor;
    produtos[index].descricao = novaDescricao;
    produtos[index].urlImagem = novaUrlImagem;

    localStorage.setItem('produtos', JSON.stringify(produtos));

    carregarProdutos();

    document.getElementById('editForm').style.display = 'none';
});

document.getElementById('cancelEdit').addEventListener('click', function(){
document.getElementById('editForm').style.display = 'none';
});

    
document.addEventListener('click', function(event){
    if (event.target && event.target.className === 'remover-produto'){
           
        var index = parseInt(event.target.dataset.index);
 
        removeProductFromCatalog(index);
    }
});

function removeProductFromCatalog(index){
    var produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.splice(index, 1);

    localStorage.setItem('produtos', JSON.stringify(produtos));

    carregarProdutos();
    }

    carregarProdutos();
});

document.addEventListener('DOMContentLoaded', function(){
    exibirProdutos();
});

function exibirProdutos(){
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const catalogoProdutos = document.getElementById('catalogo-produtos');
    catalogoProdutos.innerHTML = '';

    if (produtos.length === 0){
        catalogoProdutos.innerHTML = '<p>Nenhum produto disponível.</p>';
        return;
    }

produtos.forEach(function(produto, index){
    const produtoDiv = document.createElement('div');
    produtoDiv.className = 'produto';

    const img = document.createElement('img');
    img.src = produto.urlImagem;
    img.alt = produto.nome;

    const infoDiv = document.createElement('div');
    infoDiv.innerHTML = `<h3>${produto.nome}</h3><p>${produto.descricao}</p><p>R$ ${parseFloat(produto.valor).toFixed(2)}</p>`;

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Adicionar ao Carrinho';
    addToCartButton.classList.add('addToCartButton');
    addToCartButton.addEventListener('click', function(){
        
    adicionarProdutoAoCarrinho(index);
});

    produtoDiv.appendChild(img);
    produtoDiv.appendChild(infoDiv);
    produtoDiv.appendChild(addToCartButton);
    catalogoProdutos.appendChild(produtoDiv);
    });
}

function adicionarProdutoAoCarrinho(index){
    const produtos = JSON.parse(localStorage.getItem('produtos'));
    const produto = produtos[index];

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push(produto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
        
    alert('Produto adicionado ao carrinho!');

    atualizarProdutosCarrinho();
}

function atualizarProdutosCarrinho(){
    var carrinhoProdutos = document.getElementById('carrinho-produtos');
    carrinhoProdutos.innerHTML = '';

    var produtosCarrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    produtosCarrinho.forEach(function(produto){
    var produtoDiv = document.createElement('div');
    produtoDiv.className = 'produto';

    var img = document.createElement('img');
    img.src = produto.urlImagem;
    img.alt = produto.nome;

    var infoDiv = document.createElement('div');
    infoDiv.innerHTML = `
    <h3>${produto.nome}</h3>
    <p>${produto.descricao}</p>
    <p>R$ ${produto.valor.toFixed(2)}</p>
    `;

    produtoDiv.appendChild(img);
    produtoDiv.appendChild(infoDiv);
    carrinhoProdutos.appendChild(produtoDiv);
    });
}

function loadCart(){
    let cart = JSON.parse(localStorage.getItem('carrinho')) || [];
    const cartTableBody = document.getElementById('cart-table-body');
    cartTableBody.innerHTML = '';
    let total = 0;
    
    cart.forEach(function(item, index){
    const row = document.createElement('tr');
    
    const imgCell = document.createElement('td');
    const img = document.createElement('img');
    img.src = item.urlImagem;
    img.alt = item.nome;
    img.style.width = '50px';
    img.style.height = '50px';
    imgCell.appendChild(img);
    
    const nameCell = document.createElement('td');
    nameCell.textContent = item.nome;
    
    const priceCell = document.createElement('td');
    priceCell.textContent = `R$ ${parseFloat(item.valor).toFixed(2)}`;
    
    const actionCell = document.createElement('td');
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.addEventListener('click', function(){

        removeFromCart(index);
    });

    actionCell.appendChild(removeButton);
    
    row.appendChild(imgCell);
    row.appendChild(nameCell);
    row.appendChild(priceCell);
    row.appendChild(actionCell);
    
    cartTableBody.appendChild(row);
    
    total += parseFloat(item.valor);
    });
    
    document.getElementById('total-price').textContent = `Total: R$ ${total.toFixed(2)}`;
}
    
function removeFromCart(index){
    let cart = JSON.parse(localStorage.getItem('carrinho')) || [];
    cart.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(cart));
    loadCart();
}
    
    document.addEventListener('DOMContentLoaded', loadCart);


document.getElementById('ck-bt').addEventListener('click', function(){
        
    let cart = JSON.parse(localStorage.getItem('carrinho')) || [];
    if(cart.length === 0){
        alert('Seu carrinho está vazio!');
        return;
    }

    var camposParaVerificar = ['name', 'email', 'address', 'card', 'cvv', 'exp'];

    for (var i = 0; i < camposParaVerificar.length; i++) {
        var campo = document.getElementById(camposParaVerificar[i]);
        if (!campo || campo.value.trim() === '') {
            alert('Por favor, preencha todos os campos antes de finalizar a compra.');
            return;
        }
    }
    
    if(confirm('Você deseja finalizar a compra?')){
        alert('Compra finalizada com sucesso!');
        localStorage.removeItem('carrinho');
        loadCart();

    } else{
        alert('Compra cancelada.');
    }

});