const randomId = () => crypto.randomUUID();
export const errorDescriptions = {
  eventTypes: ["error"],
  globalFields: {
    "browser.hash": { values: [""] },
    "browser.height": { min: 500, max: 3600 },
    "browser.isMobile": { values: [true, false] },
    "browser.language": { values: ["en-GB", "en-US"] },
    "browser.route": {
      values: [
        "/getting-data-in/opentelemetry/dotnet-distro/",
        "/getting-data-in/start-today/",
        "/lost-in-the-woods",
        "/at-the-witches-house",
        "/out-of-the-frying-pan",
        "/under-the-bridge",
        "/paying-the-toll",
      ],
    },
    "browser.screenSize": { values: ["large", "tiny", "gigantic", "medium"] },
    "browser.url": {
      values: [
        "https://docs.honeycomb.io/getting-data-in/opentelemetry/dotnet-distro/",
      ],
    },
    "browser.width": { min: 260, max: 2560 },
    duration_ms: { min: 5, max: 4873.1001 },
    "library.name": {
      values: [
        "@opentelemetry/instrumentation-xml-http-request",
        "@opentelemetry/instrumentation-user-interaction",
        "web-vitals-instrumentation",
        "@opentelemetry/instrumentation-fetch",
        "@opentelemetry/instrumentation-document-load",
      ],
    },
    "meta.signal_type": { values: ["trace"] },
    "service.name": { values: ["mock-events"] },
    "session.id": { generator: randomId },
    "span.kind": { values: ["client", "internal"] },
    "span.num_events": { min: 0, max: 12 },
    "span.num_links": { min: 0, max: 0 },
    status_code: { min: 0, max: 0 },
    "telemetry.sdk.language": { values: ["webjs"] },
    "telemetry.sdk.name": { values: ["opentelemetry"] },
    "telemetry.sdk.version": { values: ["1.14.0"] },
    "trace.span_id": { generator: randomId },
    "trace.trace_id": { generator: randomId },
    type: { values: ["client", "internal"] },
    "user_agent.original": {
      values: [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
      ],
    },
  },
  perEventFields: {
    error: {
      error: {
        values: ["meep-meep", "undercaffeinated"],
      },
    },
  },
};
