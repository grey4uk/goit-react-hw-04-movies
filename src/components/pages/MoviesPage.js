import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import queryString from "query-string";
import services from "../services";
import { Spinner } from "../ui/spinner";
import css from '../App.module.css';

class MoviesPage extends Component {
  state = {
    isLoad: false,
    film: null,
    query: "",
    key: "fcd9429450d3aff4de8b05edb62acde5"
  };

  componentDidMount() {
    const inputForFindFilm = document.querySelector("#finding");
    const parse = this.props.location.search
      ? queryString.parse(this.props.location.search).query
      : localStorage.getItem("query");

    parse &&
      services.getMovieByQuery(parse).then(data =>
        this.setState({
          film: data.data.results,
          query: parse
        })
      );

    inputForFindFilm.value = localStorage.getItem("query");
  }

  handleChange = e => {
    this.setState({
      query: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
   
    const { query } = this.state;
    
    if(query)
      {this.setState({ isLoad: true });
         services
          .getMovieByQuery(query)
          .then(data =>
            this.setState({
              film: data.data.results
            })
          )
          .finally(() => this.setState({ isLoad: false }))}
      else{ alert("Input is empty")};
      this.props.history.push(`?query=${query}`);
      localStorage.setItem("query", `${query}`);
  };

  render() {
    const { film, isLoad, query } = this.state;
    return (
      <>
        {isLoad && <Spinner type="Bars" color="yellow" />}
        <form type="submit" onSubmit={this.handleSubmit}>
          <label>
            <input
              id="finding"
              placeholder="what searching?.."
              type="text"
              name="name"
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">search</button>
        </form>
        {film && (
          <>
            <ul>
              {film.map(el => (
                <li key={el.id} className={css.filmLink}>
                  <Link
                    to={{
                      pathname: `/movies/${el.id}`,
                      state: { movie: el, from: "movies", query: query }
                    }}
                  >
                    {el.title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </>
    );
  }
}

export default withRouter(MoviesPage);
