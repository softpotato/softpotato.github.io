import LRUCache from '../lru_cache';
import LRUKey from '../lru_key';

test("empty LRU Creation", () => {
    const store1 = new LRUCache(0);
    const store2 = new LRUCache(1);
    const store3 = new LRUCache(20);
    const store4 = new LRUCache(100);
});

test("LRU 1 Entry Insertion", () => {
    const store1 = new LRUCache(1);
    const key = new LRUKey();
    key.hashCode = 1953

    expect(store1.has(key)).toBeFalsy();
    store1.insert(key, ["1"]);
    expect(store1.has(key)).toBeTruthy();
    expect(store1.retrieve(key)).toEqual(expect.arrayContaining(["1"]));

    const key2 = new LRUKey();
    key2.hashCode = 2456;

    expect(store1.has(key2)).toBeFalsy();
    store1.insert(key2, ["2", "3"]);
    expect(store1.has(key2)).toBeTruthy();
    expect(store1.retrieve(key2)).toEqual(expect.arrayContaining(["2","3"]));
    expect(store1.retrieve(key)).toBeFalsy();
});

test("LRU Overflow Insertion", () => {
    const store = new LRUCache(3);

    const k1 = new LRUKey();
    const k2 = new LRUKey();
    const k3 = new LRUKey();
    const k4 = new LRUKey();
    const k5 = new LRUKey();
    const k6 = new LRUKey();

    k1.hashCode = 111;
    k2.hashCode = 1093;
    k3.hashCode = 124;
    k4.hashCode = 439;
    k5.hashCode = 856;
    k6.hashCode = 120;

    store.insert(k1, 1);
    store.insert(k2, 2);
    store.insert(k3, 3);

    expect(store.has(k1)).toBeTruthy();
    expect(store.has(k2)).toBeTruthy();
    expect(store.has(k3)).toBeTruthy();
    expect(store.has(k4)).toBeFalsy();
    expect(store.has(k5)).toBeFalsy();
    expect(store.has(k6)).toBeFalsy();

    expect(store.retrieve(k1)).toBe(1);
    expect(store.retrieve(k2)).toBe(2);
    expect(store.retrieve(k3)).toBe(3);

    store.insert(k4,4);
    store.insert(k5,5);
    store.insert(k6,6);

    expect(store.has(k4)).toBeTruthy();
    expect(store.has(k5)).toBeTruthy();
    expect(store.has(k6)).toBeTruthy();
    expect(store.has(k1)).toBeFalsy();
    expect(store.has(k2)).toBeFalsy();
    expect(store.has(k3)).toBeFalsy();

    expect(store.retrieve(k4)).toBe(4);
    expect(store.retrieve(k5)).toBe(5);
    expect(store.retrieve(k6)).toBe(6);
});

// TODO: Write more test cases 