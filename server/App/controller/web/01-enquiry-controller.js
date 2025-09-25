const { response } = require("express");
const enquiryModel = require("../../model/01-enquiry-model");

let enquiryInsert = (request , response) => {

// Get data from request body
    let {name , email , phone , message} = request.body

// Create a new document based on the enquiry model (like making a new record)
    let enquiry = new enquiryModel({   // When you write new enquiryModel({...}), you are creating a new document (record) that follows the structure of your schema.
        name: name,    // the name , email , phone , message should be same as the one we defined in schema , if u bymistakely write phone as Phone then it will throw error
        email: email,
        phone: phone,
        message: message
    })

/*
let name = request.body.name;
let email = request.body.email;
let phone = request.body.phone;
let message = request.body.message;

let enquiry = new enquiryModel({
    name : name,
    phone : phone,
    email : email,
    message : message
})
*/
// Save the new document into the database
    enquiry.save().then(() => { // save is a method which saves the data , jo bhi data ayega vo save karlega
        response.send({status : 1 , message : "Enquiry Saved Successfully" })  //  Send response back to client , Runs if data saved successfully
    }).catch((error) => {
        response.send({status : 0 , message : "Error while saving data" , error})   //  Send response back to client , Runs if error occurs (like duplicate email)
    });  

}

let enquiryList = async (request , response) => {
    let enquiry = await enquiryModel.find();
    response.send({status : 1 , enquiryList: enquiry})
}

let enquiryDelete = async (request , response) => {
    let enId = request.params.id
    let enquiry = await enquiryModel.deleteOne({_id : enId});
    response.send({status : 1 , message : "enquiry Deleted succesfully" , enquiry})
}

let enquirysingleRow = async (request , response) => {
    let enId = request.params.id;
    let enquiry = await enquiryModel.findOne({_id : enId});
    response.send({status : 1 , enquiry})
}


let updateRow = async (request , response) => {
    let enId = request.params.id;
    let {name , email , phone , message} = request.body
    let updateObj = {
        name,
        email,
        phone,
        message
    }
    let updateResponse = await enquiryModel.updateOne({_id:enId} , updateObj)
    response.send({status : 1 , message : "enquiry updated successfully" , updateResponse})
}

module.exports = {enquiryInsert , enquiryList , enquiryDelete , enquirysingleRow , updateRow}