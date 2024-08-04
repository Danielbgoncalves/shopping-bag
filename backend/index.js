const express = require('express'); 
const cors = require('cors')

const app = express();              
const port = 3001;

const corsOption = {
    origin: 'http://127.0.0.1:5500',
    optionsSuccessStatus: 200
};

app.use(cors(corsOption));
app.use(express.json()); 

let sacolaData = [];
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
        if(!sacola || sacola.length === 0){ // ou seria   Object.keys(sacola).length === 0  ?
            return res.status(400).json({mesage: 'Dados da sacola ausentes'});
        } 
        
        const sacolaComUsuario = {username, sacola};
        sacolaData.push(sacolaComUsuario);
        console.log(`sacola reebida ${sacola}`);
        res.status(200).json({message: 'sacola recebida com sucesso'});
    }catch (error){
        console.error('erro ao abrir sacola: ', error);
        res.status(500).json({message: 'Erro do servidor ao processar sacola'});

    } 
});

app.listen(port, ()=> {
    console.log(`servidor rodando em http://localhost:${port}`)
});                                 

/*
Parece estar tudo em ordem, o servidor parece funcionar e os fronts tb, basta testar.
*/
