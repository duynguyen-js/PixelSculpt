import React from 'react'
import Card from '../../../components/card/Card'
import './renderCards.scss'


const RenderCards = ({ data, title }) => {
  if (data?.length > 0)  {
    return data.map((post) => (
      <div key={post._id} className='photo-grid'>
        <Card {...post} />
      </div>
    ));
  }
}

export default RenderCards