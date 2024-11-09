const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;
const users = []; 


app.use(cors());
app.use(bodyParser.json());


app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

   
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        return res.status(409).json({ message: 'User already exists' });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

   
    users.push({ username, password: hashedPassword });

    console.log(`Username: ${username}`);
    console.log(`Password: ${hashedPassword}`);
   
    res.status(201).json({ message: 'User registered successfully' });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
