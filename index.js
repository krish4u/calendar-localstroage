var d = new Date();

var j = 0;
var i = 0;
var displayMonth = "";
var skipper = 1; // Counting all Tables Cells Include the empty cells
var counter = 0; // Counting only days
var todays = d.toString().split(" ")[2]; // Today's date (ex: 2,12,31)
var umonth = d.getMonth(); //+1 Current Month

var uyear = d.getFullYear(); // Current Year

var taskTmpl =
  "<div class='task'><h6 style='color:#fff'>Add To Do<span class='task-close'>x</span></h6><input type='text' placeholder='Add task' /><input type='button' id='task-btn' value='ok'/></div>";

var daysArr = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]; // For get index of starting of a month
var monthArr = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function totalDays() {
  if (umonth == -1) {
    umonth = 11;
  }
  if (umonth == 12) {
    umonth = 0;
  }
  $(".month__display").html(monthArr[umonth]);
  $(".year__display").html(uyear);
  //console.log("function begins to execute");
  var firstDay = new Date(uyear, umonth, 1);
  var firstDate = firstDay.toString().split(" ")[0].toLowerCase();
  firstDay = firstDay.toString().split(" ")[2];
  firstDate = daysArr.indexOf(firstDate);

  var lastDay = new Date(uyear, umonth + 1, 0);
  lastDay = lastDay.toString().split(" ")[2];

  buildDays(firstDay, lastDay, firstDate);
  
  
}

function buildDays(a, b, c) {
  for (j = 0; j <= 7; j++) {
    $(".cal table").append("<tr id=_" + j + ">");
    for (i = 1; i <= 7; i++) {
      if (i <= c && j == 0) {
        $(".cal #_" + j).append("<td></td>");
        skipper++;
      } else {
        counter++;
        $(".cal #_" + j).append(
          "<td><span class='days' data-days="+counter+">" + counter + "</span></td>"
        );
        skipper++;
        if (counter == todays) {
          $(".cal #_" + j + " td:last-child span").addClass("today");
        }
      }

      if (counter == b) {
        return false;
      }
      $(".cal").append("</tr>");
    
    }
  }
 
}
totalDays();


$(document).ready(function() {
  //Function For Month Selection section show up
  $("#month").on("click", function() {
    if ($(".month__selector").hasClass("show")) {
      $(".month__selector").removeClass("show");
    } else {
      $(".month__selector").addClass("show");
    }
  });

  //Function for set selected month
  $(".month__selector li").on("click", function() {
    var userMonth = $(this).attr("data-month");
    userMonth = parseInt(userMonth);
    $("tr[id*=_]").remove();
    counter = 0;
    skipper = 0;
    j = 0;
    i = 0;
    umonth = userMonth - 1;
    totalDays();
    isTask();
  });

  // Function for next month
  $("#prev").on("click", function() {
    $("tr[id*=_]").remove();
    counter = 0;
    skipper = 0;
    j = 0;
    i = 0;
    umonth = umonth - 1;
    if (umonth == -1) {
      uyear = uyear - 1;
    }
    totalDays();
    isTask();
  });

  // Function for previous month
  $("#next").on("click", function() {
    $("tr[id*=_]").remove();
    counter = 0;
    skipper = 0;
    j = 0;
    i = 0;
    umonth = umonth + 1;
    if (umonth == 12) {
      uyear = uyear + 1;
    }
    totalDays();
    isTask();
  });

  // Handling each day task activites
  $(".days").on("click", function() {
    var stickTop = $(this).position().top;
    var stickLeft = $(this).position().left;
    $("body").append(taskTmpl);
    $(".task").css({
      top: stickTop + 35 + "px",
      left: stickLeft + "px"
    });
    var manipId = $(this).parent().text() + "_" + umonth + "_" + uyear;
    $('.task input[type="text"]').attr("id", manipId);
    
    
    // setting handler for task close
    $('.task-close').on('click',function(){$(".task").remove();});
  });

  // Set taks in localstorage on submit
  $("body").on("click", "#task-btn", function() {
    if($('.task input[type="text"]').val() != "" || null){
    var ptr = $('.task input[type="text"]').attr("id");
    var ptr_val = $("#" + ptr).val();
    localStorage.setItem(ptr, ptr_val);
    $(".task").remove();
    isTask();
    }
    else{
      alert('add some task');
      
    }
  });

  //Marking days with its tasks
  function isTask(){
  var get_task = [];
  for (i = 0; i < localStorage.length; i++) {
    //console.log(localStorage.key(i));
    get_task[i] = localStorage.key(i).split("_");
    if (uyear == get_task[i][2]) {
      if (umonth == get_task[i][1]) {
        console.log("entry avail with current month");
        $('td span[data-days='+(get_task[i][0])+']')
          .addClass('task-present')
          //.attr("title",localStorage.getItem(localStorage.key(i)))
          .append("<span class='task-content'>"+localStorage.getItem(localStorage.key(i))+"</span>");
      }
    }
  }
    
}
  
  isTask();
  
});