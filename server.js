// Declarar librerias
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const usersRoute = require('./routes/usersRoute');

//load middleware
app.use(express.json());

// rute with endpoint and asign at server
app.use('/', usersRoute);

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
})