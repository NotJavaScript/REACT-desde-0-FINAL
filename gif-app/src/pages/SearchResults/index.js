import React, {useCallback, useRef, useEffect} from "react"
import ListOfGifs from "components/ListOfGifs/ListOfGifs"
import { useGifs } from "hooks/useGif"
import SearchForm from "components/SearchForm"
import debounce from "just-debounce-it"
import useTitle from "hooks/useSEO"

import useNearScreen from "hooks/useNearScreen"

function SearchResults({params}) {
  const { keyword, rating } = params
  const { loading, gifs, setPage } = useGifs({ keyword, rating })
  
  const externalRef = useRef()
  const {isNearScreen} = useNearScreen({
    externalRef: loading ? null : externalRef,
    once: false
  })

  const title = gifs ? `Resultados de ${keyword}` : ''
  useTitle({ description: `Detail of ${title}`, title })

  // ! Código para hacer el scroll infinito.
  // ! --------------------------------------------------------
  const debounceHandleNextPage = useCallback(debounce( 
    () => setPage(prevPage => prevPage + 1), 200
  ), [])

  useEffect(function () {
    if(isNearScreen) debounceHandleNextPage()
  }, [debounceHandleNextPage, isNearScreen])
  // ! --------------------------------------------------------

  return <>
    {loading
      ? "Cargando..."
      : <>
        <header className="o-header">
          <SearchForm initialKeyword={keyword} initialRating={rating} />
        </header>
        <div className="App-wrapper">
          <h3 className="App-title">
            {decodeURI(keyword)}
          </h3>
          <ListOfGifs gifs={gifs} />
          <div id="visor" ref={externalRef}></div>
        </div>
      </>
    }
     {/* <button onClick={handleNextPage}>Página siguiente</button> */}
  </>
}

// Utilizamos el export default React.memo(${nombreFuncion}) como forma de optimizar el código y que el useEffect se tenga que renderizar menos veces.
// Esto lo podemos comprobar colocando en el código un console.log("${textoDePrueba}");
// Aunque en este caso en particular no funciona el React.memo y funciona igual que poniendo el export default de manera normal.
export default React.memo(SearchResults)