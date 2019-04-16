$(function(){
  // Initial array of cars
  var brands = ["BMW", "Mercedes", "Audi"];

  // displayCarsInfo function re-renders the HTML to display the appropriate content
  function displayCarsInfo() {

    var cars = $(this).attr("data-name");

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + cars + "&api_key=Wa2AdCO6cHGtHNULqRHDcKFm4pSgr85Q&limit=10";
    $('#cars-view').empty();
    // Creating an AJAX call for the specific brand button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(queryURL);
      //add here an if statement to filter rating images? if(resultes[i].rating !== 'g' && ....!== 'pg-13')
      for (var i = 0; i < response.data.length; i++) {
        var gifDiv = $('<div>');
        gifDiv.addClass('carGif m-1 shadow p-3 mb-5 bg-white rounded')
        //find out how to slice the title a bit
        var gifTitle = $('<h5>').text(response.data[i].title);
        var gifRating = $('<p>').text('Rating: ' + response.data[i].rating);

        //adding FAVOURITE chackbox

        var img = $('<img></img>').attr('src', response.data[i].images.fixed_height_still.url)
          .attr('data-still', response.data[i].images.fixed_height_still.url)
          .attr('data-animate', response.data[i].images.fixed_height_downsampled.url )
          .attr('data-state', 'still')
          .attr('class', 'gif');

          //adding titles
        $(gifDiv).append(gifTitle, img, gifRating);
        
        
        $('#cars-view').prepend(gifDiv);
        console.log(response.data[i].title)
        

      }
      // function to pause images
      $('.gif').on('click', function () {
        var state = $(this).attr('data-state');
        var animate = $(this).attr('data-animate');
        var still = $(this).attr('data-still');

        // =============================================

        if (state == 'still') {
          $(this).attr('src', animate);
          $(this).attr('data-state', 'animate');
        }
        if (state == 'animate') {
          $(this).attr('src', still);
          $(this).attr('data-state', 'still');
        }
      })
     
    });
  }
    // Function for displaying cars data
    function renderButtons() {

      // Deleting the cars prior to adding new cars
      // (this is necessary otherwise you will have repeat buttons)
      $("#cars-viewbtn").empty();

      
      // Looping through the array of movies
      for (var i = 0; i < brands.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie-btn to our button
        a.addClass("car-btn mx-2 my-5 p-1 shadow px-2 mb-5 bg-white rounded text-secondary");
        // Adding a data-attribute
        a.attr("data-name", brands[i] + "+car");
        // a.attr('data-state', 'still');
        // Providing the initial button text
        a.text(brands[i].toUpperCase());
        // Adding the button to the buttons-view div
        $("#cars-viewbtn").append(a);
        
      }
      $("#cars-viewbtn").fadeOut(250).fadeIn(250);
    }

    // This function handles events where a car button is clicked
  $("#add-car").on("click", function (event) {
      event.preventDefault();
      // This line grabs the input from the textbox
    var carBrand = $("#cars-input").val().trim();

      // Adding movie from the textbox to our array
      brands.push(carBrand);

      // Calling renderButtons which handles the processing of our movie array
      renderButtons();
    // displayCarsInfo(carBrand);
    });

    // Adding a click event listener to all elements with a class of "movie-btn"
  $(document).on("click", ".car-btn", displayCarsInfo);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();

 
})