'use strict';

// Importo express
const express = require('express');
const router = express();
const randomize = require('randomatic');
const usersCtrl = require('../controllers/usersController');

// Indico que el servicio esta funcionando.
router.get('/', (req, res) => {
    res.json({
        autor: 'SFMR',
        status: 'Servidor esta funcionando.'
    });
});

router.get('/api/mytoken/', (req, res) => {});

router.post('/api/login/', (req, res) => {
    let correo, password;
    let blank = "";
    req.header('Content-Type', 'application/json');
    req.body.correo ? correo = req.body.correo : blank += "email, ";
    req.body.password ? password = req.body.password : blank += "password, ";

    if (!blank.lenght > 0) {
        let getUser = usersCtrl.getUserByCredentials(correo, password);
        if (getUser.length > 0) {
            let userToken = randomize('Aa0', '10') + "-" + getUser[0].uid;
            res.header({
                'x-admin': userToken
            });
            res.status(200).json({
                token: userToken
            });
        } else {
            res.status(401).send('No encotro el usuario o es incorrecto el password');
        }
    }
});

router.get('/api/users/', (req, res) => {});

router.post('/api/users/', (req, res) => {
    let atributos = '';
    if (!req.body.nombre) {
        atributos += 'nombre ';
    }
    if (!req.body.apellido) {
        atributos += 'apellido ';
    }
    if (!req.body.correo) {
        atributos += 'email ';
    }
    if (!req.body.password) {
        atributos += 'password ';
    }
    if (!req.body.sexo) {
        atributos += 'sexo ';
    }
    if (!req.body.fecha) {
        atributos += 'fecha';
    }
    if (atributos !== '') {
        res.status(400);
        res.send(`Bad Request : is required ${atributos}`);
    } else {
        if (req.body.sexo.includes('H') || req.body.sexo.includes('M')) {

            let newUser = {
                uid: "",
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                fecha: req.body.fecha,
                sexo: req.body.sexo,
                password: req.body.password,
                image: ""
            }
            res.status(201).send(usersCtrl.insertUser(newUser));
        }
        else {
            res.status(400).send('Bad Request : format of sexo (H o M)');
        }
    }
});

router.get('/api/users/:email', (req, res) => {});

router.put('/api/users/:email', (req, res) => {});

router.delete('/api/users/:email', (req, res) => {});

module.exports = router;