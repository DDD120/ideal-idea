import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { ConnectedSocket, MessageBody } from '@nestjs/websockets/decorators';
import { Server, Socket } from 'socket.io';
import { User, Draw } from './room.entity';

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
    this.server.to(roomId).emit('message', {
      type: 'notice',
      content: `${me.nickname}님이 입장하였습니다.`,
    });

    return me;
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    client.on('disconnecting', () => {
      client.rooms.forEach(async (roomId) => {
        client.leave(roomId);
        const users = await this.getUsers(roomId);
        this.server.to(roomId).emit('set-users', users);
        this.server.to(roomId).emit('message', {
          type: 'notice',
          content: `${client['nickname']}님이 퇴장하였습니다.`,
        });
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

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody()
    {
      roomId,
      content,
      nickname,
    }: { roomId: string; content: string; nickname: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.to(roomId).emit('message', { type: 'user', nickname, content });
  }

  @SubscribeMessage('canvas-ready')
  handleCanvasReady(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.to(roomId).emit('canvas-ready');
  }

  @SubscribeMessage('canvas-state')
  handleCanvasState(
    @MessageBody() { roomId, canvas }: { roomId: string; canvas: string },
  ) {
    this.server.to(roomId).emit('canvas-state', canvas);
  }

  @SubscribeMessage('draw-line')
  handleDrawLine(
    @MessageBody()
    { roomId, ...draw }: { roomId: string; draw: Draw },
    @ConnectedSocket() client: Socket,
  ) {
    client.to(roomId).emit('draw-line', draw);
  }

  @SubscribeMessage('canvas-clear')
  handleCanvasClear(@MessageBody() roomId: string) {
    this.server.to(roomId).emit('canvas-clear');
  }
}
