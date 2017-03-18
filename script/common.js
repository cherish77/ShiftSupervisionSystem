// identify current host
var current_page = window.location.href;
var current_path = current_page.substring(current_page.lastIndexOf("/") + 1, current_page.length);
// dataTable config
var oLanguageData = {  
    "sLengthMenu": "每页显示 _MENU_ 条记录",
	"sInfo": "从第_START_到第_END_条记录 / 共 _TOTAL_ 条数据",
	"oPaginate": {
		"sFirst": "首页",
		"sPrevious": "前一页",
		"sNext": "后一页",
		"sLast": "末页"
	},
	"sPocessing": "正在加载请稍候...", 
	"sZeroRecords": "抱歉， 没有找到", 
	"sInfoEmpty": "没有数据",
	"sSearch": "搜索： "
}; 

var aoColumnsData = [ 
	{"data" : "zhuanguan_num" }, 
	{"data" : "baoguan_num" }, 
	{"data" : "huodai_comp_text" }, 
	{"data" : "baoguan_comp_text" }, 
	{"data" : "harbour" }, 
	{"data" : "container_account" }, 
	{"data" : "total_count" }, 
	{"data" : "total_weight" }, 
	{"data" : "package_type" }, 
	{"data" : "source_area" }, 
	{"data" : "tiyun_num" }, 
	{"data" : "prod_name" }, 
	{"data" : "warehouse" }, 
	{"data" : "chedui" }, 
	{"data" : "xiangzhu" }, 
	{"data" : "form_status" }
]; 

