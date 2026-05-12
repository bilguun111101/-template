export default class BroadcaseChannel {
  constructor(public name: string) {}
  postMessage(_message: any) {}
  close() {}
  onmessage: (event: MessageEvent) => void = () => {};
  addEventListener(_type: string, _listener: (event: MessageEvent) => void) {}
  removeEventListener(
    _type: string,
    _listener: (event: MessageEvent) => void,
  ) {}
}
