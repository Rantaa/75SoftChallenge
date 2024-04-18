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
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status === 401) {
            alert("Invalid credentials")
        } else {
            updateCallback(userName)
        }
    }

    const handleRegister = async () => {

        // Check if username and password are not empty
        if (!userName.trim() || !password.trim()) {
            alert('Please enter a username and password');
            return;
        }

        const data = {
            userName,
            password
        }

        const url = "http://127.0.0.1:5000/register"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        const response = await fetch(url, options)
        if (response.status === 200) {
            alert("User: "+userName+" successfully created")
        } else {
            if (response.status === 400) {
                alert("User: "+userName+" already exists")
            } else {
                updateCallback(userName)
            }
        }  

        console.log('Register button clicked');
    };

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
        <button type="button" onClick={handleRegister} className="register">Register</button>
    </form>)
}

export default ContactForm