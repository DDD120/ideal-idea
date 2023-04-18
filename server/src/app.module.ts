import { Module } from '@nestjs/common';
import { RoomGateway } from './room/room.gateway';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  providers: [AppService, RoomGateway],
  controllers: [AppController],
})
export class AppModule {}
