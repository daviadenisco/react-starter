import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';
import context from 'jest-plugin-context';

// Mock local and session storage
const storageMock = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key];
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

global.localStorage = storageMock;
global.sessionStorage = storageMock;

// Add Rspec declarative TDD method for Jest
global.context = context;

// Set the default serializer for Jest to be the from enzyme-to-json
// This produces an easier to read (for humans) serialized format.
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

// Configure enzyme
configure({
  adapter: new Adapter(),
});
