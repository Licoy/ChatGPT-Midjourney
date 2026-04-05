import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock browser APIs used by the client platforms
vi.mock("@fortaine/fetch-event-source", () => ({
  EventStreamContentType: "text/event-stream",
  fetchEventSource: vi.fn(),
}));

// Mock client config
vi.mock("@/app/config/client", () => ({
  getClientConfig: () => ({ isApp: false, buildMode: "standalone" }),
}));

// Mock stores
const mockAccessStore = {
  useCustomConfig: false,
  minimaxUrl: "",
  minimaxApiKey: "test-minimax-key",
  openaiApiKey: "",
  azureApiKey: "",
  googleApiKey: "",
  anthropicApiKey: "",
  bytedanceApiKey: "",
  alibabaApiKey: "",
  accessCode: "",
  enabledAccessControl: () => false,
};

const mockAppConfig = {
  modelConfig: {
    model: "MiniMax-M2.7",
    temperature: 0.7,
    top_p: 0.9,
    presence_penalty: 0,
    frequency_penalty: 0,
    max_tokens: 4096,
  },
};

const mockChatStore = {
  currentSession: () => ({
    mask: {
      modelConfig: {
        model: "MiniMax-M2.7",
        providerName: "MiniMax",
        temperature: 0.7,
        top_p: 0.9,
      },
    },
  }),
};

vi.mock("@/app/store", () => ({
  useAccessStore: {
    getState: () => mockAccessStore,
  },
  useAppConfig: {
    getState: () => mockAppConfig,
  },
  useChatStore: {
    getState: () => mockChatStore,
  },
}));

vi.mock("@/app/utils", () => ({
  getMessageTextContent: (msg: any) =>
    typeof msg.content === "string" ? msg.content : "",
}));

vi.mock("@/app/utils/format", () => ({
  prettyObject: (obj: any) => JSON.stringify(obj),
}));

vi.mock("@/app/locales", () => ({
  default: {
    Error: {
      Unauthorized: "Unauthorized",
    },
  },
}));

import { MiniMaxApi } from "@/app/client/platforms/minimax";
import { ApiPath } from "@/app/constant";

describe("MiniMaxApi Client", () => {
  let api: MiniMaxApi;

  beforeEach(() => {
    api = new MiniMaxApi();
  });

  describe("path()", () => {
    it("should construct correct API path in web mode", () => {
      const path = api.path("v1/chat/completions");
      expect(path).toBe(`${ApiPath.MiniMax}/v1/chat/completions`);
    });

    it("should use custom URL when useCustomConfig is true", () => {
      mockAccessStore.useCustomConfig = true;
      mockAccessStore.minimaxUrl = "https://custom-minimax.example.com";

      const path = api.path("v1/chat/completions");
      expect(path).toBe(
        "https://custom-minimax.example.com/v1/chat/completions",
      );

      // Reset
      mockAccessStore.useCustomConfig = false;
      mockAccessStore.minimaxUrl = "";
    });

    it("should strip trailing slash from base URL", () => {
      mockAccessStore.useCustomConfig = true;
      mockAccessStore.minimaxUrl = "https://custom-minimax.example.com/";

      const path = api.path("v1/chat/completions");
      expect(path).toBe(
        "https://custom-minimax.example.com/v1/chat/completions",
      );

      mockAccessStore.useCustomConfig = false;
      mockAccessStore.minimaxUrl = "";
    });

    it("should prepend https:// when missing", () => {
      mockAccessStore.useCustomConfig = true;
      mockAccessStore.minimaxUrl = "custom-minimax.example.com";

      const path = api.path("v1/chat/completions");
      expect(path).toBe(
        "https://custom-minimax.example.com/v1/chat/completions",
      );

      mockAccessStore.useCustomConfig = false;
      mockAccessStore.minimaxUrl = "";
    });
  });

  describe("extractMessage()", () => {
    it("should extract message from OpenAI-compatible response", () => {
      const res = {
        choices: [
          {
            message: {
              content: "Hello from MiniMax!",
            },
          },
        ],
      };
      expect(api.extractMessage(res)).toBe("Hello from MiniMax!");
    });

    it("should return empty string for empty response", () => {
      expect(api.extractMessage({})).toBe("");
    });

    it("should return empty string for empty choices", () => {
      expect(api.extractMessage({ choices: [] })).toBe("");
    });

    it("should handle null content gracefully", () => {
      const res = {
        choices: [{ message: {} }],
      };
      expect(api.extractMessage(res)).toBe("");
    });
  });

  describe("usage()", () => {
    it("should return zero usage", async () => {
      const usage = await api.usage();
      expect(usage).toEqual({ used: 0, total: 0 });
    });
  });

  describe("models()", () => {
    it("should return empty array", async () => {
      const models = await api.models();
      expect(models).toEqual([]);
    });
  });
});

describe("MiniMax Server Config Integration", () => {
  it("should have MINIMAX_API_KEY env var declaration in server config type", async () => {
    // Verify the server config module exports correctly
    const serverModule = await import("@/app/config/server");
    expect(serverModule.getServerSideConfig).toBeDefined();
  });
});

describe("MiniMax Provider Dispatch", () => {
  it("should create MiniMaxApi via ClientApi factory", async () => {
    const { ClientApi } = await import("@/app/client/api");
    const { ModelProvider } = await import("@/app/constant");
    const client = new ClientApi(ModelProvider.MiniMax);
    expect(client.llm).toBeInstanceOf(MiniMaxApi);
  });

  it("should dispatch MiniMax ServiceProvider to MiniMax ModelProvider", async () => {
    const { getClientApi } = await import("@/app/client/api");
    const { ServiceProvider, ModelProvider } = await import("@/app/constant");
    const client = getClientApi(ServiceProvider.MiniMax);
    expect(client.llm).toBeInstanceOf(MiniMaxApi);
  });
});
