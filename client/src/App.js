import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {LandingPage, Home, Detail, Forms} from './views/view'


function App() {

  return (
    <div className="App">
     {/* {location.pathname === '/'? <LandingPage/> : <NavBar/> } */}
    <Router>
      <Route exact path= '/' render={()=> <LandingPage/>}/>
      <Route path= '/home' render={()=> <Home/>}/>
      <Route path= '/detail/:id' render={()=> <Detail/>}/>
      <Route path= '/form' render={() => <Forms/>}/>
    </Router>
    </div>
  );
}

export default App;
