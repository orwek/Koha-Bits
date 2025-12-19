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
