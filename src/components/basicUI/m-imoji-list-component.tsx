import React from 'react'

const MImojiListComponent:React.FC = () => {
  return (
    <div className="card-emojis">
      <div className="emoji-wrapper">
        <div className="emojis">
          {Array(2) 
            .fill([
              "😄", "😁", "😆", "😂", 
              "😍", "🥰", "🤩", "😘",
              "😍", "🥰", "🤩", "😘",
              "😍", "🥰", "🤩", "😘",
            ])
            .flat()
            .map((emoji, index) => (
              <button className="button-emoji" key={index}>{emoji}</button>
            ))}
        </div>
      </div>
    </div>
  )
}

export default MImojiListComponent