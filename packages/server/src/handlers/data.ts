import { ClientPackets } from '../enums/packetTypes';
import { UserWebSocket, Dictionary, Packet } from '../types';
import { broadcast } from './messageSender';

const MESSAGE_HANDLER: Dictionary<{(socket: UserWebSocket, data: Packet): void;}> = {
  [ClientPackets.ChatMessage]: chatMessage,
};

function parseMessage(data: string): Packet {
  return JSON.parse(data);
}

function handleMessageData(socket: UserWebSocket, unresolvedMessage: string) {
  const message: Packet = parseMessage(unresolvedMessage);
  const { pkt: packetID } = message;
  MESSAGE_HANDLER[packetID](socket, message);
}

function composeMessage(packetID: number, data: JSON): string {
  return JSON.stringify(data);
}

function chatMessage(_socket: UserWebSocket, data: Packet) {
  broadcast(data);
}

export default handleMessageData;
