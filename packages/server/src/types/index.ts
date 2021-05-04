import WebSocket from 'ws';

interface UserWebSocket extends WebSocket {
  id: string;
  inputs: Array<string>;
  processInputs: () => void;
}

interface Dictionary<T> {
  [Key: string]: T;
}

type PacketValue = number | string | Dictionary<PacketValue>;
interface Packet {
  pkt: number,
  data: Dictionary<PacketValue>,
  timestamp?: string;
}

export {
  UserWebSocket,
  Dictionary,
  Packet,
  PacketValue,
};
