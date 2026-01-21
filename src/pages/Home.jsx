import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";

export default function Home() {
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();
  const [query] = useSearchParams();
  const nav = useNavigate();

  useEffect(() => {
    doApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const onSub = (e) => {
    e.preventDefault();
    const val = inputRef.current.value;
    if (val === "") return;
    nav("/?s=" + val);
  };

  const doApi = async () => {
    const queryS = query.get("s") || "black";

    const url1 = `https://www.omdbapi.com/?s=${queryS}&apikey=5a292f28`;
    const url2 = `https://www.omdbapi.com/?s=${queryS}&apikey=90781f94`;

    setLoading(true);

    try {
      const { data } = await axios.get(url1);
      setList(data.Search);
    } catch (error) {
      console.log(error);
      try {
        const { data } = await axios.get(url2);
        setList(data.Search);
      } catch (error2) {
        console.log(error2);
        setList([]);
      }
    }

    setLoading(false);
  };

  return (
    <div className="pageBg d-flex flex-column">
      <div className="container text-center py-4 flex-grow-1">

        <form onSubmit={onSub} className="col-12 col-md-5 mx-auto mb-3">
          <div className="input-group searchGroup">
            <input
              ref={inputRef}
              className="form-control"
              type="search"
              placeholder="search..."
              defaultValue={query.get("s") || "black"}
            />
            <button className="btn btn-dark searchBtn">Search</button>
          </div>
        </form>

        <h2 className="listTitle">Results</h2>

        {loading || !list ? (
          <h2>Loading...</h2>
        ) : list.length === 0 ? (
          <h4>No results found</h4>
        ) : (
          <div className="row justify-content-center">
            {list.map(item => (
              <div key={item.imdbID} className="col-md-6 col-lg-4 p-2">
                <div className="movieCard d-flex text-start">
                  <img
                    src={item.Poster}
                    alt={item.Title}
                    className="movieThumb me-3"
                  />
                  <div>
                    <h4 className="movieTitle">{item.Title}</h4>
                    <div className="movieYear">Year: {item.Year}</div>

                    <Link
                      to={"/info/" + item.imdbID}
                      className="btn btn-dark btn-sm mt-2"
                    >
                      More info
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      <footer className="topHeader text-center py-2 text-white">
        2Monkeys.co.il 2011-2023
      </footer>
    </div>
  );
}
