
    $(function () {
      // Display the current date in the header of the page.
      function displayCurrentDate() {
          $("#currentDay").text(dayjs().format("MMMM D, YYYY"));
      }
  
      // Save button click event listener
      $(".saveBtn").on("click", function () {
          // Get the hour from the parent time-block element's ID.
          let hour = $(this).closest(".time-block").attr("id");
  
          // Get the user input from the textarea within the clicked time-block.
          let description = $(this).siblings("textarea").val();
  
          // Save the user input in local storage using the hour as the key.
          localStorage.setItem(hour, description);
      });
  
      // Apply the past, present, or future class to each time block.
      function updateHourlyClasses() {
          let currentHour = dayjs().hour();
  
          $(".time-block").each(function () {
              let blockHour = parseInt($(this).attr("id").split("-")[1]);
  
              // Remove existing classes and apply the appropriate class based on the current hour.
              $(this).removeClass("past present future");
              if (blockHour < currentHour) {
                  $(this).addClass("past");
              } else if (blockHour === currentHour) {
                  $(this).addClass("present");
              } else {
                  $(this).addClass("future");
              }
          });
      }
  
      // save in local storage.
      function loadSavedEvents() {
        $(".time-block").each(function () {
            let hour = $(this).attr("id");
            let description = localStorage.getItem(hour);
    
            if (hour && description) {
                $(this).children("textarea").val(description);
            }
        });
    }
  
      // Call functions to initialize the page.
      displayCurrentDate();
      updateHourlyClasses();
      loadSavedEvents();
  });