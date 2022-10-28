import { useState } from 'react';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Modal } from 'components/Modal';
import css from './App.module.css';

export const App = () => {
  const [savedQuery, setSavedQuery] = useState('');
  const [largeImageURL, setLargeImageURL] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleSubmit = query => {
    setSavedQuery(query);
  };

  const toggleModal = url => {
    setLargeImageURL(url);
  };

  return (
    <div className={css.app}>
      <Searchbar handleSubmit={handleSubmit} />
      <ImageGallery toggleModal={toggleModal} query={savedQuery} />
      {largeImageURL && (
        <Modal onClose={toggleModal} largeImageURL={largeImageURL} />
      )}
    </div>
  );
};
