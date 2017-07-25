(function(){
	var itkSlider = {
		checkJQuery: function(){
			if(!window.jQuery){
				var script = document.createElement('script');
				script.type = "text/javascript";
				script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js";
				document.getElementsByTagName('head')[0].appendChild(script);
				script.onload = this.buildSliders;
				return false;
			};
			return true;
		},
		buildSliders: function(){
			if(!this.checkJQuery()) return;
			var sliders = document.getElementsByClassName("itk-slider");
			var i;
			for(i = 0; i < sliders.length; i++){
				this.createSlider(sliders[i]);
			};
		},
		init: function(){
			if(window.addEventListener){
				window.addEventListener("load", this.buildSliders);
			} else if(window.attachEvent){
				window.attachEvent("onload", this.buildSliders);
			};
		},
	};
	itkSlider.init();
})();