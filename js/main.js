function stickyHeader() {
	if (window.pageYOffset > sticky) {
		header.classList.add('sticky');
	} else {
		header.classList.remove('sticky');
	}
}

window.onscroll = function() {
	this.stickyHeader();
};
let header = document.getElementById('theHeader');
let sticky = header.offsetTop;
