$(document).ready(function() {

  for (let i = 0; i < 9; i++) {
    let firstDiv = document.createElement('div');
    firstDiv.className = 'row time-block';
    firstDiv.id = `hour-${9 + i}`;
    console.log(`hour-${9 + i}`);
  }

  /*    <div id="hour-9" className="row time-block">
        <div className="col-2 col-md-1 hour text-center py-3" data-hour="9AM"></div>
        <textarea className="col-8 col-md-10 description" rows="3"> </textarea>
        <button className="btn saveBtn col-2 col-md-1" aria-label="save">
          <i className="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>*/
  
  // Add a listener for click events on the save button
  $(".saveBtn").on("click", function() {

    // Get the description text from the textarea within the same time block
    let description = $(this).siblings(".description").val().trim();

    // Get the id of the containing time-block (e.g., "hour-9")
    let timeBlockId = $(this).closest(".time-block").attr("id");

    // Save the description in local storage using the time block id as the key
    localStorage.setItem(timeBlockId, description);
  });
  
  // Display the hour of the day next to the text area
  $('.hour').each(function () {
    let info = $(this).data('hour');
    $(this).text(info);
  });

  // Apply the past, present, or future class to each time block
  $(".time-block").each(function() {
    let hour = parseInt($(this).attr("id").split("-")[1]);
    let currentHour = dayjs().hour();
    
    $(this).removeClass('past present future')
    
    if (hour < currentHour) {
      $(this).addClass("past");
    } else if (hour === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });

  // Get user input from local storage and set the textarea values
  $(".time-block").each(function() {
    let timeBlockId = $(this).attr("id");
    let description = localStorage.getItem(timeBlockId);
    $(this).find(".description").val(description);
  });

  // Display the current date in the header of the page
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
  
  // Refresh the page every hour
  setInterval(function () {
    location.reload();
  }, 3600000);
});
