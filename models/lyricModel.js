const { Pool } = require("pg");

const db_url = process.env.DATABASE_URL;

// console.log("DB URL: " + db_url);
const pool = new Pool({connectionString: db_url});

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

module.exports = {
    getSongFromDb: getSongFromDb,
    getVerseFromDb: getVerseFromDb
}