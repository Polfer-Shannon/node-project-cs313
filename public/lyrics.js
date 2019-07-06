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

    $("#getVerse").on("click", function(){
   
        const song_id =  $("#song_id").val();
        $.get('/getVerse/' + song_id, {
                   
                } , function(data){
                    const verse = data;
                    
                    console.log(data);
                   var message = ""; 
                    for(var i=0; i<verse.length; i++){
                        
                        
                        message += '<p>' + verse[i].v_number + '</p>';
                        message += '<p>' + verse[i].v_lyrics + '</p>';
                            

                    }
                    
                    $("#verse1").append(message);
                    
                   
                }, 'json'
            );
    });
    
    

});



