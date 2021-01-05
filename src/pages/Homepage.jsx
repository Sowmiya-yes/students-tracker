import { useState } from 'react';
import {signOut, firestore} from '../firebase-config';
import Modal from '../components/Modal/Modal';
import './Homepage-Styles.css';

const Homepage = ({displayName}) => {
  const isAdmin = true
  const [openModal, setOpenModal] = useState(false)
  const [students, setStudents] = useState([])
  
  function fetchStudents() {
      firestore.collection("student")
        .get()
        .then((querySnapshot) => {
          const studArr = []
          querySnapshot.forEach((doc) => {
              let studentData = doc.data()
              studArr.push(studentData)
          });
          setStudents([...studArr])
        })
        .catch((error) => {
          console.log(error)
        })
  }

  return ( 
    <div className="homepage">
      <h2>Hello, {displayName}</h2>
      {
        isAdmin ?
          openModal ? 
            <Modal/>
        :  (
            <>
              <button onClick={() => setOpenModal(true)} className="btn">Register Student</button>
              <button onClick={fetchStudents} className="btn">View Students</button>
              <button onClick={signOut} className="btn">Sign Out</button>
            </>
          ) :
          <button onClick={signOut} className="btn">Sign Out</button>
      }
      { 
        students && students.length > 0 ? 
        students.map(s => <li>{s.studentName}</li>)
        : null
      }
    </div>
  )
}

export default Homepage