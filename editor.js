(function( $ ) {
	
    var RangeList = {};

	$.fn.loadEditor = function(options)
	{
		var defaults = {
			'classNameEditor':'',
			'classNameButtonList':'',
		    'uploadUrl': 'bibash.com.np',
		    'spellcheck':'true',
			'font': ['Arial', 'Courier,Courier New'],
			'color':  ['#61BD6D','#1ABC9C','#54ACD2','#2C82C9','#9365B8','#475577','#41A85F','#00A885','#3D8EB9','#2969B0','#553982','#28324E','#F7DA64','#FBA026','#EB6B56','#E25041','#A38F84','#FAC51C','#F37934','#D14841','#B8312F','#7C706B','#D1D5D8','#4D2F36','#EFEFEF','#FFFFFF','#FF0000','#000000'],			
		    'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'insertOrderedList', 'insertUnorderedList', 'indent', 'outdent', 'justifyLeft', 'justifyRight', 'justifyCenter', 'justifyFull', 'font', 'fontSize', 'formatBlock', 'color', 'createLink', 'unlink', 'uploadImage', 'hr', 'removeFormat', 'undo', 'redo', 'html', ],
		};

		  var buttonSet = {
		                      'bold': { title: 'Bold', command: 'bold', control: 'button', icon: 'fa fa-bold' },
		                      'italic': { title: 'Italic', command: 'italic', control: 'button', icon: 'fa fa-italic' },
		                      'underline': { title: 'Underline', command: 'underline', control: 'button', icon: 'fa fa-underline' },
		                      'strikeThrough': { title: 'Strike Through', command: 'strikeThrough', control: 'button', icon: 'fa fa-strikethrough' },
		                      'subscript': { title: 'Subscript', command: 'subscript', control: 'button', icon: 'fa fa-subscript' },
		                      'superscript': { title: 'Superscript', command: 'superscript', control: 'button', icon: 'fa fa-superscript' },
		                      'insertOrderedList': { title: 'Insert Ordered List', command: 'insertOrderedList', control: 'button', icon: 'fa fa-list-ol' },
		                      'insertUnorderedList': { title: 'Insert Unordered List', command: 'insertUnorderedList', control: 'button', icon: 'fa fa-list-ul' },
		                      'indent': { title: 'Indent', command: 'indent', control: 'button', icon: 'fa fa-indent' },
		                      'outdent': { title: 'Outdent', command: 'outdent', control: 'button', icon: 'fa fa-dedent' },
		                      'justifyLeft': { title: 'Align Text Left', command: 'justifyLeft', control: 'button', icon: 'fa fa-align-left' },
		                      'justifyRight': { title: 'Align Text Right', command: 'justifyRight', control: 'button', icon: 'fa fa-align-right' },
		                      'justifyCenter': { title: 'Align Text Center', command: 'justifyCenter', control: 'button', icon: 'fa fa-align-center' },
		                      'justifyFull': { title: 'Justify', command: 'justifyFull', control: 'button', icon: 'fa fa-align-justify' },
		                      'createLink': { title: 'Create Link', command: 'createLink', control: 'button', icon: 'fa fa-chain' },
		                      'unlink': { title: 'Unlink', command: 'unlink', control: 'button', icon: 'fa fa-chain-broken' },
		                      'hr': { title: 'Horizontal Line', command: 'insertHorizontalRule', control: 'button', icon: 'fa fa-minus' },
		                      'undo': { title: 'Undo', command: 'undo', control: 'button', icon: 'fa fa-undo' },
		                      'redo': { title: 'Redo', command: 'redo', control: 'button', icon: 'fa fa-repeat' },
		                      'removeFormat': { title: 'Remove Format', command: 'removeFormat', control: 'button', icon: 'fa fa-eraser' },
		                      'html': { title: 'Show HTML', command: 'switch', control: 'button', icon: 'fa fa-code' },
		                      'uploadImage': { title: 'Insert Image', command: 'insert-image', control: 'button', icon: 'fa fa-picture-o' },
	                          'fontSize': { title: 'Font Size', command:'fontSize', control:'select', override:false, option: {'1':'8pt','2':'10pt','3':'12pt','4':'14pt','5':'18pt','6':'24pt','7':'36pt'} },
	                          'formatBlock': { title: 'Format Block', command: 'formatBlock', control: 'select', override:false, option: {'n': 'Normal', 'p': 'Pragraph', 'pre': 'Pre', '<h1>': 'Heading 1', '<h2>': 'Heading 2', '<h3>': 'Heading 3', '<h4>': 'Heading 4', '<h5>': 'Heading 5', '<h6>': 'Heading 6' } },
	                          'font': { title: 'Font', command: 'FontName', control: 'select', override:true, overrideBy:'font' },
	                          'color': { title: 'Color', command: 'forecColor', control: 'button', override: true, overrideBy: 'color',icon:"fa fa-tint" }
        				};

		$.extend(defaults, options);
		var thisId = $(this).selector;
		var editorId = thisId.replace("#", "").replace(".","") + "_" + new Date().getTime();

		var editorContainer = document.createElement("div");
		$(editorContainer).attr("id", editorId + "_own-editor-container");
		$(editorContainer).addClass("own-editor-container");
		$(editorContainer).addClass(defaults.classNameEditor);
		$(editorContainer).css({"border-top":"5px solid","border-bottom":"1px solid","border-left":"1px solid","border-right":"1px solid"});
		
		var buttonContainer = document.createElement("div");
		$(buttonContainer).attr("id", editorId + "_own-editor-button-list");
		$(buttonContainer).addClass("own-editor-button-list");
		$(buttonContainer).addClass(defaults.classNameButtonList);
		$(buttonContainer).css({"border-bottom":"1px solid","min-height":"30px","line-height":"30px","display":"inline-block","width":"100%"});

		var editorView = document.createElement("div");
		$(editorView).attr("class", "own-editor-text-area");
		$(editorView).attr("id", editorId+"_own-editor-text-area");
		$(editorView).attr("contenteditable", "true");
		$(editorView).attr("spellcheck", defaults.spellcheck);
		$(editorView).css({ 'width': '100%', 'height': '100%', 'position': 'relative' });
		$(editorView).bind("mouseup keyup", function () {
		    setRange(editorId);
		});

		$(editorView).bind("focus", function () {
		    restoreSelection(editorId);
		});

		$(editorView).bind("mousedown click", function (e) {
		    cancelEvent(e, editorId);
		});

		for(var i=0;i<defaults.buttons.length;i++){
		    var obj = buttonSet[defaults.buttons[i]];
		    if (obj == null || obj == undefined)
		        continue;

		    var control = null;
		    if (obj.control == "button")
		    {
		        control = document.createElement("button");
		        $(control).attr("title", obj.title);
		        $(control).attr("command", obj.command);
		        $(control).attr("class", obj.icon);
		        $(control).attr("type", "button");
		        $(control).attr("name", defaults.buttons[i]);
				$(control).css({
						"background":"none repeat scroll 0 0 padding-box transparent"
						,"border":"0 none"
    					,"border-radius":"0"
						,"cursor":"pointer"
						,"width": "40px"
						,"z-index": "2"
					});
				$(control).bind("click", function (e) {
				    var commandGroup = $(this).attr("commandgroup");
		            if ($(this).attr("name").toLowerCase() == "createlink"){
		                var url = prompt("Please enter your url", "http://");
		                if (url!=null&& url != "" && url.toLowerCase() != "http://")
		                    TextFormating(editorId, $(this).attr("command"), url);
		            }
		            else if ($(this).attr("name").toLowerCase() == "html"){
		                var mode = $(this).attr("mode");
		                mode = (mode == null || mode == "" || mode == undefined)?"html":mode;
		                if (mode == "html")
						{
							$(this).attr("mode", "text");
							MakeControlDisable(editorId, defaults.buttons,false);
						}		                    
		                else
						{
							$(this).attr("mode", "html");
							MakeControlDisable(editorId,defaults.buttons, true);
						}
		                    
		                SwitchEditorMode(editorId,mode);
		            }
		            else if ($(this).attr("name").toLowerCase() == "uploadimage")
		            {
		                if ($("#" + editorId + "_own-editor-upload-image").length > 0)
							$("#" + editorId + "_own-editor-upload-image").remove();
		                    var offset = $(this).offset();
		                    $(this).after(InsertImage({ editorId: editorId, uploadUrl:defaults.uploadUrl,left: (offset.left-10), top: offset.top - offset.top }));
		            }
		            else if ($(this).attr("name").toLowerCase() == "color")
		            {
		                if ($("#" + editorId + "_colorBox").length > 0)
		                {
		                    $("#" + editorId + "_colorBox").remove();
		                }
		                else {
		                    var offset = $(this).offset();
		                    $(this).after(ColorBox({ editorId: editorId, color: defaults.color, left: (offset.left - 10), top: offset.top - offset.top }));
		                }
		            }
		            else {
		                TextFormating(editorId, $(this).attr("command"));
		            }
		        });
		    }
		    else if (obj.control == "select")
		    {
		        control = document.createElement("select");
		        $(control).attr("title", obj.title);
		        $(control).attr("command", obj.command);
		        $(control).attr("name", defaults.buttons[i]);
		        if (obj.override)
		        {
		            var optList = defaults[obj.overrideBy];
		            for (var opt = 0; opt < optList.length; opt++)
		            {
		                var option = document.createElement("option");
		                $(option).attr("value", optList[opt]);
		                $(option).text(optList[opt]);
		                $(control).append(option);
		            }
		        }
		        else if (!obj.override)
		        {
		            var key = Object.keys(obj.option);
		            for (var opt = 0; opt < key.length; opt++) {
		                var option = document.createElement("option");
		                $(option).attr("value", key[opt]);
		                $(option).text(obj.option[key[opt]]);
		                $(control).append(option);
		            }
		        }

		        $(control).bind('change', function () {
		            TextFormating(editorId, $(this).attr("command"), $(this).val());
		        });
		    }
		    $(buttonContainer).append(control);
		}
		$(editorView).html($(thisId).text());
		$(editorView).bind("blur", function () {

		    var mode = $("#"+editorId+"_own-editor-button-list button[name='html']").attr("mode");
		    mode = (mode == null || mode == "" || mode == undefined) ? "html" : mode;
		    if (mode == "html"){
		        $(thisId).html($(this).html());
		    }   
		    else{
		        $(thisId).html($(this).text());
		    }
		});

		//var editorPageOuter = document.createElement("div");
		//$(editorPageOuter).css({ 'width': '100%', 'height': '100%', 'position': 'relative', "margin": "10px", "border": "1px solid red" });
		//$(editorPageOuter).append(editorView);
		$(editorContainer).append(buttonContainer);
		$(editorContainer).append(editorView);
		$(this).before(editorContainer);
		$(this).css("display", "none");
	}

	function SwitchEditorMode(me,mode) {
	    if (mode == "html") {
	        var html = $("#" + me + "_own-editor-text-area").html();
	        $("#" + me+"_own-editor-text-area").html("");
	        $("#" + me + "_own-editor-text-area").text(html);
			
	    }
	    else if (mode == "text") {
	        var text = $("#" + me + "_own-editor-text-area").text();
	        $("#" + me + "_own-editor-text-area").html("");
	        $("#" + me + "_own-editor-text-area").html(text);
	    }
	}

	function InsertImage(obj)
	{
	    var titleLabel = document.createElement("span");
	    $(titleLabel).text("Insert Image");
	    $(titleLabel).css({ float: "left", "font-size": "20px", "font-weight": "bold" });

	    var coloseBtn = document.createElement("button");
	    $(coloseBtn).attr("type", "button");
	    $(coloseBtn).attr("title", "Close");
	    $(coloseBtn).text("X");
	    $(coloseBtn).css({ "float":"right","color":"red","cursor":"pointer"});
	    $(coloseBtn).bind("click", function () {
	        $("#" + obj.editorId + "_own-editor-upload-image").remove();
	    });
	    var group1 = document.createElement("div");
	    $(group1).css("clear", "both");
	    $(group1).append(titleLabel);
	    $(group1).append(coloseBtn)
        
	    var browseBtn = document.createElement("input");
	    $(browseBtn).attr("type", "file");
	    $(browseBtn).attr("id", obj.editorId+"_uploadFile");
	    $(browseBtn).attr("accept", "image/*");
	    $(browseBtn).attr("name", "file");

	    var group2 = document.createElement("div");
	    $(group2).css("clear", "both");
	    $(group2).append(browseBtn);

	    var urlTitle = document.createElement("span");
	    $(urlTitle).text("Enter URL ");
	    $(urlTitle).css({"font-weight": "bold"});

	    var urlTextBox = document.createElement("input");
	    $(urlTextBox).attr("type", "text");
	    $(urlTextBox).attr("name", "imgUrl");
	    $(urlTextBox).attr("placeholder", "http://bibash.com.np")
	    $(urlTextBox).attr("id", obj.editorId+"_imgUrl");
        
        var okBtn = document.createElement("button")
        $(okBtn).attr("type", "button");
        $(okBtn).attr("title", "Submit image");
        $(okBtn).css("cursor", "pointer");
        $(okBtn).text("OK");
        $(okBtn).bind("click", function () {

            var imgUrl = $.trim($("#" + obj.editorId + "_imgUrl").val());
            var file = document.querySelectorAll("#" + obj.editorId + "_uploadFile")[0];

            if ((imgUrl == null || imgUrl == undefined || imgUrl == "") && ($(file).val() == null || $(file).val() == undefined || $(file).val() == ""))
                return;

            if (imgUrl != "")
            {
                var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
                if (regexp.test(imgUrl))
                {
                    TextFormating(obj.editorId, "insertImage", imgUrl);
                    $("#" + obj.editorId + "_own-editor-text-area img[src='" + imgUrl + "']").attr("width", "300px");
                    $("#" + obj.editorId + "_own-editor-upload-image").remove();
                }
                else {
                    $("#" + obj.editorId + "_imgUrl").css("border", "1px solid red");
                }
                return
            }

            var progressBar = document.createElement("div");
            $(progressBar).css({ "background-color": "green", "color": "white", "position": "relative", "text-align": "center", "width": "0%" });
            $("#" + obj.editorId + "_own-editor-upload_area").after(progressBar);
            $("#" + obj.editorId + "_own-editor-upload_area").hide();
            $("#" + obj.editorId + "_own-editor-upload-image").css("min-height", "30px");
        	var xhr = typeof XMLHttpRequest != 'undefined'? new XMLHttpRequest(): new ActiveXObject('Microsoft.XMLHTTP'); 
        	xhr.open("POST", obj.uploadUrl, true);
        	xhr.setRequestHeader("Accept", "text/JSON");
        	xhr.responseType = "JSON";
        	xhr.upload.addEventListener("progress", function (e) {
        	    var percent = Math.round((e.loaded / e.total) * 100);
        	    $(progressBar).html("<b>" + percent.toString() + "%</b>").css("width", percent.toString()+"%");
			    if (percent == 100)
			        return;
			}, false);
			
			var param = new FormData();
			param.append("file", file.files[0])
			xhr.send(param);
			xhr.onreadystatechange = function () {
			    if (xhr.readyState == 4 && xhr.status == 200) {
			        var imgObj = JSON.parse(xhr.responseText);
			        TextFormating(obj.editorId, "insertImage", imgObj.link)
			        $("#" + obj.editorId + "_own-editor-text-area img[src='" + imgObj.link + "']").attr("width", "300px");
			        $("#" + obj.editorId + "_own-editor-upload-image").remove();
			        return;
			    }
			    else {
			        if (xhr.readyState == 4 && xhr.status != 200) {
						if(xhr.responseText!="")
							throw new Error(xhr.responseText);
			            return;
			        }
			    }
			};
        });

        var group3 = document.createElement("div");
        $(group3).css("clear", "both");
        $(group3).append(urlTitle);
        $(group3).append(urlTextBox);
        $(group3).append(okBtn);

        var divGrp3 = document.createElement("div");
        $(divGrp3).attr("id", obj.editorId + "_own-editor-upload_area");
        $(divGrp3).css({"margin":"4px","height":"85%","position":"relative"});
        $(divGrp3).append(group1);
        $(divGrp3).append(group2);
        $(divGrp3).append("<div style=\"clear:both;\"><hr></div>");
        $(divGrp3).append(group3);

        var divGrp2 = document.createElement("div");
        $(divGrp2).css({ "clear": "both", "border-top": "5px solid black" });
        $(divGrp2).append(divGrp3);

        var divMain = document.createElement("div");
        $(divMain).css({ "min-width": "200px" ,"max-width": "300px" ,"min-height":"30px !important", "max-height": "140px", "border": "1px solid #000000", "background-color": "#ffffff", "z-index": "10", "position": "absolute","margin-left":obj.left,"margin-top":obj.top });
        $(divMain).attr("id", obj.editorId + "_own-editor-upload-image")
        $(divMain).append(divGrp2);
        return divMain;
	}
	
	function MakeControlDisable(editorId,controls,isEnabled)
	{
		for(var i=0;i<controls.length;i++)
		{
			if(isEnabled)
			    $("#" + editorId + "_own-editor-button-list").find("[name='" + controls[i] + "']").removeAttr("disabled");
			else
			    $("#" + editorId + "_own-editor-button-list").find("[name='" + controls[i] + "']").attr("disabled", "disabled");
		}
		$("#" + editorId + "_own-editor-button-list button[name='html']").removeAttr("disabled");
	}

	function ColorBox(obj)
	{
	    var group3 = document.createElement("div");
	    $(group3).css({"position":"relative","line-height":"0px"});

	    for (var i = 0; i < obj.color.length; i++) {
	        var control = document.createElement("button");
	        $(control).attr("type", "button");
	        $(control).css({ "width": "34px", "height": "34px", "border": "0 none", "border-radius": "0", "line-height": "16px !important", "cursor": "pointer", "background-color": obj.color[i] });
	        $(control).bind("mouseenter", function () {
	            $(this).css("border", "1px solid #000000");
	        });
	        $(control).bind("mouseleave", function () {
	            $(this).css("border", "0 none");
	        });

	        $(control).bind("click", function () {
	            var cmd = $("#" + obj.editorId + "_own-editor-button-list").find("[name='" + obj.editorId + "_color-for']:checked").val();
	            TextFormating(obj.editorId, cmd, $(this).val());
	            $("#" + obj.editorId + "_colorBox").remove();
	            return;
	        });

	        $(control).val(obj.color[i]);
	        $(group3).append(control);
	    }

	    var radio1 = document.createElement("input");
	    $(radio1).attr("type", "radio");
	    $(radio1).attr("name", obj.editorId + "_color-for");
	    $(radio1).attr("value", "foreColor");
	    $(radio1).attr("checked", "true");
	    var span1 = document.createElement("span");
	    $(span1).text("Text");
	    var textColor = document.createElement("div");
	    $(textColor).css({ "clear": "both", "display": "inline-block", "margin-left": "20px" });
	    $(textColor).append(radio1);
	    $(textColor).append(span1);

	    var radio2 = document.createElement("input");
	    $(radio2).attr("type", "radio");
	    $(radio2).attr("name", obj.editorId+"_color-for");
	    $(radio2).attr("value", "hiliteColor");
	    var span2 = document.createElement("span");
	    $(span2).text("Background");

	    var bgColor = document.createElement("div");
	    $(bgColor).css({ "clear": "both", "display": "inline-block", "margin-left": "20px" });
	    $(bgColor).append(radio2);
	    $(bgColor).append(span2);

	    var selectionGrp = document.createElement("div");
	    $(selectionGrp).css({ "clear": "both" });
	    $(selectionGrp).append(textColor);
	    $(selectionGrp).append(bgColor);
	    $(group3).append(selectionGrp);
	    
	    var divGrp2 = document.createElement("div");
	    $(divGrp2).css({ "clear": "both", "border-top": "5px solid black" });
	    $(divGrp2).append(group3);

	    var divMain = document.createElement("div");
	    $(divMain).css({ "min-width": "200px", "max-width": "272px", "min-height": "162px", "border": "1px solid #000000", "background-color": "#ffffff", "z-index": "10", "position": "absolute", "margin-left": obj.left, "margin-top": obj.top });
	    $(divMain).attr("id", obj.editorId + "_colorBox")
	    $(divMain).append(divGrp2);
	    return divMain;
	}

	function setRange(editorId)
	{
	    var range;
	    if (window.getSelection)//non IE Browsers
	        range = window.getSelection().getRangeAt(0);
	    else if (document.selection)//IE
	        range = document.selection.createRange();

	    RangeList[editorId] = range;
	}

	function restoreSelection(editorId) {
	    if (!$("#" + editorId + "_own-editor-text-area").is(":focus"))
	        $("#" + editorId + "_own-editor-text-area").focus();

	    var range = RangeList[editorId];
	    if (range != null && range!=undefined) {
	        if (window.getSelection)//non IE and there is already a selection
	        {
	            var s = window.getSelection();
	            if (s.rangeCount > 0)
	                s.removeAllRanges();
	            s.addRange(range);
	        }
	        else if (document.createRange)//non IE and no selection
	        {
	            window.getSelection().addRange(range);
	        }
	        else if (document.selection)//IE
	        {
	            range.select();
	        }
	    }
	}

	function cancelEvent(e, editorId) {
	    if ((!$("#" + editorId + "_own-editor-text-area").is(":focus")) && RangeList[editorId] != null) {
	        if (e && e.preventDefault) {
	            e.stopPropagation(); // DOM style (return false doesn't always work in FF)
	            e.preventDefault();
	        }
	        else {
	            window.event.cancelBubble = true;//IE stopPropagation
	        }
	        restoreSelection(editorId);
	        return false; // false = IE style
	    }
	}

	function TextFormating(me, c, v) {
	    restoreSelection(me);
	    if (v == null || v == undefined)
	        v = "";
	    document.execCommand(c, false, v);
	};

}(jQuery));