import React from 'react'
import { download } from "../../assets/index";
import { downloadImage } from "../../utils/index";
import './card.scss'

const Card = ({_id, name, prompt, photo}) => {
  return (
    <div className="photo-container">
      <img src={photo} alt={prompt} />
      <div className="hover-container">
        <p>{prompt}</p>
        <div className="bottom-container">
          <div className="name-container">
            <div>{name[0].toUpperCase()}</div>
            <p>{name}</p>
          </div>
          <button type="button" onClick={() => downloadImage(_id, photo)}>
            <img src={download} alt="download" />
          </button>
        </div>
      </div>
    </div>
  );

}

export default Card