import React, { useEffect } from 'react';
import { useState } from 'react';

const App = () => {
  const getStorageData = () => {
    const list = localStorage.getItem("mytodolist");
    if (list) {
      return JSON.parse(list);
    } else {
      return [];
    }
  };
  const [data, setData] = useState("");
  const [elements, setElements] = useState(getStorageData);
  const [editedItem, setEditedItem] = useState(null);
  const [toggleButton, setToggleButton] = useState(false);

  // add items function
  const addTasks = () => {
    if (!data) {
      alert("Please fill the Data");
    } else if (editedItem) {
      setElements((prevElements) =>
        prevElements.map((CurElem) => {
          if (CurElem.id === editedItem) {
            return { ...CurElem, name: data };
          }
          return CurElem;
        })
      );
      setToggleButton(false);
      setData("");
      setEditedItem(null);
    } else {
      const myUniqueData = {
        id: new Date().getTime().toString(),
        name: data,
      };
      setElements([...elements, myUniqueData]);
      setData("");
    }
  };

  // Update Data
  const editItems = (index) => {
    const editedItem = elements.find((CurElem) => CurElem.id === index);
    setData(editedItem.name);
    setEditedItem(index);
    setToggleButton(true);
  };

  // Delete Data From list
  const deleteItem = (index) => {
    const updatedItem = elements.filter((CurElem) => CurElem.id !== index);
    setElements(updatedItem);
  }

  // Delete All Data
  const removeAll = () => {
    setElements([]);
  }

  // Use useEffect to save data in Local Storage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(elements));
  }, [elements]);

  return (
    <>
      <div className='main-div'>
        <div className='child-div'>
          <figure>
            <img src='images/todolist.svg' />
          </figure>
          <figcaption>
            Add Your List Here
          </figcaption>
          <div className='addTasks'>
            <input
              type='text'
              placeholder='✍ Add Items'
              className='form-class'
              value={data}
              onChange={(event) => setData(event.target.value)}
            />
            {toggleButton ? (
              <i
                className='far fa-edit'
                aria-hidden="true"
                onClick={addTasks}
              ></i>
            ) : (
              <i
                className='fa fa-plus'
                aria-hidden="true"
                onClick={addTasks}
              ></i>
            )}
          </div>
          {/* Show Data */}
          <div className='showData'>
            {elements.map((CurElem, index) => {
              return (
                <div className='eachData' key={CurElem.id}>
                  <h3>{CurElem.name}</h3>
                  {/* <h4>heeeee</h4> */}
                  <div className='todo-btn'>
                    <i
                      className='far fa-edit'
                      aria-hidden="true"
                      onClick={() => editItems(CurElem.id)}
                    ></i>
                    <i
                      className='far fa-trash-alt'
                      aria-hidden="true"
                      onClick={() => deleteItem(CurElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Remove all Items */}
          <div className='showItems'>
            <button
              className='btn effect04'
              data-sm-link-text="Remove Data"
              onClick={removeAll}
            >
              Checklist
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
