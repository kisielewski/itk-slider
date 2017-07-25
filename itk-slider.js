(function(){
	var itkSlider = {
		Slider: function(){
			this.width = "300px";
			this.height = "500px";
			this.speed = 1000;
			this.time = 5000;
			this.currentslide = 0;
			this.slides = new Array;
			this.Slide = function(){
				this.frame;
				
				this.construct = function(parent, width, height, data){
					this.frame = document.createElement("div");
					this.frame.style.width = width;
					this.frame.style.height = height;
					this.frame.style.position = "absolute";
				}
			};

			this.createSlides = function(data){
				var i;
				for(i = 0; i < data.data.length; i++){
					
				};
			};
			this.downloadData = function(slider){
				$.get(
					slider.getAttribute("data"),
					function(data){
						this.createSlides(JSON.parse(data));
					};
				);
			};
			this.construct = function(slider){
				if(slider.hasAttribute("width")){
					this.width = slider.getAttribute("width")+"px";
				};
				if(slider.hasAttribute("height")){
					this.height = slider.getAttribute("height")+"px";
				};
				if(slider.hasAttribute("speed")){
					this.speed = slider.getAttribute("speed");
				};
				if(slider.hasAttribute("time")){
					this.time = slider.getAttribute("time");
				};
				if(slider.hasAttribute("data")){
					this.downloadData(slider);
				};
			};
		},
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