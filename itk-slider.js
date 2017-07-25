(function(){
	var itkSlider = {
		Slider: function(){
			this.width = "300px";
			this.height = "500px";
			this.speed = 1000;
			this.time = 5000;
			this.currentslide = 0;
			this.slides = new Array;
			this.Slide = function(parent, width, height, data){
				this.frame = document.createElement("div");
				this.frame.style.width = width;
				this.frame.style.height = height;
				this.frame.style.position = "absolute";
				this.slide = document.createElement("div");
				this.slide.style.width = width;
				this.slide.style.height = height;
				this.slide.style.backgroundSize = "cover";
				this.slide.style.float = "right";
				this.slide.style.position = "relative";
				if(data.title){
					var title = document.createElement("div");
					title.innerHTML = data.title;
					title.style.cssText = "margin: 40px; position: absolute; padding: 2px 5px; background-color: black; opacity: 0.6; box-shadow: 0 0 15px 15px black; white-space: nowrap; color: white; font-size: 30px; font-weight: bold;";
					this.slide.appendChild(title);
				};
				if(data.description){
					var description = document.createElement("div");
					description.innerHTML = data.description;
					description.style.cssText = "	background-color: white; text-align: center; font-size: 20px; color: #00005C; position: absolute; bottom: 30px; margin: 0 15px; opacity: 0.8; width: 430px; padding: 20px;";
					this.slide.appendChild(description);
				};
				if(data.image){
					this.slide.style.backgroundImage = "url("+data.image+")";
				};
				if(data.link){
					this.slide.link = data.link;
					this.slide.style.cursor = "pointer";
					this.slide.onclick = function() { window.location.href = this.link };
				};
				this.frame.appendChild(this.slide);
				parent.appendChild(this.frame);
			};

			this.createSlides = function(slider, data){
				var i;
				for(i = 0; i < data.data.length; i++){
					this.slides.push(new Slide(slider, width, height, data));
				};
			};
			this.downloadData = function(slider){
				$.get(
					slider.getAttribute("data"),
					function(data){
						this.createSlides(slider, data);
					}
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
				slider.style.cssText = "background-color: #737373; position: relative; font-family: Arial, Verdana, Sans-serif;";
				slider.style.width = this.width;
				slider.style.height = this.height;
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
			if(!itkSlider.checkJQuery()) return;
			var sliders = document.getElementsByClassName("itk-slider");
			var i;
			for(i = 0; i < sliders.length; i++){
				newSlider = new itkSlider.Slider();
				newSlider.construct(sliders[i]);
			};
		},
		init: function(){
			if(window.addEventListener){
				window.addEventListener("load", itkSlider.buildSliders);
			} else if(window.attachEvent){
				window.attachEvent("onload", itkSlider.buildSliders);
			};
		},
	};
	itkSlider.init();
})();