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

router.get('/api/users/', (req, res) => {
    const nombre = (!req.query.nombre) ? "" : req.query.nombre;

    const listUserFilter = usersCtrl.filterUserbyName(nombre);
    res.status(200).send(listUserFilter);
});

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
                correo: req.body.correo,
                fecha: req.body.fecha,
                sexo: req.body.sexo,
                password: req.body.password,
                image: ""
            }
            res.status(201).send(usersCtrl.insertUser(newUser));
        } else {
            res.status(400).send('Bad Request : format of sexo (H o M)');
        }
    }
});

router.get('/api/users/:email', (req, res) => {
    const correo = req.params.email;
    const user = usersCtrl.getUserbyEmail(correo);
    if (user === undefined)
        res.status(400).send("Bad Request : user not found");
    else
        res.status(200).send(user);

});

router.put('/api/users/:email', (req, res) => {
    let atributos = '';
    const correo = req.params.email;
    const user = usersCtrl.getUserbyEmail(correo);
    if (user === undefined)
        res.status(400).send("Bad Request : user not found");
    else {
        if (!req.body.nombre) {
            atributos += 'nombre ';
        }
        if (!req.body.apellido) {
            atributos += 'apellido ';
        }
        if (!req.body.password) {
            atributos += 'password ';
        }
        if (!req.body.fecha) {
            atributos += 'fecha';
        }
        if (atributos !== '') {
            res.status(400);
            res.send(`Bad Request : is required ${atributos}`);
        } else {
            let updateUser = {
                uid: user.uid,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                correo: user.correo,
                fecha: req.body.fecha,
                sexo: user.sexo,
                password: req.body.password,
                image: user.image
            }
            const result = usersCtrl.updateUser(updateUser);
            if (result === undefined)
                res.status(404).send(`Bad Request : fail update`);
            else
                res.status(200).send(result);
        }
    }
});

router.delete('/api/users/:email', (req, res) => {
    const correo = req.params.email;
    const user = usersCtrl.getUserbyEmail(correo);
    if (user === undefined)
        res.status(400).send("Bad Request : user not found");
    else {
        if(usersCtrl.deleteUser(correo))
            res.status(200).send(`Successfull : user deleted`);
        else
        res.status(404).send(`Bad Request : fail delete`); 
    }
});

module.exports = router;