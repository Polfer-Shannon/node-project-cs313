$(document).ready(function () {
    $("#song-form").on('submit', function (event) {
        event.preventDefault();
        const song_id = $("#song_id").val();
        $.get('/getSong?id=' + song_id, {

        }, function (data) {
            $("#title").text(data.title);
            $("#song_writer").text(data.song_writer);
            $("#tempo").text(data.tempo);
            $("#root_key").text(data.root_key);
        }, 'json'
                );
    });
    $("#song-form2").on('submit', function (event) {
        event.preventDefault();
        const song_id2 = $("#song_id2").val();
        $.get('/getSong?id=' + song_id2, {

        }, function (data) {
            $("#title2").text(data.title);
            $("#song_writer2").text(data.song_writer);
            $("#tempo2").text(data.tempo);
            $("#root_key2").text(data.root_key);
        }, 'json'
                );
    });

    $("#getVerse").on("click", function () {

        const song_id = $("#song_id").val();
        $.get('/getVerse/' + song_id, {

        }, function (data) {
            const verse = data;
            console.log(data);
            var message = "";
            for (var i = 0; i < verse.length; i++) {


                message += '<p>' + verse[i].v_number + '</p>';
                message += '<p>' + verse[i].v_lyrics + '</p>';
            }

            $("#verse").append(message);
        }, 'json'
                );
    });

    $("#getChorus").on("click", function () {

        const song_id = $("#song_id").val();
        $.get('/getChorus/' + song_id, {

        }, function (data) {
            const chorus = data;
            console.log(data);
            var message = "";
            for (var i = 0; i < chorus.length; i++) {


                message += '<p>' + chorus[i].c_lyrics + '</p>';
            }

            $("#chorus").append(message);
        }, 'json'
                );
    });
    
        $("#getVerse2").on("click", function () {

        const song_id = $("#song_id2").val();
        $.get('/getVerse/' + song_id, {

        }, function (data) {
            const verse = data;
            console.log(data);
            var message = "";
            for (var i = 0; i < verse.length; i++) {


                message += '<p>' + verse[i].v_number + '</p>';
                message += '<p>' + verse[i].v_lyrics + '</p>';
            }

            $("#verse2").append(message);
        }, 'json'
                );
    });

    $("#getChorus2").on("click", function () {

        const song_id = $("#song_id2").val();
        $.get('/getChorus/' + song_id, {

        }, function (data) {
            const chorus = data;
            console.log(data);
            var message = "";
            for (var i = 0; i < chorus.length; i++) {


                message += '<p>' + chorus[i].c_lyrics + '</p>';
            }

            $("#chorus2").append(message);
        }, 'json'
                );
    });
    
    $("#song-form3").on('submit', function (event) {
        event.preventDefault();
        const title = $("#newSong_title").val();
        const writer = $("#newSong_writer").val();
        const tempo = $("#newSong_tempo").val();
        const key = $("#newSong_key").val();
        console.log(title, writer, tempo, key);
        $.post('/postNewSong', {title: title, writer: writer, tempo: tempo, key: key,}, function (data) 
        {
            console.log("Back from the server with: " + title + " " + writer + "" + tempo + "" + key);
//            console.log(data);
//            $("#tableNewSongInfo").append("<tr><td>" + title + "</td></tr><tr><td>" + writer + "</td></tr><tr><td>" + tempo + "</td></tr><tr><td>" + key + "</td></tr>");
        });
    });
    
        $("#lyricForm").on('submit', function (event) {
        event.preventDefault();
        const id = $("#newSong_id").val();
        const verse = $("#newVerse").val();
        const verse_number = $("#newVerseNumber")
       
        console.log(verse);
        $.post('/postNewVerse', {id: id, verse: verse, verse_number: verse_number}, function (data) 
        {
            console.log("Back from the server with: " + verse);

        });
    });
    
});


//function getTheVerse() {
//    console.log("Searching for verse...");
//    var theVerse = $("#theVerse").val();
//    console.log("The Verse: " + theVerse);
//    $.get("/getVerseByNumber", {theVerse: theVerse}, function (data) {
//        console.log("Back from the server with:");
//        console.log(data);
//        for (var i = 0; i < data.list.length; i++) {
//            var verse = data.list[i];
//            $("#verse").append("<li>" + verse.v_lyrics + "</li>");
//        }
//
//    })
//}

function songList() {
    console.log("Getting the song list")
    $.get("/songList", function (data) {

        for (var i = 0; i < data.list.length; i++) {
            var songs = data.list[i];
//        console.log("title= " + songs.title + " " + "id= " + songs.id);


            $("#theSongs").append("<tr><td>" + songs.title + "</td>" + "<td>" + songs.id + "</td></tr>");
        }
    });
}
    