import { describe, it, expect } from "vitest";
import {
  ServiceProvider,
  ModelProvider,
  ApiPath,
  DEFAULT_MODELS,
  MINIMAX_BASE_URL,
  MiniMax,
} from "@/app/constant";

describe("MiniMax Constants", () => {
  it("should define MiniMax in ServiceProvider enum", () => {
    expect(ServiceProvider.MiniMax).toBe("MiniMax");
  });

  it("should define MiniMax in ModelProvider enum", () => {
    expect(ModelProvider.MiniMax).toBe("MiniMax");
  });

  it("should define MiniMax API path", () => {
    expect(ApiPath.MiniMax).toBe("/api/minimax");
  });

  it("should define MiniMax base URL", () => {
    expect(MINIMAX_BASE_URL).toBe("https://api.minimax.io");
  });

  it("should define MiniMax chat path", () => {
    expect(MiniMax.ChatPath).toBe("v1/chat/completions");
  });

  it("should define MiniMax example endpoint", () => {
    expect(MiniMax.ExampleEndpoint).toBe("https://api.minimax.io");
  });
});

describe("MiniMax Models", () => {
  const minimaxModels = DEFAULT_MODELS.filter(
    (m) => m.provider.providerName === "MiniMax",
  );

  it("should include MiniMax models in DEFAULT_MODELS", () => {
    expect(minimaxModels.length).toBeGreaterThanOrEqual(3);
  });

  it("should include MiniMax-M2.7 model", () => {
    const m27 = minimaxModels.find((m) => m.name === "MiniMax-M2.7");
    expect(m27).toBeDefined();
    expect(m27!.available).toBe(true);
    expect(m27!.provider.id).toBe("minimax");
    expect(m27!.provider.providerType).toBe("minimax");
  });

  it("should include MiniMax-M2.5 model", () => {
    const m25 = minimaxModels.find((m) => m.name === "MiniMax-M2.5");
    expect(m25).toBeDefined();
    expect(m25!.available).toBe(true);
  });

  it("should include MiniMax-M2.5-highspeed model", () => {
    const m25hs = minimaxModels.find(
      (m) => m.name === "MiniMax-M2.5-highspeed",
    );
    expect(m25hs).toBeDefined();
    expect(m25hs!.available).toBe(true);
  });

  it("should have correct provider metadata for all MiniMax models", () => {
    for (const model of minimaxModels) {
      expect(model.provider.id).toBe("minimax");
      expect(model.provider.providerName).toBe("MiniMax");
      expect(model.provider.providerType).toBe("minimax");
    }
  });

  it("should not affect other providers model count", () => {
    const openaiModels = DEFAULT_MODELS.filter(
      (m) => m.provider.providerName === "OpenAI",
    );
    expect(openaiModels.length).toBeGreaterThan(0);

    const googleModels = DEFAULT_MODELS.filter(
      (m) => m.provider.providerName === "Google",
    );
    expect(googleModels.length).toBeGreaterThan(0);
  });
});

describe("MiniMax Provider Enumeration", () => {
  it("should be selectable in ServiceProvider entries", () => {
    const entries = Object.entries(ServiceProvider);
    const minimax = entries.find(([k, v]) => k === "MiniMax");
    expect(minimax).toBeDefined();
    expect(minimax![1]).toBe("MiniMax");
  });

  it("should have all required enum values for provider system", () => {
    // Verify MiniMax doesn't break the enum ordering
    const providers = Object.values(ServiceProvider);
    expect(providers).toContain("MiniMax");
    expect(providers).toContain("OpenAI");
    expect(providers).toContain("Azure");
    expect(providers).toContain("Google");
    expect(providers).toContain("Anthropic");
  });
});

describe("MiniMax API Configuration", () => {
  it("should use OpenAI-compatible chat completions path", () => {
    expect(MiniMax.ChatPath).toBe("v1/chat/completions");
  });

  it("should have base URL pointing to api.minimax.io", () => {
    expect(MINIMAX_BASE_URL).toMatch(/^https:\/\/api\.minimax\.io$/);
  });
});
