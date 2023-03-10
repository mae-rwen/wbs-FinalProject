import { useEffect, useState } from 'react';
import SingleCard from './SingleCard';
import axios from '../../api/axios';
import LoadingSpinner from '../GeneralComponents/LoadingSpinner';

export default function Categories() {
  const [eventsCount, setEventsCount] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoriesIDs, setCategoriesIDs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios
    .get("/events/countAll")
    .then((response) => {        
      setEventsCount(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
    axios
      .get("/categories")
      .then((response) => {
        setCategories(response.data);      
        setCategoriesIDs(response.data.map((category) => category._id));            
        setIsLoaded(true);        
      })   
      .catch((error) => {
        console.log(error);
      });      
  }, []);

  return (
    <>
      <div className="subpageHeader">
        <h2 className="fw-bold col-lg-8 mx-auto text-start">
          Explore all categories
        </h2>
        <div className="col-lg-8 mx-auto text-end">
          <p>
            There are <strong>{eventsCount}</strong> events waiting for you to join!
          </p>       
        </div>
      </div>
      {isLoaded ? <SingleCard categories={categories} categoriesIDs={categoriesIDs}/> : <LoadingSpinner />}
    </>
  );
}
