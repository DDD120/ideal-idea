import { User } from './../types/room';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { ConnectedSocket, MessageBody } from '@nestjs/websockets/decorators';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class RoomGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('join-room')
  async handleJoinRoom(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: Socket,
  ) {
    const userCount = this.server.sockets.adapter.rooms.get(roomId)?.size;
    if (userCount >= 4) {
      client.emit('full-room');
      return;
    }

    const users = await this.getUsers(roomId);
    client.join(roomId);
    client['nickname'] = this.setNickname(users);
    const me: User = {
      id: client.id,
      nickname: client['nickname'],
    };

    this.server.to(roomId).emit('set-users', [...users, me]);

    return me;
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    client.on('disconnecting', () => {
      client.rooms.forEach(async (roomId) => {
        client.leave(roomId);
        const users = await this.getUsers(roomId);
        this.server.to(roomId).emit('set-users', users);
      });
    });
  }

  async getUsers(roomId: string) {
    const users: User[] = await (
      await this.server.in(roomId).fetchSockets()
    ).map((user) => {
      return {
        id: user.id,
        nickname: user['nickname'],
      };
    });

    console.log('');
    return users;
  }

  setNickname(users: User[]) {
    const NICKNAME = ['토끼', '고양이', '강아지', '여우'];

    if (!users) {
      return NICKNAME[0];
    }

    const hasNickname = users.map((user) => user.nickname);
    const nickname = NICKNAME.filter(
      (item) => !hasNickname.some((n) => n === item),
    )[0];

    return nickname;
  }
}
