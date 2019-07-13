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



});



function getTheVerse() {
    console.log("Searching for verse...");

    var theVerse = $("#theVerse").val();
    console.log("The Verse: " + theVerse);

    $.get("/getVerseByNumber", {theVerse: theVerse}, function (data) {
        console.log("Back from the server with:");
        console.log(data);

        for (var i = 0; i < data.list.length; i++) {
            var verse = data.list[i];

            $("#verse").append("<li>" + verse.v_lyrics + "</li>");
        }

    })
}

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
    