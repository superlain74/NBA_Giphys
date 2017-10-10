$(document).ready(function() {
	//An array of play types, new play type will be pushed into this array;
	var plays = ["Dunks", "Passes", "Blocks", "Crossovers", "Fast breaks", "Ankle Breakers", "Alley-oops", "Celebrations"];
	//Creating Functions & Methods
	//Function that displays all gif buttons
	function displayGifButtons() {
		$("#gifButtonsView").empty(); //erasing anything in this div id so that it doesn't duplicate the results
		for (var i = 0; i< plays.length; i++) {
			var gifButton = $("<button>");
			gifButton.addClass("play");
			gifButton.addClass("btn btn-primary")
			gifButton.attr("data-name", plays[i]);
			gifButton.text(plays[i]);
			$("#gifButtonsView").append(gifButton);
		}
	}
	//Function to add a new play button
	function addNewButton() {
	$("#addGif").on("click", function(){
		var play = $("#play-input").val().trim();
		if (action == "") {
				return false; //added so user cannot add a blank button
		}
		plays.push(play);

		displayGifButtons();
		return false;
	});
}
//Function to remove last play button
//Doesn't work properly yet removes all of the added buttons
//rather than just the last
function removeLastButton(){
	$("removeGif").on("click", function() {
		plays.pop(play);
		displayGifButtons();
		return false;
	});
}
//Function that displays all of the gifs
function displayGifs() {
	var play = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +'NBA'+ ' ' + play + "&api_key=aWnV08DQrPzswHg6xVUfnYVI3Uvh324Z&limit=10"
	console.log(queryURL); //displays the constructed url
	$.ajax({
		url: queryURL,
		method: 'GET'
	})
	.done(function(response) {
		console.log(response); //console test to make sure something returns
		$("#gifsView").empty(); //erasing anything in this div id so that it doesn't keep any from the previous click
		var results = response.data; //shows results of gifs
		if (results == "") {
			alert("There isn't a gift for this selected button");
		}
		for (var i=0; i<results.length; i++) {

			var gifDiv = $("<div>"); //div for the gifs to go inide
			gifDiv.addClass("gifDiv");
			//pulling rating of gif
			var gifRating = $("<p>").text("Rating: " + results[i].rating);
			gifDiv.append(gifRating);
			//pulling gif
			var gifImage = $("<img>");
			gifImage.attr("src", results[i].images.fixed_height_small_still.url); //still image stored into src of image
			gifImage.attr("data-still", results[i].images.fixed_height_small_still.url); //still image
			gifImage.attr("data-animate", results[i].images.fixed_height_small_still.url) //animated image
			gifImage.attr("data-state", "still"); //set the image stte
			gifImage.addClass("image");
			gifDiv.append(gifImage);
			//pulling still image of gif
			//adding div of gifs to gifsView div
			$("#gifsView").prepend(gifDiv);
		}
	});	
}
//Calling Functions & Methods
displayGifButtons(); //displays list of plays already created
addNewButton();
removeLastButton();
//Document Event Listeners
$(document).on("click", ".play", displayGifs);
$(document).on("click", ".image", function() {
	var state = $(this).attr('data-state');
	if (state == 'still') {
		$(this).attr('src', $(this).data('animate'));
	}else{
		$(this).attr('src', $(this).data('still'))
	}
});
});






