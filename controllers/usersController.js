const USERS_DB = require('../data/users.json');
const shortid = require('shortid');
let ID_IMAGEN_MAN = 0;
let ID_IMAGEN_WOMAN = 0;

let uids = USERS_DB.map((obj) => {
    return obj.uid
});

class UsersController {
    getList() {
        return USERS_DB;
    }
    getUserByCredentials(email, password) {
        var user = USERS_DB.filter(user => user.correo === email && user.password === password);
        return user;
    }
    generatePhoto(sexo) {
        var url;
        if (sexo == "H") {
            url = `https://randomuser.me/api/portraits/men/${++ID_IMAGEN_MAN}.jpg`
        }
        if (sexo == "M") {
            url = `https://randomuser.me/api/portraits/women/${ID_IMAGEN_WOMAN}.jpg`
            ID_IMAGEN_WOMAN++;
        }
        return url;
    }
    insertUser(user) {
        user.uid = shortid.generate(),
            user.image = this.generatePhoto(user.sexo);
        USERS_DB.push(user);
        return user;
    }
    filterUserbyName(nombre) {
        var listUser = USERS_DB.filter(u => u.nombre.toUpperCase().includes(nombre.toUpperCase()));
        return listUser;
    }
    updateUser(user){
        let index = USERS_DB.findIndex(element => element.uid === user.uid);
        if (index > -1) {
            USERS_DB[index] = Object.assign(USERS_DB[index], user);
            return USERS_DB[index];
        } else
            return undefined; 
    }
    deleteUser(correo){
        let index = USERS_DB.findIndex(element => element.correo === correo);
        if (index > -1) {
            USERS_DB.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }
    getUserbyEmail(correo){
        var getUser = USERS_DB.find(u => u.correo === correo);
        return getUser;        
    }
}

module.exports = new UsersController;