(function(){
	var itkSlider = {
		Slider: function(slider){
			this.width = "300px";
			this.height = "500px";
			this.speed = 1000;
			this.time = 5000;
			this.currentslide = 0;
			this.isMoving = false;
			this.slides = new Array;
			this.timer;
			var sdr_id = slider;
			this.isBox = true;
			
			
			this.buttonBox = {
				currentbutton: 1,
				mover: function(){
					this.box.style.opacity = "1";
				},
				mout: function(){
					this.box.style.opacity = "0.4";
				},
				init: function(p){
					this.pp = p;
					this.box = document.createElement("div");
					this.box.style.cssText = "position: absolute; top: 0; right: 0; z-index: 100;opacity: 0.4; padding: 10px;";
					sdr_id.appendChild(this.box);
					if(this.box.addEventListener){
						this.box.addEventListener("mouseover", this.mover.bind(this));
					} else if(this.box.attachEvent){
						this.box.attachEvent("onmouseover", this.mover.bind(this));
					};
					if(this.box.addEventListener){
						this.box.addEventListener("mouseout", this.mout.bind(this));
					} else if(this.box.attachEvent){
						this.box.attachEvent("onmouseout", this.mout.bind(this));
					};
				},
				buttons: new Array,
				Button: function(id, box){
					this.par = box;
					this.nr = id;
					this.button = document.createElement("div");
					this.button.style.cssText = "background-color: white; margin: 2px; text-align: center; float: left; height: 16px; width: 16px; font-size: 14px; font-weight: bold; border-radius: 8px; color: black; cursor: pointer;";
					var number = document.createTextNode(id+1);
					this.button.appendChild(number);
					this.par.box.appendChild(this.button);
					this.mover = function(){
						this.button.style.backgroundColor = "#0066FF";
						this.button.style.color = "white";
					};
					this.mout = function(){
						if(this.par.currentbutton == this.nr){
							this.button.style.backgroundColor = "black";
							this.button.style.color = "white";
						} else {
							this.button.style.backgroundColor = "white";
							this.button.style.color = "black";
						};
					};
					this.bclick = function(){
						this.par.pp.buttonClick(this.nr);
					};
					if(this.button.addEventListener){
						this.button.addEventListener("mouseover", this.mover.bind(this));
					} else if(this.button.attachEvent){
						this.button.attachEvent("onmouseover", this.mover.bind(this));
					};
					if(this.button.addEventListener){
						this.button.addEventListener("mouseout", this.mout.bind(this));
					} else if(this.button.attachEvent){
						this.button.attachEvent("onmouseout", this.mout.bind(this));
					};
					if(this.button.addEventListener){
						this.button.addEventListener("click", this.bclick.bind(this));
					} else if(this.button.attachEvent){
						this.button.attachEvent("onclick", this.bclick.bind(this));
					};
				},
				changeButton: function(id){
					this.buttons[this.currentbutton].button.style.backgroundColor = "white";
					this.buttons[this.currentbutton].button.style.color = "black";
					this.currentbutton = id;
					this.buttons[this.currentbutton].button.style.backgroundColor = "black";
					this.buttons[this.currentbutton].button.style.color = "white";
				},
				addButton: function(id){
					this.buttons.push(new this.Button(id, this));
				}
			};
			
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
					}, {
						duration: speed,
						queue: false
					});
					setTimeout(this.hiddenSlide.bind(this), (speed-5));
				};
				this.displaySlide = function(){
					this.frame.style.margin = "0 0 0 "+swidth;
					this.frame.style.width = "0";
					this.frame.style.display = "block";
					this.frame.style.overflow = "hidden";
				};
				this.show = function(){
					this.displaySlide();
					this.slide.style.display = "block";
					this.slide.style.float = "left";
					$(this.frame).animate({
						margin: '0 0 0 0',
						width: swidth
					}, {
						duration: speed,
						queue: false
					});
				};
			};

			this.nextSlide = function(){
				this.isMoving = true;
				this.slides[this.currentslide].hide();
				this.currentslide++;
				if(this.currentslide >= this.slides.length){
					this.currentslide = 0;
				};
				if(this.isBox) this.buttonBox.changeButton(this.currentslide);
				var self = this;
				var ii = function(){self.slides[self.currentslide].show();};
				setTimeout(ii, 30);
				var moveOff = function(){self.isMoving = false;};
				setTimeout(moveOff, (this.speed+100));
			};
			this.sliderStop = function(){
				clearInterval(this.timer);
			};
			this.sliderStart = function(){
				this.timer = setInterval(this.nextSlide.bind(this), this.time+this.speed);
			};
			this.sliderRun = function(){
				if(this.slides.length > 1){
					this.nextSlide();
					this.sliderStart();
				} else if(this.slides.length == 1){
					this.slides[0].show();
				};
			};
			this.slide = function(id){
				this.isMoving = true;
				this.sliderStop();
				this.slides[this.currentslide].hide();
				this.currentslide = id;
				if(this.currentslide >= this.slides.length){
					this.currentslide = 0;
				};
				if(this.isBox) this.buttonBox.changeButton(this.currentslide);
				var self = this;
				var ii = function(){self.slides[self.currentslide].show();};
				setTimeout(ii, 30);
				var moveOff = function(){self.isMoving = false;};
				setTimeout(moveOff, (this.speed+30));
				this.sliderStart();
			};
			this.buttonClick = function(id){
				if(id != this.currentslide && !this.isMoving){
					this.slide(id);
				};
			};
			this.createSlides = function(slider, data){
				var i;
				for(i = 0; i < data.data.length; i++){
					this.slides.push(new this.Slide(slider, this.width, this.height, data.data[i], this.speed));
					if(this.isBox) this.buttonBox.addButton(i);
				};
				this.currentslide = Math.floor(Math.random()*i);
				this.sliderRun();
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
			if(slider.hasAttribute("nobuttons")){
				this.isBox = false;
				console.log("No");
			} this.buttonBox.init(this);
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