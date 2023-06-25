import { BaseStore, useStore, StoreProvider } from '../../src';

class UserStore extends BaseStore {
  color = 'red';

  name?: string;
  age?: number;

  setColor(newColor: string) {
    this.setState({ color: newColor });
  }

  fetchUser() {
    setTimeout(() => {
      this.setState({ name: '王五', age: 20, color: 'green' });
    }, 100);
  }
}

function A() {
  const user = useStore(UserStore);
  return (
    <h2
      onClick={() => {
        user.setColor('blue');
      }}
    >
      A: {user.color}
    </h2>
  );
}

function B() {
  const store = useStore(UserStore);
  return (
    <h2
      onClick={() => {
        store.setColor('green');
      }}
    >
      B: {store.color}
    </h2>
  );
}

function C() {
  const store = useStore(UserStore);
  return (
    <>
      <h2>
        C: {store.color}
        {store.name}
        {store.age}
      </h2>
      <D />
    </>
  );
}

function D() {
  const store = useStore(UserStore);
  console.log('D update');
  return (
    <h2
      onClick={() => {
        store.fetchUser();
      }}
    >
      D: {store.color}
      {store.name}
      {store.age}
    </h2>
  );
}

function App() {
  return (
    <div>
      <StoreProvider store={UserStore}>
        <A />
        <B />
        <C />
      </StoreProvider>
    </div>
  );
}

export default App;
