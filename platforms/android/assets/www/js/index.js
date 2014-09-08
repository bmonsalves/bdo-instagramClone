var app = {
  initialize: function() {
      this.bindEvents();
  },
 
  bindEvents: function() {
      var takePhoto = document.getElementById('takePhoto');
      takePhoto.addEventListener('click', app.takePhoto, false);
      var sendPhoto = document.getElementById('miniaturas');
      sendPhoto.addEventListener('click', app.sendPhoto, false);
  },

  sendPhoto: function() {      
  },

  takePhoto: function(){
      navigator.camera.getPicture(app.onPhotoDataSuccess, app.onFail, { quality: 20, 
          allowEdit: true, destinationType: navigator.camera.DestinationType.DATA_URL });
  },

  onPhotoDataSuccess: function(imageData) {
    var pic = "data:image/jpeg;base64," + imageData;
    //arr.push(pic);
    var node=document.getElementById("div1");
    var divTag = document.createElement("div"); 
 
    divTag.id = "div1"; 

    divTag.innerHTML = '<article class="art"><div class="entrie-title" ><ul class="top-bar-entrie"><li><a href="#" class="loginLink"><img class="imgUser" src="http://images.ak.instagram.com/profiles/anonymousUser.jpg"alt=""><strong>Usuario</strong></a></li><li><strong class="rightPosition">0d</strong></li></ul></div><div class="imgContainer"><img class="recentPic" src="'+pic+'" alt=""></div><div class="compContainer"><a href="#" label="Toggle like" class="timelineLikeButton"><span class="timelineLikeButtonAnimation" ></span></a><div class="mediaMoreButtonContainer"><a class="mediaMoreButton" role="button" aria-haspopup="true" href="#"> </a></div></div></div><div class="timelineCommentComposer"><input type="text" placeholder="Write a comment..." class="timelineCommentTextField" /></div></article>';

    document.getElementById("carga").insertBefore(divTag,node); 
    var node2=document.getElementById("div2");
    var divTag2 = document.createElement("div"); 
 
    divTag2.id = "div2"; 
    //divTag2.innerHTML = "holaaaaaaaaa golaasdsd asd ad sa dsa dsa dsa dsa dsa dsa dsa dsa dsa dsa dsa dsa das dsa dsa dsa dsa";
    divTag2.innerHTML = '<div><div class="box"><figure class="boxInner"><img src="'+pic+'" alt=""></figure></div></div>';

    document.getElementById("cargaCuadricula").insertBefore(divTag2,node2); 
  },

  onFail: function(message) {
    alert('Failed because: ' + message);
  }

};
