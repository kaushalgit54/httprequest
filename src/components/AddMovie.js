import React, { useRef } from "react";
import classes from './AddMovie.module.css';

const AddMovie = (props)=>{
   const titleRef = useRef('');
   const openingTextRef = useRef("");
   const releaseDateRef = useRef("");

   const submitHandler = (event)=>{
      event.preventDefault();
      //Add validation here
      const movie = {
        title: titleRef.current.value,
        openingText: openingTextRef.current.value,
        releaseDate: releaseDateRef.current.value,
      };
      alert("Successfully added movie to the database")
      props.onAddMovie(movie);
   }



   return(
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" ref={titleRef}/>
      </div>
      <div  className={classes.control}>
       <label htmlFor="opening-text">Opening Text</label>
       <textarea id="opening-text" rows="5" ref={openingTextRef}></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor="date">Release Date</label>
        <input type="text" ref={releaseDateRef}/>
      </div>
      <button>Add Movie</button>
    </form>
   );
};
export default AddMovie;
