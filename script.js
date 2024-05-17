//input element
const dayEl = document.querySelector("#day");
const monthEl = document.querySelector("#month");
const yearEl = document.querySelector("#year");

//error element
const dayErr = document.querySelector(".day-err");
const monthErr = document.querySelector(".month-err");
const yearErr = document.querySelector(".year-err");

//form element
const formEl = document.querySelector("form");

// label element
const dayLabel = document.querySelector(".day-label");
const monthLabel = document.querySelector(".month-label");
const yearLabel = document.querySelector(".year-label");

//output element
const dayOutput = document.querySelector(".output-day");
const monthOutput = document.querySelector(".output-month");
const yearOutput = document.querySelector(".output-year");

// button element
const submitBtn = document.querySelector(".submit-btn");

// get the current date
let currentYear = new Date().getFullYear();

// Return the day of a date as a number (1-31):
let currentDay = new Date().getDate();

// Return the month of a date as a number from 0 to 11.
// To get the correct month number, you must add 1:
let currentMonth = new Date().getMonth() + 1;
console.log(currentMonth);
console.log(currentDay);
console.log(currentYear);

// form submission
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const date = `${dayEl.value}/${monthEl.value}/${yearEl.value}`;
  console.log(date);
  valDate(date);
  showError();
  e.preventDefault();
});

dayEl.addEventListener("input", (e) => {
  if (dayEl.validity.valid) {
    dayErr.textContent = "";
    dayLabel.className = "poppins-semibold";
    dayEl.style.border = "1px solid hsl(0,0%,86%)";
  } else {
    showError();
    dayOutput.textContent = "";
    monthOutput.textContent = "";
    yearOutput.textContent = "";
  }
});
monthEl.addEventListener("input", (e) => {
  if (monthEl.validity.valid) {
    monthErr.textContent = "";
    monthLabel.className = "poppins-semibold";
    monthEl.style.border = "1px solid hsl(0,0%,86%)";
  } else {
    showError();
    dayOutput.textContent = "";
    monthOutput.textContent = "";
    yearOutput.textContent = "";
  }
});
yearEl.addEventListener("input", (e) => {
  if (yearEl.validity.valid) {
    yearErr.textContent = "";
    yearLabel.className = "poppins-semibold";
    yearEl.style.border = "1px solid hsl(0,0%,86%)";
  } else {
    showError();
    dayOutput.textContent = "";
    monthOutput.textContent = "";
    yearOutput.textContent = "";
  }
});

// handle the errors
function showError() {
  if (dayEl.validity.valueMissing) {
    dayErr.textContent = "input required";
    dayLabel.className = "label-error";
    dayEl.style.border = "1px solid hsl(0,100%,67%)";
  }
  if (monthEl.validity.valueMissing) {
    monthErr.textContent = "input required";
    monthLabel.className = "label-error";
    monthEl.style.border = "1px solid hsl(0,100%,67%)";
  }
  if (yearEl.validity.valueMissing) {
    yearErr.textContent = "input required";
    yearLabel.className = "label-error";
    yearEl.style.border = "1px solid hsl(0,100%,67%)";
  }
}

function valDate(date) {
  //date format dd/mm/yyyy
  let dateformat = /^(0?[1-9]|[1-2][0-9]|3[01])[\/](0?[1-9]|1[0-2])/;

  // Matching the date through regular expression
  if (date.match(dateformat)) {
    let operator = date.split("/");

    // Extract the string into month, date and year

    let day = parseInt(operator[0]);
    let month = parseInt(operator[1]);
    let year = parseInt(operator[2]);

    // Create a list of days of a month
    let ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (year > currentYear) {
      yearErr.textContent = "must be in the past";
      yearLabel.className = "label-error";
      yearEl.style.border = "1px solid hsl(0,100%,67%)";

      dayOutput.textContent = "";
      monthOutput.textContent = "";
      yearOutput.textContent = "";
      return false;
    }

    if (month > ListofDays.length) {
      monthErr.textContent = "must be a valid month";
      monthLabel.className = "label-error";
      monthEl.style.border = "1px solid hsl(0,100%,67%)";

      dayOutput.textContent = "";
      monthOutput.textContent = "";
      yearOutput.textContent = "";
      console.log("invalid month");
      return false;
    }
    if (month == 1 || month > 2) {
      if (day > ListofDays[month - 1]) {
        //to check if the date is out of range
        dayErr.textContent = "must be a valid day";
        dayLabel.className = "label-error";
        dayEl.style.border = "1px solid hsl(0,100%,67%)";

        dayOutput.textContent = "";
        monthOutput.textContent = "";
        yearOutput.textContent = "";
        console.log("Invalid date");
        return false;
      }
    } else if (month == 2) {
      let leapYear = false;
      if ((!(year % 4) && year % 100) || !(year % 400)) leapYear = true;
      if (leapYear == false && day >= 29) {
        dayErr.textContent = "must be a valid day";
        dayLabel.className = "label-error";
        dayEl.style.border = "1px solid hsl(0,100%,67%)";

        dayOutput.textContent = "";
        monthOutput.textContent = "";
        yearOutput.textContent = "";
        console.log("Invalid date");
        return false;
      } else if (leapYear == true && day > 29) {
        dayErr.textContent = "must be a valid day";
        dayLabel.className = "label-error";
        dayEl.style.border = "1px solid hsl(0,100%,67%)";

        dayOutput.textContent = "";
        monthOutput.textContent = "";
        yearOutput.textContent = "";
        console.log("Invalid date format!");
        return false;
      }
    }
  } else {
    dayErr.textContent = "must be a valid day";
    dayLabel.className = "label-error";
    dayEl.style.border = "1px solid hsl(0,100%,67%)";

    dayOutput.textContent = "";
    monthOutput.textContent = "";
    yearOutput.textContent = "";
    console.log("Invalid date format!");
    return false;
  }

  if (dayEl.value > currentDay) {
    currentDay = dayEl.value;
    dayEl.value = currentDay;
  }
  if (monthEl.value > currentMonth) {
    currentMonth = currentMonth + 12;
    currentYear = currentYear - 1;
  }

  let days = currentDay - dayEl.value;
  let months = currentMonth - monthEl.value;
  let years = currentYear - yearEl.value;

  dayOutput.textContent = days;
  monthOutput.textContent = months;
  yearOutput.textContent = years;
}
