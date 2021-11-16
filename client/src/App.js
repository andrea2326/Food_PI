import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './component/Landing/Landing'
import DetailRecipe  from './component/Detail/Detail.jsx';
import Home from './component/Home/Home';
import CreateRecipe from './component/CreateRecipe/CreateRecipe.jsx';

function App() {
  return (
    <BrowserRouter>
    <div className='App'>
      <Switch>
        <Route exact path ='/' component= {Landing}/> 
        <Route path ='/home' component= {Home}/>
        <Route exact path ='/detail/:id' component= {DetailRecipe}/>
        <Route exact path ='/recipe' component= {CreateRecipe}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
