import { Module } from '@nestjs/common';
import { RoomGateway } from './room/room.gateway';

@Module({
  imports: [],
  providers: [RoomGateway],
})
export class AppModule {}
