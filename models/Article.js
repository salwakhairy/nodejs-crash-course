const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const articlescheme=new Schema({
    title:String,
    body:String,
    likes:Number,
});

const Article=mongoose.model("Article",articlescheme);
module.exports=Article;