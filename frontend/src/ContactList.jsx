import React, { useState, useEffect } from "react"

const ContactList = ({ contacts, dayColors, updateDay, updateCallback }) => {

    return <div>
        <h1 id="level-title">75 soft challenge</h1>

        {[...Array(10)].map((e, i) => <div key={i}className="week"> <h3>Week {i + 1}</h3> {[...Array(7)].map((e, j) => <div type="button" key={j} id={i * 7 + j + 1} className={"btn " + `${dayColors[i * 7 + j]}`} onClick={() => updateDay(i * 7 + j + 1)}>Day {i * 7 + j + 1}</div>)}</div>)}


        <div className="last-week">
        <h3>Week 11</h3>{[...Array(5)].map((e, i) => <div type="button" key={70 + i} id={70 + i + 1} className={"btn " + `${dayColors[70 + i]}`} onClick={() => updateDay(70 + i + 1)}>Day {70 + i + 1}</div>)}
        </div>


    </div>
}

export default ContactList