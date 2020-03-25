import React, { Component } from "react";
import { withRouter} from 'react-router-dom';
import css from "./Reviews.module.css";
import services from "../../services";

class Reviews extends Component {
  state = { reviews: [] };
  componentDidMount() {
    services
      .getMovieReview(this.props.location.state)
      .then(data => this.setState({ reviews: data.data.results }));
  }

  render() {
    const { reviews } = this.state;
    return (
      <ul className={css.reviewList}>
        {reviews.map(review => (
          <li className={css.reviewListItem} key={review.id}>
            <h4>{review.author}</h4>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    );
  }
}

export default withRouter(Reviews);
