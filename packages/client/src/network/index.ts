import { Socket } from './classes';

const { SERVER_ADDRESS } = process.env;
const URL = `wss://${SERVER_ADDRESS}`;
const socket = new Socket(URL);

export default socket;
