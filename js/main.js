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
	addBtn.addEventListener('click', function() {
		if (theForm.firstChild === null || theForm.firstChild.length == 13) {
			//if Form doesn't exist, add it
			//change class to openedForm
			theForm.classList.remove('closedForm');
			theForm.classList.add('openedForm');
			theForm.classList.add('animate__animated');
			theForm.classList.add('animate__bounceInDown');
			document.querySelector('#theForm').innerHTML = myForm;
			submitBook();
		} else {
			//if Form does exist, remove it
			//change class to closedForm
			theForm.classList.remove('animate__animated');
			theForm.classList.remove('animate__bounceInDown');
			theForm.classList.remove('openedForm');
			theForm.classList.add('closedForm');
			document.querySelector('#theForm').innerHTML = '';
		}

		//console.log('addBook has ended');
	});
}
function submitBook() {
	let submitBtn = document.querySelector('#submitBtn');
	submitBtn.addEventListener('click', function() {
		let newTitle = document.querySelector('#newTitle').value;
		let newAuthor = document.querySelector('#newAuthor').value;
		let newYear = document.querySelector('#newYear').value;
		let newPages = document.querySelector('#newPages').value;
		let newRead = document.querySelector('#newRead').value;
		let newBook = new Book(newTitle, newAuthor, newYear, newPages, newRead);
		addBookToLibrary(newBook);
		render();
		//console.log(library);
	});
}
function addBookToLibrary(a) {
	let numOfBooks = library.length;
	a.index = numOfBooks;
	a.read = toBoolean(a.read);
	library.push(a);
}
function toBoolean(a) {
	if (a == 'YES') {
		return true;
	} else {
		return false;
	}
}
function Book(title, author, year, pages, read) {
	this.title = title;
	this.author = author;
	this.year = year;
	this.pages = pages;
	this.read = read;
	this.index = null;
}
function render() {
	let theCatalog = document.querySelector('#theCatalog');
	theCatalog.innerHTML = '';
	drawings = '';
	library.map((x) => drawBook(x));
	theCatalog.innerHTML = drawings;
}
function drawBook(b) {
	let theCatalog = document.querySelector('#theCatalog');
	let newBook = `
			<div class="books">
                <h1 class="bookTitles">${b.title}</h1>
                <h2 class="bookAuthors">${b.author}</h2>
                <h3 class="bookPages">${b.pages} pages</h3>
                <div class="bookFooters">
                    <h4>${b.read ? 'Read' : 'Not Read'}</h4>
                    <i class="read material-icons">check</i>
                    <i class="delete bookDeletes material-icons">delete</i>
                </div>
            </div>
	`;
	drawings += newBook;
	//console.log(drawings);
}
let library = [];
let drawings = '';
//start the app
let myForm = `
                <form onsubmit="return false;">
                    <div id="theTitle">
                        <label>Title</label>
                        <input id="newTitle" type="text" placeholder="Harry Potter">
                    </div>
                    <div id="theAuthor">
                        <label>Author</label>
                        <input id="newAuthor" type="text" placeholder="J.K. Rowling">
                    </div>
                    <div id="theYear">
                        <label>Year</label>
                        <input id="newYear" type="number" placeholder="1996">
                    </div>
                    <div id="thePages">
                        <label>Pages</label>
                        <input id="newPages" type="number" placeholder="234">
                    </div>
                    <div id="theRead">
                        <label>Read</label>
                        <select id="newRead" >
                            <option>NO</option>
                            <option>YES</option>
                        </select>
                    </div>
                    <div id="submitDiv">
                        <button id="submitBtn">Submit Book</button>
                    </div>
                </form>
`;
window.onscroll = function() {
	this.stickyHeader();
};
let header = document.getElementById('theHeader');
let sticky = header.offsetTop;
toggleAddBtn();
//adding books to the webpage
let b1 = new Book('Harry Potter', 'J.K. Rowling', 1996, 234, 'YES');
addBookToLibrary(b1);
b1 = new Book('Harry Potter', 'J.K. Rowling', 1996, 234, 'YES');
addBookToLibrary(b1);
b1 = new Book('Harry Potter', 'J.K. Rowling', 1996, 234, 'YES');
addBookToLibrary(b1);
b1 = new Book('Harry Potter', 'J.K. Rowling', 1996, 234, 'YES');
addBookToLibrary(b1);
render();
