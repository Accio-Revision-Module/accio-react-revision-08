import "./App.css";
import { useLocalStorageWithExpiry } from "./hooks/useLocalStorageWithExpiry";
import { usePrevious } from "./hooks/usePrevious";
import { useOnlineStatus } from "./hooks/useOnlineStatus";
import { useIdle } from "./hooks/useIdle";

function App() {
  const [name, setName] = useLocalStorageWithExpiry("", "name", 1);
  const prevName = usePrevious(name);
  const isOnline = useOnlineStatus();
  const isIdle = useIdle(5000);

  return (
    <>
      <h1>Custom Hooks</h1>
      <h2>UseLocalStorageWithExpiry Hook</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />

      <h2>UsePrevious Hook</h2>
      <p>Name: {name}</p>
      <p>Prev Value of Name: {prevName}</p>

      <h2>UseOnlineStatus Hook</h2>
      <p>{isOnline ? "You are online" : "You are offline"}</p>

      <h2>UseIdle Hook</h2>
      <p>{isIdle ? "You are idle. Please work." : "You are working"}</p>
    </>
  );
}

export default App;
