import { useState } from "react";

const ContactForm = ({updateCallback}) => {

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            userName,
            password
        }

        console.log("This is the data")
        console.log(data)

        const url = "http://127.0.0.1:5000/login"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status === 401) {
            alert("Unvalid credentials")
        } else if (response.status !== 201) {
            alert("Something went wrong") 
        } else {
            updateCallback(userName)
        }
    }

    return (<form onSubmit={onSubmit}>
        <div>
            <label>Username: </label>
            <input type="input" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)}></input>
        </div>
        <div>
            <label>Password: </label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <button type="submit" className="update">Submit</button>
    </form>)
}

export default ContactForm