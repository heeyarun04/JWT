const express = require ("express")
const app = express()

const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get("/", (req, res ) => {
    res.status(200).json({msg:"Halooo"})
})


const {createData, readData, generateToken} = require("./controller")
app.post("/create", createData)
app.post("/read", readData)
app.post("/gen", generateToken)

app.listen(port, () => {
    console.log(`running on port ${port}`)
})