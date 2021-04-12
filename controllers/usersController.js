const USERS_DB = require('../data/users.json');
const shortid = require('shortid'); 
let ID_IMAGEN = 0;

let uids = USERS_DB.map((obj) => {
    return obj.uid
});

class UsersController {
    getUserByCredentials(email, password){
        var user = USERS_DB.filter(user => user.correo === email && user.password === password);
        return user;
    }
    generatePhoto(sexo){
        var url;
            if(sexo == "H"){
                url = `https://randomuser.me/api/portraits/men/${++ID_IMAGEN}.jpg`
                console.log(url)
            }
            if(sexo == "M"){
                url = `https://randomuser.me/api/portraits/women/${ID_IMAGEN}.jpg`
                ID_IMAGEN++;
                console.log(url)
            }
            return url; 
    }
    insertUser(user) {
        user.uid = shortid.generate(),
        user.image = this.generatePhoto(user.sexo);
        USERS_DB.push(user);
        return user;
    } 
}

module.exports = new UsersController;