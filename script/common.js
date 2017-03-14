/*Dom Ready*/
$(document).ready(function() {
	/* load menu */
	$.ajax({ 
        url:"https://cherish77.github.io/ShiftSupervisionSystem/data/menulist.json", 
        type:'GET', 
        //dataType:'JSONP',  // 处理Ajax跨域问题
        success: function(data){ 
		  alert("success");
        }
	//$(".chzn-select").chosen();
	});
	
/*	var testObj;
	 $.ajax({ 
        url:"http://106.14.57.23:6060/appform/list", 
        type:'GET', 
        dataType:'JSONP',  // 处理Ajax跨域问题
        success: function(data){ 
          // testObj = data;
		  // alert(testObj);
		  alert("success");
        },
		error:function(XMLHttpRequest, textStatus){  
            console.log(XMLHttpRequest);  //XMLHttpRequest.responseText    XMLHttpRequest.status   XMLHttpRequest.readyState  
            console.log(textStatus); 
        } 
		
    }); 
*/
	/*dataTable*/
	if($("#indexPage").length > 0) {
		$("#primaryTable").DataTable({
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
				"processing": "正在加载请稍后...", 
				"zeroRecords": "抱歉， 没有找到", 
				"infoEmpty": "没有数据",
				"search": "搜索： "
			},
			//"ajax": "../data/basicData.json", 
			"columnDefs": [
				{
					"targets": [ 7 ],
					"visible": false,
					"searchable": true
				}
			]
			
		});
	}
	
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
				"processing": "正在加载请稍后...", 
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
						return '<button class="btn btn-info option-detail">详细</button><button class="btn btn-default option-edit">修改</button><button class="btn btn-warning">提交</button>';
					}
				}
			]
		});
	
		$('#flowTable tbody').on('click', 'tr .option-detail', function () {
			var data = flowTable.row($(this).closest("tr")).data();
			$(".modal-dataDetail ul li span").each(function(){
				$(this).text(data[$(this).attr("data-title")]);
			});
			/*$.get("test.json", function(result){
				
			});*/

			$("button[data-target='.modal-dataDetail']").click();
		});
		
		$('#flowTable tbody').on('click', 'tr .option-edit', function () {
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
});