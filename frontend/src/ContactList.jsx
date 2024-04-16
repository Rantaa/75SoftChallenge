import React, { useState, useEffect } from "react"

const ContactList = ({ dayColors, updateDay, updateCallback }) => {

    const today = new Date().getTime();
    const startDay = new Date('April 10, 2024 00:00:00').getTime();
    const msDay = 24 * 60 * 60 * 1000; // milliseconds per day
    const dayDiff = Math.floor((today - startDay) / msDay);
  
    console.log(dayDiff)

    return <div>
        <h1 id="level-title">75 soft challenge</h1>

        {[...Array(10)].map((e, i) => <div key={i}className="week"> <h3>Week {i + 1}</h3> {[...Array(7)].map((e, j) => <div type="button" key={j} id={i * 7 + j + 1} className={"btn " + `${dayColors[i * 7 + j]}`} onClick={dayDiff >= i * 7 + j ? () => updateDay(i * 7 + j + 1) : undefined}>Day {i * 7 + j + 1}</div>)}</div>)}


        <div className="last-week">
        <h3>Week 11</h3>{[...Array(5)].map((e, i) => <div type="button" key={70 + i} id={70 + i + 1} className={"btn " + `${dayColors[70 + i]}`} onClick={dayDiff > 70 + i ? () => updateDay(70 + i + 1) : undefined}>Day {70 + i + 1}</div>)}
        </div>


    </div>
}

export default ContactList