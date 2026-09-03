// Runs Pyodide off the main thread so a runaway script (e.g. `while True: pass`)
// can be killed by terminating this worker instead of freezing the visitor's tab.

const PYODIDE_VERSION = "0.23.4";
const PYODIDE_BASE = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

let pyodidePromise = null;

async function boot() {
  importScripts(`${PYODIDE_BASE}pyodide.js`);
  const pyodide = await loadPyodide({ indexURL: PYODIDE_BASE });

  // Stream output back as it is produced, rather than buffering until the end.
  pyodide.setStdout({ batched: (text) => self.postMessage({ type: "stdout", text }) });
  pyodide.setStderr({ batched: (text) => self.postMessage({ type: "stderr", text }) });

  return pyodide;
}

self.onmessage = async (event) => {
  const message = event.data;

  if (message.type === "init") {
    try {
      pyodidePromise = pyodidePromise || boot();
      await pyodidePromise;
      self.postMessage({ type: "ready" });
    } catch (error) {
      pyodidePromise = null;
      self.postMessage({
        type: "loaderror",
        message: "Could not reach the Python engine (CDN unavailable).",
      });
    }
    return;
  }

  if (message.type === "run") {
    try {
      const pyodide = await pyodidePromise;
      await pyodide.runPythonAsync(message.code);
      self.postMessage({ type: "done" });
    } catch (error) {
      self.postMessage({
        type: "error",
        message: String((error && error.message) || error),
      });
    }
  }
};
