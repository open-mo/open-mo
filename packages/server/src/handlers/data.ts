import { ClientPackets } from '../enums/packetTypes';
import { UserWebSocket, Dictionary, Packet } from '../types';
import { broadcast } from './messageSender';

function parseMessage(data: string): Packet {
  return JSON.parse(data);
}

// function composeMessage(packetID: number, data: JSON): string {
//   return JSON.stringify(data);
// }

function chatMessage(_socket: UserWebSocket, data: Packet) {
  broadcast(data);
}

const MESSAGE_HANDLER: Dictionary<{(socket: UserWebSocket, _data: Packet): void;}> = {
  [ClientPackets.ChatMessage]: chatMessage,
};

function handleMessageData(socket: UserWebSocket, unresolvedMessage: string): void {
  const message: Packet = parseMessage(unresolvedMessage);
  const { pkt: packetID } = message;
  MESSAGE_HANDLER[packetID](socket, message);
}

export default handleMessageData;
