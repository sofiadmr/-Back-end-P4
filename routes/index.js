'use strict';

// Importo express
const express = require('express');
const router = express();

router.get('/',(req, res) => {
    res.json({autor:'SFMR', status:'Servidor esta funcionando.'});
});

router.get('/api/mytoken/',(req, res)=>{});

router.post('/api/login/',(req, res)=>{});

router.get('/api/users/',(req, res)=>{});

router.post('/api/users/',(req, res)=>{});

router.get('/api/users/:email',(req, res)=>{});

router.put('/api/users/:email',(req, res)=>{});

router.delete('/api/users/:email',(req, res)=>{});

module.exports = router;