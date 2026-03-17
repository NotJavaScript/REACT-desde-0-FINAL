import { Link, Route } from "wouter";
import Detail from 'pages/Detail';
import React from 'react';
import SearchResults from 'pages/SearchResults';
import {GifsContextProvider} from 'context/GifsContext';
import './App.css';
import ErrorPage from "pages/ErrorPage";
import Header from "components/Header";
import Login from "pages/Login";
import {UserContextProvider} from "context/UserContext";
import RegisterPage from "pages/Register";

const HomePage = React.lazy(() => import("pages/Home"));

function App() {
  return (
    <UserContextProvider>
    <div className="App">
      <section className='App-content'>
        <h1>REACT desde 0</h1>
        <Link to='/' className={"PaginaPrincipal"}>Página principal</Link>
        <GifsContextProvider>
                <Header />
                <Route component={HomePage} path="/" />
                <Route
                  component={SearchResults}
                  path="/search/:keyword/:rating?"
                />
                <Route component={Detail} path="/gif/:id" />
                <Route component={Login} path="/login" />
                <Route component={RegisterPage} path={"register"}>
                  
                </Route>
                <Route
                component={ErrorPage}
                path="/404"/>
        </GifsContextProvider>
      </section>
    </div>
    </UserContextProvider>
  );
}

export default App;
