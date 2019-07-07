$(document).ready(function(){
    $("#song-form").on('submit', function(event){
        event.preventDefault();
        const song_id =  $("#song_id").val();
        $.get('/getSong?id=' + song_id, {
                   
                } , function(data){
                    $("#title").text(data.title);
                    $("#song_writer").text(data.song_writer);
                    $("#tempo").text(data.tempo);
                    $("#root_key").text(data.root_key);
            

                }, 'json'
        );
    });

    $("#getChorus").on("click", function(){
   
        const song_id =  $("#song_id").val();
        $.get('/getChorus/' + song_id, {
                   
                } , function(data){
                    const chorus = data;
                    
                    console.log(data);
                   var message = ""; 
                    for(var i=0; i<chorus.length; i++){
                        
                        
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

	$.get("/getVerseByNumber", {theVerse:theVerse}, function(data) {
		console.log("Back from the server with:");
		console.log(data);

		for (var i = 0; i < data.list.length; i++) {
			var verse = data.list[i];

			$("#verse").append("<li>" + verse.v_lyrics + "</li>");
		}

	})
}

