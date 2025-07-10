let button = document.getElementById("button")
let taskInput = document.getElementById("addTask")
let taskContainer = document.getElementById("taskContainer")

function applyDarkModeToTaskImages() {
   let imgs = taskContainer.querySelectorAll("img");
   imgs.forEach(img => {
      img.style.filter = document.body.classList.contains("dark-mode")
         ? "invert(1)"
         : "invert(0)";
   });
}


function saveTasksToLocalStorage() {
   let tasksHTML = taskContainer.innerHTML;
   localStorage.setItem("tasks", tasksHTML);
}
function loadTasksFromLocalStorage() {
   let savedTasks = localStorage.getItem("tasks");
   if (savedTasks) {
      taskContainer.innerHTML = savedTasks;
    
      applyDarkModeToTaskImages();



      let allTasks = taskContainer.querySelectorAll(".tasks");
      allTasks.forEach(task => {
         let taskAddedImg = task.querySelector(".circle-btn");
         taskAddedImg.addEventListener("click", () => {
            task.classList.toggle("done");
            updateHeading();
            updateProductivity();
            productivityBar();
            saveTasksToLocalStorage();
         });
         let deleteBtn = task.querySelector(".delete-btn");
         deleteBtn.addEventListener("click", () => {
            task.remove();
            updateHeading();
            updateProductivity();
            productivityBar();
            saveTasksToLocalStorage();
         });
      });


   } else {

      localStorage.removeItem("tasks");
   }
   updateHeading();
   updateProductivity();
   setTimeout(() => {
      productivityBar();
   }, 0);
}


if (localStorage.getItem("theme") === "dark") {
   document.body.classList.add("dark-mode");

   const btn = document.getElementById("changeTheme");
   if (btn) {
      btn.textContent = "light mode";
   }
}




loadTasksFromLocalStorage();




function addTask() {
   if (taskInput.value.trim() == "") {
      return;
   }
   let task = document.createElement("div")
   task.classList.add("tasks")
   task.innerHTML = `
  <img class="circle-btn" src="images/circle.svg" alt="status">
  <span>${taskInput.value}</span>
  <img src="images/delete.svg" alt="delete" class="delete-btn">
`;


   taskContainer.appendChild(task)
   taskInput.value = "";
   updateHeading();


   let taskAddedImg = task.querySelector(".circle-btn")
   taskAddedImg.addEventListener("click", () => {
      task.classList.toggle("done")
      updateHeading();
      updateProductivity();
      productivityBar();
      saveTasksToLocalStorage(); 
   }
   )
   let deleteBtn = task.querySelector(".delete-btn");
   let tasks = taskContainer.children;
   deleteBtn.addEventListener("click", () => {
      task.remove();
      updateHeading();
      updateProductivity();
      productivityBar();
      saveTasksToLocalStorage();
   }
   )

   applyDarkModeToTaskImages(); 


   saveTasksToLocalStorage(); 
}

button.addEventListener("click", () => {
   addTask();
}
)


taskInput.addEventListener("keydown", (e) => {
   if (e.key === "Enter") {
      e.preventDefault(); 
      button.click();     
   }
});




//  lets make heading like your taks //
function updateHeading() {
   let headingLeftSpan = document.getElementById("yourTasks");
   let taskAddedCount = taskContainer.children.length;
   let tasksInContainer = [];
   for (let i = 0; i < taskAddedCount; i++) {
      tasksInContainer[i] = taskContainer.children[i];
   }
   let completed = 0;
   tasksInContainer.forEach((tc) => {
      if (tc.classList.contains("done")) {
         completed = completed + 1;
      }
   });
   headingLeftSpan.textContent = ` taskadded: ${taskAddedCount}, completed:${completed}`
};
// lets make for productivity score//
function productivity() {
   let allTasks = taskContainer.querySelectorAll(".tasks");
   let total = allTasks.length;
   let completed = taskContainer.querySelectorAll(".tasks.done").length;
   if (total === 0) return 0;
   return Math.round((completed / total) * 100);
}
// this function is for updating productivity//
function updateProductivity() {
   let productPer = document.getElementById("Productivity");
   let productNum = productivity();
   productPer.textContent = `📊 Productivity:${productNum}%`
}
// lets make productivity bar //

function productivityBar() {
   let bar = document.getElementById("productivityBar");
   // Clear previous boxes first
   bar.innerHTML = "";
   // Get current productivity %
   let productNum = productivity();
   // Create 100 boxes and color them
   for (let i = 0; i < 100; i++) {
      let box = document.createElement("div");
      box.classList.add("prodbox");
      // Color boxes based on completed tasks
      box.style.backgroundColor = i < productNum ? "green" : "#ddd";
      bar.appendChild(box);
   }
}




