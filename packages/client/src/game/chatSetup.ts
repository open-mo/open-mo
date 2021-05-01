import socket from '../network';
import { Dictionary, PacketValue } from '../types';
import { composeMessage } from '../network/dataHandler';

function chatSetup() {
  const chatBox = document.getElementById('chat-box');
  chatBox?.addEventListener('submit', (e: Event) => {
    const chatInput = chatBox.getElementsByTagName('input').item(0);
    const chatHistory = chatBox.getElementsByTagName('textarea').item(0);
    if (chatInput && chatHistory && chatInput.value.length > 0) {
      const message = chatInput.value;
      chatInput.value = '';
      chatInput.focus({
        preventScroll: true,
      });
      chatHistory.scrollTop = chatHistory.scrollHeight;
      const data: Dictionary<PacketValue> = {
        sender: 'mock-person',
        message,
      };
      const packet = composeMessage(0, data);
      socket.send(packet);
    }
    e.preventDefault();
  });
}

export default chatSetup;
