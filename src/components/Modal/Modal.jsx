import {firestore} from '../../firebase-config';
import { useState } from 'react';
import './Modal.css';

const Modal = () => {
  const [studentName, setStudentName] = useState("")
  const [joiningDate, setJoiningDate]= useState("")

  const handleRegisteration = (event) => {
    event.preventDefault()
    const newStudent = {
      studentName,
      joiningDate
    }
    setJoiningDate("")
    setStudentName("")
    firestore.collection("student")
      .add(newStudent)
      .then(() => console.log("Student Registered"))
      .then(() => console.log("Student not registered"))
  }

  return ( 
    <div className="form-container">
      <form className="form">
        <input type="text" placeholder="Enter Name" value={studentName} onChange={(event) => setStudentName(event.target.value)}/>
        <input type="date" value={joiningDate} onChange={(event) => setJoiningDate(event.target.value)}/>
        <button onClick={handleRegisteration}>Register</button>
      </form>
    </div>
  )
}

export default Modal