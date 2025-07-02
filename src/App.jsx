import './App.css'
import { ContentBody } from './components/ContentBody.jsx'
import { Header } from './components/Header.jsx'
import { WordProvider } from './context/words.jsx'
import { WordInfo } from './components/WordInfo.jsx'
import { Menu } from './components/Menu.jsx'
import { ResetGame } from './components/ResetGame.jsx'

function App() {
  const headerItems = ['W', 'O', 'R', 'D', 'L', 'E']
  const headerHeight = 60;
  const headerWidth = 60;
  const headerGap = 5;
  const headerFont = 800;

  const footerItems = ['I','T','S','R', 'E', 'Q', 'U', 'E', 'N', 'A']
  const footerHeight = 25;
  const footerWidth = 25;
  const footerGap = 2.5;
  const footerFont = 600;

  return (
    <>
    <WordProvider>
      <Menu/>
      <main style={{ padding: '2rem' }}>
        <Header items={headerItems} height={headerHeight} width={headerWidth} gap={headerGap} font={headerFont} createdBy={false}/>
          <ContentBody/>
          <ResetGame/>
          <WordInfo/>
        <Header items={footerItems} height={footerHeight} width={footerWidth} gap={footerGap} font={footerFont} createdBy={true}/>
      </main>
    </WordProvider>
    </>
  )
}

export default App
