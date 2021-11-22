const admin = require('../firebase/firebase-config')

const db = admin.firestore();

const usersDb = db.collection('users');

exports.createWork = (req, res) => {
    console.log("post the work")

}

exports.getAllWorks =  (req, res) => {
    console.log("all works are feteched")

}

exports.getWorkById =  (req, res) => {
    console.log("Single work is feteched")

}


exports.deleteWorkById =  (req, res) => {
    console.log(" work is deleted")
   
}


exports.updateWorkById =  (req, res) => {
    console.log(" work is updates")
   
}