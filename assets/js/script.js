$(document).ready(function() {

  let fragment = document.createDocumentFragment();

  // Create 9 blocks with the corresponding hour labels
  for (let i = 0; i < 9; i++) {
    // Create the parent div of the next elements
    let firstDiv = document.createElement('div');
    firstDiv.className = 'row time-block';
    firstDiv.id = `hour-${9 + i}`;

    // Create a div element and set the dataset.hour attribute
    let secondDiv = document.createElement('div');
    secondDiv.className = 'col-2 col-md-1 hour text-center py-3';

    if (i < 3) {
      secondDiv.dataset.hour = `${9 + i}AM`;
    } else if (i === 3) {
      secondDiv.dataset.hour = `${9 + i}PM`;
    } else {
      secondDiv.dataset.hour = `${i - 3}PM`;
    }

    // Create the text area
    let textArea = document.createElement('textarea');
    textArea.className = 'col-8 col-md-10 description';
    textArea.rows = 3;

    // Create a button element
    let button = document.createElement('button');
    button.className = 'btn saveBtn col-2 col-md-1';
    button.setAttribute('aria-label', 'save');

    // Create an icon element
    let icon = document.createElement('i');
    icon.className = 'fas fa-save';
    icon.setAttribute('aria-hidden', 'true');

    // Append the created elements
    fragment.appendChild(firstDiv);
    firstDiv.appendChild(secondDiv);
    firstDiv.appendChild(textArea);
    firstDiv.appendChild(button);
    button.appendChild(icon);
  }
  

  $("#container").append(fragment);

  // Add a listener for click events on the save button
  $("#container").on("click", ".saveBtn", function() {

    // Get the description text from the textarea within the same time block
    let description = $(this).siblings(".description").val().trim();

    // Get the id of the containing time-block (e.g., "hour-9")
    let timeBlockId = $(this).closest(".time-block").attr("id");


    // Save the description in local storage using the time block id as the key
    localStorage.setItem(timeBlockId, description);
  });
  
  // Display the hour of the day next to the text area
  let hourElements = document.querySelectorAll('.hour');
  hourElements.forEach(function(element) {
    element.textContent = element.dataset.hour;
  });

  // Apply the past, present, or future class to each time block
  $(".time-block").each(function() {
    let hour = parseInt($(this).attr("id").split("-")[1]);
    let currentHour = dayjs().hour();
    // Remove 'past present future' existing class
    $(this).removeClass('past', 'present', 'future');
    // Depending on the hour set the class
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
});
