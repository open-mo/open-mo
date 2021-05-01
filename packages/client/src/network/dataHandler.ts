import { ClientPackets } from './packetTypes';
import { Packet, PacketValue, Dictionary } from '../types';

function parseMessage(data: string): Packet {
  return JSON.parse(data);
}

function addChatMessage(message: Packet) {
  const { data } = message;
  const { sender, message: chatMessage } = data;
  const parsedMessage = `${sender}: ${chatMessage}\n`;
  const chatBox = document.getElementById('chat-box');
  const chatHistory = chatBox.getElementsByTagName('textarea').item(0);
  chatHistory.scrollIntoView();
  chatHistory.value += parsedMessage;
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

const MESSAGE_HANDLER: Dictionary<{(data: Packet): void;}> = {
  [ClientPackets.ChatMessage]: addChatMessage,
};

function handleMessageData(unresolvedMessage: string) {
  const message: Packet = parseMessage(unresolvedMessage);
  const { pkt: packetID } = message;
  MESSAGE_HANDLER[packetID](message);
}

function composeMessage(pkt: number, data: Dictionary<PacketValue>): string {
  return JSON.stringify({
    pkt,
    data,
  });
}

export { handleMessageData, composeMessage };
