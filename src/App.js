import React from 'react'
import logo from './logo.svg'
import './App.css'
import { LazyComp, useScrollY } from './LazyComp'

const dados = () => {
  let dadosReturn = []

  for (let index = 0; index < 100; index++) {
    dadosReturn.push({
      id: index,
      nome: `Componente ${index}`,
    })
  }

  return dadosReturn
}

const DefaultComp = () => <h4>DefaultComp</h4>

const CompLoaded = () => {
  return <img src={logo} className="App-logo" alt="logo" width="100px" />
}

function App() {
  const dadosMock = dados()

  const scroll = useScrollY()

  return (
    <div className="App">
      {dadosMock.map((dado) => (
        <div key={dado.id} className="div-component" id={dado.id}>
          <h1>{dado.nome}</h1>
          <LazyComp scrollY={scroll} defaultComp={DefaultComp} compLoaded={CompLoaded} parentId={dado.id} />
        </div>
      ))}
    </div>
  )
}

export default App
