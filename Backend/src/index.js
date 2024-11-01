const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

const itemRoutes = require('./routes/items');
const estabelecimentoRoutes = require('./routes/estabelecimentos'); 

app.use(cors());
app.use(bodyParser.json());

// Registrar as rotas
app.use('/itens', itemRoutes);
app.use('/estabelecimentos', estabelecimentoRoutes); 

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
