import { useState, useEffect, useCallback } from 'react'
import ContactList from './ContactList'
import './App.css'
import ContactForm from './ContactForm'
import LoginForm from './LoginForm'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentDay, setcurrentDay] = useState(0)
  const [currentUser, setCurrentUser] = useState("")
  const [currentUserDay, setCurrentUserDay] = useState({})
  const [scorePerDay, setScorePerDay] = useState([])
  const [dayColors, setDayColors] = useState([])

  console.log("This is currentDay")
  console.log(currentDay)

  const fetchUserDay = async (day) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/get_user_day/" + `${day}`, {
        method: "GET",
        credentials: "include"
      })
      const data = await response.json()
      console.log("This is data from fetchUserDay")
      console.log(data)
      setCurrentUserDay(data.user_day)
      console.log(data.user_day)
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    fetchScorePerDay()
  }, [])

  const fetchScorePerDay = async () => {
    const response = await fetch("http://127.0.0.1:5000/get_score_per_day", {
      method: "GET",
      credentials: "include"
    })
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
    setcurrentDay(0)
    await fetchScorePerDay()
    fetchDayColors()
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  const openEditModal = async (day) => {
    if (isModalOpen) return
    setcurrentDay(day)
    await fetchUserDay(day)
    setIsModalOpen(true)
  }

  const onUpdate = () => {
    closeModal()
  }

  const onLogin = async (user) => {
    setIsLoggedIn(true)
    setCurrentUser(user)
    setcurrentDay(0)
    await fetchScorePerDay()
    fetchDayColors()
  }

  const logoutUser = async () => {
    await fetch("http://127.0.0.1:5000/logout", {method: "POST", credentials: "include"})
    setCurrentUser("")
    setIsLoggedIn(false)
  }

  return <>
    {!isLoggedIn && <div className="login-modal">
      <div className="login-modal-content">
        <LoginForm updateCallback={onLogin} />
      </div>
    </div>}
    <div className='logout-div'><button className='logout-button' onClick={logoutUser}>Logout</button></div>
    <ContactList dayColors={dayColors} updateDay={openEditModal} updateCallback={onUpdate} />
    {isModalOpen && <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <ContactForm currentDay={currentDay} currentUserDay={currentUserDay} updateCallback={onUpdate} />
      </div>
    </div>}
  </>
}

export default App
