import {Client} from 'pg'
import cors from 'cors'
import express from 'express'
import 'dotenv/config'

const app = express()

app.use(cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type']
}));

app.use(express.json())

const client  = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false}
})
client.connect();

app.post('/', async (req,res) => {
    const {name, address, age} = req.body;
    try {
        await client.query(
            'INSERT INTO user_detail(name, address, age) VALUES($1,$2,$3) ', [name, address, age]            
        )
        res.json({success: true})

    } catch (error) {
        res.status(500).json({ERROR: "can't quary"})
        
    }
},

app.get('/', async (req,res) => {
    try {
        const result = await client.query('SELECT * FROM user_detail')
        res.json(result.rows)
    } catch (error) {
        console.error(error);
        res.status(500).json({ERROR: "Can get the table"})
        
    }
})
)
app.listen(5001, () => console.log("Server is running."))

