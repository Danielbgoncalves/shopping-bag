function refreshTable(user, sacola){
    let tbody = document.querySelector('table tbody');

    const tr = document.createElement('tr');
    
    const tdNome = document.createElement('td');
    tdNome.textContent = user;
    tr.appendChild(tdNome);

    const tdPedido = document.createElement('td');
    tdPedido.textContent = produtosNaSacola(sacola);
    tr.appendChild(tdPedido);
    
    const tdValor = document.createElement('td');
    tdValor.textContent = valorTotal(sacola);
    tr.appendChild(tdValor);

    tbody.appendChild(tr);
}

function produtosNaSacola(sacola){
    return sacola.map(item => item.nome).join(', '); 
}

function valorTotal(sacola){
    let total = 0;
    sacola.forEach(item =>{ total += item.valor });
}

function buscarSacolaNoServidor(){
    fetch('http://localhost:3001/api/sacola')
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data);
        data.forEach(entrada => {
            const user = entrada.username;
            const sacola = entrada.sacola;
            refreshTable(user, sacola)})
    })
    .catch(error => {
        console.error(`Erro ao buscar sacolas do servidor: ${error}`)
    });
}

window.onload = buscarSacolaNoServidor;
