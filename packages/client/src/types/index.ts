interface UserWebSocket extends WebSocket {
  id: number;
}

interface Dictionary<T> {
  [Key: string]: T;
}

type PacketValue = number | string | Dictionary<PacketValue>;

interface Packet {
  pkt: number,
  data: Dictionary<PacketValue>
}

export {
  UserWebSocket,
  Dictionary,
  Packet,
  PacketValue,
};
