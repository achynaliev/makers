import React, { useState } from "react";
import Footer from "./components/footer/Footer";
import Header from "./components/header/header";
import MainBody from "./components/main/mainSection";
import View from "./components/View/view.jsx";

function App() {
  const [todos, setTodos] = useState([]);
  function addTask(val) {
    let obj = {
      title: val,
      id: Date.now(),
    };
    let todosArr = [...todos, obj];
    setTodos(todosArr);
  }
  console.log(todos);
  return (
    <div>
      <Header arr={[1, 2, 3, 4, 5]} addTask={addTask} />
      <View todos={todos} />
      <MainBody />
      <Footer />
    </div>
  );
}

export default App;
