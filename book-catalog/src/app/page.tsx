'use client';
import { useEffect, useState } from "react";
import axios from 'axios';
// import styles from './css/Book.module.css'

type Book = {
  id: number;
  title: string;
  author: string;
  genre: string;
  description: string;
  image: any;
  published: string;
};

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState('');
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    image: '',
    published: '',
  });

  useEffect(() => {
    console.log('Загрузка книг по API');
    axios.get('https://fakerapi.it/api/v1/books?_quantity=20')
      .then(response => {
        console.log('Загрузка успешна');
        setBooks(response.data.data);
      })
      .catch(error => {
        console.error('Ошибка загрузки:', error);
      });
  }, []);

  const filteredBooks = books.filter(book => {
    return book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());
  });

  const addBook = () => {
    if (!newBook.title || !newBook.author) {
      alert('Заполнить: название и автор');
      return;
    }
    const book_id = books.length + 1;
    const book = {
      id: book_id,
      title: newBook.title,
      author: newBook.author,
      genre: newBook.genre,
      description: newBook.description,
      image: 'https://dummyimage.com/600x400/000/fff&text=' + newBook.title,
      published: newBook.published,
    };

    setBooks([book, ...books]);
    setNewBook({ title: '', author: '', genre: '', published: '', description: '', image: '' });
  };

  const deleteBook = (id: number) => {
    if (window.confirm('Удалить книгу?')) {
      setBooks(books.filter(book => book.id !== id));
    }
  };

  const goToBook = (id: number) => {
    window.location.href = `/book/${id}`;
  };

  const inputClassName = "w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="p-5 mx-auto max-w-6xl">
      <h1 className="text-gray-800 text-3xl font-bold mb-8">Каталог книг</h1>

      <div className="mb-8">
        <label htmlFor="search">Поиск</label>
        <input
          id="search"
          type="text"
          placeholder="Название книги или имя автора"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={inputClassName}
        />
      </div>

      <div className="bg-gray-50 p-6 rounded-xl mb-10 border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Добавить новую книгу</h3>

        <div className="flex flex-col gap-4">
          <input
            className={inputClassName}
            placeholder="Название книги"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          />

          <input
            // className={styles.inputBox}
            className={inputClassName}
            placeholder="Автор"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          />

          <input
            // className={styles.inputBox}
            className={inputClassName}
            placeholder="Год (прим: 2026)"
            value={newBook.published}
            onChange={(e) => setNewBook({ ...newBook, published: e.target.value })}
          />

          <textarea
            // className={styles.inputBox}
            className={inputClassName}
            placeholder="Описание книги"
            value={newBook.description}
            onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
            style={{ minHeight: '80px' }}
          />

          <button
            onClick={addBook}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
          >
            Добавить книгу
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Все книги: {filteredBooks.length}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map(book => (
          <div
            key={book.id}
            className="border border-gray-300 rounded-xl p-5 bg-white shadow-md hover:shadow-lg transition-shadow"
          >
            {book.image && (
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            ) || 'Нет изображения'}

            <h3
              className="text-xl font-bold text-blue-600 mb-2 cursor-pointer hover:text-blue-800"
              onClick={() => goToBook(book.id)}
            >
              {book.title}
            </h3>

            <p className="text-gray-600 mb-1">
              Автор: <strong>{book.author}</strong>
            </p>

            <p className="text-gray-600 mb-3">
              Год: {book.published || 'Неизвестно'}
            </p>

            <p className="text-gray-700 mb-6 line-clamp-3">
              {book.description || 'Нет описания'}
            </p>

            <div className="flex gap-3">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
                onClick={() => goToBook(book.id)}
              >
                Подробнее
              </button>

              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-4 rounded mt-4 w-full"
                onClick={() => deleteBook(book.id)}
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Книг не найдено...
        </div>
      )}
    </div>
  );
}

export default Home