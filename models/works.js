const mongoose = require('mongoose')

// Single subdocument
const locationSchema_child =  new mongoose.Schema({
    address:{
        type:String,
        required:true
    },
    longitude:{
        type:String,
        required:true
    },
    lattitude:{
        type:String,
        true:true
    }
})

const WorksSchema = new mongoose.Schema({
    workId:{
        type:String,
        required:true
    },

    //user can be anyone whoever posting the work
    userId:{
        type:String,
        required:true
    },

    workName:{
        type:String,
        required:true
    },
    workingHours:{
        type:String,
        required:false
    },
    // Single subdocument
    location:locationSchema_child,
    

   
    //Array of subdocuments
    children:[locationSchema_child]

},
{timestamps:true}
)



module.exports = mongoose.model('Works', WorksSchema)