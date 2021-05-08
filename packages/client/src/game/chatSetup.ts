import socket from '../network';
import user from '../network/userInstances';

function toggleChat(on: boolean) {
  const chatInput = <HTMLInputElement>document.querySelector('.chat-input');
  const canvas = <HTMLCanvasElement>document.querySelector('canvas');
  if (on) {
    chatInput.focus();
  } else {
    canvas.focus();
  }
}

function chatSubmit() {
  const chatBox = document.getElementById('chat-box');
  const chatInput: HTMLInputElement = chatBox.querySelector('.chat-input');
  const chatHistory = chatBox.querySelector('.chat-history');
  if (chatInput && chatHistory && chatInput.value.length > 0) {
    const message = chatInput.value;
    chatInput.value = '';
    chatInput.focus({
      preventScroll: true,
    });
    chatHistory.scrollTop = chatHistory.scrollHeight;
    socket.emit('chat message', `${user.nickname}: ${message}`);
  }
}

function chatSetup() {
  const chatBox = document.getElementById('chat-box');
  chatBox?.addEventListener('submit', (e: Event) => {
    chatSubmit();
    e.preventDefault();
  });
}

export { chatSetup, toggleChat, chatSubmit };
