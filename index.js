const  express= require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");

app.get("/",(req,res)=>{
    fs.readdir(`./files`,(err,file)=>{
        // console.log(file);
        res.render("index",{files:file});
    })
})

app.get("/files/:fileName",(req,res)=>{
    fs.readFile(`./files/${req.params.fileName}`,"utf-8",(err,data)=>{
        res.render("show",{fileName:req.params.fileName,details:data})
    })
})

app.post("/create",(req,res)=>{
    // console.log(req.body)
    fs.writeFile(`./files/${req.body.fileName.split(" ").join("")}.txt`,req.body.details,(err)=>{
        res.redirect("/")
    })
})



app.listen(3000);