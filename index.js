const express = require("express");
const path = require('path');
require('dotenv').config();

const lyricController = require("./controllers/lyricController.js");

const app = express();
app.set("port", (process.env.PORT || 5000));



app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({extended: true})); // support url encoded bodies
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




app.get('/getSong', lyricController.getSong);
app.get('/getVerse/:id', lyricController.getVerse);
//app.get('/getVerseByNumber', lyricController.getVerseByNumber);
app.get('/getChorus/:id', lyricController.getChorus);
app.get('/getNewSong', lyricController.getSong);
app.get('/songList', lyricController.getSongList);
app.post('/postNewSong', lyricController.newSongInfo);
app.post('/postNewVerse', lyricController.newVerseLyrics);

app.listen(app.get("port"), function(){
    console.log("listening ", app.get("port"));
})





