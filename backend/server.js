const express = require("express");
const cors = require("cors");
const supabase = require("./supabase.js");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/persons", async function (req, res) {
    // New Code
    // Use the Supabase Client to choose the table we want to pull data from and what data we want to pull. 
    // The * means all columns from the table
    const { data, error } = await supabase.from("persons").select("*");

    // If there is an error getting data, let's send a response back to 
    // the client letting them know something went wrong with getting the data
    if (error) {
        return res.status(500).json({
            success: false,
            error: "Failed to get data from Supabase"
        })
    }

    // If there is no data, let's send what we got back to the client
    res.status(200).json(data);
})


app.post("/persons", async function (req, res) {
    // New Code
    // Check to see if the server got an email, role, and name from the client
    if (!req.body.email || !req.body.role || !req.body.name) {
        res.status(400).json({
            success: false,
            error: "Missing either a email, role, or name field"
        });
    }

    // Try to insert the data into Supabase using the client
    const { error } = await supabase.from("persons").insert(req.body);

    // If there is an error, send a response to client letting it know that this request failed.
    if (error) {
        return res.status(500).json({
            success: false,
            error: "Failed to insert into supabase"
        })
    }

    // Return a created status if everything was all successful
    res.status(201).json({
        success: true,
    });
});


app.listen(8080, function () {
    console.log("Server is listening on port 8080");
})
