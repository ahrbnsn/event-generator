#!/usr/bin/node

const fs = require("node:fs");
const events = require("./rum.json");

const eventTypes = new Set();

const eventTypeCount = {};

const allFields = [];
const globalFields = {};
const perEventFields = {};
const ignoreFieldValues = [
  "trace.trace_id",
  "Timestamp",
  "timestamp",
  "session.id",
  "trace.span_id",
  "trace.trace_id",
  "trace.parent_id",
];

// sometimes the value is important to be scoped per event type
const voidGlobalFields = ["duration_ms"];

for (const event of events) {
  const fields = Object.keys(event);
  allFields.push(fields);
}

for (const event of events) {
  if (!event.name) {
    console.log("no event name! eegads!");
    console.log({ event });
    continue;
  }

  eventTypes.add(event.name);
  eventTypeCount[event.name] = eventTypeCount[event.name] || 0;
  eventTypeCount[event.name] = eventTypeCount[event.name] + 1;

  perEventFields[event.name] = perEventFields[event.name] || {};
  const fieldList = perEventFields[event.name];

  const fields = Object.keys(event);

  for (const field of fields) {
    const allowedGlobal = !voidGlobalFields.includes(field);
    const inEveryEvent =
      allowedGlobal &&
      allFields.every((fieldList) => fieldList.includes(field));

    let dict;

    if (inEveryEvent) {
      globalFields[field] = globalFields[field] || {};
      if (ignoreFieldValues.includes(field)) {
        continue;
      }
      dict = globalFields;
    } else {
      fieldList[field] = fieldList[field] || {};

      if (ignoreFieldValues.includes(field)) {
        continue;
      }

      dict = fieldList;
    }

    const value = event[field];

    if (Number.isFinite(value)) {
      dict[field].min = dict[field].min || value;
      dict[field].max = dict[field].max || value;

      if (value < dict[field].min) {
        dict[field].min = value;
      }

      if (value > dict[field].max) {
        dict[field].max = value;
      }

      continue;
    }

    dict[field].values = dict[field].values || new Set();

    dict[field].values.add(value);

    if (inEveryEvent) {
      globalFields[field] = dict[field];
    } else {
      fieldList[field] = dict[field];
    }
  }
}

for (const eventType in perEventFields) {
  for (const fieldDefinition in perEventFields[eventType]) {
    const v = perEventFields[eventType][fieldDefinition].values;
    if (v) {
      perEventFields[eventType][fieldDefinition].values = Array.from(v);
    }
  }
}

for (const fieldDef in globalFields) {
  const v = globalFields[fieldDef].values;
  if (v) {
    globalFields[fieldDef].values = Array.from(v);
  }
}

const summary = {
  eventTypes: Array.from(eventTypes),
  eventTypeCount,
  globalFields,
  perEventFields,
};
const content = JSON.stringify(summary);

fs.writeFile("./summary.json", content, (err) => {
  if (err) {
    console.error(err);
  } else {
    // file written successfully
  }
});
