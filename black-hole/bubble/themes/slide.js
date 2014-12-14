window.onload = function() {
	var oUl = document.getElementById("slide");
	var oPrev = document.getElementById("prev");
	var oNext = document.getElementById("next");
	var oLi = oUl.getElementsByTagName("li");

	oPrev.onselectstart = function() {
		return false
	};
	oNext.onselectstart = function() {
		return false
	};
	var i = 0;
	var timer = null;
	var oWidth = oLi[0].offsetWidth + 6;
	var str = oUl.innerHTML + oUl.innerHTML
	oUl.innerHTML = str;
	oUl.style.width = oLi.length * oWidth + "px";

	oNext.onclick = function() {
		clearInterval(timer);
		if (oUl.offsetLeft <= -oWidth * oLi.length / 2) {
			oUl.style.left = '0';
			i = 0;
		}
		timer = setInterval(function() {
			if (oUl.offsetLeft > -oWidth * i) {
				oUl.style.left = oUl.offsetLeft - 44 + "px";
			}
		}, 30);
		i = i + 1;
	};

	oPrev.onclick = function() {
		clearInterval(timer);
		if (oUl.offsetLeft >= 0) {
			oUl.style.left = -oWidth * oLi.length / 2 + "px";
			i = oLi.length / 2;
		}
		timer = setInterval(function() {
			if (oUl.offsetLeft < -oWidth * i) {
				oUl.style.left = oUl.offsetLeft + 44 + "px";
			}
			;
		}, 30);
		i = i - 1;
	};
};