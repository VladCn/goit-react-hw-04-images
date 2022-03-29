import React, { useState} from 'react';
import axios from 'axios';
import { Audio } from 'react-loader-spinner';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Modal } from './Modal';


export function App() {
  const[data, setData] = useState([])
  const[largeImageURL, setLargeImageURL] = useState(null)
  const[currentPage, setCurrentPage] = useState(0)
  const[search, setSearch] = useState(null)
  const[loading, setLoading] = useState(false)
  const[total, setTotal] = useState(0)


  const itemsPerPage = 12;

  const handleCloseModal = () => {
    setLargeImageURL(null)
    // this.setState({ largeImageURL: null });
  };

  const handleGalleryItemClick = event => {
    const largeImageURL = event.target.getAttribute('data-largeimage');
    if (largeImageURL) {
      setLargeImageURL(largeImageURL)
      // this.setState({ largeImageURL });
    }
  };

  const handleSubmit = async (event, data) => {
    event.preventDefault();
    setCurrentPage(1)
    setSearch(data)
    await getPhoto(data)
    // this.setState({
    //   currentPage: 1,
    //   search: data,
    // });
  };

  const handleLoadMore = async () => {
    setCurrentPage(currentPage + 1);
    await getPhoto(search, currentPage + 1)
  };

  async function getPhoto(search, newPage = 1) {
    console.log(data)
    try {
      setLoading(true);
      const response = await axios.get(
        `https://pixabay.com/api/?q=${search}&page=${newPage}&key=24765939-636e8942567168a69f12817e3&image_type=photo&orientation=horizontal&per_page=${itemsPerPage}`
      );
      console.log(response);

      const dataRes = response.data.hits.map(
        ({ id, webformatURL, largeImageURL }) => ({
          id,
          webformatURL,
          largeImageURL,
        })
      );
      console.log(dataRes)
      setData(prev => [...prev, ...dataRes])
      setTotal(response.data.total)
      setLoading(false)

    } catch (error) {
      console.error(error);
    }
  }

  // async function componentDidUpdate(prevProps, prevState) {
  //   if (
  //     prevState.search !== this.state.search ||
  //     prevState.currentPage !== this.state.currentPage
  //   ) {
  //     await this.getPhoto(this.state.search, this.state.currentPage);
  //   }
  // }


    const isButtonVisible =
      currentPage && total / itemsPerPage > 1;
    // const isStateData = this.state.currentPage > 0 && this.state.search;

    return (
      <div className="App">
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery
          data={data}
          onClick={handleGalleryItemClick}
        />

        {loading ? (
          <Audio
            wrapperStyle={{ justifyContent: 'center' }}
            height="100"
            width="100"
            color="grey"
            ariaLabel="loading"
          />
        ) : null}
        {isButtonVisible ? <Button onClick={handleLoadMore} /> : null}

        {largeImageURL && (
          <Modal onClose={handleCloseModal} >
            <img src={largeImageURL} alt="malunok" />
          </Modal>
        )}
      </div>
    );
}
