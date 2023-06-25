import './App.css';
import { BaseStore, StoreProvider, useStore } from '../../src';

class CountStore extends BaseStore {
  count = 0;

  add(num: number) {
    this.setState({ count: this.count + num });
  }

  reset() {
    this.setState({ count: 0 });
  }

  times(num: number) {
    this.setState({ count: this.count * num });
  }
}

// const countStore = new CountStore();

const Child = () => {
  const store = useStore(CountStore);

  return (
    <div>
      <div>{store.count}</div>
      <button onClick={() => store.add(1)}>加1</button>
      <button onClick={() => store.times(2)}>乘2</button>
      <button onClick={() => store.reset()}>复位</button>
    </div>
  );
};

const Child2 = () => {
  const store = useStore(CountStore);

  return (
    <div>
      <div>{store.count}</div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <StoreProvider store={CountStore}>
        <Child />
        <Child2 />
      </StoreProvider>
    </div>
  );
}

export default App;
