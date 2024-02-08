import { useEffect, useState } from "react";
import "./App.css";
import Loader from "./components/Loader";

function App() {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const myColors = [
    "#ffcccb",
    "#a0d2e8",
    "#c8e6c9",
    "#ffd699",
    "#d1c4e9",
    "#f0f4c3",
    "#b2dfdb",
    "#ffcdd2",
    "#b3e0ff",
    "#c5e1a5",
  ];
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
        setData(result.data);
        const defaultSelectedItem = Math.min(
          9,
          result.data.countries.length - 1
        );
        console.log(data);
        setSelectedItem(defaultSelectedItem);
        setSelectedItemColor(myColors[defaultSelectedItem % myColors.length]);
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
              onFocus={true}
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
