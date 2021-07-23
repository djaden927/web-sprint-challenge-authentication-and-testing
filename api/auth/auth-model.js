const db = require('../../data/dbConfig')

function getUserById(id){
    return db('users').where('id', id).first()
}

function getUserByUsername(filter){
    return db('users').where(filter).first()
}

async function addUser(user){
    const [id] = await db('users').insert(user)
    return getUserById(id)
}




module.exports = {
    getUserById,
    addUser,
    getUserByUsername
}