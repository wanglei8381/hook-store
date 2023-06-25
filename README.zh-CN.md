# HookStore
HookStore 是一个轻量级的 React 状态管理 hooks 库

## store 定义
现在我们来编写一个计数器 store

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

## store 的使用
```typescript
import { useStore } from '@ecom/hook-store';
const Component = () => {
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
```

## store 的作用域
当我们需要扩展 HookStore 的作用域，使用全局 store。
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