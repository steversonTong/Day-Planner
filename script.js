function currentTime() {
  var date = new Date(); /* creating object of Date class */
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  hour = updateTime(hour);
  min = updateTime(min);
  sec = updateTime(sec);
  document.getElementById("clock").innerText =
    hour + " : " + min + " : " + sec; /* adding time to the div */
  var t = setTimeout(function () {
    currentTime();
  }, 1000); /* setting timer */
}

function updateTime(k) {
  if (k < 10) {
    return "0" + k;
  } else {
    return k;
  }
}

currentTime(); /* calling currentTime() function to initiate the process */

$(document).ready(function () {
  // Reference to the container that we are putting the rows in.
  var container = $(".container");

  // Hours to display but in 24 hour time.
  var hoursToDisplay = ["09", "10", "11", "12", "13", "14", "15", "16", "17"];

  // Set the date at the top of the page with specific formatting.
  $("#currentDay").text(getDate());

  makeEntries();

  function makeEntries() {
    // Loop through all the hours for the page and make the rows.
    for (var i = 0; i < hoursToDisplay.length; i++) {
      // Create the div that holds all the elements for the row.
      var newForm = $("<form>");
      var newEntry = $("<form-group>");
      newEntry.addClass("row time-block input-group");

      // Create the hour label at the front of each row.
      var entryHour = $("<p>");
      entryHour.addClass("hour input-group-prepend");
      entryHour.text(convertTo12Hr(hoursToDisplay[i]));

      // Create the input field for the user.
      var entryInput = $("<textarea>");
      entryInput.addClass("submit-button w-75 description");

      //#region Colors
      if (parseInt(getHour24()) < parseInt(hoursToDisplay[i])) {
        // Future
        entryInput.addClass("future");
      } else if (getHour24() > hoursToDisplay[i]) {
        // Past
        entryInput.addClass("past");
      } else if (parseInt(getHour24()) === parseInt(hoursToDisplay[i])) {
        // Present
        entryInput.addClass("present");
      } else {
        console.warn("Could not set color.");
      }
      //#endregion

      // If the value from localStorage is not empty, then set the input field to be that.
      var inputVal = getLocalStorage(hoursToDisplay[i]);
      if (inputVal) {
        // Set this text box to what is in storage.
        entryInput.val(inputVal);
      }

      // Make a new button
      var entryButton = $("<btn>");
      // Add all the classes to make it a save button.
      entryButton.addClass("btn btn-info input-group-append saveBtn");
      entryButton.text("Save");

      // Add an on click passing the input field and the function to call.
      entryButton.on(
        "click",
        { hour: hoursToDisplay[i], value: entryInput },
        function (event) {
          event.preventDefault();
          // Sets the values of the input field in localStorage.
          setLocalStorage(event.data.hour, event.data.value.val());
          alert("Your schedule is saved!");
        }
      );

      // Append all the elements to the entry then form then to the container.
      newEntry.append(entryHour);
      newEntry.append(entryInput);
      newEntry.append(entryButton);

      newForm.append(newEntry);

      container.append(newForm);
    }
  }

  //#region Time
  function getDate() {
    return moment().format("MMMM Do, YYYY");
  }

  function getHour24() {
    return moment().format("H");
  }

  function convertTo12Hr(time24) {
    var AmOrPm = time24 >= 12 ? "pm" : "am";
    time24 = time24 % 12 || 12;
    var finalTime = time24 + AmOrPm;
    return finalTime;
  }
  //#endregion

  //#region localStorage
  function getLocalStorage(key) {
    return localStorage.getItem(key);
  }

  function setLocalStorage(key, value) {
    localStorage.setItem(key, value);
  }
  //#endregion
});
