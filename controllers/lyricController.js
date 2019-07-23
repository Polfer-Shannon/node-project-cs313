const lyricModel = require("../models/lyricModel.js");

function getSong(req, res) {
   console.log("Getting song information.");
   
   //re.params in a RESTful way and works with :id
   //var id = req.params.id;
   var id = req.query.id;
   console.log("Retrieving song with id: ", id);
   
   lyricModel.getSongFromDb(id, function(error, result) {
     console.log("Back from the getSongFromBb function: ", result); 
     
     
     //Apparently we wouldn't really do the errors this way...
      if (error || result == null || result.length != 1) {
         res.status(500).json({success:false, data: error});
      } else {
         res.json(result[0]);
      }      

   });
}

function getVerse(req,res){
    lyricModel.getVerseFromDb(req.params.id, function(err, result){
        res.status(200).json(result);
    })
  }

//function getVerseByNumber(req, res) {
//	// TODO: check if verse id and call the appropriate function...
//
//	var theVerse = req.query.theVerse;
//
//	lyricModel.verseByNumber(theVerse, function(error, results) {
//		res.status(200).json(results);
//	});
//
//
//}

function getChorus(req,res){
    lyricModel.getChorusFromDb(req.params.id, function(err, result){
        res.status(200).json(result);
    })
  }


function getSongList(req,res){
    lyricModel.getSongListFromDb(function(err, result){
        res.status(200).json(result);
    })
  }

function newSongInfo(req, res){
    var result = {success: false};
    
    const title = req.body.title;
    const writer = req.body.writer;
    const tempo = req.body.tempo;
    const key = req.body.key;
    console.log(title + ' ' + writer + ' ' + tempo + ' ' +  key);
    
    lyricModel.addNewSongToDb(title, writer, tempo, key, function (error, result){
        res.json({result});
    })
    
    
}

function newVerseLyrics(req, res){
    var result = {success: false};
    
    const v_lyrics = req.body.v_lyrics;
    const v_number = req.body.v_number;
    const songs_id = req.body.songs_id;
    
    console.log("Snowflake" + " " + v_lyrics, v_number, songs_id);
    
    lyricModel.addNewVerseToDb(v_lyrics, v_number, songs_id, function (error, result){
        res.json({result});
    })
    
    
}

module.exports = {
    getSong: getSong,
    getVerse: getVerse,
//    getVerseByNumber: getVerseByNumber,
    getChorus: getChorus,
    getSongList: getSongList,
    newSongInfo: newSongInfo,
    newVerseLyrics: newVerseLyrics
    
};