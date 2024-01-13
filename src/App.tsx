import { useState } from "react";
import "./App.css";
import { RemoteStorage } from "remote-storage";

const remoteStorage = new RemoteStorage({
  serverAddress: "https://api.remote.storage",
  userId: "789v0099-q88d-57d4-a450-006614174077",
  instanceId: "remote-storage-test",
});

function App() {
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState("Hi!");

  const getCount = async () => {
    setMsg("Getting...");
    const count = await remoteStorage.getItem("count").then((a) => a as number);
    setMsg("Got!");
    return count;
  };

  const saveCount = async (count: number) => {
    setMsg("Saving...");
    await remoteStorage.setItem("count", count);
    setMsg("Saved!");
  };

  return (
    <>
      <h2>{msg}</h2>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <div className="card">
        <button onClick={() => saveCount(count)}>Save counter</button>
        <button onClick={() => getCount().then((count) => setCount(count))}>
          Load counter
        </button>
      </div>
    </>
  );
}

export default App;
