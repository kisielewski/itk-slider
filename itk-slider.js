(function(){
	var itkSlider = {
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