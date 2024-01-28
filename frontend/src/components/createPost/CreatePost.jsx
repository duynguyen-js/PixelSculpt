import React from 'react'
import './createPost.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { preview } from '../../assets'
import FormField from './formField/FormField'
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { getRandomPrompt } from '../../utils/index'
import LoadingSpinner from '../loadingSpinner/LoadingSpinner'

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: ''
  })
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false)
  const [prompt, setPrompt] = useState(getRandomPrompt())

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(form.prompt && form.prompt) {
      setLoading(true);
      
      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',

          },
          body: JSON.stringify(form)
        })

        console.log(await response.text())
        navigate('/')
      } catch(error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    } else {
      alert('Please fill in all required fields before hitting generate')
    }
  }

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({...form, prompt: randomPrompt})
  }

  const generateImg = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        setLoading(true)
        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt })
        })

        const data = await response.json()
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}`})
      } catch(error) {
          alert(error);
        } finally {
          setGeneratingImg(false);
          setLoading(false)
        }
    } else {
      alert('Please enter a prompt')
    }
  }
  return (
    <section>
      <div className="text-container">
        <h1>Create</h1>
        <p>
          Create your own imaginative and visually stunning images from DALL-E
          AI and share them with the community
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="Enter your name..."
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder={prompt}
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="image-container">
            {form.photo ? (
              <img src={form.photo} alt={form.photo} className="form-img" />
            ) : (
              <img
                src={preview}
                alt="preview image"
                className="form-img preview-img"
              />
            )}

            {generatingImg && (
              <div className="loading-img">
                <LoadingSpinner loading={loading} />
              </div>
            )}
          </div>

          <div className='button-container'>
              <button
                className='generate btn'
                type='button'
                onClick={generateImg}
              >
                {generatingImg ? 'Generating...' : 'Generate'}
              </button>
          </div>
        </div>
        <div>
          <p>One you have created the image you want, you can share it with others in the community</p>
          <button
            className='share btn'
            type='submit'

          >
          {loading ? "Sharing..." : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreatePost