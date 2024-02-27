export const hours = (number) => number * 60 * 60 * 1000;

export function generateBatchEvents({
  start,
  end,
  count = 1000,
  eventDefinitions,
  sampleRate = 1,
}) {
  const events = [];

  for (let i = 0; i < count; i++) {
    const time = randomInteger(start, end);
    const timestamp = new Date(time).toISOString();

    const data = generateEvent(eventDefinitions);
    events.push({ time: timestamp, samplerate: sampleRate, data });
  }

  return events;
}

function generateEvent(eventDefinitions) {
  const { eventTypes, globalFields, perEventFields } = eventDefinitions;

  const eventTypeIndex = randomInteger(0, eventTypes.length);
  const eventName = eventTypes[eventTypeIndex];

  const event = generateFieldValues({
    fieldDefinitions: globalFields,
    event: { name: eventName },
  });

  return generateFieldValues({
    fieldDefinitions: perEventFields[eventName],
    event,
  });
}

function generateFieldValues({ fieldDefinitions, event }) {
  for (const field in fieldDefinitions) {
    const { values, min, max, generator } = fieldDefinitions[field];

    if (generator) {
      event[field] = generator({ values, min, max });
      continue;
    }

    if (values) {
      const vIndex = randomInteger(0, values.length);
      event[field] = values[vIndex];
      continue;
    }

    if (!Number.isFinite(min)) {
      continue;
    }

    const isInt = Number.isInteger(min) && Number.isInteger(max);
    const value = isInt ? randomInteger(min, max) : randomFloat(min, max);

    event[field] = value;
  }

  return event;
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}
