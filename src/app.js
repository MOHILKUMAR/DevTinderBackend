const express = require("express");

const app = express();

// app.use("/", (req, res) =>  {
//     res.send("Hello from the Dashboard");
// })
// app.use("/hello", (req, res) =>  {
//     res.send("Hello");
// })

// app.use("/test", (req, res) =>  {
//     res.send("Hello from the test");
// })


// app.listen(7777, ()=> {
//     console.log("Server is listening on port 7777")
// } );


// get call 

// Handle the root route
// app.get("/", (req, res) =>  {
//     res.send("Hello from the Dashboard");
// });

// Handle the /hello route
// app.get("/hello", (req, res) =>  {
//     res.send("Hello");
// });

// // Handle the /test route
// app.get("/test", (req, res) =>  {
//     res.send("Hello from the test");
// });


// why you donot want to use the "use"
// app.use("/user", (req, res) =>{
//     res.send("hahahahahah")
// })

app.get("/user", (req, res) => {
    res.send({firstName: "Mohil" , 
        lastName: "Kumar"
    })
})

app.post("/user", (req , res) => {
    res.send("Data is successfully saved to the database!");
} )

app.delete("/user", (req, res) => {
    res.send("deleted successfully")
})


// Start the server
app.listen(7777, () => {
    console.log("Server is listening on port 7777");
});
