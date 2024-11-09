import express from 'express'
import bcrypt from 'bcrypt'
import cors from 'cors'

const app = express()
const port = 3000;

const users = [];

app.use(cors());
app.use(express.json())

app.post('/register', async (req, res) =>{
    try {
        const {username, email, password} = req.body;
        // check if user already exists
        const existingUser = users.find((data) => data.username === username && data.email === email);
        if(existingUser){
            return res.status(400).send({message: "Username or email already exists"})
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({username, email, password: hashedPassword});
        console.log(`Username: ${username}`);
        console.log(`Email: ${email}`);
        console.log(`Password: ${hashedPassword}`);
        res.status(201).send({message: "User registered successfully"})
    } catch (error) {
        res.status(500).send({message: error.message})
    }
})

app.post('/login', async (req, res) =>{
    try {
        const {email, password} = req.body;
        // check if user not exists
        const existingUser = users.find((data) => data.email === email);
        if(!existingUser){
            return res.status(404).send({message: "Invalid email or password"})
        }
        // check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect){
            return res.status(400).send({message: "Invalid email or password"})
        }
        console.log(`${username} logged in successfully`);
        res.status(200).send({message: "Login successful"})
    } catch (error) {
        res.status(500).send({message: error.message})
    }
})
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})