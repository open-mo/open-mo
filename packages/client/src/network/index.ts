import { io } from 'socket.io-client';

const { SERVER_ADDRESS } = process.env;
const socket = io(`wss://${SERVER_ADDRESS}`);

export default socket;
