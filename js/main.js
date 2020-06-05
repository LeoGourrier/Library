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
	let submitBtn = document.querySelector('#submitBtn');
	console.log(submitBtn);
	addBtn.addEventListener('click', function() {
		if (theForm.firstChild === null || theForm.firstChild.length == 13) {
			//if Form doesn't exist, add it
			//change class to openedForm
			theForm.classList.remove('closedForm');
			theForm.classList.add('openedForm');
			theForm.classList.add('animate__animated');
			theForm.classList.add('animate__bounceInDown');
			document.querySelector('#theForm').innerHTML = myForm;
		} else {
			//if Form does exist, remove it
			//change class to closedForm
			theForm.classList.remove('animate__animated');
			theForm.classList.remove('animate__bounceInDown');
			theForm.classList.remove('openedForm');
			theForm.classList.add('closedForm');
			document.querySelector('#theForm').innerHTML = '';
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
let myForm = `
                <form>
                    <div id="theTitle">
                        <label>Title</label>
                        <input type="text" placeholder="Harry Potter">
                    </div>
                    <div id="theAuthor">
                        <label>Author</label>
                        <input type="text" placeholder="J.K. Rowling">
                    </div>
                    <div id="theYear">
                        <label>Year</label>
                        <input type="number" placeholder="1996">
                    </div>
                    <div id="thePages">
                        <label>Pages</label>
                        <input type="number" placeholder="234">
                    </div>
                    <div id="theRead">
                        <label>Read</label>
                        <select>
                            <option>NO</option>
                            <option>YES</option>
                        </select>
                    </div>
                    <div id="submitDiv">
                        <button id="submitBtn">Submit Book</button>
                    </div>
                </form>
`;
