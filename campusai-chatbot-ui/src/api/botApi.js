
// BotAPI function (same as before)
const BotAPI = async (input, onChunkReceived) => {
  if (!input.query.trim()) return;
  try {
    const res = await fetch("http://127.0.0.1:8000/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    if (!res.body) throw new Error("ReadableStream not supported");

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let fullResponse = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      fullResponse += chunk;
      if (onChunkReceived) onChunkReceived(chunk);
    }

    return fullResponse;
  } catch (error) {
    console.error("BotAPI error:", error);
    throw error;
  }
};

export default BotAPI;