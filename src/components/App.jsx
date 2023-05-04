import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from './Api/fetchImages';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    currentSearchValue: '',
    page: 1,
    totalPage: 0,
    loading: false,
    showModal: false,
    modalAlt: '',
    modalImg: '',
  };

  handleSubmit = async e => {
    e.preventDefault();
    const inputSearchForm = e.target.elements.searchImag.value;

    if (inputSearchForm.trim() === '') {
      toast.warn('Please put something', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return;
    }
    this.setState({
      loading: true,
    });
    try {
      const dataImages = await fetchImages(inputSearchForm);
      if (dataImages.hits.length === 0) {
        toast.error(`We have not ${inputSearchForm} images`, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      }
      this.setState({
        images: dataImages.hits,
        currentSearchValue: inputSearchForm,
        page: 1,
        totalPage: dataImages.totalHits,
        loading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleClickMore = async e => {
    const { currentSearchValue, page } = this.state;

    this.setState({ loading: true });
    try {
      const images = await fetchImages(currentSearchValue, page + 1);
      this.setState(prevState => ({
        images: [...prevState.images, ...images.hits],
        loading: false,
        page: this.state.page + 1,
        totalPage: images.totalHits,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  handleImageClick = e => {
    this.setState({
      showModal: true,
      modalAlt: e.target.alt,
      modalImg: e.target.name,
    });
  };

  onCloseModal = () => {
    this.setState({
      showModal: false,
      modalAlt: '',
      modalImg: '',
    });
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.onCloseModal();
    }
  };
  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.onCloseModal();
    }
  };

  render() {
    const { totalPage, page, images, loading, modalImg, modalAlt, showModal } =
      this.state;
    const maxImages = Math.ceil(totalPage / 12) > page;

    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {loading && <Loader />}

        {images.length > 0 && maxImages && (
          <Button onClick={this.handleClickMore} />
        )}

        <ToastContainer />
        {showModal && (
          <Modal
            onClick={this.handleBackdropClick}
            src={modalImg}
            alt={modalAlt}
          />
        )}
      </div>
    );
  }
}
