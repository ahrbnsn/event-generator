import {
  generateBatchEvents,
  hours,
} from "@/utils/generate-events/event-maker";
import { eventDescriptions } from "@/utils/generate-events/default_description";
import { Main } from "./main";

export default function Home() {
  async function sendEvents({ hnyHost, apiKey, dataset }) {
    "use server";
    const duration = hours(2);

    const events = generateBatchEvents({
      eventDefinitions: eventDescriptions,
      start: Date.now() - duration,
      end: Date.now(),
      count: 200,
    });

    const headers = { "X-Honeycomb-Team": apiKey };
    await fetch(hnyHost + "/1/batch/" + dataset, {
      headers,
      method: "POST",
      body: JSON.stringify(events),
    });
  }

  return (
    <Main
      sendEvents={sendEvents}
      defaultApiKey={process.env.API_KEY}
      defaultHnyHost={process.env.DEFAULT_HNY_HOST}
      defaultDataset={process.env.DEFAULT_DATASET}
    />
  );
}
