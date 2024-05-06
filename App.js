import React, { useEffect } from 'react';
import AppNavigation from './src/navigation';
import { apiCall } from './src/api/openAI';
function App() {

  useEffect(() => {
    apiCall("create an image of a dog playing with a cat")
  },[])

  return (
    <AppNavigation/>
  );
}

export default App;
