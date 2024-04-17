import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import { useParams } from 'react-router-dom';
import axios from 'axios' 

export default function Update() {


    const [title, settitle] = useState("");
    const [completed, setcompleted] = useState("");

    
    let dataupdate = (event) => {
        event.preventDefault();
        console.log(title + completed);
        let temp = {
          
          title: title,
          completed: completed,
        };
      };

      let params = useParams();

      let handleTitle = (event) => {
        settitle(event.target.value);
      };
      let handlestatus = (event) => {
        setcompleted(event.target.value);
      };
  
   
      useEffect(() => {
        console.log(params.id);
        axios
          .get(`https://jsonplaceholder.typicode.com/todos/${params.id}`)
          .then((response) => {
            // console.log(response.data)
            console.log(response.data);
            settitle(response.data.title);
          });
      }, []);

     
  return (
   <>
   <div className='addformdiv'>
        <Form onSubmit={dataupdate}>
          <p className='addformtitle'> Update Form</p>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Title</label>
            <input type="text" class="form-control" id="title" name='title' onChange={handleTitle} value={title} placeholder='Enter Title'/>
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Status</label>
            <select class="form-select" aria-label="Default select example" name='completed' id='completed' onChange={handlestatus} >
              <option selected>Select Completed or Incomplete</option>
              <option value="1">Completed</option>
              <option value="0">Incomplete</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>   
        </Form>
      </div>
   
   </>
  )
}
