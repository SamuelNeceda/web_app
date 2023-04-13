// Importing necessary modules
import express, {Application} from "express";
import cors from "cors";
import dotenv from "dotenv";

// Loading environment variables from .env file
dotenv.config();

// Creating an instance of the express application
const app: Application = express();

// Defining a default port for the server to listen to
const PORT = process.env.PORT || 5000;

// MIDDLEWARE
app.use(cors()); // Allow Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming request body as JSON
app.use(express.urlencoded({extended: true})); // Parse incoming request body as URL-encoded data

// ROUTES
app.use("/auth", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));

// Starting the server and listening for incoming requests on the defined port
try {
    app.listen(PORT, (): void => {
        console.info(`Server is successfully running on port ${PORT}`);
    });
} catch (error) {
    console.error(`Error occurred: ${error.message}`);
}