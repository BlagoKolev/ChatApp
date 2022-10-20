import { useEffect, useRef } from 'react';

function MessageContainer({ messages }) {

    const messageRef = useRef();

    useEffect(() => {
        if (messageRef && messageRef.current) {
            const { scrollHeight, clientHeight } = messageRef.current;
            messageRef.current.scrollTo({
                left: 0, top: scrollHeight - clientHeight,
                behavior: 'smooth'
            });
        }
    }, [messages])

    return (
        <div ref={messageRef} className="message-container">
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