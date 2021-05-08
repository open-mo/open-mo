import socket from '../network';
import user from '../network/userInstances';

function handleLogin(event: Event) {
  // TODO: Proper login. at the moment it's just to place a nickname
  const loginContainer = <HTMLDivElement>document.querySelector('.login-container');
  const gameContainer = <HTMLDivElement>document.querySelector('.game-container');
  const nicknameInput = <HTMLInputElement>document.querySelector('.nick-input');
  const canvas = <HTMLCanvasElement>document.querySelector('canvas');

  if (nicknameInput && nicknameInput.value.length > 0) {
    const nickname: string = nicknameInput.value;
    loginContainer.style.display = 'none';
    gameContainer.style.display = 'block';
    canvas.focus();

    socket.auth = { nickname };
    socket.connect();
    user.setNickname(nickname);
    user.setID(socket.id);
  }
  event.preventDefault();
}

function loginSetup() {
  const submitButton = document.getElementById('login-box');
  submitButton?.addEventListener('submit', handleLogin);
}

export default loginSetup;
