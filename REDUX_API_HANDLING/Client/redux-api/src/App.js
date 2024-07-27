import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData, deleteUser, fetchData, updateData } from "./redux/slice/todoSlice";

function App() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [editUser, setEditUser] = useState(null);

  const dispatch = useDispatch();

  const { isLoading, isError, data } = useSelector((state) => state.todo);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { name, number };

    dispatch(addData(user));
    setName("");
    setNumber("");
  };

  const handleEdit = (user) => {
    dispatch(updateData(user))
    setName(user.name);
    setNumber(user.number);
    setEditUser(user);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error...</h1>;
  }

  return (
    <>
      <div className="p-20">
        <div className="flex justify-center pb-10">
          <h1 className="text-3xl font-semibold">CRUD OPERATION</h1>
        </div>
        <div className="flex justify-center">
          <div className="bg-gray-300 rounded-md shadow-md px-10 py-5 w-[350px]">
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label className="block mb-3">Name:</label>
                <input
                  className="px-5 py-2 outline-none rounded-md shadow-lg w-full"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name..."
                  required
                />
              </div>

              <div className="mb-5">
                <label className="block mb-3">Number:</label>
                <input
                  className="px-5 py-2 outline-none rounded-md shadow-lg w-full"
                  type="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="Number..."
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 px-5 py-2 rounded-md text-white"
                >
                  {editUser ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold">User List</h2>
          <ul className="list-disc pl-5">
            {data && data.map((user) => (
              <li
                key={user._id}
                className="mb-2 flex justify-between items-center"
              >
                {user.name} - {user.number}
                <div>
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
