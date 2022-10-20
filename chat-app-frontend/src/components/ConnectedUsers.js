
function ConnectedUsers({ users }) {
    return (
        <div className="user-list">
            <h4>Connected Users</h4>
            {users.map((user, id) => <h6 key={id}>{user}</h6>)}
        </div>
    )
}

export default ConnectedUsers;