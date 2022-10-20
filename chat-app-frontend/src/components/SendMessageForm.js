import { FormControl, InputGroup, Form, Button } from "react-bootstrap";
import { useState } from "react";

function SendMessageForm({ sendMessage }) {
    const [message, setMessage] = useState('');

    return (
        <Form onSubmit={(e) => {
            e.preventDefault(); console.log(message)
            sendMessage(message);
            setMessage('');
        }}>
            <InputGroup className="send-message">
                <FormControl className="send-field" placeholder="Type here..."
                    onChange={msg => setMessage(msg.target.value)}
                    value={message} />
                <Button className="send-btn" variant='primary' type='submit' disabled={!message}>Send</Button>
            </InputGroup>
        </Form>

    )
}

export default SendMessageForm