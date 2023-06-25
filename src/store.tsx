import React, { useContext, useState, useMemo, useEffect } from 'react';

export type InstanceType<T> = T extends abstract new (...args: any) => infer R ? R : never;

export class BaseStore {
  _update?: (params: any) => void;

  static _current?: BaseStore;

  static _isBaseStore = true;

  StoreContext = React.createContext({
    store: this as BaseStore,
    _default: true,
  });

  setState<K extends keyof this>(state?: { [k in K]: this[k] }) {
    if (state) {
      Object.assign(this, state);
    }
    this._update?.({});
  }
}

type BaseStoreCls = typeof BaseStore;

/**
 *
 * @param store 数据源，不追踪其变化，在首次初始化就需要赋值
 *
 * @example
 *
 * <StoreProvider store={UserStore}></StoreProvider>
 *
 * 或者
 *
 * const userStore = new UserStore();
 *
 * <StoreProvider store={userStore}></StoreProvider>
 *
 * @returns
 */
export function StoreProvider<T extends BaseStore | Function>({
  store,
  children,
}: {
  store: T | (() => T);
  children: React.ReactNode;
}) {
  const [_, update] = useState({});

  const finalStore = useMemo<BaseStore>(() => {
    let _store: BaseStore;
    if (store instanceof BaseStore) {
      _store = store;
    } else if ((store as any)._isBaseStore) {
      _store = new (store as any)();
      (_store.constructor as BaseStoreCls)._current = _store;
    } else {
      _store = store();
    }

    _store._update = update;
    return _store;
  }, [store]);

  const { StoreContext } = finalStore;

  useEffect(() => {
    return () => {
      (finalStore.constructor as BaseStoreCls)._current = undefined;
    };
  }, [finalStore]);

  return <StoreContext.Provider value={{ store: finalStore, _default: false }}>{children}</StoreContext.Provider>;
}

/**
 *
 * @param baseStore 数据源，不追踪其变化，在首次初始化就需要赋值
 * @example
 *
 * useStore(UserStore)
 *
 * 或者
 *
 * useStore(() => new UserStore())
 *
 * 或者
 *
 * const userStore = new UserStore();
 *
 * useStore(userStore)
 *
 * @returns
 */
export function useStore<T extends BaseStore | Function>(baseStore: T | (() => T)) {
  const [_, update] = useState({});

  const tmpStore = useMemo<BaseStore>(() => {
    let _store: BaseStore;
    if (baseStore instanceof BaseStore) {
      _store = baseStore;
    } else if ((baseStore as any)._isBaseStore) {
      const BS = baseStore as BaseStoreCls;
      _store = BS._current ?? new BS();
    } else {
      _store = baseStore();
    }
    return _store;
  }, [baseStore]);

  const { store, _default } = useContext(tmpStore.StoreContext);

  const finalStore = useMemo(() => {
    let _store: BaseStore = store;
    // useStore(构造函数) 可以不在Provide内单独使用
    if ((baseStore as BaseStoreCls)._current && (baseStore as BaseStoreCls)._isBaseStore && _default) {
      const BS = baseStore as BaseStoreCls;
      _store = new BS();
    }
    if (!_store._update) {
      _store._update = update;
    }
    return _store;
  }, [store]);

  return finalStore as Exclude<T, Function> | InstanceType<T>;
}
