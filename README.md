# HookStore
A light data management tool for react framework.

English | [简体中文](https://github.com/wanglei8381/hook-store/blob/main/README.zh-CN.md)

## Defining the store

Now let's write a counter store

```typescript
import { BaseStore } from '@ecom/hook-store';

class CountStore extends BaseStore {
  count = 0;

  add(num: number) {
    this.setState({ count: num });
  }

  reset() {
    this.setState({ count: 0 });
  }

  times(num: number) {
    this.setState({ count: this.count * num  });
  }
}

```

## Using the store

```typescript
import { useStore } from '@ecom/hook-store';
const Component = () => {
  const store = useStore(CountStore);
  return (
    <div>
      <div>{store.count}</div>
      <button onClick={() => store.add(1)}>add 1</button>
      <button onClick={() => store.times(2)}>multi 2</button>
      <button onClick={() => store.reset()}>reset</button>
    </div>
  );
};
```

## Scope of the store

When we need to extend the scope of HookStore, use the global store.

```typescript
import { StoreProvider, useStore } from '@ecom/hook-store';
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

const Root = () => {
  return (
    <StoreProvider store={CountStore}>
      <Child />
    </StoreProvider>
  );
};

```