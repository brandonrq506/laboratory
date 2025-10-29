import "@testing-library/jest-dom";
import { mockAnimationsApi } from "jsdom-testing-mocks";
import { server } from "./server";

mockAnimationsApi();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

interface MockResizeObserver {
  observe: ReturnType<typeof vi.fn>;
  unobserve: ReturnType<typeof vi.fn>;
  disconnect: ReturnType<typeof vi.fn>;
}

const ResizeObserverMock = vi.fn(function (this: MockResizeObserver): void {
  this.observe = vi.fn();
  this.unobserve = vi.fn();
  this.disconnect = vi.fn();
});

vi.stubGlobal("ResizeObserver", ResizeObserverMock);
