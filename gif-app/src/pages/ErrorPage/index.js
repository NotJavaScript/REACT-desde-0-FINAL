import React from "react";
import SearchForm from "components/SearchForm";
import { Helmet } from "react-helmet";
import useTitle from "hooks/useSEO";
import "../ErrorPage/styles.css"

const gifsErrors = ['d2jjuAZzDSVLZ5kI', 'Bp3dFfoqpCKFyXuSzP', 'hv5AEBpH3ZyNoRnABG', 'hLwSzlKN8Fi6I'];

export default function ErrorPage() {
  const randomImage = () => {
    return `https://media.giphy.com/media/${gifsErrors[Math.floor(Math.random() * gifsErrors.length) + 1 ]}/giphy.gif`
  }
      const title = "ERROR 404"
      useTitle({ description: `Detail of ${title}`, title })

  return (
    <>
      <header className="o-header">
        <SearchForm />
      </header>
      <div className="App-wrapper">
        <div className="PageError">
            <span className="codeError">404</span>
            <br></br>
            <span className="messageError">Sometimes being lost isn't that bad</span>
            <br></br>
            <img src={randomImage()} alt="alt-page-404" className="gifError"/>
            <br></br>
        </div>
      </div>
    </>
  );
}