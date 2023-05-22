const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
/*const crypto = require("crypto");*/
const mongoose = require("mongoose");
const app = express();
app.use(cors());
dotenv.config();
app.use(bodyParser.json());


//AUthorsSchema
const AuthorsSchema = new mongoose.Schema({
    name: String,
    birthyear:Number,
    genre:String,
    isDead:Boolean,
    isMale:Boolean,
    imageUrl:String
});
const AuthorModel=new mongoose.model('Authors',AuthorsSchema);



app.get("/api", (req, res) => {
    res.send("welcome to out API!");
});

//GET ALL Authors - MONGO DB
app.get("/api/authors", async (req, res) => {
    const { name } = req.query;
    const authors = await AuthorModel.find();
    if (!name) {
      res.status(200).send(authors);
    } else {
      const searchedAuthors = authors.filter((x) =>
        x.name.toLowerCase().trim().includes(name.toLowerCase().trim())
      );
      res.status(200).send(searchedAuthors);
    }
});
//GET Author BY ID - MONGO DB
app.get("/api/authors/:id", async(req, res) => {
    const { id } = req.params;
    const author = await AuthorModel.findById(id)
    res.status(200).send(author);
});
//DELETE Author - MONGO DB
app.delete("/api/authors/:id",async(req, res) => {
    const id = req.params.id;
    //delete
    const deleteAuthor = await AuthorModel.findByIdAndDelete(id);
    res.status(203).send({
      message: `${deleteAuthor.name} deleted successfully!`,
    });
});
//EDIT Author - MONGO DB
app.put("/api/authors/:id", async(req, res) => {
    const id = req.params.id;
    const { name, birthyear, imageUrl,isDead,isMale,genre} = req.body;
    const updatingAuthor = {name:name,birthyear:birthyear,imageUrl:imageUrl,isDead:isDead,isMale:isMale,genre:genre};
    await AuthorModel.findByIdAndUpdate(id,updatingAuthor);
    res.status(200).send(`${updatingAuthor.name} updated successfully!`);
});



//POST ARTIST - MONGO DB
app.post("/api/authors", async (req, res) => {
    const { name, birthyear, imageUrl,genre,isDead,isMale } = req.body;
    const newAuthor = new AuthorModel({
      name: name,
      birthyear:birthyear,
      isDead:isDead,
      isMale:isMale,
      genre:genre,
      imageUrl: imageUrl,
    });
    await newAuthor.save();
    res.status(201).send({
      message: `${newAuthor.name} posted successfully`,
      payload: newAuthor,
    });
});

PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App running on PORT: ${PORT}`);
});

DB_PASSWORD = process.env.DB_PASSWORD;
DB_CONNECTION = process.env.DB_CONNECTION;

mongoose.connect(DB_CONNECTION.replace("<password>", DB_PASSWORD)).then(() => {
  console.log("Mongo DB connected!");
});