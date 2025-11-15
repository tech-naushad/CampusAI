
// BotAPI function (same as before)
const BotAPI = async (input, onChunkReceived) => {
  if (!input.query.trim()) return;
  try {

    const access_token = await getToken();
    console.log("Access Token:", access_token);
    const res = await fetch("https://localhost:8000/search", {
      method: "POST",
      headers: 
      { 
        "Content-Type": "application/json" ,
        "Authorization": `Bearer ${access_token}`
      },
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
const getToken = async()=>{
    try{
        debugger
        const res = await fetch("https://localhost:8000/auth/token",{
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
        if(!res?.ok) throw new Error("Failed to fetch token");
        const result  = await res.json();
        return result.data.access_token;
    }
    catch(error){
        console.error("Token fetch error:", error);
        throw error;
    }
}
export default BotAPI;