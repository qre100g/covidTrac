import './App.css';
import FetchingData, { FetchAllData } from './Components/FetchData';
import img from './Images/covidImage.jpeg';
import image from './Images/covidImage1.jpeg';
import img2 from './Images/covid2.jpeg';
import { useEffect, useState } from 'react';


function App() {
  const [val, setVal] = useState('');
  const [countryName, setName] = useState();
  const [doFetch, setDoFetch] = useState(false);

  return (
    <div className="App">
      <img src={img2} alt='Covid' width='100%' height= '250px' />
      <FetchAllData />
    </div>
  );
}

export default App;
