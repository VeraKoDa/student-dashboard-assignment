import React from "react"
import data from "./mock_data.json"

export default function userInfo(props) {

const baseUrl = "https://api.dicebear.com/5.x/bottts/svg?seed=" 
const names = ["Baby", "Jack", "Mia", "Bear", "Nala", "Lucky", "Cuddles", "Sam", "Dusty", "Daisy", "Boots", "Peanut"] 

const url = baseUrl + names[Math.floor(Math.random()*names.length)]
const userInfoArray = data[Math.floor(Math.random()*data.length)]


    return (
        <>
        <div className="userdata"> 
         
            <span>
                <img
                src={url}
                alt="avatar" width="150px" />
            </span>

            <span className="userdetails">
                <p>Name: {props.user}</p>
                <p>Last name: {userInfoArray.last_name}  </p>
                <p>E-mail: {userInfoArray.email}</p>
                <p>Start-date: {userInfoArray.startdate}</p>
                <p>End-date: {userInfoArray.enddate}</p>
                </span>
        </div>
        </>
    )
}

