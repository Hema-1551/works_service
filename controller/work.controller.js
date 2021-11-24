const worksCollectionReference = require('../models/works')


//method to post the work
exports.createWork = async (req, res) => {

    const newWork = new worksCollectionReference(req.body)

    try {
        const savedWork = await newWork.save()
        res.status(200).json(savedWork)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getAllWorks = async (req, res) => {
    try {
        const works = await worksCollectionReference.find()
        res.status(200).json(works)
    } catch (error) {
        res.status(500).json(error)
    }

}

exports.getWorkById = async (req, res) => {

    try {
        const singleWork = await worksCollectionReference.find({ "workId": req.params.workId })
        res.status(200).json(singleWork)
    } catch (error) {
        res.status(500).json(error)
    }

}


exports.deleteWorkById = async (req, res) => {
    try {
        const deletedWork = await worksCollectionReference.deleteOne({ "workId": req.params.workId })
        res.status(200).json(deletedWork)
    } catch (error) {
        res.status(500).json(error)
    }
}


exports.updateWorkById = async (req, res) => {
    try {
        const updatedWork = await worksCollectionReference.findOneAndUpdate({ workId: req.params.workId }, { $set: req.body }, { new: true })
        res.status(200).send({

            updatedWork: (updatedWork === null) ? "Work doesnot exists" : updatedWork


        })
    }
    catch (error) {
        res.status(500).json(error)
    }

}