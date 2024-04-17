import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import axios from 'axios' 
import { useNavigate, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import './Todo.css'

export default function Todo() {

    const [todoall, settodoall] = useState([]) 
    
    const [title, settitle] = useState('') 

    const [completed, setcompleted] = useState(0)


    let handleDelete = (id)=>{ 
        console.log(id) 
        let newarr = todoall.filter(item=>item.id != id) 
        settodoall(newarr)
    } 

    let navigate = useNavigate();

    let handleEdit = (id) => {
      navigate(`../update/${id}`);
      console.log(`${id}`)
     
    };
  
    let handleTitle = (event)=>{
        settitle(event.target.value)  
    } 

    
    let handlestatus = (event)=>{
        setcompleted(event.target.value)  

    } 

    let datapass = (event)=>{
        event.preventDefault();
        console.log(title + completed)
        let temp = {
            "id":todoall.length+1,
            "title":title,
            "completed":completed
        } 
        todoall.push(temp) 
        settodoall([...todoall])

    }



    let dataupdate = (event) => {
      event.preventDefault();
      console.log(title + completed);
      let temp = {
        title: title,
        completed: completed,
      };
    };


    let params = useParams();

   
    useEffect(() => {
    
        axios.get('https://jsonplaceholder.typicode.com/todos').then((response)=>{
                // console.log(response.data) 
                settodoall(response.data)
                settitle(response.data.title);

        })
    }, [params.id])
    
  return (
    <>
    <div className='maindiv' style={{ backgroundImage: "url(/Images/todobg.jpeg)" }}>


    <div className='todolistdiv'>
        <Table responsive="sm" striped="columns" borderless hover variant="dark">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {todoall.map((item)=>(
            <tr>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{(item.completed)?"completed":"incomplete"}</td>
              <td><MdDelete onClick={()=>handleDelete(item.id)}/>&nbsp;&nbsp;
              <MdEdit onClick={() => handleEdit(item.id)}/></td>
            </tr>
            ))}
          </tbody>
        </Table>
      </div>




      <div className='addformdiv'>
        <Form onSubmit={datapass}>
          <p className='addformtitle'> Add Form</p>
          <div class="mb-3">
            <label class="form-label">Title</label>
            <input type="text" class="form-control" id="title" name='title' onChange={handleTitle} value={title} placeholder='Enter Title'/>
          </div>
          <div class="mb-3">
            <label class="form-label">Status</label>
            <select class="form-select"  name='completed' id='completed' onChange={handlestatus} >
              <option selected>Select Completed or Incomplete</option>
              <option value="1">Completed</option>
              <option value="0">Incomplete</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>   
        </Form>
      </div>


      
    </div>
    </>
  )
}
