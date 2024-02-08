// import React, { useEffect, useState } from "react";
// import "./App.css";

// function App() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       console.log("fetching ");
//       try {
//         const response = await fetch(
//           "https://countries.trevorblades.com/graphql",
//           {
//             method: "POST",
//             headers: new Headers({
//               "content-type": "application/json",
//             }),
//             body: JSON.stringify({
//               query:
//                 "query ExampleQuery {\n continents {\n code\n }\n countries {\n code\n }\n languages {\n code\n }\n }",
//             }),
//           }
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const responseData = await response.json();
//         setData(responseData);
//         console.log(responseData);
//       } catch (error) {
//         console.error("Error fetching data:", error.message);
//       }
//     };

//     fetchData();
//   }, []);

//   console.log(data);

//   return (
//     <>
//       <div>
//         <h1>Title</h1>
//       </div>
//     </>
//   );
// }

// export default App;
