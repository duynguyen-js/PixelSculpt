import React from 'react'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'
import './loadingSpinner.scss'
const LoadingSpinner = ({loading}) => {
  return (
    <div className="loading">
      <ClimbingBoxLoader
        color="black"
        loading={loading}
        size={15}
        aria-label="Loading Spinner"
      />
      <p>Just a few more seconds...</p>
    </div>
  )
}

export default LoadingSpinner