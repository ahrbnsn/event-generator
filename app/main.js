"use client";
import { useState } from "react";
import styles from "./page.module.css";

export function Main({
  defaultApiKey,
  defaultHnyHost,
  defaultDataset,
  sendEvents,
}) {
  const [hnyHost, setHnyHost] = useState(defaultHnyHost);
  const [apiKey, setApiKey] = useState(defaultApiKey);
  const [dataset, setDataset] = useState(defaultDataset);
  const handleSendEvents = () => {
    sendEvents({ hnyHost, apiKey, dataset });
  };

  const enabled = !!hnyHost && !!apiKey && !!dataset;

  return (
    <main className={styles.main}>
      <div className={styles.inputs}></div>
      <label className={styles.label}>
        hny host:
        <input
          value={hnyHost}
          onChange={(event) => setHnyHost(event.target.value)}
        />
      </label>
      <label className={styles.label}>
        api key:
        <input
          value={apiKey}
          onChange={(event) => setApiKey(event.target.value)}
        />
      </label>
      <label className={styles.label}>
        set dataset:
        <input
          value={dataset}
          onChange={(event) => setDataset(event.target.value)}
        />
      </label>
      <div>
        <button
          className={styles.button}
          disabled={!enabled}
          onClick={handleSendEvents}
        >
          Send Events
        </button>
      </div>
    </main>
  );
}
