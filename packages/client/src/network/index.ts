const { SERVER_ADDRESS } = process.env;
const ws = new WebSocket(`ws://${SERVER_ADDRESS}`);

export default ws;
