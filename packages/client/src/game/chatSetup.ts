import socket from '../network';

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
      socket.emit('chat message', `lucas: ${message}`);
    }
    e.preventDefault();
  });
}

export default chatSetup;
