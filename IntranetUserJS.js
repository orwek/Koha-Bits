// Add row count to checkin screen
$(document).ready(function(){
   if (location.href.indexOf("returns.pl") != -1) {
      let rowCount = $('#checkedintable tbody tr').length;
      $(".page-section h2").html("Checked-in items (" + rowCount + ")");
   }
});

// Highlight NEW items on the check-in screen
$(document).ready(function(){
 if (location.href.indexOf("returns.pl") != -1) {
   let tmp_item = $(".ci-itemtype");
   for(const check2 of tmp_item) {
      if (check2.innerHTML.includes("New") || check2.innerHTML.includes("NEW")) {
         	check2.style="background-color: #fff82b;"    
       }
   }
 }
});

// Add message to Check-out Screen for Staff reminders, appears under the barcode box.
// You can also customize the color for each message.
$(document).ready(function(){
  if (location.href.indexOf("circulation.pl") != -1) {
		  let msg_array = [
			  "<p style='color:blue;'><b>January Message!</b></p>", // January
			  "<p style='color:darkgreen;'><b>February Message!</b></p>", // February
			  "<p style='color:#c00;'><b>March Message!</p>", // March
			  "<p style='color:orange;'><b>April Message!</b></p>", // April
			  "<p style='color:#8B4513;'><b>May Message!</b></p>", // May
			  "<p style='color:teal;'><b>June Message!</b></p>", // June
			  "<p style='color:darkolivegreen;'><b>July Message!</b></p>", // July
			  "<p style='color:firebrick;'><b>August Message!</b></p>", // August
			  "<p style='color:goldenrod;'><b>September Message!</b></p>", // September
			  "<p style='color:darkorange;'><b>October Message!</b></p>", // October
			  "<p style='color:sienna;'><b>November Message!</b></p>", // November
			  "<p style='color:chocolate;'><b>December Message!</b></p>" // December
		  ];
		  let tmp_id2="circ_circulation_issue";
		  let tmp_i = app.get(tmp_id2).innerHTML;
		  let d = new Date();
		  let m = d.getMonth();    
		  app.get(tmp_id2).innerHTML =  tmp_i + "<br /><br />" + msg_array[m];
  }
});
	  
// Copy phone number to SMS field for initial patron entry
$(document).ready(function(){
   if (location.href.indexOf("memberentry.pl?op=add") != -1){
         let tmp_phone = app.get("phone").value;
         tmp_phone = tmp_phone.replace("-", "");
         app.get("SMSnumber").value = tmp_phone.replace("-", "");
   }
});
     
// Add HTML/Text toggle buttons to Pages editor
$(document).ready(function(){
if (location.href.indexOf("additional-contents.pl?op=add_form") != -1){
  // add buttons to UI for Pages tool
  let tmp_text = "<div class='btn-group' style='float:right; margin-top: -42px; z-index: 1000;'><div class='btn btn-secondary' onclick='location.href = location.href.replace(\"wysiwyg\",\"text\");'>HTML</div>";
  let tmp_editor = "<div class='btn btn-secondary' onclick='location.href = location.href.replace(\"text\",\"wysiwyg\");'>Editor</div><br /></div>";
  let tmp_tools = $("#add_additional_content").html();
  $("#add_additional_content").html(tmp_text + tmp_editor + tmp_tools);
}
});

// Make Fast Cataloging even faster for Books
$(document).ready(function(){
  if (location.href.indexOf("addbiblio.pl?frameworkcode=FA") != -1) {
       $("[id^='tag_000_subfield_00']").val("     nam a22     7a 4500");
       $("[id^='tag_008_subfield_00']").val("240826b        |||||||| |||| 00| 0 eng d");
       $("[id^='tag_942_subfield_c']").val("BOOK");
       $("[id^='tag_245_subfield_a']").focus();
  }
});

// fix Holds Ignore bug
$(document).ready(function(){
  if (location.href.indexOf("returns.pl") != -1) {
      document.getElementsByClassName("deny")[0].type = "button";
  }
});

// add link to Koha Offline Library Tool
$(document).ready(function(){
if (location.href.indexOf("circulation-home.pl") != -1){
  		$("#offline-circulation").append("<p><a href='https://github.com/orwek/kolt/blob/main/kolt.html' target='_blank'>&#9822; Get KOLT</a></p>");
    }
});


