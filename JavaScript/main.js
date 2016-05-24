// TRAVEL



// get the countries from the world bank API
// turn the user country choice into a var that can be used in each ajax search for each API
// turn the user country choice and transform it into a code AND get the capital city for each country. 
var travelApp = {};
// defining init method
travelApp.init = function(){
	travelApp.getCountry();
	// change to .on('submit') later
	$('select').on('change', function(){
		$('#artwork').empty();
		var userCountryName = $(this).find(':selected').text();
		var userCountryCode = $('select').val();

	// get the metro area
		window.userCapitalCity = travelApp.countries.filter(function(country){
			// if ( userCountryName === country.name ){
				return userCountryName === country.name; 
			// }
			})[0].city;

			console.log(userCapitalCity);
			// console.log(countries.city);
	





	// get the weather
		// travelApp.getWeather(userCountryName)

	// get the art
		travelApp.getArtwork(userCountryName);

	// get the photo
		travelApp.getPhoto(userCountryName);
	// 
		travelApp.getFood(userCountryName);

	});


}; //closes init


travelApp.getCountry = function(){
    $.ajax({
	    url: 'http://proxy.hackeryou.com',
	    data: {
	        reqUrl: 'http://api.worldbank.org/country',
	        params: {
	            per_page: 214,
	            region: 'WLD',
	            format: 'json'
	        }
	    }
	})
	.then(function(countries) {
	    // console.log(countries);
	    travelApp.countries = countries[1].map(function(country) {
			return {
				id: country.id,
			    name: country.name,
			    city: country.capitalCity
			}
		});


		countries = travelApp.countries;
		        var sortedCountries = countries.sort(function(a,b) {
		            if (a.name > b.name) return 1;
		            else if (a.name < b.name) return -1;
		            else return 0;
		        })
		        for(var i = 0; i < travelApp.countries.length; i++ ){
		        console.log(countries);
		            var option = $('<option>').text(sortedCountries[i].name).val(sortedCountries[i].id);
		            $('#countries').append(option);
		// console.log(city);
		//From there when the user selects an option, take the value 
		//and add it to the url for making country specific ajax requests for employed, out of school children and out of school female children
	      };
	    })
	};
    
// travelApp.getArtwork = function(userCountryName){
// 	console.log('does this work?');
// }







// ART API
// ART API KEY: YZVe0oD0
// https://www.rijksmuseum.nl/api/en/collection?key=YZVe0oD0
// // get art work
// // we put searchQuery into the function
travelApp.getArtwork = function(userCountryName){
	$.ajax({
		url:'https://www.rijksmuseum.nl/api/en/collection',
		method:'GET',
		dataType:'jsonp',
		data: {
			key: 'YZVe0oD0',
			format: 'jsonp',
			q: userCountryName
		},
	}).then(function(res){
		travelApp.displayArtwork(res.artObjects);
		console.log(res);
	});
}


// // display art work on the page 
travelApp.displayArtwork = function(artwork){
	
// 		// need to call the for each method on the array, the method forEach takes a parameter and will represent each 
// 		// we are going through the artwork array to build the information of the artwork into html
	artwork.forEach(function(artPiece){
	// here we have to create the html elements
		// <div class="piece">
		//   	<h2>Title of Art Piece</h2>
		//   	<p class="artist">Artist Name</p>
		//   	<img src="url-to-image" alt="">
		// </div>
// 		// below we are still storing the title but within the h2 and then printing it to text
// 		// dynamically creating html elemnets and storing them in variables
if(artPiece.webImage != null){
	var artPieceTitle = $('<h3>').text(artPiece.title);
	var artPieceArtist = $('<p>').text(artPiece.principalOrFirstMaker).addClass('artist');
	var artPieceImage = $('<img>').attr('src', artPiece.webImage.url);

	var artPieceDiv = $('<div>').addClass('piece').append(artPieceTitle, artPieceArtist, artPieceImage);
// 		// selecting our empty container and appending each artPiece to the page
	$('#artwork').append(artPieceDiv);
		
// 		// before adding the .text and html element consolelog the var to see if it works
// 			// console.log(artPieceTitle);
// 			// console.log(artPieceArtist);
// 			// console.log(artPieceImage);


	}
	});
	}
        //We want to make a select dropdown
       
  
// YUMMLY API
// 4258f887431c2971b6e9a5fc93850803

