import WebSocket from 'ws';

interface UserWebSocket extends WebSocket {
  id: number;
}

interface Dictionary<T> {
  [Key: string]: T;
}

interface Packet {
  pkt: number,
  data: Dictionary<PacketValue>
};

type PacketValue = number | string | Dictionary<PacketValue>;

export {
  UserWebSocket,
  Dictionary,
  Packet,
  PacketValue,
};
