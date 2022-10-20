import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function Lobby({joinRoom}) {
    const [user, setUser] = useState();
    const [room, setRoom] = useState();

    const join = (e) => {
        e.preventDefault();
        joinRoom(user, room);
    }

    return (
        <Form className='lobby' onSubmit={join}>
            <Form.Group>
                <Form.Control className='join-field' placeholder='name' onChange={e => setUser(e.target.value)} />
                <Form.Control className='join-field' placeholder='room' onChange={e => setRoom(e.target.value)} />
            </Form.Group>
            <Button variant='warning' type='submit' disabled={!user || !room}>Join</Button>
        </Form>
    );
}

export default Lobby;