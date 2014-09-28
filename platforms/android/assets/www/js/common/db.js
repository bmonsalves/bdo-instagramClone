var dbinstagram = {

    initialize: function() {
          document.addEventListener("deviceready", dbinstagram.onDeviceReady, false);
    },

    onDeviceReady: function() {
        var db = window.openDatabase("instagram", "1.0", "instagramclone", 10000000);
        db.transaction(dbinstagram.populateDB, dbinstagram.errorCB, dbinstagram.successCB);
        db.transaction(dbinstagram.queryDB, dbinstagram.errorQuery);

    },

    populateDB: function(tx) {
        //tx.executeSql('DROP TABLE IF EXISTS photo');
        tx.executeSql('CREATE TABLE IF NOT EXISTS photo(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nombre, width, height, lat, lon, nombre_ciudad, uri)');
        //tx.executeSql('INSERT INTO photo ( nombre, width, height, lat, lon, nombre_ciudad, uri) VALUES ( "nombre", "width", "height", "lat", "lon", "nombre_ciudad", "uri")');
        //tx.executeSql('INSERT INTO photo ( nombre, width, height, lat, lon, nombre_ciudad, uri) VALUES ( "nombre", "width", "height", "lat", "lon", "nombre_ciudad", "uri")');
    },

    errorCB: function(tx, err) {
        alert("Error processing SQL: "+err);
    },

     successCB: function() {
        console.log("bd cargada!");
    },

     queryDB: function(tx) {
        tx.executeSql('SELECT * FROM photo', [], dbinstagram.querySuccess, dbinstagram.errorQuery);
    },

    querySuccess: function(tx, results) {
        var len = results.rows.length;

            for (var i=0; i<len; i++){
            var myElem = document.getElementById('div'+i);
            if (myElem == null){
                var node=document.getElementById("divInit");
                    var divTag = document.createElement("div");
                    divTag.id = "div"+i;
                    //alert(results.rows.item(i).id);
                    divTag.innerHTML = '<article class="art">'
                                            +'<div class="entrie-title" >'
                                                +'<ul class="top-bar-entrie">'
                                                    +'<li>'
                                                        +'<a href="#" class="loginLink">'
                                                            +'<img class="imgUser" src="http://images.ak.instagram.com/profiles/anonymousUser.jpg"alt="">'
                                                            +'<strong>'+results.rows.item(i).nombre+'</strong>'
                                                        +'</a>'
                                                    +'</li>'
                                                    +'<li>'
                                                        +'<strong class="rightPosition">0d</strong>'
                                                    +'</li>'
                                                +'</ul>'
                                            +'</div>'
                                            +'<div class="imgContainer">'
                                                +'<img class="recentPic" src="'+results.rows.item(i).uri+'" alt="">'
                                            +'</div>'
                                            +'<div class="compContainer">'
                                                +'<a href="#" label="Toggle like" class="timelineLikeButton">'
                                                    +'<span class="timelineLikeButtonAnimation" >'
                                                    +'</span>'
                                                +'</a>'
                                                +'<div class="geoContainer">'
                                                    +'<p id="dir">'+results.rows.item(i).nombre_ciudad+'</p>'
                                                +'</div>'
                                                +'<div class="mediaMoreButtonContainer">'
                                                    +'<a class="mediaMoreButton" role="button" aria-haspopup="true" href="#"></a>'
                                                +'</div>'
                                            +'</div>'
                                            +'</div>'
                                            +'<div class="timelineCommentComposer">'
                                                +'<input type="text" placeholder="Write a comment..." class="timelineCommentTextField" />'
                                            +'</div>'
                                     +'</article>';

                    document.getElementById("carga").insertBefore(divTag,node.nextSibling);
                    var node2=document.getElementById("div2");
                    var divTag2 = document.createElement("div");

                    divTag2.id = "div2";
                    divTag2.innerHTML = '<div>'
                                            +'<div class="box">'
                                                +'<figure class="boxInner">'
                                                    +'<img src="'+results.rows.item(i).uri+'" alt="">'
                                                +'</figure>'
                                            +'</div>'
                                         +'</div>';

                    document.getElementById("cargaCuadricula").insertBefore(divTag2,node2.nextSibling);

                }
            }
    },

    errorQuery: function(err) {
        alert("Error processing SQL: "+err.code);
    },

    insertPhoto: function(columns,values){
        var db = window.openDatabase("instagram", "1.0", "instagramclone", 10000000);
        //alert(columns);
        //alert(values);
        db.transaction(function (tx) {
            tx.executeSql('INSERT INTO photo ('+ columns +') VALUES ('+ values +')');
            });
        //db.transaction(dbinstagram.queryDB, dbinstagram.errorQuery);
    },

    insertCity: function(column, value, uri){
        var db = window.openDatabase("instagram", "1.0", "instagramclone", 10000000);
                //alert("inser uri: " + uri);
                //alert(column);
                //alert(value)
                //alert("consulta: "+"UPDATE photo SET "+column+" = '" + value + "' WHERE uri = '" + uri+"'");
                db.transaction(function (tx) {
                    tx.executeSql("UPDATE photo SET "+column+" = '" + value + "' WHERE uri = '" + uri+"'", [], dbinstagram.successCB  , dbinstagram.errorCB);
                    //tx.executeSql('INSERT INTO photo ("'+ column +'") VALUES ("'+ value +'") WHERE uri = "'+uri+'" ');
                    });
        db.transaction(dbinstagram.queryDB, dbinstagram.errorQuery);
    }
};






