function stickyHeader() {
	if (window.pageYOffset > sticky) {
		header.classList.add('sticky');
	} else {
		header.classList.remove('sticky');
	}
}
function toggleAddBtn() {
	let addBtn = document.querySelector('#addBtn');
	let theForm = document.querySelector('#theForm');
	addBtn.addEventListener('click', function() {
		if (theForm.innerHTML == '') {
			//if Form doesn't exist, add it
			//change class to openedForm
			console.log('Form does not exists');
			console.log(theForm.classList);
			console.log('removing closedForm class');
			console.log('adding openedForm class');
		} else {
			//if Form does exist, remove it
			//change class to closedForm
			console.log('Form does exists');
			console.log(theForm.classList.value);
			console.log('removing openedForm class');
			console.log('adding closedForm class');
		}

		console.log('addBook has ended');
	});
}

//start the app
window.onscroll = function() {
	this.stickyHeader();
};
let header = document.getElementById('theHeader');
let sticky = header.offsetTop;
toggleAddBtn();
