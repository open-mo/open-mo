import loginSetup from './loginSetup';
import { chatSetup } from './chatSetup';
import './handlersSetup';

function setup() {
  loginSetup();
  chatSetup();
}

export default setup;
