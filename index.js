const express = require("express");
const path = require('path');
const app = express();

const { Pool } = require('pg');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const connectionString = process.env.DATABASE_URL || 'postgres://jungnbhzmkdduw:409cb95baa9dfb6dbf0920d873386d35da2ace41cf219cf10432d3141076ed9d@ec2-54-204-35-248.compute-1.amazonaws.com:5432/d175al70tip46j?ssl=true'

const pool = new Pool({connectionString: connectionString});

app.set("port", (process.env.PORT || 5000));

app.get('/getSong', getSong);

app.get('/getVerse/:id', function(req,res){
    getVerseFromDb(req.params.id, function(err, result){
        res.status(200).json(result);
    })
  })

app.listen(app.get("port"), function(){
    console.log("listening ", app.get("port"));
})

function getSong(req, res) {
   console.log("Getting song information.");
   
   //re.params in a RESTful way and works with :id
   //var id = req.params.id;
   var id = req.query.id;
   console.log("Retrieving song with id: ", id);
   
   getSongFromDb(id, function(error, result) {
     console.log("Back from the getSongFromBb function: ", result); 
     
     
     //Apparently we wouldn't really do the errors this way...
      if (error || result == null || result.length != 1) {
         res.status(500).json({success:false, data: error});
      } else {
         res.json(result[0]);
      }      

   });
}

function getSongFromDb(id, callback) {
   console.log("getSongFromDb called with id ", id);
   
   var sql = "SELECT id, title, song_writer, tempo, root_key From songs WHERE songs.id = $1::int";
   var params = [id];
   
   pool.query(sql, params, function(err, result) {
      if (err) {
         console.log("An error with the DB occurred");
         console.log(err);
         callback(err, null);
      }
      console.log("Found DB result: " + JSON.stringify(result.rows));
      
      callback(null, result.rows);
   });
}

function getVerseFromDb(id, callback){
    var sql = "SELECT id, v_lyrics, v_number FROM verses WHERE songs_id = $1::int";
    var params = [id];
    pool.query(sql, params, function(err, result){
        if(err){ console.log(err); }
        callback(null, result.rows);
    });
}