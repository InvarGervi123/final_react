// HomeInfo.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function HomeInfo() {
  const [itemInfo, setItemInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const nav = useNavigate();

  useEffect(() => {
    doApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doApi = async () => {
    const id = params.id;

    const url1 = `https://www.omdbapi.com/?i=${id}&apikey=5a292f28`;
    const url2 = `https://www.omdbapi.com/?i=${id}&apikey=90781f94`;

    setLoading(true);

    try {
      const { data } = await axios.get(url1);
      setItemInfo(data);
    } catch (error) {
      console.log(error);
      try {
        const { data } = await axios.get(url2);
        setItemInfo(data);
      } catch (error2) {
        console.log(error2);
      }
    }

    setLoading(false);
  };

  return (
    <div className="pageBg d-flex flex-column">
      <div className="container text-center py-4 flex-grow-1">
        {loading || !itemInfo ? (
          <h2>Loading...</h2>
        ) : (
          <>
            <img
              src={itemInfo.Poster}
              className="infoPoster mb-3"
              alt={itemInfo.Title}
            />

            <h1 className="movieTitle">{itemInfo.Title}</h1>

            <div className="movieYear mt-2">
              Runtime: {itemInfo.Runtime}<br />
              Rating: {itemInfo.imdbRating}<br />
              Genere: {itemInfo.Genre}<br />
              Plot: {itemInfo.Plot}
            </div>

            <button className="btn btn-dark mt-3" onClick={() => nav(-1)}>
              Back to list
            </button>
          </>
        )}
      </div>

      <footer className="topHeader text-center py-2 text-white">
        2Monkeys.co.il 2011-2023
      </footer>
    </div>
  );

}
