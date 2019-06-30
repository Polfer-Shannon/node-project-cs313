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
            
                    //alert(data.firstname);
                
                   //alert(JSON.stringify(data));
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
                    
                    //$("#parents").html(JSON.stringify(data));
                }, 'json'
            );
    });
    
    
//    $("#getChildren").on("click", function(){
//        const person_id =  $("#person_id").val();
//        $.get('/getChildren/' + person_id, {
//                   
//                } , function(data){
//                    const children = data;
//                    for(var i=0; i<children.length; i++){
//                        var person_id = children[i].person_id;
//                       
//                        
//                        $.get('/getPerson?id=' + person_id, {
//                   
//                                } , function(data){
//                                    $("#children").append("<p>" + data.firstname + " " + data.lastname +  "</p>");
//
//                                    //alert(data.firstname);
//
//                                   //alert(JSON.stringify(data));
//                                }, 'json'
//                        );
//                        
//                        
//                        
//                        //alert(JSON.stringify(parents[i]));
//                    }
//                    
//                    //$("#parents").html(JSON.stringify(data));
//                }, 'json'
//            );
//    });
});



