// Import express and cookie-parser
const cookieParser = require('cookie-parser');
const express = require('express');
const bcrypt = require('bcrypt');
// Create an instance of an express app
const app = express();
const jwt = require('jsonwebtoken');
const { clearCache } = require('ejs');

const PORT = 3000;

// Use the cookie-parser middleware
app.use(cookieParser());

// Define a route to set a cookie
app.get("/", function(req, res) {
    res.cookie("name", "arka");
    res.send("done");
});

// Define a route to read cookies
app.get("/read", function(req, res) {
    //console.log(req.cookies);
    res.send("read page");
});

app.get("/password",function(req,res){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("arkadas20102001", salt, function(err, hash) {
            // Store hash in your password DB.
            console.log(hash);
        });
    });
})

app.get("/decrypt",function(req,res){
    bcrypt.compare("arkadas20102001", "$2b$10$BI1Y1533Lylnla1NsCh2nOA/x4/Fsqgo5P57XWjJKXY.sNOHXmo46", 
        function(err, result) {
        // result == true
        //console.log(result);
    });
})

app.get("/json",function(req,res){

    const token=jwt.sign({email:"arkadas20102001@gmail.com"}, "secret")
    console.log(token);
    res.cookie("token",token);
    res.send("DONE")
})

app.get("/jsoncookie",function(req,res){
    const data = jwt.verify(req.cookies.token,"secret");
    console.log(data);
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


//$2b$10$BI1Y1533Lylnla1NsCh2nOA/x4/Fsqgo5P57XWjJKXY.sNOHXmo46