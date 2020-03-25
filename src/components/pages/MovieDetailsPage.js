import React, { Component, lazy, Suspense } from "react";
import services from "../services";
import css from "../App.module.css";
import dbGenres from "../db/genres.json";
import { Route, Link, withRouter, Switch } from "react-router-dom";
import { Spinner } from "../ui/spinner";

const LazyLoadCast = lazy(() =>
  import("./cast/Cast" /* webpackChunkName: 'Cast' */)
);

const LazyLoadReview = lazy(() =>
  import("./reviews/Reviews" /* webpackChunkName: 'Reviews' */)
);

class MovieDetailsPage extends Component {
  state = {
    film: null,
    firstPartOfSrc: "https://image.tmdb.org/t/p/original",
    reviews: [],
    cast: []
  };

  componentDidMount() {
    const { id } = this.props.location.state.movie;
    services
      .getMovieById(id)
      .then(data => this.setState({ film: { ...data.data } }));
  }

  onGoBackClick = e => {
    const { from } = this.props.location.state;
    this.props.history.push(`/${from}`);
  };

  render() {
    const { film, firstPartOfSrc } = this.state;
    return (
      film && (
        <div>
          <div className={css.goBackButton}>
            <button type="button" onClick={this.onGoBackClick}>
              go back
            </button>
          </div>
          <article>
            <div className={css.photoBlock}>
              <img
                src={
                  film.poster_path
                    ? firstPartOfSrc + film.poster_path
                    : "https://image.shutterstock.com/image-vector/no-image-available-vector-illustration-260nw-744886198.jpg"
                }
                alt="Oops!"
                className={css.poster}
              />
            </div>
            <div className={css.descBlock}>
              <h2>{film.title}</h2>
              <span>User Score : {film.vote_average * 10}%</span>
              <h3>Overveiw</h3>
              <p>{film.overview}</p>
              <h4>Genres</h4>
              <ul>
                {film.genres.map(el => {
                  return (
                    <li key={el.id}>
                      {dbGenres.find(genre => genre.id === el.id).name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </article>
          <div>
            <h3>Additional information</h3>
            <ul className={css.additionalCategory}>
              <li>
                <Link
                  to={{
                    pathname: `/movies/${film.id}/cast`,
                    state: { film, firstPartOfSrc }
                  }}
                >
                  Cast
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: `/movies/${film.id}/reviews`,
                    state: film.id
                  }}
                >
                  Reviews
                </Link>
              </li>
            </ul>
            <div className={css.additionalInformation}>
              <Switch>
                <Route
                  path={`/movies/${film.id}/cast`}
                  render={() => (
                    <Suspense
                      fallback={<Spinner type="Audio" color="purple" />}
                    >
                      <LazyLoadCast />
                    </Suspense>
                  )}
                />

                <Route
                  path={`/movies/${film.id}/reviews`}
                  render={() => (
                    <Suspense
                      fallback={<Spinner type="Audio" color="purple" />}
                    >
                      <LazyLoadReview />
                    </Suspense>
                  )}
                />
              </Switch>
              {/* <Route
              exact
              path="/home"
              render={() => (
                <Suspense fallback={<Spinner type="Bars" color="purple" />}>
                  <LazyLoadHomePage movies={movies} />
                </Suspense>
              )}
            /> */}
            </div>
          </div>
        </div>
      )
    );
  }
}

export default withRouter(MovieDetailsPage);
