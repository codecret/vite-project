import { useEffect, useState } from "react";
import "./App.css";
import Loader from "./components/Loader";

function App() {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const myColors = ["#ffcccb", "#a0d2e8", "#c8e6c9"];
  const [selectedItemColor, setSelectedItemColor] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://countries.trevorblades.com/graphql",
          {
            method: "POST",
            headers: new Headers({
              "content-type": "application/json",
            }),
            body: JSON.stringify({
              query: `
              query ExampleQuery($searchQuery: String) {
                countries(filter: { name: { regex: $searchQuery } }) {
                  code
                  name
                  languages {
                    name
                  }
                  currency
                }
              }
              `,
              variables: {
                searchQuery,
              },
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result.data); // save response inside data

        setSelectedItem(9);
        // let number = Math.floor(Math.random() * myColors.length) - 1; // counter to select random number
        setSelectedItemColor(myColors[0]);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, [searchQuery]);

  const selectedHandler = (index) => {
    if (selectedItem === index) {
      setSelectedItem(null);
      setSelectedItemColor(null);
      return;
    }
    setSelectedItem(index);

    
    const nextColorIndex =
      (selectedItemColor ? myColors.indexOf(selectedItemColor) : 0) + 1;
    setSelectedItemColor(myColors[nextColorIndex % myColors.length]);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1 className="divTitle">Junior Frontend Developer Assignment</h1>
          <div>
            <input
              type="text"
              placeholder="Search by name..."
              className="searchInput"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <h5 className="memberListLength">
            {data.countries?.length} record
            {data.countries?.length !== 1 && "s"} found
          </h5>
          <div className="scrollTable">
            <table>
              <thead>
                <tr className="tableHead">
                  <th></th>
                  <th className="tableHeadItem1" scope="col">
                    Code
                  </th>
                  <th className="tableHeadItem1" scope="col">
                    Name
                  </th>
                  <th className="tableHeadItem1" scope="col">
                    Languages
                  </th>
                  <th className="tableHeadItem1" scope="col">
                    Currency
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.countries?.map((item, index) => (
                  <tr
                    key={index}
                    onClick={() => selectedHandler(index)}
                    style={{
                      background:
                        selectedItem === index ? selectedItemColor : "",
                    }}
                  >
                    <td>
                      <p>{index + 1}</p>
                    </td>
                    <td>
                      <p className="personTextName">{item.name}</p>
                    </td>
                    <td>{item.name}</td>
                    <td>
                      {item.languages.length > 0
                        ? item.languages.map((language) => (
                            <span key={language.name}>{language.name} </span>
                          ))
                        : "undefined"}
                    </td>
                    <td>{item.currency || "undefined"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