var foodApiKey = '22981353ba0adfcf1928128e4a1e73a4';
var foodApiId = '046e426b';
travelApp.getFood = function(userCountryName){
	$.ajax({
		url:'http://api.yummly.com/v1/api/recipes',
		method:'GET',
		dataType:'jsonp',
		data: {
			_app_id: foodApiId,
			_app_key: foodApiKey,
			format: 'jsonp',
			requirePictures: true,
			q: userCountryName

		},
	}).then(function(res){
		travelApp.displayFood(res.matches);
		// console.log(res.matches[0]);
		// console.log(res.matches);
	});
};

travelApp.displayFood = function(food){
	var foodList = $.makeArray(food); 
	console.log(foodList);
	var i= 0;
	$('#food').empty();
 	foodList.forEach(function(){
 		
 		i = i + 1;
 			console.log(foodList[i].recipeName);
 		if(foodList[i] != null){
				var foodPhoto = $('<img>').attr('src', foodList[i].smallImageUrls);
				var foodName = $('<h3>').text(foodList[i].recipeName).addClass('recipeName');
				var foodRecipeDiv = $('<div>').addClass('recipe').append(foodName, foodPhoto);

				$('#food').append(foodRecipeDiv);

			}
			// else if(foodList[i].recipeName == null){
			// 	//if no food recipes exist then send a message saying try another country
			// 	console.log("this worked")
			// 	var errorMsg = $('h2').text("Sorry, but this country doesn't have any recipes on the interwebs right now!");
			// 	var foodRecipeDiv = $('<div>').addClass('error').append(errorMsg);

			// 	$('#food').append(foodRecipeDiv);
 		// 	}
	});
	
 }




// FLICKR API 

var photoApiKey = 'c47e2720ce8e0a191abaf5df85b6df60';

travelApp.getPhoto = function(userCountryName){
	$.ajax({
		url:'http://proxy.hackeryou.com',
		method:'GET',
		dataType:'json',
		data: {
			reqUrl:'https://api.flickr.com/services/rest/',
			params: {
	            method: "flickr.photos.search",
	            // Possibly use this as the method instead check with them tomorrow to see if this can work with tags 'flickr.interestingness.getList'

	            api_key: photoApiKey,
	            nojsoncallback: 1,
	            tags:userCountryName, 
	            min_upload_date: "2015-01-01 00:00:01",
	            privacy_level: "1",
	            safe_search:1,
	            content_type:1,
	            format: 'json',
	            // woe_id:userCountryName

	        }
		}

	}).then(function(results){
		travelApp.displayPhoto(results.photos.photo[0]);
	});
};




	travelApp.displayPhoto = function(photoObj){
		var photoUrl = 'https://farm' + photoObj.farm +'.staticflickr.com/' + photoObj.server + '/' + photoObj.id + '_' + photoObj.secret + '_h.jpg';
		console.log(photoUrl)
	    $('section.main').css('background-image', 'url(' + photoUrl + ')');

	}



// SONGKICK API
// SONGKICK API KEY: pCFUXkWsq0NBe2xA
//  var concertApiKey = 'pCFUXkWsq0NBe2xA';
//  var concertUrl = 'http://api.songkick.com/api/3.0/search/locations.json?query={'+ userCapitalCity + '}&apikey={' + concertApiKey + '}';
//  console.log("concert url", concertUrl);

// travelApp.getConcerts = function(userCapitalCity){
// 	$.ajax({
// 		url:'http://api.songkick.com/api/3.0/search/locations.json?query={'+ userCapitalCity + '}&apikey={' + concertApiKey + '}',
// 		method: 'GET',
// 		dataType: 'json',
// 		data: {
// 			key: concertApiKey,
// 			format: 'json',
// 			q: userCapitalCity
// 		}
// 	})
// 	// .then(function(res){
// 	// 	travelApp.displayConcerts(res.concertObj);
// 	// 	console.log(res.concertObj);
// 	// });
// };



// doc ready, kicking off application with init
$(function(){
	travelApp.init();
});
// COUNTRY API
	// World Bank






// WEATHER API
// WEATHER API KEY
// 0a81b7f68cc55325
// var weatherWidget = {};
// storing our url
// weatherWidget.apiUrl = "http://api.wunderground.com/api/0a81b7f68cc55325/conditions/q/CA/San_Francisco.json";
// this is calling the method getData, it just needs to get the data



