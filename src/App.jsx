import './App.css'
import { ContentBody } from './components/ContentBody.jsx'
import { Header } from './components/Header.jsx'
import { WordProvider } from './context/words.jsx'
import { WordInfo } from './components/WordInfo.jsx'

function App() {

  return (
    <>
      <Header/>
      <WordProvider>
        <ContentBody/>
        {/* <WordInfo/> */}
      </WordProvider>
    </>
  )
}

export default App
