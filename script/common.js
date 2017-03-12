/*Dom Ready*/
$(document).ready(function() {
	$(".chzn-select").chosen();
	
	/* search */
	if($("#searchPage").length > 0) {
		// add search keywords
		$(document).on("click", ".action-add", function(){
			var $item = $("#template-searchItem").html();
			$(this).closest(".searchItem").after($item);
		});
		
		$(document).on("click", ".action-remove", function(){
			$(this).closest(".searchItem").remove();
		});
		
		
		// datepicker
		$(".datepicker").datepicker({
			format: 'yyyy/mm/dd'
		})
	}
	
	if($("#dataInputPage").length > 0) {
		$(document).on("click", "#basicData-form button#check-form", function(){
			var dataObj = $("#basicData-form").serializeArray();
			var i = 0;
			$(".modal-checkInput ul li span").each(function(){
				$(this).text(dataObj[i].value);
				i++;				
			});
			
			$("button[data-target='.modal-checkInput']").click();
			
			return false;
		});
		
		$(document).on("click", ".modal-checkInput button.sureToSubmit", function(){
			$("#basicData-form").submit(function(e){
				alert("已提交！");
			});
		});
	}
});