import {Routes,Route} from 'react-router-dom'
import NavBar from "../src/components/navbar"
import Create from './components/create'
import Read from './components/read'
import Update from './components/update'

function App() {

  return (
    <>
      <NavBar/>
      <Routes>
        <Route exact path='/' element={<Create />} />
        <Route path='/read' element={<Read/>}/>
        <Route path='/edit/:id' element={<Update/>}/>
      </Routes>
    </>
  )
}

export default App
