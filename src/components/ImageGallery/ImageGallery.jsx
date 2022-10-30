import { useState } from 'react';
import { Button } from 'components/Button/Button';
import { Loader } from '../Loader';
import { getGalleryService } from 'Helpers/Api';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import css from '../ImageGallery/ImageGallery.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const ImageGallery = ({ toggleModal, query }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    const getImage = async () => {
      setIsloading(true);
      const data = await getGalleryService(query);
      setImages(data.hits);
      setIsloading(false);
    };
    getImage();
  }, [query]);

  useEffect(() => {
    if (page === 1) return;
    const getData = async () => {
      setIsloading(true);
      const data = await getGalleryService(query, page);
      setImages([...images, ...data.hits]);
      setIsloading(false);
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadMore = () => {
    setPage(page + 1);
  };

  return (
    <>
      {isLoading && <Loader />}
      <ul className={css.ImageGallery}>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            toggleModal={toggleModal}
            url={image.webformatURL}
            largeImage={image.largeImageURL}
          />
        ))}
      </ul>
      <Button loadMore={loadMore} />
    </>
  );
};

// export class ImageGallery extends Component {
//   state = {
//     images: [],
//     page: 1,
//     isLoadind: false,
//   };

// async componentDidUpdate(prevProps, prevState) {
//   if (prevProps.query !== this.props.query && this.props.query !== '') {
//     this.setState({ isLoadind: true });
//     const data = await getGalleryService(this.props.query);
//     this.setState({
//       images: data.hits,
//       page: 1,
//       isLoadind: false,
//     });
//   }
//   if (prevState.page !== this.state.page && this.state.page !== 1) {
//     this.setState({ isLoadind: true });
//     const data = await getGalleryService(this.props.query, this.state.page);

//     this.setState(prev => ({
//       images: [...prev.images, ...data.hits],
//       isLoadind: false,
//     }));
//   }
// }

// loadMore = () => {
//   this.setState(prevState => ({ page: prevState.page + 1 }));
// };

//   render() {
// return (
//   <>
//     {this.state.isLoading && <Loader />}
//     <ul className={css.ImageGallery}>
//       {this.state.images.map(image => (
//         <ImageGalleryItem
//           key={image.id}
//           toggleModal={this.props.toggleModal}
//           url={image.webformatURL}
//           largeImage={image.largeImageURL}
//         />
//       ))}
//     </ul>
//     <Button loadMore={this.loadMore} />
//   </>
// );
//   }
// }

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
