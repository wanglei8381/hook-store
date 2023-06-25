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
      this.setState({ name: '王五', age: 20 });
    }, 1000);
  }
}

class CookieStore extends BaseStore {
  name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }

  setName(name: string) {
    this.setState({ name });
  }
}

const cookieStore = new CookieStore('张三');

function A() {
  const user = useStore(UserStore);
  const cookie = useStore(cookieStore);
  return (
    <h2
      onClick={() => {
        user.setColor('blue');
        cookie.setName('China');
      }}
    >
      A: {user.color}
      <span style={{ marginLeft: 10 }}>{cookie.name}</span>
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

function D() {
  const store = useStore(UserStore);
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

function C() {
  console.log('C update');
  return <D />;
}

function E() {
  const store = useStore(() => new UserStore());
  return (
    <h2
      onClick={() => store.setColor(store.color === 'blue' ? 'yellow' : 'blue')}
    >
      E：{store.color}
    </h2>
  );
}
function F() {
  const store = useStore(UserStore);
  return (
    <h2
      onClick={() => store.setColor(store.color === 'blue' ? 'yellow' : 'blue')}
    >
      F：{store.color}
    </h2>
  );
}

function App() {
  return (
    <div>
      <StoreProvider store={UserStore}>
        <StoreProvider store={cookieStore}>
          <A />
          <B />
          <C />
          {Date.now()}
        </StoreProvider>
      </StoreProvider>
      <E />
      <F />
    </div>
  );
}

export default App;
