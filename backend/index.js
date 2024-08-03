const express = require('express'); 
const app = express();              
const port = 3001;

let sacolaData = [];
app.use(express.json()); 

app.get('/api/sacola',(req, res)=> {   
    try{
        res.status(200).json(sacolaData); 
        console.log('sacola recebida com sucesso'); 
    }catch (error){
        console.log(`erro ao buscar sacola no serviro: ${error}`);
    }       
           
});        

app.post('/api/sacola', (req, res)=> {
    try{
        const username = req.headers['username'];
        const sacola = req.body;
        if(!sacola || Object.keys(sacola).length === 0){
            return res.status(400).send('Dados da sacola ausentes');
        } 
        
        const sacolaComUsuario = {username, sacola};
        sacolaData.push(sacolaComUsuario);
        console.log(`sacola reebida ${sacola}`);
        res.status(200).send('sacola recebida com sucesso');
    }catch (error){
        console.error('erro ao abrir sacola: ', error);
        res.status(500).send('Erro do servidor ao processar sacola');

    } 
});

app.listen(port, ()=> {
    console.log(`servidor rodando em http://localhost:${port}`)
});                                 

/*
Parece estar tudo em ordem, o servidor parece funcionar e os fronts tb, basta testar.
*/
