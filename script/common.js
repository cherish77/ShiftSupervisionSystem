$(document).ready(function(){
	/*$(document).on("click", "button[data-toggle='modal']", function(){
		alert("1");
	});*/
	
	$(".datepicker").datepicker({
		format: 'yyyy/mm/dd'
	});
	
	if($("#search").length > 0){
		$(document).on("click", ".action-add", function(){
			var $item = $("#template-searchItem").html();
			$(this).closest(".searchItem").after($item);
		});
		
		$(document).on("click", ".action-remove", function(){
			$(this).closest(".searchItem").remove();
		});
	}
});