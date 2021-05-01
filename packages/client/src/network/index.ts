const { SERVER_ADDRESS } = process.env;
const ws = new WebSocket(`wss://${SERVER_ADDRESS}`);

export default ws;
