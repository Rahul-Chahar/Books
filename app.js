const express = require('express');  
const path = require('path');  

const app = express();  
const PORT = 3000;  

// Middleware to parse URL-encoded data  
app.use(express.urlencoded({ extended: true }));  

// Serve static files  
app.use(express.static(path.join(__dirname)));  

// Route for the home page  
app.get('/', (req, res) => {  
    res.send(`  
        <!DOCTYPE html>  
        <html lang="en">  
        <head>  
            <meta charset="UTF-8">  
            <meta name="viewport" content="width=device-width, initial-scale=1.0">  
            <title>Home</title>  
            <style>  
                nav {  
                    background-color: #f8f9fa;  
                    padding: 10px;  
                }  
                nav a {  
                    margin: 10px;  
                    text-decoration: none;  
                }  
            </style>  
        </head>  
        <body>  
            <nav>  
                <a href="/">Home</a>  
                <a href="/contactus">Contact Us</a>  
            </nav>  
            <h1>Welcome to Our Site!</h1>  
        </body>  
        </html>  
    `);  
});  

// Route for the contact form  
app.get('/contactus', (req, res) => {  
    res.send(`  
        <!DOCTYPE html>  
        <html lang="en">  
        <head>  
            <meta charset="UTF-8">  
            <meta name="viewport" content="width=device-width, initial-scale=1.0">  
            <title>Contact Us</title>  
        </head>  
        <body>  
            <nav>  
                <a href="/">Home</a>  
                <a href="/contactus">Contact Us</a>  
            </nav>  
            <h1>Contact Us</h1>  
            <form action="/success" method="POST">  
                <label for="name">Name:</label>  
                <input type="text" id="name" name="name" required><br><br>  
                
                <label for="email">Email:</label>  
                <input type="email" id="email" name="email" required><br><br>  

                <label for="Phone">Phone:</label>
                <input type="number" id="phone" name="phone" required><br><br>

                <label for="date">Choose a date for appointment:</label>
                <input type="date" id="date" name="date" required>

                <label for="time">Choose a time for appointment:</label>
                <input type="time" id="time" name="time" required><br><br>


                
                <button type="submit">Get A Call</button>  
            </form>  
        </body>  
        </html>  
    `);  
});  

// Handle form submission  
app.post('/success', (req, res) => {  
    let{name, email} = req.body;
    console.log(`Name: ${name}, Email: ${email}`);  // Log the form data in the console
    res.send('<h1>Form successfully filled!</h1>');  
});  

// Start the server  
app.listen(PORT, () => {  
    console.log(`Server is running on http://localhost:${PORT}`);  
});