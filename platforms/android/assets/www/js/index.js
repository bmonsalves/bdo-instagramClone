
var app = {
  initialize: function() {
      this.bindEvents();
  },
 
  bindEvents: function() {
      var takePhoto = document.getElementById('takePhoto');
      takePhoto.addEventListener('click', app.takePhoto, false);
      var sendPhoto = document.getElementById('miniaturas');
      sendPhoto.addEventListener('click', false, false);
  },

  takePhoto: function(){

     if (navigator.geolocation)
     {
       var positionOptions = {
         enableHighAccuracy: true,

       };
       navigator.geolocation.getCurrentPosition(app.geolocationSuccess, app.geolocationError, positionOptions);
     }
     else{
       document.getElementById("error").innerHTML += "Your browser doesn't support the Geolocation API";
     }

      navigator.camera.getPicture(app.onPhotoDataSuccess, app.onFail, { quality: 20, sourceType : Camera.PictureSourceType.CAMERA,
          allowEdit: false, destinationType: navigator.camera.DestinationType.FILE_URI, encodingType: Camera.EncodingType.JPG, saveToPhotoAlbum: true });


  },

  onPhotoDataSuccess: function(imageData) {

    pic = imageData;

    //alert(pic.substr(7, pic.length));
    //arr.push(pic);

    var columns = "nombre, width, height, lat, lon, uri";
    var values = '"usuario", "500px", "300px", "'+lat+'", "'+lon+'", "'+pic.substr(7, pic.length)+'"';
    dbinstagram.insertPhoto(columns,values);

  },

  onFail: function(message) {
    alert('Failed because: ' + message);
  },

    geolocationSuccess: function(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude

      var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      // Write the formatted address
      app.writeAddressName(userLatLng);

    },

    geolocationError: function(positionError) {
      document.getElementById("error").innerHTML += "Error: " + positionError.message + "<br />";
    },

    writeAddressName: function(latLng) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
          "location": latLng
        },
        function(results, status) {
          if (status == google.maps.GeocoderStatus.OK){
            var result = results[0];
            //look for locality tag and administrative_area_level_1
            var city = "";
            var country = "";
            for(var i=0, len=result.address_components.length; i<len; i++) {
                var ac = result.address_components[i];
                if(ac.types.indexOf("locality") >= 0) city = ac.long_name;
                if(ac.types.indexOf("country") >= 0) country = ac.long_name;
            }
            columns = "nombre_ciudad";
            values = city +', '+ country;
            dbinstagram.insertCity(columns,values, pic.substr(7, pic.length) );
            //document.getElementById("dir").innerHTML = city+', '+country;
            }
          else
            document.getElementById("dir").innerHTML += "Unable to retrieve your address" + "<br />";
        });

      }

};



