import { useState, useEffect, useCallback } from 'react'
import ContactList from './ContactList'
import './App.css'
import ContactForm from './ContactForm'


function App() {
  const [contacts, setContacts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState(0)
  const [currentUserDay, setCurrentUserDay] = useState({})
  const [scorePerDay, setScorePerDay] = useState([])
  const [dayColors, setDayColors] = useState([])

  console.log("This is currentContact")
  console.log(currentContact)

  const fetchUserDay = async (day) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/get_user_day/" + `${day}`)
      const data = await response.json()
      console.log("This is data from fetchUserDay")
      console.log(data)
      setCurrentUserDay(data.user_day)
      console.log(data.user_day)
    } catch(error) {
      alert(error)
    }
  }

  useEffect(() => {
    fetchScorePerDay()
  }, [])

  const fetchScorePerDay = async () => {
    const response = await fetch("http://127.0.0.1:5000/get_score_per_day")
    const data = await response.json()
    console.log("This is scorePerDay")
    console.log(data.score_per_day)
    setScorePerDay(data.score_per_day)

  }
    
  console.log("This is dayColors")
  console.log(dayColors)

  const fetchDayColors = useCallback(() => {
    const scoreColors = [];
    const today = new Date().getTime();
    const startDay = new Date('April 10, 2024 00:00:00').getTime();
    const msDay = 24 * 60 * 60 * 1000; // milliseconds per day
    const dayDiff = Math.floor((today - startDay) / msDay);
  
    console.log("Daydiff")
    console.log(dayDiff)
    scorePerDay.forEach((e, i) => {
      if (i > dayDiff) {
        scoreColors.push("grey");
      } else {
        switch (e) {
          case 0:
            scoreColors.push("red");
            break;
          case 1:
          case 2:
            scoreColors.push("orange");
            break;
          case 3:
          case 4:
            scoreColors.push("yellow");
            break;
          default:
            scoreColors.push("green");
        }
      }
    });
    setDayColors(scoreColors);
  }, [scorePerDay]);
  
  useEffect(() => {
    fetchDayColors();
  }, [fetchDayColors]);

  console.log("This is dayColors")
  console.log(dayColors)

  const closeModal = async () => {
    setIsModalOpen(false)
    setCurrentContact(0)
    await fetchScorePerDay()
    fetchDayColors()
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  const openEditModal = async (contact) => {
    if (isModalOpen) return
    setCurrentContact(contact)
    await fetchUserDay(contact)
    setIsModalOpen(true)
  }

  const onUpdate = () => {
    closeModal()
  }

  return <>
    <ContactList contacts={contacts} dayColors={dayColors} updateDay={openEditModal} updateCallback={onUpdate} />
    <button onClick={openCreateModal}>Create New Contact</button>
    {isModalOpen && <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <ContactForm currentDay={currentContact} existingContact={currentUserDay} updateCallback={onUpdate} />
      </div>
    </div>}
  </>
}

export default App
