import React from 'react';

const Progress_bar = ({ bgcolor, progress, height }) => {

  const Parentdiv = {
    height: height,
    width: '100%',
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    overflow: 'hidden'
  }

  const Childdiv = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: bgcolor,
    borderRadius: 10,
    transition: 'width 0.3s ease-in-out'
  }

  const progresstext = {
    padding: 5,
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14
  }

  const percentage = {
    position: 'absolute', // Added position absolute for percentage text
    top: '50%', // Center the percentage text vertically
    left: '50%', // Center the percentage text horizontally
    transform: 'translate(-50%, -50%)' // Center the percentage text both vertically and horizontally
  }

  const Progress_bar = {
    marginBottom: 10
  }

  return (
    <div style={Parentdiv} className="Progress_bar">
      <div style={Childdiv}>
        <span style={percentage}>{`${progress}%`}</span> {/* Added percentage text */}
      </div>
      <span style={progresstext}>{`${progress}%`}</span>
    </div>
  )
}

export default Progress_bar;
