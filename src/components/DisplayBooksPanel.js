import DisplayBook from "./DisplayBook";

function DisplayBooksPanel({ books, setBooks }) {

  function editBook(bookId, bookEdits) {
    console.log("first", bookEdits);
    fetch(`http://localhost:9393/books/${bookId}`, {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookEdits)
    })
      .then(r => r.json())
      .then(editedBook => {
        console.log("second", editedBook);
        const updatedBooks = books.map(book => {
          if(book.id === bookId)
            return editedBook;
          return book;
        });
        setBooks(updatedBooks);
      });
  }

  return (
    <div className="books">
      {books.map(book => 
        <DisplayBook key={book.id} book={book} 
          books={books} setBooks={setBooks}
          editBook={editBook} />
      )}
    </div>
  )
}

export default DisplayBooksPanel;