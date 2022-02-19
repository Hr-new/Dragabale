import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { generate } from "shortid";
import { reorderRows, reorder } from "./reorder";
import { AuthorList } from "./AuthorList";

const aId = generate();
const unrankedId = generate();

const App = () => {
  const [show, setShow] = useState(false);
  const [label, setLable] = useState("");
  const [rows, setRows] = React.useState([
    { id: aId, label: "a", urls: [] },
    {
      id: unrankedId,
      label: "Initial Container",
      urls: ["1", "2", "3"],
    },
  ]);

  const addBox = (id, value) => {
    let a = [...rows];
    a.forEach((row) => {
      if (row.id === id) {
        row["urls"] = [...row.urls, value];
      }
    });
    setRows(a);
  };

  React.useEffect(() => {
    const data = localStorage.getItem("my-tier-list");
    if (data) {
      setRows(JSON.parse(data));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("my-tier-list", JSON.stringify(rows));
  });

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => {
        if (!destination) {
          return;
        }
        setRows(reorderRows(rows, source, destination));
      }}
    >
      <div className="container">
        <button
          className="btn btn-primary my-4 ml-4"
          onClick={() => {
            setShow(true);
          }}
        >
          Add New Container
        </button>
        <div className="d-flex flex-row align-items-stretch flex-wrap border rounded bg-light">
          {show && (
            <div class="input-group my-3 mx-3">
              <input
                type="text"
                class="form-control"
                placeholder="Enter Container  Name"
                onChange={(e) => setLable(e.target.value)}
              />
              <div class="input-group-append">
                <button
                  class="btn btn-primary rounded ml-2"
                  type="button"
                  onClick={() => {
                    if (label.length > 0) {
                      setRows([
                        {
                          id: generate(),
                          label: label,
                          urls: [],
                        },
                        ...rows,
                      ]);
                      setLable("");
                      setShow(false);
                    } else {
                      return alert("Please Enter The Name of Container");
                    }
                  }}
                >
                  Save
                </button>
                <button
                  class="btn btn-danger ml-2 rounded"
                  type="button"
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          {rows.map((row, i) => (
            <AuthorList
              onLabelChange={(newText) =>
                setRows(
                  rows.map((x) =>
                    x.id === row.id ? { ...row, label: newText } : x
                  )
                )
              }
              onUp={() => i > 0 && setRows(reorder(rows, i, i - 1))}
              onDown={() => setRows(reorder(rows, i, i + 1))}
              internalScroll
              key={row.id}
              listId={row.id}
              listType="CARD"
              row={row}
              addBox={addBox}
            />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default App;
