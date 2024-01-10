import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";

const OMDB_URL = "http://www.omdbapi.com/?apikey=24ad60e9";
const STRIVE_URL = "https://striveschool-api.herokuapp.com/api/comments/";

const MovieDetails = () => {
  const params = useParams();
  console.log(params.movieId);

  const [movieDetailObject, setMovieDetailsObject] = useState(null);
  const [movieComments, setMovieComments] = useState([]);

  useEffect(() => {
    getDetails();

    getComments();
  }, []);

  const getDetails = () => {
    fetch(OMDB_URL + "&i=" + params.movieId)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("errore nel recupero dettagli film");
        }
      })
      .then((movieDetail) => {
        console.log("MOVIEDETAIL", movieDetail);
        setMovieDetailsObject(movieDetail);
      })
      .catch((err) => console.log("ERRORE", err));
  };

  const getComments = () => {
    fetch(STRIVE_URL + params.movieId, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTljMDgwOWUwZGQxZDAwMTgyZDE3YmIiLCJpYXQiOjE3MDQ3MjQ0ODksImV4cCI6MTcwNTkzNDA4OX0.uKuWLIHS3hqybZAO76uHUFzeiliUB2oSQv5uM1s2CPI",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("errore nel recupero commenti film");
        }
      })
      .then((movieComments) => {
        console.log("COMMENTI", movieComments);
        setMovieComments(movieComments);
      })
      .catch((err) => console.log("ERRORE", err));
  };

  return (
    <div className="d-flex justify-content-center text-light">
      {movieDetailObject && (
        <>
          <img src={movieDetailObject.Poster} alt="movie" />
          <div>
            <h3>{movieDetailObject.Title}</h3>
            <p>{movieDetailObject.Plot}</p>
            {movieComments && (
              <ListGroup>
                {movieComments.map((comment) => (
                  <ListGroup.Item key={comment._id}>
                    {comment.rate} - {comment.comment}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
