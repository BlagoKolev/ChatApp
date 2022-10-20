
function MessageContainer({ messages }) {
    return (
        <div className="message-container">
            {messages.map((msg, index) =>
                <div key={index} className='user-message'>
                    <div className="message bg-primary">{msg.message}</div>
                    <div className="from-user">{msg.user}</div>
                </div>
            )}
        </div>
    )
}

export default MessageContainer;