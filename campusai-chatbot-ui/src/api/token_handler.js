
// const getToken = async()=>{
//     try{
//         debugger
//         const res = await fetch("https://localhost:8000/auth/token",{
//             method: "GET",
//             headers: { "Content-Type": "application/json" },
//         })
//         if(!res?.ok) throw new Error("Failed to fetch token");
//         const data  = await res.json();
//         return data.access_token;
//     }
//     catch(error){
//         console.error("Token fetch error:", error);
//         throw error;
//     }
// }