
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import Step1form from './Step1form';
import Step2form from './Step2form';


const Home = () => (


  <BrowserRouter>
    <div className="container">
      
      <Routes>
        <Route path='/' element={<Step1form />}/>
        <Route path='/step2' element={<Step2form />}/>
      </Routes>
    </div>
  </BrowserRouter>

)

export default Home;