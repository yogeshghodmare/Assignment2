
import { useEffect, useState } from 'react';
import './App.css';
import Tables from './components/Tables';
import axios from 'axios';

function App() {

  return (
    <>
      <div>
        <h1> Database
        </h1>
        <Tables/>
      </div>
    </>
  );
}

export default App;
