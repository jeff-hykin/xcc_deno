// Here we mock the global `process` variable in case we are not in Node's environment.
import nextTick from './setImmediate.ts';

export interface IProcess {
  getuid(): number;

  getgid(): number;

  cwd(): string;

  platform: string;
  nextTick: (callback: (...args) => void, ...args) => void;
  emitWarning: (message: string, type: string) => void;
  env: {};
}

/**
 * Looks to return a `process` object, if one is available.
 *
 * The global `process` is returned if defined;
 * otherwise `require('process')` is attempted.
 *
 * If that fails, `undefined` is returned.
 *
 * @return {IProcess | undefined}
 */
const maybeReturnProcess = (): IProcess | undefined => {
  return globalThis.process;
};

export function createProcess(): IProcess {
  const p: IProcess = maybeReturnProcess() || ({} as IProcess);

  if (!p.getuid) p.getuid = () => 0;
  if (!p.getgid) p.getgid = () => 0;
  if (!p.cwd) p.cwd = () => '/';
  if (!p.nextTick) {
    p.nextTick = nextTick
  }
  if (!p.emitWarning)
    p.emitWarning = (message, type) => {
      // tslint:disable-next-line:no-console
      console.warn(`${type}${type ? ': ' : ''}${message}`);
    };
  if (!p.env) p.env = {};
  return p;
}

export default createProcess();
