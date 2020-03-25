import React, { Component, lazy, Suspense } from "react";
import {
  NavLink,
  Route,
  BrowserRouter as Router,
  Redirect,
  Switch
} from "react-router-dom";
import css from "./App.module.css";
import MoviesPage from "./pages/MoviesPage";
import { Spinner } from "./ui/spinner";
import services from "./services";

const LazyLoadHomePage = lazy(() =>
  import("./pages/HomePage" /* webpackChunkName: 'HomePage' */)
);
const LazyLoadDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage" /* webpackChunkName: 'DetailsPage' */)
);

class App extends Component {
  state = {
    movies: []
  };

  componentDidMount() {
    this.state.movies.length === 0 &&
      services.getPopular().then(data =>
        this.setState({
          movies: data.data.results
        })
      );
  }

  render() {
    const { movies } = this.state;
    return (
      <header>
        <Router>
          <NavLink
            exact
            to="/home"
            className={css.link}
            activeClassName={css.activeLink}
          >
            HOME
          </NavLink>
          <NavLink
            to="/movies"
            className={css.link}
            activeClassName={css.activeLink}
          >
            MOVIES
          </NavLink>
          <Switch>
            <Route
              exact
              path="/home"
              render={() => (
                <Suspense fallback={<Spinner type="Bars" color="purple" />}>
                  <LazyLoadHomePage movies={movies} />
                </Suspense>
              )}
            />
            <Route
              path={`/movies/:movieId`}
              render={() => (
                <Suspense fallback={<Spinner type="Bars" color="purple" />}>
                  <LazyLoadDetailsPage film={movies} />
                </Suspense>
              )}
            />
            <Route path="/movies" component={MoviesPage} />
            <Redirect to="/home" />
          </Switch>
        </Router>
      </header>
    );
  }
}

export default App;
