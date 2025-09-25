// Import express framework
let express = require('express');

// Import the enquiryInsert function from the controller file
// This function will handle what happens when someone calls this route
const { enquiryInsert , enquiryList, enquiryDelete, enquirysingleRow, updateRow } = require('../../controller/web/01-enquiry-controller');

// Create a new router object from express
// This helps you separate routes into different files
let enquiryRouter = express.Router();

// Define a POST route for '/insert'
// When someone makes a POST request to '/insert',
// the enquiryInsert function will run
enquiryRouter.post('/insert' , enquiryInsert)

enquiryRouter.get("/view" , enquiryList)

enquiryRouter.delete('/delete/:id' , enquiryDelete)

enquiryRouter.get('/edit/:id' , enquirysingleRow)

enquiryRouter.put("/update/:id" , updateRow)
// Export the router so it can be used in 01-index.js
module.exports = enquiryRouter;