const {Pool} = require("pg");

const db_url = process.env.DATABASE_URL;

// console.log("DB URL: " + db_url);
const pool = new Pool({connectionString: db_url});

function getSongFromDb(id, callback) {
    console.log("getSongFromDb called with id ", id);

    var sql = "SELECT id, title, song_writer, tempo, root_key From songs WHERE songs.id = $1::int";
    var params = [id];

    pool.query(sql, params, function (err, result) {
        if (err) {
            console.log("An error with the DB occurred");
            console.log(err);
            callback(err, null);
        }
        console.log("Found DB result: " + JSON.stringify(result.rows));

        callback(null, result.rows);
    });
}

function getVerseFromDb(id, callback) {
    var sql = "SELECT id, v_lyrics, v_number FROM verses WHERE songs_id = $1::int";
    var params = [id];
    pool.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        }
        callback(null, result.rows);
    });
}

//function verseByNumber(theVerse, callback) {
//    console.log("Searching the DB for verse: " + theVerse)
//
//    var sql = "SELECT v_lyrics FROM verses WHERE v_number=$1::int";
//    var params = [theVerse];
//
//    pool.query(sql, params, function (err, db_results) {
//
//        if (err) {
//            throw err;
//        } else {
//            // We got some successful results from the DB
////			 console.log("Back from the DB with: ")
////			 console.log(db_results);
//
//            var results = {
//                success: true,
//                list: db_results.rows
//            };
//
//            callback(null, results);
//        }
//
//    });
//
//}

function getChorusFromDb(id, callback) {
    var sql = "SELECT id, c_lyrics FROM chorus WHERE songs_id = $1::int";
    var params = [id];
    pool.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        }
        callback(null, result.rows);
    });
}

function getSongListFromDb(callback) {
   
    var sql = "SELECT title, id FROM songs ORDER BY title";
//    var params = [id];
    pool.query(sql, function (err, db_results) {
        if (err) {
            console.log(err);
        } else {
            console.log("Found DB result: " + JSON.stringify(db_results.rows));

            var results = {
                success: true,
                list: db_results.rows
            };

            callback(null, results);
        }
    });
}

function addNewSongToDb(title, writer, tempo, key, callback) {
   console.log("Inserting " + title + " " + writer + " " + tempo + " " + key);

   var sql2 = 'INSERT INTO songs (title, song_writer, tempo, root_key) VALUES ($1, $2, $3, $4)';

   var params = [title, writer, tempo, key];

   pool.query(sql2, params, function (err, db_results) {
      if (err) {
         throw err;
      } else {
         var results = {
            success: true,
            list: db_results.rows
         };

         callback(null, results);
      }

   });
};

function addNewVerseToDb(id, verse, verse_number, callback) {
   console.log("Inserting " + verse);

   var sql3 = 'INSERT INTO verses (v_lyrics, v_number) VALUES ($2, $3) WHERE songs_id=$1::int';

   var params = [id, verse, verse_number];

   pool.query(sql3, params, function (err, db_results) {
      if (err) {
         throw err;
      } else {
         var results = {
            success: true,
            list: db_results.rows
         };

         callback(null, results);
      }

   });
};

module.exports = {
    getSongFromDb: getSongFromDb,
    getVerseFromDb: getVerseFromDb,
//    verseByNumber: verseByNumber,
    getChorusFromDb: getChorusFromDb,
    getSongListFromDb: getSongListFromDb,
    addNewSongToDb: addNewSongToDb,
    addNewVerseToDb: addNewVerseToDb
}