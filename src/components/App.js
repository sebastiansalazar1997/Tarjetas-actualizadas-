import React from 'react';
import { useState } from 'react';

import '../App.css'
import axios from 'axios';

const testData = [
  { name: "Antony Santillan", avatar_url: "https://avatars.githubusercontent.com/u/58825544?v=4", company: "♥" },
  { name: "Fernando Rivera", avatar_url: "https://avatars.githubusercontent.com/u/47802477?v=4", company: "♥" },
  { name: "Erick Damian", avatar_url: "https://avatars.githubusercontent.com/u/67754832?v=4", company: " ♥" },
  { name: "Daniel Rivas", avatar_url: "https://avatars.githubusercontent.com/u/52222377?v=4", company: "♥" },

];

const Listas = (props) => (
  <div>
    {props.profiles.map(profile => <Tarjetas key={profile.name} {...profile} />)}

    {props.profiles2.map(profile2 => <Tarjetas key={profile2.name} {...profile2} />)}
  </div>
);

const Tarjetas = (props) => {

  return (
    <div className="github-profile">
      <img src={props.avatar_url} />
      <div className="info">
        <div className="name">{props.name}</div>
        <div className="company">{props.company}</div>
      </div>

    </div>
  )
}
export const Formulario = (props) => {

  const [userName, setUserName] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const resp = await axios.get(`https://api.github.com/users/${userName}`)

    props.onSubmit(resp.data)
    setUserName("")

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="usuario de github"
          value={userName}
          onChange={e => setUserName(e.target.value)} />
        <button>Añadir</button>
      </form>
    </div>
  )
}

export const App = () => {

  const [profiles] = useState(testData)

  const [profiles2, setProfiles2] = useState([])

  const addNewProfile = (profileData) => {
    setProfiles2(
      [...profiles2, profileData]
    )
  }

  return (
    <div>
      <Formulario onSubmit={addNewProfile} />

      <Listas profiles={profiles}

        profiles2={profiles2}
      ></Listas>

    </div>

  )
}
