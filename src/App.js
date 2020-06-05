import React,{useEffect,useState} from 'react';
//import logo from './logo.svg';
import Recipe from './Recipe';
import './App.css';




const App = () => {
  const APP_ID="da5d0dbc";
  const APP_KEY="8a46e8a3bec3ff032dd2a5a345fac5d0	";
  
  const[recipes,setRecipes]=useState([]);
  const [search,setSearch]=useState("");
  const[query,setQuery]=useState('chiken');


  //const[counter,setCounter]=useState(0);

  useEffect( ()=>{
    getRecipes();
    
 
  },[query]);
  
  const getRecipes=async () =>
  {
    const response=await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data= await response.json();
    console.log(data.hits);
    setRecipes(data.hits);
    console.log(data.hits);

  };



  const updateSearch = e =>{
    setSearch(e.target.value);
    //console.log(search);
  };
  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return(
    <div className="App">
    <form  onSubmit ={getSearch} className="search-form">
    <input className="search-bar" type="text" value={search} onChange={updateSearch} />
    <button className="search-button" 
    type="submit">
    search</button>
    
    </form>
    <div className="recipes">
    
    {recipes.map(recipe => (

      <Recipe  
      key={recipe.recipe.label}
      title={recipe.recipe.label}
       calories={recipe.recipe.calories}
      image={recipe.recipe.image}
      ingredients={recipe.recipe.ingredients}
      />
    ))};
    </div>
    
    

    </div>
  );
};

export default App;
