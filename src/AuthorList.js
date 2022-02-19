import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

export const AuthorList = ({ listId, listType, row, onDown, onUp, addBox }) => {
  const [description, setDescription] = useState("");
  return (
    <>
      <div
        className="d-flex flex-column align-items-start border m-4 rounded"
        style={{ background: "#001E3C" }}
      >
        <p className="text-white mx-auto">{row.label}</p>
        <div className="d-flex my-1 mx-auto">
          <button className="btn btn-secondary " onClick={onUp}>
            Left
          </button>

          <button className="btn btn-secondary mx-2 " onClick={onDown}>
            Right
          </button>
        </div>
        <Droppable
          droppableId={listId}
          type={listType}
          direction="vertical"
          isCombineEnabled={false}
        >
          {(dropProvided) => (
            <div
              className=" d-flex flex-column m-2 p-3 rounded "
              {...dropProvided.droppableProps}
              ref={dropProvided.innerRef}
            >
              {row.urls.map((url, index) => (
                <Draggable key={url} draggableId={url} index={index}>
                  {(dragProvided) => (
                    <div
                      {...dragProvided.dragHandleProps}
                      {...dragProvided.draggableProps}
                      ref={dragProvided.innerRef}
                    >
                      <p className="text-center bg-light p-1 rounded">{url}</p>
                    </div>
                  )}
                </Draggable>
              ))}
              {dropProvided.placeholder}
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Card Name"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-primary"
                    type="button"
                    onClick={() => {
                      addBox(listId, description);
                      setDescription("");
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </>
  );
};
