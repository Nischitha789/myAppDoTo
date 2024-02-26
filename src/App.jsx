import React, { useState } from 'react';
import ToDoAdd from './Components/ToDoAdd';
import FilterToDo from './Components/FilterToDo';
import ToDOCard from './Components/ToDOCard';
import "./App.css";

const App = () => {
  const [data, setData] = useState([
    {
      num: 1,
      cardData: {
        name: "Test-1",
        description: "Test-1",
        cardStatus: "notCompleted",
      },
    },

    {
      num: 2,
      cardData: {
        name: "Test-2",
        description: "Test-2",
        cardStatus: "notCompleted",
      },
    },

    {
      num: 3,
      cardData: {
        name: "Test-3",
        description: "Test-3",
        cardStatus: "notCompleted",
      },
    },
  ]);
   const [inpName, setInpName] = useState("");
   const [inpDes, setInpDes] = useState("");

   const [btnText, setBtnText] = useState("Add Todo");
   const [editId, setEditId] = useState("");

   function handleDelete(id) {
     const cardList = data.filter((card) => card.num !== id);
     setData(cardList);

     if (editId === id) {
       setBtnText("Add Todo");
       setInpName("");
       setInpDes("");
     }
   }

   function handleEdit(name, des, id) {
     setInpName(name);
     setInpDes(des);
     setBtnText("Save");
     setEditId(id);
   }

   //Adding or Editing a card
   function addCard(e) {
     e.preventDefault();

     let buttonText = e.nativeEvent.submitter.innerText;

     //Adding a Card
     if (buttonText === "Add Todo") {
       const id = data.length ? data[data.length - 1].num + 1 : 1;
       setData([
         ...data,
         {
           num: id,
           cardData: {
             name: inpName,
             description: inpDes,
             cardStatus: "notCompleted",
           },
         },
       ]);
     }

     //Editing a Card
     if (buttonText === "Save") {
       let ind;
       data.forEach((card, index) => {
         if (card.num === editId) {
           ind = index;
         }
       });
       let newData = [...data];
       newData[ind] = {
         num: editId,
         cardData: {
           ...newData[ind].cardData,
           name: inpName,
           description: inpDes,
         },
       };
       setData(newData);
       setBtnText("Add Todo");
     }

     setInpName("");
     setInpDes("");
   }

   //Edit Status
   function handleStatus(e, id) {
     let ind;
     data.forEach((card, index) => {
       if (card.num === id) {
         ind = index;
       }
     });
     let newData = [...data];

     newData[ind] = {
       ...newData[ind],
       cardData: {
         ...newData[ind].cardData,
         cardStatus: e.target.value,
       },
     };
     setData(newData);
   }

   //Filtering Card
   const [filterCard, setFilterCard] = useState("All");

   function handleFilter(e) {
     setFilterCard(e.target.value);
   }
  return (
    <div>
    <div className="container">
      <header className="todo-head">
        <ToDoAdd
          addCard={addCard}
          inpName={inpName}
          inpDes={inpDes}
          setInpName={setInpName}
          setInpDes={setInpDes}
          btnText={btnText}
        />
      </header>
      <FilterToDo filterCard={filterCard} handleFilter={handleFilter} />
      <div className="card-container">
        {data.length ? (
          data
            .filter((card) => {
              if (filterCard === "All") {
                return card;
              } else if (filterCard === "notCompleted") {
                if (filterCard === card.cardData.cardStatus) {
                  return card;
                }
              } else if (filterCard === "completed") {
                if (filterCard === card.cardData.cardStatus) {
                  return card;
                }
              }
            })
            .map((card) => (
              <ToDOCard
                key={card.num}
                id={card.num}
                name={card.cardData.name}
                description={card.cardData.description}
                cardStatus={card.cardData.cardStatus}
                handleStatus={handleStatus}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))
        ) : (
          <div className="todo-message">There is no To-do list Add some</div>
        )}
        </div>
      </div>
      </div>
    
  );
};

export default App;