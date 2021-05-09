import { server } from '..';
import { Dictionary, Position } from '../../types';
import Character from './Character';

class WorldSnapshot {
  users: Dictionary<Character> = {};

  hasUserChanges = false;

  addUser(id: string, user: Character): void {
    this.users[id] = user;
    this.hasUserChanges = true;
  }

  removeUser(id: string): void {
    delete this.users[id];
    server.emit('remove player', id);
    this.hasUserChanges = true;
  }

  sendSnapshot(): void {
    if (this.hasUserChanges) {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      console.log(`${hours}:${minutes}:${seconds}:`, 'has user changes to send');
      server.emit('users snapshot', this.users);
      this.hasUserChanges = false;
    }
  }

  setUserPosition(id: string, position: Position): void {
    this.users[id].setPosition(position);
    this.hasUserChanges = true;
  }
}

export default WorldSnapshot;
