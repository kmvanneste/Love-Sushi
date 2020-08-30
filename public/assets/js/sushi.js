// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".change-sushi").on("click", function(event) {
      var id = $(this).data("id");
      var newPreparedState = $(this).data("newsushi");
  
      var newSushiRoll = {
        prepared: newPreparedState
      };
  
      // Send the PUT request.
      $.ajax("/api/sushi/" + id, {
        type: "PUT",
        data: newSushiRoll
      }).then(
        function() {
          console.log("changed to", newPreparedState);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var newSushi = {
        name: $("#ca").val().trim(),
        prepared: $("[name=prepared]:checked").val().trim()
      };
  
      // Send the POST request.
      $.ajax("/api/sushi", {
        type: "POST",
        data: newSushi
      }).then(
        function() {
          console.log("created new sushi");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".delete-sushi").on("click", function(event) {
      var id = $(this).data("id");
  
      // Send the DELETE request.
      $.ajax("/api/sushi/" + id, {
        type: "DELETE"
      }).then(
        function() {
          console.log("deleted sushi", id);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  });
  