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
