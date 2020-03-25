import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import css from '../App.module.css'

class HomePage extends Component {
  state = { };
componentDidMount() {
  localStorage.removeItem('query');
}

  render() {
    const movies = this.props.movies;
    return (
      <>
        <h2>Popular films</h2>
        <ul>
          {movies.map(movie => (
            <li key={movie.id} className={css.filmLink}>
              <Link  to={{
                  pathname: `/movies/${movie.id}`,
                  state: { movie: movie,from: "home" },
                }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default withRouter(HomePage);
