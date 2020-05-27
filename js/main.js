let myLibrary = [];

function Book(title, author, year, pages, read, index) {
	//constructor
	this.title = title;
	this.author = author;
	this.year = year;
	this.pages = pages;
	this.read = read;
	this.index = index;
}
function addBookToLibrary(aBook) {
	//add Book obj to myLibrary
	myLibrary.push(aBook);
}
function render() {
	//loops through myLibrary and prints out each book
	let bookContainer = document.querySelector('#bookContainer');
	bookContainer.innerHTML = '';
	myLibrary.map((x) => _createCard(x));
}
function _createCard(x) {
	let parent = document.querySelector('#bookContainer');
	let div = document.createElement('div');
	div.classList = 'books';
	div.innerHTML = `<div></div>
					<p>${x.title}</p>
					<p>${x.author}</p>
					<p>${x.year}</p>
					<p>${x.pages}</p>
					<p>${x.read}</p>
					<button id="book${x.index}" class="remove">Remove</button>
					`;
	parent.appendChild(div);
	let removeButton = Array.from(parent.lastChild.childNodes).filter((x) => x.className == 'remove')[0];
	removeButton.addEventListener('click', function() {
		//delete book if it's remove button is clicked
		__deleteBook(removeButton);
		//console.log(removeButton);
	});
	//console.log(removeButton);
}
function newBooks() {
	let newBook = document.querySelector('#newBook');
	newBook.addEventListener('click', _createForm);
}
function _createForm() {
	let form = document.createElement('div');
	form.id = 'theForm';
	form.innerHTML = `
			<form>
				<label><input type="text" placeholder="Title"></label>
				<label><input type="text" placeholder="Author"></label>
				<label><input type="text" placeholder="Year"></label>
				<label><input type="text" placeholder="Pages"></label>
				<label id="chkLabel"><p>Has Book been Read:</p><input id="chk" type="checkbox" value="read"></label>
				<button id="addBook" onclick='return false;'>ADD BOOK</button>
			</form>
		`;
	newBook.parentElement.appendChild(form);
	document.querySelector('#newBook').removeEventListener('click', _createForm);
	setTimeout(function() {
		requestAnimationFrame(function() {
			//trigger animation
			let obj = document.querySelector('#theForm');
			obj.style['transition-duration'] = '0.7s';
			obj.style['transitionTimingFunction'] = 'ease-in';
			obj.style['opacity'] = '1';
			//console.log(obj.style);
		});
	}, 20);
	__addBook();
	//console.log('newBook was clicked');
}
function _deleteForm() {
	let form = document.querySelector('#theForm');
	setTimeout(function() {
		form.style['transitionTimingFunction'] = 'ease-out';
		form.style['opacity'] = '0';
	}, 200);
	setTimeout(function() {
		form.remove();
		let bookContainer = document.querySelector('#bookContainer');
		bookContainer.style['transitionTimingFunction'] = 'ease-in';
		bookContainer.style['transition-duration'] = '.8s';
		bookContainer.style['margin-top'] = '20px';
	}, 250);
	newBooks();
}
function __addBook() {
	let addBtn = document.querySelector('#addBook');
	addBtn.addEventListener('click', function() {
		let inputs = Array.from(document.querySelectorAll('input'));
		let check = inputs.pop().checked;
		let listOfInputs = [];
		inputs.map((x) => listOfInputs.push(x.value));
		listOfInputs.push(check);
		let b = new Book(
			listOfInputs[0],
			listOfInputs[1],
			listOfInputs[2],
			listOfInputs[3],
			listOfInputs[4],
			myLibrary.length
		);
		addBookToLibrary(b);
		_deleteForm();
		render();
		//console.log(listOfInputs);
	});
}
function __deleteBook(button) {
	button = button.id.replace('book', '');
	console.log(myLibrary.splice(button, 1));
	___updateIndexes();
	render();
}
function ___updateIndexes() {
	//after deleting a book, assigns new indexes
	let book = 'book';
	for (let i = 0; i < myLibrary.length; i++) {
		myLibrary[i].index = `${book}i`;
	}
}
//console.log(document.querySelector('body'));
//render();
newBooks();
