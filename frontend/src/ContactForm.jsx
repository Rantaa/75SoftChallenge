import { useState } from "react";

const ContactForm = ({currentDay, existingContact = {}, updateCallback}) => {
    const [properMeals, setProperMeals] = useState(existingContact.properMeals || false)
    const [exercised, setExercised] = useState(existingContact.exercised || false)
    const [waterCount, setWaterCount] = useState(existingContact.waterCount || false)
    const [stepCount, setStepCount] = useState(existingContact.stepCount || false)
    const [read, setRead] = useState(existingContact.read || false)
    const user = "VovLo"

    const dayNumber = currentDay

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            user,
            dayNumber,
            properMeals,
            exercised,
            waterCount,
            stepCount,
            read
        }

        console.log("This is the data")
        console.log(data)

        const url = `http://127.0.0.1:5000/update_user_day/${dayNumber}`
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            updateCallback()
        }
    }

    return (<form onSubmit={onSubmit}>
        <div>
            <label><input type="checkbox" id="properMeals" checked={properMeals} onChange={(e) => setProperMeals(e.target.checked)}></input>Eat properly</label>
        </div>
        <div>
            <label><input type="checkbox" id="exercised" checked={exercised} onChange={(e) => setExercised(e.target.checked)}></input>Exercise for 45 mins:</label>
        </div>
        <div>
            <label><input type="checkbox" id="waterCount" checked={waterCount} onChange={(e) => setWaterCount(e.target.checked)}></input>Drink 2 litres of water:</label>
        </div>
        <div>
            <label><input type="checkbox" id="stepCount" checked={stepCount} onChange={(e) => setStepCount(e.target.checked)}></input>10K steps:</label>
        </div>
        <div>
            <label><input type="checkbox" id="read" checked={read} onChange={(e) => setRead(e.target.checked)}></input>Read 10 pages:</label>
        </div>
        <button type="submit" className="update">Update</button>
    </form>)
}

export default ContactForm