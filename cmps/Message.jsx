function Message({ text, sender, timestamp, user }) {
  const avatar = sender === 'ai' ? '🤖' : user?.name?.charAt(0).toUpperCase() || 'U'

  return (
    <div className={`message ${sender}`}>
      <div className="message-avatar">{avatar}</div>
      <div className="message-content">
        <div>{text}</div>
        <div className="message-timestamp">{timestamp}</div>
      </div>
    </div>
  )
}

export default Message