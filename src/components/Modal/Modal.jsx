import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({ onClose, largeImageURL }) => {
  useEffect(() => {
    window.addEventListener('keydown', keyClose);
    return () => {
      window.removeEventListener('keydown', keyClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function keyClose(e) {
    if (e.key === 'Escape') {
      onClose();
    }
  }

  const overlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div onClick={overlayClick} className={css.Overlay}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
};

// export class Modal extends Component {
// componentDidMount() {
//   document.addEventListener('keydown', this.keyClose);
// }
//   componentWillUnmount() {
//     document.removeEventListener('keydown', this.keyClose);
//   }

// keyClose = e => {
//   if (e.key === 'Escape') {
//     this.props.onClose();
//   }
// };

// overlayClick = e => {
//   if (e.target === e.currentTarget) {
//     this.props.onClose();
//   }
// };

//   render() {
// return (
//   <div onClick={this.overlayClick} className={css.Overlay}>
//     <div className={css.Modal}>
//       <img src={this.props.largeImageURL} alt="" />
//     </div>
//   </div>
// );
//   }
// }

// Modal.propTypes = {
//   largeImageURL: PropTypes.string.isRequired,
// };
