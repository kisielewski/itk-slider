(function(){
	var itkSlider = {
		Slider: function(slider){
			this.width = "300px";
			this.height = "500px";
			this.speed = 1000;
			this.time = 5000;
			this.currentslide = 0;
			this.slides = new Array;
			this.timer;
			this.Slide = function(parent, swidth, sheight, data, speed){
				this.frame = document.createElement("div");
				this.frame.style.width = swidth;
				this.frame.style.height = sheight;
				this.frame.style.position = "absolute";
				this.frame.style.display = "none";
				this.slide = document.createElement("div");
				this.slide.style.width = swidth;
				this.slide.style.height = sheight;
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
				
				this.hiddenSlide = function(){
					this.frame.style.display = "none";
				};
				this.hide = function(){
					this.slide.style.float = "right";
					$(this.frame).animate({
						width: '0'
					}, speed);
					setTimeout(this.hiddenSlide.bind(this), (speed-5));
				};
				this.displaySlide = function(){
					this.frame.style.margin = "0 0 0 "+swidth;
					this.frame.style.width = "0";
					this.frame.style.display = "block";
				};
				this.show = function(){
					this.displaySlide();
					this.slide.style.display = "block";
					this.slide.style.float = "left";
					$(this.frame).animate({
						margin: '0 0 0 0',
						width: swidth
					}, speed);
				};
			};

			this.nextSlide = function(){
				this.slides[this.currentslide].hide();
				this.currentslide++;
				if(this.currentslide >= this.slides.length){
					this.currentslide = 0;
				};
				var self = this;
				var ii = function(){self.slides[self.currentslide].show();};
				setTimeout(ii, 30);
			};
			this.sliderStart = function(){
				if(this.slides.length > 1){
					this.nextSlide();
					this.timer = setInterval(this.nextSlide.bind(this), this.time);
				} else if(this.slides.length == 1){
					this.slides[0].show();
				};
			};
			this.createSlides = function(slider, data){
				var i;
				for(i = 0; i < data.data.length; i++){
					this.slides.push(new this.Slide(slider, this.width, this.height, data.data[i], this.speed));
				};
				this.currentslide = Math.floor(Math.random()*i);
				this.sliderStart();
			};
			this.downloadData = function(slider){
				var that = this;
				$.get(
					slider.getAttribute("data"),
					function(data){
						that.createSlides(slider, data);
					}
				);
			};
			if(slider.hasAttribute("width")){
				this.width = slider.getAttribute("width")+"px";
			};
			if(slider.hasAttribute("height")){
				this.height = slider.getAttribute("height")+"px";
			};
			if(slider.hasAttribute("speed")){
				this.speed = parseInt(slider.getAttribute("speed"));
			};
			if(slider.hasAttribute("time")){
				this.time = parseInt(slider.getAttribute("time"));
			};
			if(slider.hasAttribute("data")){
				this.downloadData(slider);
			};
			slider.style.cssText += "background-color: #737373; position: relative; font-family: Arial, Verdana, Sans-serif;";
			slider.style.width = this.width;
			slider.style.height = this.height;
		},
		checkJQuery: function(){
			if(!window.jQuery){
				var script = document.createElement('script');
				script.type = "text/javascript";
				script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js";
				document.getElementsByTagName('head')[0].appendChild(script);
				script.onload = this.buildSliders.bind(this);
				return false;
			};
			return true;
		},
		buildSliders: function(){
			if(!this.checkJQuery()) return;
			var sliders = document.getElementsByClassName("itk-slider");
			var i;
			for(i = 0; i < sliders.length; i++){
				var newSlider = new this.Slider(sliders[i]);
			};
		},
		init: function(){
			if(window.addEventListener){
				window.addEventListener("load", this.buildSliders.bind(this));
			} else if(window.attachEvent){
				window.attachEvent("onload", this.buildSliders.bind(this));
			};
		},
	};
	itkSlider.init();
})();