users = []
userCount = 0;

function save(userData){

    userCount++

    user = {
        id: userCount,
        name: userData.name,
        email: userData.email
    }

    users.push(user);

    return user
}

function getById(id){                   
    return users.find(u => u.id === parseInt(id, 10));    
}

function getByEmail(email){
    return users.find(user => user.email === email);
}

module.exports = { save, getById, getByEmail }