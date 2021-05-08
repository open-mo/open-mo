function addChatMessage(message: string) {
  const chatBox = document.getElementById('chat-box');
  const chatHistory = chatBox.getElementsByTagName('textarea').item(0);
  chatHistory.value += `${message}\n`;
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

export {
  addChatMessage,
};