let headingText = document.getElementById("mainHeading")
let index = 0;
function changeHeading() {
   const headings = [
      "A Clear Mind Begins with a Clean List ✨",
      "Crush Chaos, One Task at a Time 💼",
      "Make Today Count — Start Here 📝",
      "Your Day, Your Way 🌿",
      "Simplify Life, One Task at a Time 🧩",
      "Organize. Focus. Breathe. ☁️",
      "Clarity Starts With Action ✅",
      "Plan Smart. Live Better 🧠",
      "Tiny Steps, Big Wins 🚀",
      "Intentional Days Begin with Intentional Lists 🌅",
      "Stay Calm, Stay Clear, Stay Focused 🪷",
      "Write It Down. Get It Done 📋",
      "Peace Through Planning 🕊️",
      "One List to Rule the Day 🌞",
      "Tasks Today, Triumph Tomorrow 🏆",
      "Begin Beautifully 💫",
      "Structure Brings Serenity 🔖",
      "Let’s Keep It Tidy, Shall We? 🌸",
      "Design Your Day with Purpose 🎯",
      "Refocus. Recenter. Reorganize ♻️"
   ];
   headingText.textContent = headings[index]
   index = (index + 1) % headings.length
}
setInterval(changeHeading, 5000)
// this is for box 2  //
function clock() {
   let now = new Date()
   let time = now.toLocaleTimeString()
   let clock = document.getElementById("clockBox");
   clock.innerText = time;
}
setInterval(clock, 1000)
// this is for day date month//
let today = new Date();
let monthName = today.toLocaleString('en-IN', { month: 'long' });
let todayDate = today.getDate();
let day = today.getDay();
let weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',];
// day number me hai sunday 0 se //
let dayStr = weekDays[day];
let dayDate = document.getElementById("DayDate")
dayDate.innerHTML = `
                        <span>${dayStr},</span>
                        <span>${todayDate}</span>
                        <span>${monthName}</span>
                    `
// this is for greeting user//
let now = new Date();
let hourNow = now.getHours()
let timeGreet = document.getElementById("GreetTime");
if (hourNow >= 0 && hourNow < 12) {
   timeGreet.textContent = "🌞 Good Morning!";
   timeGreet.style.color = "#3498db"; // sky blue
}
else if (hourNow >= 12 && hourNow < 16) {
   timeGreet.textContent = "🌤️ Good Afternoon!";
   timeGreet.style.color = "#e67e22"; // orange
} else {
   timeGreet.textContent = "🌙 Good Evening!";
   timeGreet.style.color = "#8e44ad"; // purple
}



// lets work for calender//
let Now = new Date()
let monthNames = [
   "January", "February", "March", "April", "May", "June",
   "July", "August", "September", "October", "November", "December"
];
let currentMonth = Now.getMonth()
let currentYear = Now.getFullYear()

let MonthYear = document.getElementById("MonthYear")
let calender = document.getElementById("Calender")
function updateCalenderHeading() {
   MonthYear.innerHTML = `<button class="calenderbutton" id="prevMonth"><</button>
                    <span id="monthYearHeading">${monthNames[currentMonth]},${currentYear}</span>
                    <button class="calenderbutton" id="nextMonth">></button>`
}
function generateCalender(month, year) {
   calender.innerHTML = "";
   const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
   dayNames.forEach(day => {
      const daybox = document.createElement("div")
      daybox.textContent = day;
      daybox.classList.add("day");
      calender.appendChild(daybox);
   }
   );
   let firstDay = new Date(year, month, 1).getDay();
   let totalDay = new Date(year, month + 1, 0).getDate();

   for (let i = 0; i < firstDay; i++) {
      let empty = document.createElement("div")
      calender.appendChild(empty);
   }
   for (let date = 1; date <= totalDay; date++) {
      let dateBox = document.createElement("div")
      dateBox.textContent = date;
      dateBox.classList.add("date");
      if (date == Now.getDate() && month == Now.getMonth() && year == Now.getFullYear()) {
         dateBox.classList.add("today")
      }
      calender.appendChild(dateBox)
   }
   updateCalenderHeading(); //this  Update the month-year heading
}
generateCalender(currentMonth, currentYear);
document.addEventListener("click", function (e) {
   if (e.target.id === "prevMonth") {
      currentMonth--;
      if (currentMonth < 0) {
         currentMonth = 11;
         currentYear--;
      }
      generateCalender(currentMonth, currentYear);
   }
   if (e.target.id === "nextMonth") {
      currentMonth++;
      if (currentMonth > 11) {
         currentMonth = 0;
         currentYear++;
      }
      generateCalender(currentMonth, currentYear);
   }
})




function darkmode() {
   let btn = document.getElementById("changeTheme");
   btn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      if (document.body.classList.contains("dark-mode")) {
         localStorage.setItem("theme", "dark");
         btn.textContent = "light mode";
      } else {
         localStorage.setItem("theme", "light");
         btn.textContent = "dark mode";
      }

      applyDarkModeToTaskImages(); 
   });
}

darkmode();


