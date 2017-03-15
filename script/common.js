// identify current host
	var current_page = window.location.href;
	var current_path = current_page.substring(current_page.lastIndexOf("/") + 1, current_page.length);

// Dom Ready
$(document).ready(function() {
	// load menu
	$.ajax({ 
        url:"https://cherish77.github.io/ShiftSupervisionSystem/data/menulist.json", 
        type:'GET', 
        success: function(data) {
			for(var i=0; i<data.length; i++){
				$("#main-menu").append('<li class="inactive"><a href="' + data[i].url + '" target="_self"><span class="icon-chevron-right"></span>' + data[i].res_name + '</a></li>');
				
				/*$(".template-menuItem li a").attr("href", data[i].url).html('<span class="icon-chevron-right"></span>' + data[i].res_name);
				var $item = $(".template-menuItem").html();
				$("#main-menu").append($item);*/
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
			"oLanguage": {
				"sLengthMenu": "每页显示 _MENU_ 条记录",
				"sInfo": "从第_START_到第_END_条记录 / 共 _TOTAL_ 条数据",
				"oPaginate": {
					"sFirst": "首页",
					"sPrevious": "前一页",
					"sNext": "后一页",
					"sLast": "末页"
				},
				"processing": "正在加载请稍候...", 
				"zeroRecords": "抱歉， 没有找到", 
				"infoEmpty": "没有数据",
				"search": "搜索： "
			},
			//"ajax": "../data/basicData.json", 
			"ajax": "https://cherish77.github.io/ShiftSupervisionSystem/data/list.json", 
			"columns": [
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
			], 
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
                            case "shenqingzhong": txt = "申请中"; lb = "success"; break;
                            case "weitongguo": txt = "未通过"; lb = "failed";break;
							
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
						return '<button class="btn btn-info option-detail">详细</button>'
					}
				}
			]
		});
		
		$("#indexTable tbody").on("click", "tr .option-detail", function () {
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
			"oLanguage": {
				"sLengthMenu": "每页显示 _MENU_ 条记录",
				"sInfo": "从第_START_到第_END_条记录 / 共 _TOTAL_ 条数据",
				"oPaginate": {
					"sFirst": "首页",
					"sPrevious": "前一页",
					"sNext": "后一页",
					"sLast": "末页"
				},
				"processing": "正在加载请稍候...", 
				"zeroRecords": "抱歉， 没有找到", 
				"infoEmpty": "没有数据",
				"search": "搜索： "
			},
			//"ajax": "http://106.14.57.23:6060/appform/list", 
			"ajax": "https://cherish77.github.io/ShiftSupervisionSystem/data/list.json", 
			"columns": [
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
			], 
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
                            case "shenqingzhong": txt = "申请中"; lb = "success"; break;
                            case "weitongguo": txt = "未通过"; lb = "failed";break;
							
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
						return '<button class="btn btn-info option-detail">详细</button>';
					}
				},
				{
					"targets": 17, 
                    "ordering": false, 
					"searchable": false,
					"render": function( data, type, full, meta ) {
						return '<button class="btn btn-default option-edit">修改</button><button class="btn btn-primary">提交</button>';
					}
				}
			]
		});

		$("#flowTable tbody").on("click", "tr .option-detail", function () {
			var data = flowTable.row($(this).closest("tr")).data();
			$(".modal-dataDetail ul li span").each(function(){
				$(this).text(data[$(this).attr("data-title")]);
			});

			$("button[data-target='.modal-dataDetail']").click();
		});
		
		$("#flowTable tbody").on("click", "tr .option-edit", function () {
			var data = flowTable.row($(this).closest("tr")).data();
			
			$(".modal-changeInput .controls").each(function(){
				if($(this).children()[0].nodeName.toLowerCase() == "input") {
					$(this).children().attr("value", data[$(this).children().attr("name")]);
				}
				else {
					$(this).find("option[value=" + data[$(this).children().attr("name")] + "]").attr("selected", "selected");
					//$(this).find("option[value='2']").attr("selected", "selected");
				}
				
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
			"oLanguage": {
				"sLengthMenu": "每页显示 _MENU_ 条记录",
				"sInfo": "从第_START_到第_END_条记录 / 共 _TOTAL_ 条数据",
				"oPaginate": {
					"sFirst": "首页",
					"sPrevious": "前一页",
					"sNext": "后一页",
					"sLast": "末页"
				},
				"processing": "正在加载请稍候...", 
				"zeroRecords": "抱歉， 没有找到", 
				"infoEmpty": "没有数据",
				"search": "搜索： "
			},
			//"ajax": "http://106.14.57.23:6060/appform/list", 
			"ajax": "https://cherish77.github.io/ShiftSupervisionSystem/data/list.json", 
			"columns": [
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
			], 
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
                            case "shenqingzhong": txt = "申请中"; lb = "success"; break;
                            case "weitongguo": txt = "未通过"; lb = "failed";break;
							
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
						return '<button class="btn btn-info option-detail">详细</button>';
					}
				},
				{
					"targets": 17, 
                    "ordering": false, 
					"searchable": false,
					"render": function( data, type, full, meta ) {
						return '<button class="btn btn-danger option-pass">流转</button><button class="btn btn-default option-reject">退回</button>';
					}
				}
			]
		});

		$("#applicationTable tbody").on("click", "tr .option-detail", function () {
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
			"oLanguage": {
				"sLengthMenu": "每页显示 _MENU_ 条记录",
				"sInfo": "从第_START_到第_END_条记录 / 共 _TOTAL_ 条数据",
				"oPaginate": {
					"sFirst": "首页",
					"sPrevious": "前一页",
					"sNext": "后一页",
					"sLast": "末页"
				},
				"processing": "正在加载请稍候...", 
				"zeroRecords": "抱歉， 没有找到", 
				"infoEmpty": "没有数据",
				"search": "搜索： "
			},
			//"ajax": "http://106.14.57.23:6060/appform/list", 
			"ajax": "https://cherish77.github.io/ShiftSupervisionSystem/data/list.json", 
			"columns": [
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
			], 
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
						return '<button class="btn btn-info option-detail">详细</button>';
					}
				},
				{
					"targets": 16, 
                    "ordering": false, 
					"searchable": false,
					"render": function( data, type, full, meta ) {
						return '<button class="btn btn-danger option-release">解除监管</button>';
					}
				}
			]
		});

		$("#toReleaseTable tbody").on("click", "tr .option-detail", function () {
			var data = toReleaseTable.row($(this).closest("tr")).data();
			$(".modal-dataDetail ul li span").each(function(){
				$(this).text(data[$(this).attr("data-title")]);
			});

			$("button[data-target='.modal-dataDetail']").click();
		});
	}
	
	
	// releasedTable page
	if($("#releasedPage").length > 0) {
		var releasedTable = $("#releasedTable").DataTable({
			//"bStateSave": true,
			"sPaginationType": "bootstrap", 
			"iDisplayLength": 10, 
			"bDeferRender": true,
			"oLanguage": {
				"sLengthMenu": "每页显示 _MENU_ 条记录",
				"sInfo": "从第_START_到第_END_条记录 / 共 _TOTAL_ 条数据",
				"oPaginate": {
					"sFirst": "首页",
					"sPrevious": "前一页",
					"sNext": "后一页",
					"sLast": "末页"
				},
				"processing": "正在加载请稍候...", 
				"zeroRecords": "抱歉， 没有找到", 
				"infoEmpty": "没有数据",
				"search": "搜索： "
			},
			//"ajax": "http://106.14.57.23:6060/appform/list", 
			"ajax": "https://cherish77.github.io/ShiftSupervisionSystem/data/list.json", 
			"columns": [
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
			], 
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
						return '<button class="btn btn-info option-detail">详细</button>';
					}
				},
				{
					"targets": 16, 
                    "ordering": false, 
					"searchable": false,
					"render": function( data, type, full, meta ) {
						return '<button class="btn btn-primary option-release">打印</button>';
					}
				}
			]
		});

		$("#releasedTable tbody").on("click", "tr .option-detail", function () {
			var data = releasedTable.row($(this).closest("tr")).data();
			$(".modal-dataDetail ul li span").each(function(){
				$(this).text(data[$(this).attr("data-title")]);
			});

			$("button[data-target='.modal-dataDetail']").click();
		});
	}
	
	// search page
	if($("#searchPage").length > 0) {
		var searchTable = $("#searchTable").DataTable({
			//"bStateSave": true,
			"sPaginationType": "bootstrap", 
			"iDisplayLength": 10, 
			"bDeferRender": true,
			"oLanguage": {
				"sLengthMenu": "每页显示 _MENU_ 条记录",
				"sInfo": "从第_START_到第_END_条记录 / 共 _TOTAL_ 条数据",
				"oPaginate": {
					"sFirst": "首页",
					"sPrevious": "前一页",
					"sNext": "后一页",
					"sLast": "末页"
				},
				"processing": "正在加载请稍候...", 
				"zeroRecords": "抱歉， 没有找到", 
				"infoEmpty": "没有数据",
				"search": "搜索： "
			},
			//"ajax": "http://106.14.57.23:6060/appform/list", 
			"ajax": "https://cherish77.github.io/ShiftSupervisionSystem/data/list.json", 
			"columns": [
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
			], 
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
                            case "shenqingzhong": txt = "申请中"; lb = "success"; break;
                            case "weitongguo": txt = "未通过"; lb = "failed";break;
							
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
						return '<button class="btn btn-info option-detail">详细</button>';
					}
				}
			]
		});

		$("#searchTable tbody").on("click", "tr .option-detail", function () {
			var data = searchTable.row($(this).closest("tr")).data();
			$(".modal-dataDetail ul li span").each(function(){
				$(this).text(data[$(this).attr("data-title")]);
			});

			$("button[data-target='.modal-dataDetail']").click();
		});
	
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
	
	// dataInput page
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
	}
});