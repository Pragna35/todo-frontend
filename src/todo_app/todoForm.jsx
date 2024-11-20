import { useState, useEffect } from "react";

import axios from "axios";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [list, setList] = useState([]);
  const [editTodo, setEditTodo] = useState(null);

  async function gettingData() {
    const tasks = await axios.get("http://localhost:3003/tasks");
    console.log(tasks.data);
    setList(tasks.data);
  }

  useEffect(() => {
    gettingData();
  }, []);

  const handleInput = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editTodo) {
      await axios.patch(`http://localhost:3003/updateTask/${editTodo.id}`, {
        title: title,
      });

      setEditTodo(null);
    } else {
      await axios.post("http://localhost:3003/sendingData", {
        title: title,
      });
    }
    gettingData();
    setTitle("");
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3003/deleteTask/${id}`);
    gettingData();
  };

  const handleEdit = (id, title) => {
    console.log({ id, title });
    setEditTodo({ id, title });
    setTitle(title);
  };

  const diaplayList = list.map((val, ind) => {
    return (
      <tr key={ind}>
        <td>{val.id}</td>
        <td>{val.title}</td>
        <td>
          <button
            onClick={() => {
              handleDelete(val.id);
            }}
          >
            delete
          </button>
        </td>
        <td>
          <button
            onClick={() => {
              handleEdit(val.id, val.title);
            }}
          >
            Edit
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <h1>hii iam todo</h1>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          placeholder="add new task..."
          onChange={handleInput}
        />
        <input type="submit" value={editTodo ? "update" : "add"} />
      </form>

      <table>{diaplayList}</table>
    </>
  );
};

export default TodoForm;
