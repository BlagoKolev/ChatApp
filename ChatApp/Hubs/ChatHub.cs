using Microsoft.AspNetCore.SignalR;
using System.Linq;

namespace ChatApp.Hubs
{
    public class ChatHub : Hub
    {
        private readonly string bot;
        private readonly IDictionary<string, UserConnection> _connections;
        public ChatHub(IDictionary<string, UserConnection> connections)
        {
            this.bot = "Chat-Bot";
            this._connections = connections;
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            if (this._connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                this._connections.Remove(Context.ConnectionId);
                Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", this.bot, $"{userConnection.User} has left the {userConnection.Room}.");

                SendConectedUsers(userConnection.Room);
            }

            return base.OnDisconnectedAsync(exception);
        }

        public async Task JoinRoom(UserConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);

            this._connections[Context.ConnectionId] = userConnection;

            await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", this.bot, $"{userConnection.User} has joined {userConnection.Room}.");

            await SendConectedUsers(userConnection.Room);
        }

        public async Task SendMessage(string message)
        {
            if (this._connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                await Clients.Group(userConnection.Room)
                    .SendAsync("ReceiveMessage", userConnection.User, message);
            }
        }

        public Task SendConectedUsers(string room)
        {
            var users = this._connections.Values
                .Where(c => c.Room == room)
                .Select(c => c.User)
                .ToArray();

            return Clients.Group(room).SendAsync("UsersInRoom", users);
        }
    }
}
