// Import express framework and store it in variable 'shawarma'
let shawarma = require('express');

let cors = require('cors')
// Import mongoose (used for connecting and working with MongoDB)
const { default: mongoose } = require('mongoose');

// Create an express app using shawarma()
let app = shawarma()

// Import mongoose again (this is not needed since you already imported above, 
// but it will not cause an error)
let falloda = require('mongoose');

// Import the enquiry router file (where all enquiry-related routes are defined)
const enquiryRouter = require('./App/routes/web/01-enquiry-route');

// Load environment variables from .env file (example: DBURL, PORT)
require('dotenv').config();

app.use(cors())  // means you are enabling CORS (Cross-Origin Resource Sharing) in your Express app.
/*app.use(cors({
    origin: "http://localhost:5173",   // allow only React frontend
    methods: ["GET", "POST", "PUT", "DELETE"],  // allow these HTTP methods
    allowedHeaders: ["Content-Type"],  // allow JSON content type
})); */

// CORS allows your backend (server) to accept requests from a different domain or port.
/*Note : If you are running:
Frontend → on http://localhost:3000
Backend → on http://localhost:8020
Without cors(), the browser will block requests because origins are different
but With cors(), the browser allows the request, even if origins are different. ✅
*/

// Middleware: allows the app to automatically parse incoming JSON data
app.use(shawarma.json());

// Register routes
// Any request starting with '/api/website/enquiry' will be handled by enquiryRouter
// Example: POST http://localhost:8000/api/website/enquiry/insert
app.use('/api/website/enquiry' , enquiryRouter);

// Connect to MongoDB using mongoose
mongoose.connect(process.env.DBURL).then(() => {
    console.log("Connected")

    // Start the server after successful database connection
    app.listen(8020 , () => {
        console.log('Server is running')
    })
}).catch((error) => {
    // If there is an error while connecting to MongoDB, log the error
    console.log(error);
})