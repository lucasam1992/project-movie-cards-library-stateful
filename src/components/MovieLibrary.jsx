// implement AddMovie component here
import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import AddMovie from './AddMovie';

class MovieLibrary extends React.Component {
  constructor(props) {
    super(props);
    const { movies } = this.props;
    this.state = {
      searchText: '',
      bookmarkedOnly: false,
      selectedGenre: '',
      movies,
    };
    this.handleAddMovie = this.handleAddMovie.bind(this);
    this.handleSearchText = this.handleSearchText.bind(this);
    this.handleBookmarkedOnly = this.handleBookmarkedOnly.bind(this);
    this.handleSelectedGenre = this.handleSelectedGenre.bind(this);
    console.log(movies);
  }

  handleAddMovie(data) {
    const { movies } = this.state;
    this.setState({ movies: [...movies, data] });
  }

  handleSearchText(event) {
    const { value } = event.target;
    this.setState({ searchText: value });
  }

  handleSelectedGenre(event) {
    const { value } = event.target;
    this.setState({ selectedGenre: value });
  }

  handleBookmarkedOnly(event) {
    const { checked } = event.target;
    this.setState({ bookmarkedOnly: checked });
  }

  render() {
    const { searchText, bookmarkedOnly, selectedGenre, movies } = this.state;

    let recievedAllMovies = movies;

    if (searchText) {
      recievedAllMovies = recievedAllMovies.filter((movie) => (
        movie.title.includes(searchText) || movie.subtitle.includes(searchText)
        || movie.storyline.includes(searchText)
      ));
    }

    if (bookmarkedOnly) {
      recievedAllMovies = movies.filter((movie) => movie.bookmarked === true);
    }

    if (selectedGenre) {
      recievedAllMovies = recievedAllMovies.filter(
        (movie) => movie.genre === selectedGenre,
      );
    }

    return (
      <div>
        <SearchBar
          searchText={ searchText }
          bookmarkedOnly={ bookmarkedOnly }
          selectedGenre={ selectedGenre }
          onSearchTextChange={ this.handleSearchText }
          onBookmarkedChange={ this.handleBookmarkedOnly }
          onSelectedGenreChange={ this.handleSelectedGenre }
        />
        <AddMovie onClick={ this.handleAddMovie } />
        <MovieList
          movies={ recievedAllMovies }
          searchText={ searchText }
          bookmarkedOnly={ bookmarkedOnly }
          selectedGenre={ selectedGenre }
        />
      </div>
    );
  }
}

MovieLibrary.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MovieLibrary;
