import { useState } from 'react';

function AddBookForm({ isAddBook, setIsAddBook, 
  books, setBooks, groups, setGroups, statuses, 
  setStatuses, groupHash, setGroupHash }) {

  const [ formState, setFormState ] = useState({
    book_title: "",
    book_author: "",
    book_description: ""
  });
  
  const [ selectedStatus, setSelectedStatus ] = useState('1');
  const [ selectedGroup, setSelectedGroup ] = useState('1');

  function addBook(book) {
    fetch('http://localhost:9393/add-book', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book)
    })
      .then(r => r.json())
      .then(addedBook => {
        const updatedBooks = [ ...books, addedBook];
        setBooks(updatedBooks);
      });
  }  

  function handleEntryChange(event) {
    const fieldName = event.target.name;
    const userInput = event.target.value;
    setFormState( formState => ({
      ...formState,
      [fieldName]: userInput
    }));
  }

  function handleSelectGroupClick(event) {
    setSelectedGroup(event.target.value);
  }

  function handleSelectStatusClick(event) {
    setSelectedStatus(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const addingBook = {
      book_title: formState.book_title,
      book_author: formState.book_author,
      book_description: formState.book_description,
      status_id: selectedStatus,
      group_id: selectedGroup
    };
    console.log(addingBook);
    addBook(addingBook);
    setIsAddBook(!isAddBook);
    setFormState({
      book_title: "",
      book_author: "",
      book_description: ""
    });   
  }

  return (
      <form className="add-book-form" onSubmit={handleSubmit}>

        <label>Title</label>
        <input type="text" onChange={handleEntryChange}     
          name="book_title" value={formState.book_title} />

        <label>Author(s)</label>
        <input type="text" onChange={handleEntryChange} name="book_author" value={formState.book_author} />

        <label>Description: </label>
        <textarea onChange={handleEntryChange}
          name="book_description" 
          value={formState.book_description} />

        <label>Group: </label>
        <select onChange={handleSelectGroupClick}>
          {
            groups.map(group => 
              <option key={group.id} value={group.id}>
                {group.group_name}
              </option>)
          }
        </select>

        <label>Read Status: </label>
        <select onChange={handleSelectStatusClick}>
          {
            statuses.map(status => (
              <option key={status.id} value={status.id}>
                {status.read_status}
              </option>))
          }
        </select>

        <input type="submit" value="Add" />
      </form>
  );
}

export default AddBookForm;
