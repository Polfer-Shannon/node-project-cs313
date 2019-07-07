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

function getVerseByNumber(req, res) {
	// TODO: check if book id or if topic id, and call the appropriate function...

	var theVerse = req.query.theVerse;

	lyricModel.verseByNumber(theVerse, function(error, results) {
		res.json(results);
	});


}

function getChorus(req,res){
    lyricModel.getChorusFromDb(req.params.id, function(err, result){
        res.status(200).json(result);
    })
  }

module.exports = {
    getSong: getSong,
    getVerse: getVerse,
    getVerseByNumber: getVerseByNumber,
    getChorus: getChorus
    
};