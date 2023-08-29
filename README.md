# ReactJS Revision: Custom Hooks

## Schedule

1. **`useLocalStorageWithExpiry`**
2. **`usePrevious`**
3. **`useOnlineStatus`**
4. **`useIdle`**

---

## 1. `useLocalStorageWithExpiry`

### How to Use

```jsx
import { useState, useEffect } from "react";

function useLocalStorageWithExpiry(key, initialValue, expiryInMinutes) {
  const storedValueJSON = localStorage.getItem(key);
  const now = new Date().getTime();
  let initialStoredValue = initialValue;

  if (storedValueJSON) {
    const { value, expiry } = JSON.parse(storedValueJSON);
    if (now < expiry) {
      initialStoredValue = value;
    }
  }

  const [storedValue, setStoredValue] = useState(initialStoredValue);

  useEffect(() => {
    if (storedValue === null) {
      localStorage.removeItem(key);
    } else {
      const expiry = new Date().getTime() + expiryInMinutes * 60 * 1000;
      localStorage.setItem(key, JSON.stringify({ value: storedValue, expiry }));
    }
  }, [key, storedValue, expiryInMinutes]);

  return [storedValue, setStoredValue];
}
```

---

## 2. `usePrevious`

### How to Use

```jsx
import { useEffect, useRef } from "react";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
```

---

## 3. `useOnlineStatus`

### How to Use

```jsx
import { useState, useEffect } from "react";

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);
  return isOnline;
}
```

---

## 4. `useIdle`

### How to Use

```jsx
import { useState, useEffect } from "react";

function useIdle(timeout) {
  const [isIdle, setIsIdle] = useState(false);
  useEffect(() => {
    let timer;
    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setIsIdle(true), timeout);
    };
    document.addEventListener("mousemove", resetTimer);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousemove", resetTimer);
    };
  }, [timeout]);
  return isIdle;
}
```

---
