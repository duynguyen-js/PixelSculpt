import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { preview } from '../../assets'
import { FormField } from '../createPost/formField/FormField'
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: ''
  })
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false)

  return (
    <section>
      <h1>Create</h1>
      <p>Create your own imaginative and visually stunning images from DALL-E AI and share them with the community</p>
    </section>
  )
}

export default CreatePost