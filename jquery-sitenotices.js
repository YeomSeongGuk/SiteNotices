(function($){
	var maxSeq = 0;

	var setCookie = function(cKey, cValue , expireDay){
		var date = new Date(); 
	    date.setDate(date.getDate() + expireDay);
	    document.cookie = cKey + '=' + escape(cValue) + ';expires=' + date.toGMTString();
	}
	 
	var delCookie = function(cKey){
		var date = new Date();  
	    var validity = -1;
	    date.setDate(date.getDate() + validity);
	    document.cookie = cKey + "=;expires=" + date.toGMTString();
	}
	 
	var getCookie = function(cKey) {
		var allcookies = document.cookie;
		var cookies = allcookies.split("; ");
		for (var i = 0; i < cookies.length; i++) {
			var keyValues = cookies[i].split("=");
		    if (keyValues[0] == cKey) {
		    	return unescape(keyValues[1]);
		    }
		}
		return "";
	}

	$.notice = {
		resetCookie : function(key){
			delCookie(key);
		}
	};

	$.fn.notice = function(key, option){
		
		var defaults = {
			width : 800 
			,offsetLeft : 150
			,offsetTop : 150
			,zIndex : 1000
			,fadeIn : 600
			,fadeOut : 600
			
		};
		$.extend(defaults,option);
		
		if(defaults.zIndex > maxSeq){
			maxSeq = defaults.zIndex + 1;
		}

		var value = getCookie(key);
		if(value){return;}

		return this.each(function(){

			var message = $(this).html();
		
			var template = '';
			template='<div class="siteNotices" style="">';
			template+='<div class="siteNoticesContents">'+message+'</div>';
			template+='<div class="siteNoticesCloseToday">';
			template+='<label><input class="alarmCheck" type="checkbox" /><em>오늘 하루 이 창을 열지 않음</em></label>';
			template+='<span class="alarmClose" ><em>X</em>닫기</span>';
			template+='</div></div>';

			var target = $(template).appendTo(document.body)
									 .offset({ top: defaults.offsetTop, left: defaults.offsetLeft })
				 					 .width(defaults.width)
				 					 .css("z-index" , defaults.zIndex).hide().fadeIn(defaults.fadeIn);
				 
			$(target).find(".alarmClose").click(function(){
				target.fadeOut(defaults.fadeOut , function(){
					$(this).remove();
				});; 
			});
				 
			$(target).find(".alarmCheck").click(function(){
				setCookie(key,"done", 1);
				target.fadeOut(defaults.fadeOut , function(){
					$(this).remove();
				});; 
			});

			//팝업 선택시 최상위로 올림
			$(target).click(function(){
				$(this).css("z-index" , maxSeq++);
			});

			//대상 Element 에게 현재 옵션을 저장
			$.data(target[0] , "option" , defaults);

		});	
		
		return this;
    }
	
})(jQuery);