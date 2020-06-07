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
			openForm();
			submitBook();
		} else {
			//if Form does exist, remove it
			//change class to closedForm
			closeForm();
		}

		//console.log('addBook has ended');
	});
}
function closeForm() {
	let theForm = document.querySelector('#theForm');
	theForm.classList.remove('animate__animated');
	theForm.classList.remove('animate__bounceInDown');
	theForm.classList.remove('openedForm');
	theForm.classList.add('closedForm');
	document.querySelector('#theForm').innerHTML = '';
}
function openForm() {
	let theForm = document.querySelector('#theForm');
	theForm.classList.remove('closedForm');
	theForm.classList.add('openedForm');
	theForm.classList.add('animate__animated');
	theForm.classList.add('animate__bounceInDown');
	document.querySelector('#theForm').innerHTML = myForm;
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
		closeForm();
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
	enableRead();
	enableDelete();
}
function enableRead() {
	let reads = Array.from(document.querySelectorAll('.read'));
	reads.map((x) => toggleReadListeners(x));
}
function toggleReadListeners(x) {
	x.addEventListener('click', function() {
		let obj = library[x.id.replace('read', '')];
		obj.read = !obj.read;
		x.parentNode.childNodes[1].innerHTML = '';
		setTimeout(function() {
			render();
			let newX = document.getElementById(x.id).parentNode.childNodes[1];
			newX.classList.add('animate__animated');
			newX.classList.add('animate__fadeInRight');
			let i = newX.nextSibling.nextSibling;
			i.classList.add('animate__animated');
			i.classList.add('animate__tada');
		}, 250);
	});
}
function enableDelete() {
	let deletes = Array.from(document.querySelectorAll('.delete'));
	deletes.map((x) => toggleDeleteListeners(x));
}
function toggleDeleteListeners(x) {
	x.addEventListener('click', function() {
		x.classList.remove('deleteOff');
		x.classList.add('animate__animated');
		x.classList.add('animate__tada');
		let obj = library[x.id.replace('delete', '')];
		library = library.filter((e) => e !== obj);
		updateIndexes();
		setTimeout(function() {
			render();
			let replacmentIndex = x.id.replace('delete', '');
			let lastIndex = library.length - 1;
			if (window.innerWidth <= 414) {
				for (replacmentIndex = replacmentIndex; replacmentIndex <= lastIndex; replacmentIndex++) {
					let currentBook = document.getElementById('book' + replacmentIndex);
					currentBook.classList.add('animate__animated');
					currentBook.classList.add('animate__slideInUp');
				}
			} else {
				for (replacmentIndex = replacmentIndex; replacmentIndex <= lastIndex; replacmentIndex++) {
					let currentBook = document.getElementById('book' + replacmentIndex);
					currentBook.classList.add('animate__animated');
					currentBook.classList.add('animate__slideInRight');
				}
			}
			//console.log(document.getElementById('book' + x));
		}, 500);
	});
}
function updateIndexes() {
	for (book in library) {
		library[book].index = book;
	}
}
function drawBook(b) {
	let theCatalog = document.querySelector('#theCatalog');
	let newBook = `
			<div id="book${b.index}" class="books">
                <h1 class="bookTitles">${b.title}</h1>
                <h2 class="bookAuthors">${b.author}</h2>
                <h3 class="bookPages">${b.pages} pages</h3>
                <div class="bookFooters">
                    <h4 class="${b.read ? 'readBG' : 'notReadBG'}">${b.read ? 'Read' : 'Not Read'}</h4>
                    <i id="read${b.index}" class="read ${b.read ? 'readOn' : 'readOff'} material-icons">check</i>
                    <i id="delete${b.index}" class="delete deleteOff bookDeletes material-icons">delete</i>
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
