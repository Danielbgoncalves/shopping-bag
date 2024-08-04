let sacola = []; // uma lista de objetos do tipo produto.
let usernameColetado;

produtosLista = [
        { id: '1', nome: 'Pão de queijo', preço: 3.50 },
        { id: '2', nome: 'Misto quente', preço: 5.50 },
        { id: '3', nome: 'Bolo frio', preço: 7.00 },
        { id: '4', nome: 'Fatia de pizza', preço: 4.50 },
        { id: '5', nome: 'Copo de suco', preço: 3.50 },
        { id: '6', nome: 'Doce de leite', preço: 4.90 }
    ];
let sendButton;

document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const greetingMessage = document.getElementById('greeting-message');

    usernameInput.addEventListener('input', function() {
        greetingMessage.textContent = this.value ? `Olá, ${this.value}!` : '';
        usernameColetado = this.value;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.adicionar-sacola');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            let produtoID = this.getAttribute('data-id');
            

            if(this.textContent === 'Adicionado'){ // Agora devemos remover o ítem da sacola
                this.classList = 'adicionar-sacola';
                this.textContent = 'Adicionar à Sacola'; 
                removerNaSacola(produtoID);
            } else {   // Agora devemos adicionar o ítem na sacola
                adicionarNaSacola(produtoID);
                this.classList.add('adicionado');
                this.textContent = 'Adicionado';
            }
            verificarBotaoDeEnviarSacola();
            
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    sendButton = document.querySelector('#enviar-pedido'); // Sem o All no final pq isso é para quando se trata de varios botões, retorna uma lista deles
    
    sendButton.addEventListener('click', function() {
        if(sacola.length === 0){
            console.log('Envio de sacola vazia negado');
        } else {
            this.textContent = 'Enviado';
            this.classList.add('enviado');
            console.log(sacola);
            enviarSacolaAoServidor();
        }
        
    });
});

function adicionarNaSacola(id){
    const produto = produtosLista.find(produto => produto.id === id);
    if(produto){
        sacola.push({id: produto.id ,nome: produto.nome, preço: produto.preço});
    }
}
 
function removerNaSacola(id){
    sacola = sacola.filter(produto => produto.id !== id);
}

function verificarBotaoDeEnviarSacola(){
    sendButton.classList.remove('enviado');
    sendButton.textContent = 'Enviar Pedido';
}

function enviarSacolaAoServidor(){
    fetch('http://localhost:3001/api/sacola',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Username': usernameColetado
        },
        body: JSON.stringify(sacola),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Resposta do servidor:', data);
        alert('Sacola enviada ao servidor');
    })
    .catch(error => {
        console.error('Erro ao enviar a sacola:', error)
    })
}

/*
    O fetch pega um dado daqui e manda para o servidor isso leva um tempo considerável, não é instantaneo como a velocidade com a qual o codigo executa
logo, o codigo abaixo da função fetch seria executado antes da função ser concluida o que nao queremos já que tudo depende do resultado de fetch
por isso estamos lidando com Promises. Promise é meio que uma promessa de que um dado será retornado, nesse caso pela fução fetch ( se o post deu certo ou não) 
A Promise pode estar em um dos 3 estados: Pending, Fulfilled ou Rejected, esperamos que sempre ocorra a Fulfilled aqui, que significa que deu certo a comunicação com o servidor.
Assim que o estado é Fulfilled, o encadeamento dos .then inicia a acontecer e a serem executados, o .then retorna um promise também,
logo, diversos desses podem ser enfileirados de modo que um continue o trabalho do anterior.
O Catch serve para tratar o caso Rejected que é quando ocorreu algum erro e sabemos a causa.
    O primeiro .then recebe a Promise do fetch, chamda de response, o objeto tem as informações do envio e a resposta do servidor.
Essa resposta é lida em JSON o que reotrna outra Promise.
    O segundo .then recebe a Promise anterior e a chama de data. a printa no console e emite o alerta.
Caso o status da promise do fetch seja Rejected os .then não são execitados e o catch trata o erro    
*/
