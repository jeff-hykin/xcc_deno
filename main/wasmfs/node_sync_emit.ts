// https://cdn.jsdelivr.net/npm/@wasmer/wasmfs@0.12.0/src/node_sync_emit.ts
// import { Node } from "https://esm.sh/memfs@3.0.4/lib/node";
import { Node } from "../memfs-3.0.4/node.ts";

// Make emit synchronous
Node.prototype.emit = function(
  this: Node,
  event: string | symbol,
  ...args: any[]
): boolean {
  const listeners = this.listeners(event);
  for (let listener of listeners) {
    try {
      listener(...args);
    } catch (e) {
      console.error(e);
    }
  }
  return listeners.length > 0;
};
