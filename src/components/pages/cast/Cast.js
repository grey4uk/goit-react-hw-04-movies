import React, { Component } from "react";
import css from "./Cast.module.css";
import services from "../../services";
import { withRouter} from 'react-router-dom';


class Cast extends Component {
  state = { casts: null };

  componentDidMount() {
    services
      .getMovieCast(this.props.location.state.film.id)
      .then(data => this.setState({ casts: data.data.cast.length!==0?data.data.cast:null }));
  }

  render() {
    const { casts } = this.state;
    const firstPartOfSrc = this.props.location.state.firstPartOfSrc;
    return (
      casts?<ul className={css.castList}>
        {casts.map(cast => (
          <li className={css.castListItem} key={cast.cast_id}>
            <img
              className={css.castPhoto}
              src={
                cast.profile_path
                  ? firstPartOfSrc + cast.profile_path
                  : "https://image.shutterstock.com/image-vector/no-image-available-vector-illustration-260nw-744886198.jpg"
              }
              alt={cast.name}
            />
            {/* "https://image.shutterstock.com/image-vector/no-image-available-vector-illustration-260nw-744886198.jpg" */}
            <span>({cast.character})</span>
            <h4>{cast.name}</h4>
          </li>
        ))}
      </ul>
      :<p>Nothing found</p>
    );
  }
}

export default withRouter(Cast);

// const Cast = props => {
//   console.log("CAST PROPS", props);
//   const casts = props.location.state.cast;
//   const firstPartOfSrc = props.location.state.firstPartOfSrc;
//   console.log("CAST", casts);
//   return (
//     <ul className={css.castList}>
//       {casts.map(cast => (
//         <li className={css.castListItem} key={cast.cast_id}>
//           <img
//             className={css.castPhoto}
//             src={
//               cast.profile_path
//                 ? firstPartOfSrc + cast.profile_path
//                 : "https://image.shutterstock.com/image-vector/no-image-available-vector-illustration-260nw-744886198.jpg"
//             }
//             alt={cast.name}
//           />
//           {/* "https://image.shutterstock.com/image-vector/no-image-available-vector-illustration-260nw-744886198.jpg" */}
//           <span>({cast.character})</span>
//           <h4>{cast.name}</h4>

//         </li>
//       ))}
//     </ul>
//   );
// };

// export default Cast;
