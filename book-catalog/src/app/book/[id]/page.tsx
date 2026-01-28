'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

function BookPage() {
  const params = useParams();
  const bookId = params.id;

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://fakerapi.it/api/v1/books?_quantity=1&id=${bookId}`)
      .then(response => {
        if (response.data.data[0]) {
          setBook(response.data.data[0]);
        } else {
          const savedBooks = JSON.parse(localStorage.getItem('myBooks') || '[]');
          const foundBook = savedBooks.find(b => b.id == bookId);
          if (foundBook) setBook(foundBook);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [bookId]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!book) {
    return (
      <div >
        <h2>Книга не найдена</h2>
        <button
          onClick={() => window.history.back()}
        >
          Назад
        </button>
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto p-3'>
      <div className='flex-col bg-gray-100 p-6 rounded-xl mb-10 border border-gray-300'>
        {book.image && (
          <img
            src={book.image}
            alt={book.title}
            className='w-full h-48 object-cover rounded-lg mb-4'
          />
        ) || 'Нет изображения'}

        <h1 className='text-2xl font-bold mb-6'>{book.title}</h1>

        <div className='flex text-center gap-6 p-3 mb-6'>
          <div><h3 className='font-bold'>Автор:</h3> {book.author}</div>
          <div><h3 className='font-bold'>Год:</h3>{book.published}</div>
          <div><h3 className='font-bold'>Жанр:</h3>{book.genre}</div>
          <div><h3 className='font-bold'>ISBN:</h3>{book.isbn}</div>
          <div><h3 className='font-bold'>Издатель:</h3>{book.publisher}</div>
        </div>

        <div>
          <h3 className='mb-3 font-bold'>Описание</h3>
          <p className='text-xl text-gray-700'>
            {book.description || 'Нет описания'}
          </p>
        </div>
        <button
          onClick={() => window.history.back()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
        >Назад</button>
      </div>
    </div>
  );
}



export default BookPage