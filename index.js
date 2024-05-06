const express=require("express");
const app=express()
const mongoose=require("mongoose");
app.use(express.json());
const Article =require("./models/Article");
mongoose.connect("mongodb+srv://salwakhairy749:iYWqQhYbkKITtPqi@myfirstnodejs.ko8sm8y.mongodb.net/?retryWrites=true&w=majority&appName=myfirstnodejs")
.then(()=>{
    console.log("connected successfully");
}).catch((error)=>{
    console.log("error with connecting the db",error); 
});

//mongodb+srv://salwakhairy749:<password>@myfirstnodejs.ko8sm8y.mongodb.net/?retryWrites=true&w=majority&appName=myfirstnodejs
app.get("/hello",(req,res)=>{
    res.send("hello");

});

app.get("/hi",(req,res)=>{
    res.send("hi");
});

app.post("/comment",(req,res)=>{
    console.log("comment");
});
app.get("/sayhello",(req,res)=>{
    res.json({
        name:req.body.name
    });
});

app.get("/numbers",(req,res)=>{
    let numbers="";
    for(let i=0; i<=100;i++){
        numbers +=i + "-";
    }
    res.render("numbers.ejs",{
        numbers: numbers 
    })
});

app.get("/summation/:number1/:number2",(req,res)=>{
        const num1=req.params.number1;
        const num2=req.params.number2;
        const total=Number(num1)+Number(num2);
        res.send(`the total is ${total}`);
    });


    app.post("/articles",async(req,res)=>{
        const newArticle=new Article();
        const artTitle=req.body.articletitle;
        const artBody=req.body.ariclebody;
        newArticle.title=artTitle;
        newArticle.body=artBody;
        newArticle.likes=0;
        await newArticle.save();
        res.json();
    });

    app.get("/articles/:articleId",async(req,res)=>{
        const id=req.params.articleId;
       try{
        const article=await Article.findById(id);
        res.json(article);
        return;
       }catch(error){
            console.log("error while reading article of id",id);
            return res.send("error");
       }
    });

    app.get("/showArticles",async(req,res)=>{
        const articles=await Article.find();
        res.render("articles.ejs",{
            allArticles: articles,
        });
    });
app.listen(3000,()=>{
    console.log("iam listening in port 3000");
});