// Circ and Fine Column Filters
// Written Jan 2026 for Koha 25.05
const circ = {
	on_off: 1, // 0= off, 1=on
	simple: [1,2,5,6,7,9,10,22,23,25,26,27,36], // col #s
	checkout: [1,2,5,6,7,8,9,10,11,15,36],
	fine: [1,2,7,12,13,14,15,16,17,18,35,36],
	renew: [1,2,22,23,24,25,26,27,28,36],
	holds: [1,2,29,30,31,32,33,34,35,36],
	status: "all",
	gen_btns: function () {
		// buttons code
		let tmp = "";
		tmp += "<a class='btn btn-primary btn-success' id='all' style='cursor: pointer;' onclick='circ.hide(\"all\")'>All</a> ";
		tmp += "<a class='btn btn-primary' id='simple' style='cursor: pointer;' onclick='circ.hide(\"simple\")'>Simple</a> ";
		tmp += "<a class='btn btn-primary' id='checkout' style='cursor: pointer;' onclick='circ.hide(\"checkout\")'>Checkouts</a> ";
		tmp += "<a class='btn btn-primary' id='holds' style='cursor: pointer;' onclick='circ.hide(\"holds\")'>Holds</a> ";
		tmp += "<a class='btn btn-primary' id='fine' style='cursor: pointer;' onclick='circ.hide(\"fine\")'>Fines</a> ";
		tmp += "<a class='btn btn-primary' id='renew' style='cursor: pointer;' onclick='circ.hide(\"renew\")'>Renewals</a>";
		// add in the appropriate place
		$('<div id="showhideContainer">' + tmp +'</div>').insertBefore($('#default-circulation-rules'));
	},
	set_colors: function () {
		// Set custom colors for table headers
		setInterval(function () {
		  $('#default-circulation-rules th').css({"background-color":"#408540","color":"white"});
		},300);
    },
    hide: function (x_in) {
		circ.status = x_in;
		if (x_in == "all"){
			$("#default-circulation-rules td").show();
			$("#default-circulation-rules th").show();
			$("#showhideContainer a").removeClass("btn-success");
			$("#" + circ.status).addClass("btn-success");
		} else {	
			// hide all
			$("#default-circulation-rules td").hide();
			$("#default-circulation-rules th").hide();
			$("#showhideContainer a").removeClass("btn-success");
			setInterval( function () {$(".fixedHeader-floating").hide();}, 500);
			// show these
			for (i = 0; i < circ[x_in].length; i += 1){
				// show the columns listed in the above arrays
				circ.show(circ[x_in][i]);
			}
		}
	},
	show: function (y_in) {
		console.log(y_in);
		$("#default-circulation-rules thead th:nth-child(" + y_in +")").show();
		$("#default-circulation-rules tfoot th:nth-child(" + y_in +")").show();
		$("#default-circulation-rules tr td:nth-child(" + y_in +")").show();
		$("#" + circ.status).addClass("btn-success");
	}
}; 
$(document).ready(function() {
	if (location.href.indexOf("smart-rules.pl") != -1 && circ.on_off == 1) {
		circ.gen_btns();
		circ.set_colors();
	}
});

/* *
 * Column numbers:
 * 
 * Patron Cat 1
 * item type 2
 * Actions 3
 * Note 4
 * curr checkouts 5
 * curr onsite checkcouts 6
 * loan period 7 
 * days mode 8
 * unit 9
 * hard due date 10
 * decreased loan period 11
 * fine amount 12
 * fine interval 13
 * when to charge 14
 * fine/suspension grace preiod 15
 * overdue fines cap 16
 * cap fine at replacement price 17
 * expired hold charge 18
 * suspension in days 19
 * max suspension duration 20 
 * suspension charge interval 21
 * renewals allowed 22
 * renewal period 23
 * no renewal before 24 
 * no auto renew before 25
 * auto renew? 26
 * No auto renew after 27
 * no auto renew after hard 28
 * holds allowed 29
 * holds allowed daily 30
 * holds pre record 31
 * on shelf holds allowed 32
 * opac item level hold 33
 * hold pickup period 34
 * rental discount % 35
 * Actions 36
 * 
 * 
 * */
// End Circ and Fine Column Filters
