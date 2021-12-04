const worksCollectionReference = require('../models/works')
const Helpers = require('../helpers/distanceCalculator.helper')

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

        const range = req.query.range;

       

        switch(filterBy)
        {
            case 'LOCATION' :  // check if longitude and latitude are present in the query params

                                if(lattitude === undefined) return res.status(400).send("lattitude query parameter requried!");

                                if(longitude === undefined) return res.status(400).send("longitude query parameter required!");
                                
                                if(range  === undefined) return res.status(400).send('range query parameter required!');

                                // get an array of users who are in the range of `range` kilometers long
                                 
                                 // fetch all works
                                 const allWorks = await worksCollectionReference.find()

                                 

                                 const worksByLocation =  allWorks.filter((user , index , allWorks) => {

                                      // get user lat and lng
                                      const userLat  = parseFloat(user.location.lattitude);
                                      const userLng = parseFloat(user.location.longitude);

                                      

                                      // find the distance
                                      const distance = Helpers.getDistance(lattitude , longitude,userLat , userLng);
                                      

                        
                                      // check whether distance in range

                                      return (distance <= range);

                                 })

                                res.status(200).send(worksByLocation)

                                break;

            case 'WORKTYPE' :  
                               // check if workType query param exists

                               if(workType === undefined) return res.status(400).send("workType query parameter required!")
                               
                               // find works with worktype as given worktype;
                               const worksByWorkType = await worksCollectionReference.find({"workType" : workType})
                               res.status(200).send(worksByWorkType)

                               break;
                               

            case 'AMOUNT' :   // check if amount query param exists

                              if(amount === undefined) return res.status(400).send('amount query parameter required!')


                              // find works with amount greater than or equal to the given amount in query params

                              const worksByAmount = await worksCollectionReference.find({ amount: {$gt : amount} })
                              res.status(200).send(worksByAmount)

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