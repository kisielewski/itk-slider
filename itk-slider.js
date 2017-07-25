(function(){
	var itkSlider = {
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