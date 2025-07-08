import express from "express"
import cors from "cors"
import dotenv from "dotenv"

const app = express()
const PORT = process.env.PORT || 3000;

dotenv.config();
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
   let data = req.body;
})

app.post("/api/", async (req, res) => {

    try{
        let {message} = req.body;
        // console.log(message)
        let url = `https://api.callmebot.com/whatsapp.php?phone=${process.env.PHONE_NO}&text=${encodeURIComponent(message)}&apikey=${process.env.CALLMEBOT_API_KEY}`
        console.log(url);
        let response = await fetch(url);
        let text = await response.text();
        console.log(text);

        if(response.ok) {
            res.status(200).json({success: true, message: "Message successfully received"})
        } else {
            res.status(500).json({success: false, message: text});
        }
    }catch(e) {
        console.log("inside catch");
        res.status(500).json({success: false, message: e.message});
    }
    
})
app.listen(PORT, () => {
    console.log(`✅Server Listening at http://localhost:${PORT}`);
})