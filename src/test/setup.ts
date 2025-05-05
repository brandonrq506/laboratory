import "@testing-library/jest-dom";
import { mockAnimationsApi } from "jsdom-testing-mocks";
import { server } from "./server";

mockAnimationsApi();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal("ResizeObserver", ResizeObserverMock);
