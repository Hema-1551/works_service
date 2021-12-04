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

        // if there are any query parameters

        // for filter of works 

        // get those query parameters on filter the following

        // filter works by worktype


        const filterBy = req.query.filterBy;

        const workType = req.query.workType;

        const amount = req.query.amount;

        const lattitude = req.query.lat;

        const longitude = req.query.long;

       

        switch(filterBy)
        {
            case 'LOCATION' :  // check if longitude and latitude are present in the query params

                                if(lattitude === undefined) return res.status(400).send("lattitude query parameter requried!");

                                if(longitude === undefined) return res.status(400).send("longitude query parameter required!");


                                break;

            case 'WORKTYPE' :  
                               // check if workType query param exists

                               if(workType === undefined) res.status(400).send("workType query parameter required!")

                               break;
                               // filter works in databse using worktype
                               //const worksByWorkType = await worksCollectionReference.find({"workType" : req.query.work})

            case 'AMOUNT' : res.send('filter by amount')
                            break;

            default: 
                
             // no filter applied
             const works = await worksCollectionReference.find()
             res.status(200).json(works)

             break;

        }

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