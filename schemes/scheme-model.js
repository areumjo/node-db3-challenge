// find()
// findById(id)
// findSteps(id)
// add(scheme)
// update(changes, id)
// remove(id)

const db = require('../data/db-config.js');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find() {
    return db('schemes');
}

// a single user OR NULL
function findById(id) {
    return db('schemes').where({ id }).first();
}

function findSteps(id) {
    return db('schemes as s')
    .join('steps as p', 's.id', 'p.scheme_id')
    .select('p.id', 's.scheme_name', 'p.step_number', 'p.instructions')
    .where({ "s.id": id })
}

function add(scheme) {
    return db('schemes').insert(scheme)
    .then(ids => {
        return findById(ids[0]);
    })
}

function update(changes, id) {
    return db('schemes').where({ id }).update(changes)
    .then(count => {
        return findById(id)
    })
}

function remove(id) {
    return db('schemes').where({ id }).del();
}