// Dom Ready
$(document).ready(function() {
	// load menu
	$.ajax({ 
        url:"https://cherish77.github.io/ShiftSupervisionSystem/data/menulist.json", 
        type:'GET', 
        success: function(data) {
			for(var i=0; i<data.length; i++){
				$("#main-menu").append('<li class="inactive"><a href="' + data[i].url + '" target="_self"><span class="icon-chevron-right"></span>' + data[i].res_name + '</a></li>');
			}
			$("#main-menu li a[href='" + current_path + "']").closest("li").attr("class", "active");
        }

	});
	
	// chosen
	// $(".chzn-select").chosen();
	
	// index page 
	if($("#indexPage").length > 0) {
		var indexTable = $("#indexTable").DataTable({
			//"bStateSave": true,
			"sPaginationType": "bootstrap", 
			"iDisplayLength": 10, 
			"bDeferRender": true,
			"oLanguage": oLanguageData,
			//"ajax": "../data/basicData.json", 
			"ajax": "https://cherish77.github.io/ShiftSupervisionSystem/data/list.json", 
			"columns": aoColumnsData, 
			"columnDefs": [
			   {
					"targets": [ 4, 6, 7, 8, 9, 11, 12, 13, 14 ],
					"visible": false,
					"searchable": true
				},
				{
                    "targets": 15,
					//"searchable": false,
                    "render": function ( data, type, full, meta ) {
                        var txt, lb;
                        switch (data) {
                            case "weishenqing": txt = "未申请"; lb = "warning"; break;
                            case "yishenqing": txt = "已申请"; lb = "success"; break;
                            case "weitongguo": txt = "未通过"; lb = "failed";break;
							case "daifangxing": txt = "待放行"; lb = "warning";break;
							case "yifangxing": txt = "已放行"; lb = "success";break;
							
                            default: txt = "未知状态"; break;
                        }
                        return "<span class=\"label label-" + lb + "\">" + txt + "</span>";
                    }
                },
				{
					"targets": 16, 
                    "ordering": false, 
					"searchable": false,
					"render": function( data, type, full, meta ) {
						return '<button class="btn btn-info action-detail">详细</button>'
					}
				}
			]
		});
		
		$("#indexTable tbody").on("click", "tr .action-detail", function () {
			var data = indexTable.row($(this).closest("tr")).data();
			$(".modal-dataDetail ul li span").each(function(){
				$(this).text(data[$(this).attr("data-title")]);
			});

			$("button[data-target='.modal-dataDetail']").click();
		});
	}
	
	// flowTable page
	if($("#flowPage").length > 0) {
		var flowTable = $("#flowTable").DataTable({
			//"bStateSave": true,
			"sPaginationType": "bootstrap", 
			"iDisplayLength": 10, 
			"bDeferRender": true,
			"oLanguage": oLanguageData,
			//"ajax": "http://106.14.57.23:6060/appform/list", 
			"ajax": "https://cherish77.github.io/ShiftSupervisionSystem/data/list.json", 
			"columns": aoColumnsData, 
			"columnDefs": [
			   {
					"targets": [ 4, 6, 7, 8, 9, 11, 12, 13, 14 ],
					"visible": false,
					"searchable": true
				},
				{
                    "targets": 15,
					//"searchable": false,
                    "render": function ( data, type, full, meta ) {
                        var txt, lb;
                        switch (data) {
                            case "weishenqing": txt = "未申请"; lb = "warning"; break;
                            case "yishenqing": txt = "已申请"; lb = "success"; break;
                            case "weitongguo": txt = "未通过"; lb = "failed";break;
							case "daifangxing": txt = "待放行"; lb = "warning";break;
							case "yifangxing": txt = "已放行"; lb = "success";break;
							
                            default: txt = "未知状态"; break;
                        }
                        return "<span class=\"label label-" + lb + "\">" + txt + "</span>";
                    }
                },
				{
					"targets": 16, 
                    "ordering": false, 
					"searchable": false,
					"render": function( data, type, full, meta ) {
						return '<button class="btn btn-info action-detail">详细</button>';
					}
				},
				{
					"targets": 17, 
                    "ordering": false, 
					"searchable": false,
					"render": function( data, type, full, meta ) {
						return '<button class="btn btn-default action-edit">修改</button><button class="btn btn-primary btn-second">提交</button>';
					}
				}
			]
		});

		$("#flowTable tbody").on("click", "tr .action-detail", function () {
			var data = flowTable.row($(this).closest("tr")).data();
			$(".modal-dataDetail ul li span").each(function(){
				$(this).text(data[$(this).attr("data-title")]);
			});

			$("button[data-target='.modal-dataDetail']").click();
		});
		
		$("#flowTable tbody").on("click", "tr .action-edit", function () {
			var editData = flowTable.row($(this).closest("tr")).data();
			
			var optionObj;
			$.ajax({
				type:"get",
				url: "https://cherish77.github.io/ShiftSupervisionSystem/data/optionInitTest.json",
				//url : "Index!queryParams",
				cache: false,
				async: false,
				success: function(data){
					optionObj = data;
				}
			});
			
			$(".modal-changeInput input").each(function(){
				$(this).attr("value", editData[$(this).attr("name")]);
			});
			
			$(".modal-changeInput select").each(function(){
				for(var i=0; i<optionObj[$(this).attr("id").toUpperCase()].length; i++) {
					$(this).append('<option value="'+ optionObj[$(this).attr("id").toUpperCase()][i].item_value +'">' + optionObj[$(this).attr("id").toUpperCase()][i].item_name + '</option>');
				}

				$(this).find("option[value=" + editData[$(this).attr("name")] + "]").attr("selected", "selected");
			});
				
			$("button[data-target='.modal-changeInput']").click();
		});
	}
	
	
	// applicationTable page
	if($("#applicationPage").length > 0) {
		var applicationTable = $("#applicationTable").DataTable({
			//"bStateSave": true,
			"sPaginationType": "bootstrap", 
			"iDisplayLength": 10, 
			"bDeferRender": true,
			"oLanguage": oLanguageData,
			//"ajax": "http://106.14.57.23:6060/appform/list", 
			"ajax": "https://cherish77.github.io/ShiftSupervisionSystem/data/list.json", 
			"columns": aoColumnsData, 
			"columnDefs": [
			   {
					"targets": [ 4, 6, 7, 8, 9, 11, 12, 13, 14 ],
					"visible": false,
					"searchable": true
				},
				{
                    "targets": 15,
					//"searchable": false,
                    "render": function ( data, type, full, meta ) {
                        var txt, lb;
                        switch (data) {
							case "weishenqing": txt = "未申请"; lb = "warning"; break;
							case "yishenqing": txt = "已申请"; lb = "success"; break;
                            case "weitongguo": txt = "未通过"; lb = "failed";break;
							case "daifangxing": txt = "待放行"; lb = "warning";break;
							case "yifangxing": txt = "已放行"; lb = "success";break;
							
                            default: txt = "未知状态"; break;
                        }
                        return "<span class=\"label label-" + lb + "\">" + txt + "</span>";
                    }
                },
				{
					"targets": 16, 
                    "ordering": false, 
					"searchable": false,
					"render": function( data, type, full, meta ) {
						return '<button class="btn btn-info action-detail">详细</button>';
					}
				},
				{
					"targets": 17, 
                    "ordering": false, 
					"searchable": false,
					"render": function( data, type, full, meta ) {
						return '<button class="btn btn-danger action-pass">流转</button><button class="btn btn-default btn-second action-reject">退回</button>';
					}
				}
			]
		});

		$("#applicationTable tbody").on("click", "tr .action-detail", function () {
			var data = applicationTable.row($(this).closest("tr")).data();
			$(".modal-dataDetail ul li span").each(function(){
				$(this).text(data[$(this).attr("data-title")]);
			});

			$("button[data-target='.modal-dataDetail']").click();
		});
	}
	
	
	// toReleaseTable page
	if($("#toReleasePage").length > 0) {
		var toReleaseTable = $("#toReleaseTable").DataTable({
			//"bStateSave": true,
			"sPaginationType": "bootstrap", 
			"iDisplayLength": 10, 
			"bDeferRender": true,
			"oLanguage": oLanguageData,
			//"ajax": "http://106.14.57.23:6060/appform/list", 
			"ajax": "https://cherish77.github.io/ShiftSupervisionSystem/data/list.json", 
			"columns": aoColumnsData, 
			"columnDefs": [
			   {
					"targets": [ 4, 6, 7, 8, 9, 11, 12, 13, 14 ],
					"visible": false,
					"searchable": true
				},
				{
					"targets": 5, 
                    "ordering": false, 
					"searchable": false,
					"render": function( data, type, row ) {
						return data + '<span class="icon-eye-open view-containers"></span>';
					}
				},
				{
					"targets": 15, 
                    "ordering": false, 
					"searchable": false,
					"render": function( data, type, full, meta ) {
						return '<button class="btn btn-info action-detail">详细</button>';
					}
				},
				{
					"targets": 16, 
                    "ordering": false, 
					"searchable": false,
					"render": function( data, type, full, meta ) {
						return '<button class="btn btn-danger action-release">解除监管</button>';
					}
				}
			]
		});

		$("#toReleaseTable tbody").on("click", "tr .action-detail", function () {
			var data = toReleaseTable.row($(this).closest("tr")).data();
			$(".modal-dataDetail ul li span").each(function(){
				$(this).text(data[$(this).attr("data-title")]);
			});

			$("button[data-target='.modal-dataDetail']").click();
		});
		
		$("#toReleaseTable tbody").on("click", "tr .view-containers", function () {
			var data = toReleaseTable.row($(this).closest("tr")).data();
			// 加id参数，换url, 根据传回数据结构修改调用 container_num -> enter_time/leave_time
			$.get("https://cherish77.github.io/ShiftSupervisionSystem/data/containerSearch.json", function(response){
				$(".modal-containerDetail tbody").html("");
				for(var i=0; i < response.length; i++) {
					$(".modal-containerDetail tbody").append('<tr><td>' + response.container_num + '</td><td>' + response.enter_time + '</td><td>' + response.leave_time + '</td><td>' + response.jinchang_time + '</td></tr>');
					
				/*	$(".modal-containerDetail tbody").append('<li><p><label>集装箱号： </label><span data-title="container_num">' +response.containers[i].container_num + '</span></p><p><label>进场时间： </label><span data-title="enter-time">'+ response.containers[i].container_num + '</span></p><p><label>离场时间： </label><span data-title="leave-time">'+ response.containers[i].container_num +'</span></p></li>');*/
				}
				
				console.log(response);
				$("button[data-target='.modal-containerDetail']").click();
			});
		});
	}
	
	
	// releasedTable page
	if($("#releasedPage").length > 0) {
		var releasedTable = $("#releasedTable").DataTable({
			//"bStateSave": true,
			"sPaginationType": "bootstrap", 
			"iDisplayLength": 10, 
			"bDeferRender": true,
			"oLanguage": oLanguageData,
			//"ajax": "http://106.14.57.23:6060/appform/list", 
			"ajax": "https://cherish77.github.io/ShiftSupervisionSystem/data/list.json", 
			"columns": aoColumnsData, 
			"columnDefs": [
			   {
					"targets": [ 4, 6, 7, 8, 9, 11, 12, 13, 14 ],
					"visible": false,
					"searchable": true
				},
				{
					"targets": 15, 
                    "ordering": false, 
					"searchable": false,
					"render": function( data, type, full, meta ) {
						return '<button class="btn btn-info action-detail">详细</button>';
					}
				},
				{
					"targets": 16, 
                    "ordering": false, 
					"searchable": false,
					"render": function( data, type, full, meta ) {
						return '<button class="btn btn-primary action-release">打印</button>';
					}
				}
			]
		});

		$("#releasedTable tbody").on("click", "tr .action-detail", function () {
			var data = releasedTable.row($(this).closest("tr")).data();
			$(".modal-dataDetail ul li span").each(function(){
				$(this).text(data[$(this).attr("data-title")]);
			});

			$("button[data-target='.modal-dataDetail']").click();
		});
	}
	
	// search page
	if($("#searchPage").length > 0) {
		// datepicker
		$(".datepicker").datepicker({
			format: 'yyyy/mm/dd'
		})
		
		// add search keywords
		$(document).on("click", ".action-add", function(){
			var $item = $("#template-searchItem").html();
			$(this).closest(".search-item").after($item);
		});
		
		$(document).on("click", ".action-remove", function(){
			$(this).closest(".search-item").remove();
		});
	
		// remove select prompt
		$(".search-select").change(function(event){
			$('[value=""]', event.target).remove();
		});
		
		// search action
		var searchTable;
		$(document).on("click", "#action-search", function(){
			// add search keywords to input name
			
			// there's no need to remove blank select beacause we only catch the useful keywords
			$("#search-form select").each(function(){
				$(this).next().attr("name", $(this).val());
			});
				
			var formObj = $("#search-form").serializeArray();
			// var formSerial = $("#search-form").serialize();
			// alert(formSerial);
			
			// post and reload the dataTable
			
			$.ajax({  
				url : "https://cherish77.github.io/ShiftSupervisionSystem/data/list_test.json", 
				type: "GET", 
				//type : "POST",  
				async : false, 
				//data : formObj,
				//dataType : "json", 
				success : function(data) {
					if (typeof($searchTable) == "undefined") {
					}
					else {
						//console.log(searchTable);
						$('#searchTable').DataTable().fnClearTable(false);//清空数据.fnClearTable();//清空数据  
						$('#searchTable').DataTable().fnDestroy(); //还原初始化了的datatable  
					}
					searchTable = $('#searchTable').DataTable({
						"sPaginationType": "bootstrap", 
						"iDisplayLength" : 10,
						"bAutoWidth" : false,  
						"bJQueryUI": true,
						"searching" : false, 
						//"bDeferRender": true,
						"oLanguage" : oLanguageData, 
						"aaData" : data.myData, 
						"columns" : aoColumnsData, 			
						"bDestroy" : true,  
						"retrieve": true,//保证只有一个table实例  
						"columnDefs": [  
							{
								"targets": [ 4, 6, 7, 8, 9, 11, 12, 13, 14 ],
								"visible": false,
								"searchable": true
							},
							{
								"targets": 15,
								//"searchable": false,
								"render": function ( data, type, full, meta ) {
									var txt, lb;
									switch (data) {
										case "weishenqing": txt = "未申请"; lb = "warning"; break;
										case "yishenqing": txt = "已申请"; lb = "success"; break;
										case "weitongguo": txt = "未通过"; lb = "failed";break;
										case "daifangxing": txt = "待放行"; lb = "warning";break;
										case "yifangxing": txt = "已放行"; lb = "success";break;
										
										default: txt = "未知状态"; break;
									}
									return "<span class=\"label label-" + lb + "\">" + txt + "</span>";
								}
							},
							{
								"targets": 16, 
								"ordering": false, 
								"searchable": false,
								"render": function( data, type, full, meta ) {
									return '<button class="btn btn-info action-detail">详细</button>';
								}
							}   
						]
						  
					});
					$('#searchTable').show();
				}
			});  

		}); 
		
		// view detail
		$(document).on("click", "#searchTable tbody tr .action-detail", function () {
			var data = searchTable.row($(this).closest("tr")).data();
			$(".modal-dataDetail ul li span").each(function(){
				$(this).text(data[$(this).attr("data-title")]);
			});

			$("button[data-target='.modal-dataDetail']").click();
		});
	}
	
	// dataInput page
	if($("#dataInputPage").length > 0) {
		// initialize the select
		// url 需要修改
		var optionObj;
		$.ajax({
			type:"get",
			url: "https://cherish77.github.io/ShiftSupervisionSystem/data/optionInitTest.json",
			//url : "Index!queryParams",
			cache: false,
			async: false,
			success: function(data){
				optionObj = data;
			}
		});
		// 数据调用方法需要根据接口返回变量的属性名修改
		$("select").each(function(){
			for(var i=0; i<optionObj[$(this).attr("name").toUpperCase()].length; i++) {
				$(this).append('<option value="'+ optionObj[$(this).attr("name").toUpperCase()][i].item_value +'">' + optionObj[$(this).attr("name").toUpperCase()][i].item_name + '</option>');
			}
		});
		
		$('select[name="package_type"]').find('option[value="morenbao"]')[1].remove();
		
		// remove select prompt
		$("select").change(function(event){
			$('[value=""]', event.target).remove();
		});
		
		
	
		$(document).on("click", ".action-add", function(){
			$(this).closest("div.controls").after('<div class="controls newItem"><input name="containerNo" type="text" class="span8 m-wrap ui-autocomplete-input" value=""><span class="action-add icon-plus"></span><span class="action-remove icon-minus"></span></div>');
		});
	
		$(document).on("click", ".action-remove", function(){
			$(this).closest("div.controls").remove();
		});
	
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
		
		$(document).on("click", "#basicData-form button#save-form", function(){
			$("#basicData-form input#submitOrNot").attr("value", "no");

			alert("已保存！");
			$("#basicData-form").submit();	
		});
		
		$(document).on("click", ".modal-checkInput button.sureToSubmit", function(){
			$("#basicData-form input#submitOrNot").attr("value", "yes");
			
			alert("已提交！");
			$("#basicData-form").submit();
		});
	}
	
	//passRegistration page
	if($("#passRegistrationPage").length > 0) {
		// datepicker
		$(".datepicker").datepicker({
			format: 'yyyy/mm/dd'
		})
		
		// search for container
		$(document).on("click", "button#action-searchContainer", function(){
			var container_num = $("input#container_num").val();
			
			/*$.get("url", container_num, function(response){
				$("ul#container-result li span").each(function(){
					$(this).text("");
					$(this).text(response[$(this).attr("data-title")]);
				});
			});*/
			
			$("ul#container-result").show();
		});
		
		$(document).on("click", "button.action-cancel", function(){
			$("containerSearch-form").reset();
		});
		
		$(document).on("click", "#action-passReg", function(){
			alert("已登记！");
			
			$("containerSearch-form").submit();
			$("containerSearch-form").reset();
		});
	}
});