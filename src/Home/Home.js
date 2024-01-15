import './Opdrachten.css';
import { useEffect, useState } from 'react';
import {Navigate, useNavigate} from "react-router-dom";

let addCatogrieFilter



 // For React Router v5
// or
// import { useNavigate } from 'react-router-dom'; // For React Router v6

const ResultComponent = function(props) {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // For React Router v6

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      // Replace history.push with navigate for React Router v6
      navigate('/invullen');
    }, 1000);
  };

  return (
      <div
          className='result'
          onClick={handleClick}
      >
        {loading && (
            <div className="spinner-overlay">
              <div className="spinner"></div>
            </div>
        )}
        <p>{props.name}</p>
        <p>{props.questionType}</p>
      </div>
  );
};

let filterArray = []
let filterArray1 = []
let filterArray2 = []
let id = 0
const SubCatogrie = function(props) {
  const [filterdValues, setFilterdValue] = useState([]);
  const handleCheckboxClick = (value, event) => {
    const updatedValues = event.checked
      ? [...filterdValues, value]
      : filterdValues.filter(v => v !== value);
    setFilterdValue(updatedValues);
  };

  useEffect(() => {
    if (id === '1') {
      filterArray1 = filterdValues
    } else {
      filterArray2 = filterdValues
    }
    filterArray = Array.from(new Set([...filterArray1, ...filterArray2]))
    addCatogrieFilter();
  }, [filterdValues]);
  
  return (
    <div className=''>
     {props.items.map((item, index) => (
        <div key={`checkboxContainer${props.id}-${index}`}>
          <input
            onClick={(event) => handleCheckboxClick(item, event.target)}
            type="checkbox"
            id={`checkbox${props.id}-${index}`}
          />
          <label htmlFor={`checkbox${props.id}-${index}`}>{item}</label>
        </div>
      ))}
    </div>
  );
}

const startOpdracht = function(props) {
  console.log(props)
}

let Home = function() {

  const list = [{name: 'appel', questionType: 'Flitskaart', questionStatus : 'To Do'}, 
                {name: 'banaan', questionType: 'Invullen', questionStatus : 'Gemaakt'},
                {name: 'mango', questionType: 'Flitskaart', questionStatus : 'To Do'},
                {name: 'sinaasappel', questionType: 'Flitskaart', questionStatus : 'To Do'},
                {name: 'kiwi', questionType: 'Invullen', questionStatus : 'To Do'},
                {name: 'peer', questionType: 'Invullen', questionStatus : 'Gemaakt'},
                {name: 'limoen', questionType: 'Invullen', questionStatus : 'To Do'},
                {name: 'watermeloen', questionType: 'Flitskaart', questionStatus : 'Gemaakt'},
                {name: 'citroen', questionType: 'Invullen', questionStatus : 'To Do'}]

  const [searchBarInput, setSearchBarInput] = useState('');
  const [searcBarResults, setSearchBarResults] = useState([]);
  
  addCatogrieFilter = function() {
    const input = document.getElementById('searchBar')
    handleSeachBarInput({target:{value:input.value}})
  }

  const handleSeachBarInput = function(event) {

    setSearchBarResults([])
    setSearchBarInput(event.target.value)

    let results
    if (event.target.value === '') {
      results = JSON.parse(JSON.stringify(list))
    } else {
      results = list.filter((item) =>
        item.name.toLowerCase().includes(searchBarInput.toLowerCase())
      )
    }

    let finalResults = []

    if (filterArray && filterArray.length > 0) {
      for (let z = 0; z < results.length; z++) {
        let canAdd = true
        for (let i = 0; i < filterArray.length; i++) {
          if (results[z].questionType !== filterArray[i] & results[z].questionStatus !== filterArray[i]) {
            canAdd = false
          }
        }
        if (canAdd) {
          finalResults[finalResults.length] = results[z]
        }
      }
    } else {
      finalResults = results
    }

    setSearchBarResults(
      finalResults.map((result, index) => (
        <ResultComponent key={index} name={result.name} questionType={result.questionType} questionStatus={result.questionStatus} />
      ))
    )
  }

  useEffect(() => {
    handleSeachBarInput({target:{value:''}})
  }, [])

  return (
    <div className="App">

      <div className='font-large' id='content'>
        
        <div className='d-xl-flex d-none' id='catogrie'>
          <h2 className='pt-3'>Catogrie</h2>
          <SubCatogrie id={1} items={['Invullen', 'Flitskaart']}/>
          <SubCatogrie id={2} items={['Gemaakt', 'To Do']}/>
        </div>

        <div id='container'>

          <input 
            placeholder='Type hier je zoekopdracht' 
            id='searchBar' 
            value={searchBarInput} 
            onChange={handleSeachBarInput}>
          </input>

          <div id='results'>
            {searcBarResults}
          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;
