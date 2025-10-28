import React, { useState, useEffect } from "react";

export default function Body() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    address: "",
    number: "",
    gender: "",
  });
  const [editUserId, setEditUserId] = useState(null);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/api/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    if (res.ok) {
      setNewUser({ name: "", address: "", number: "", gender: "" });
      fetchUsers();
    }
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/users/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  const handleEdit = (user) => {
    setEditUserId(user._id);
    setNewUser({
      name: user.name,
      address: user.address,
      number: user.number,
      gender: user.gender,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/api/users/${editUserId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    setEditUserId(null);
    setNewUser({ name: "", address: "", number: "", gender: "" });
    fetchUsers();
  };

  return (
    <div className="container my-5 text-center">
      <h2>{editUserId ? "Update User" : "Add a User"}</h2>
      <form onSubmit={editUserId ? handleUpdate : handleAddUser}>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="form-control w-50 d-inline-block mt-3"
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={newUser.address}
          onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
          className="form-control w-50 d-inline-block mt-3"
          required
        />
        <input
          type="text"
          placeholder="Number"
          value={newUser.number}
          onChange={(e) => setNewUser({ ...newUser, number: e.target.value })}
          className="form-control w-50 d-inline-block mt-3"
          required
        />
        <input
          type="text"
          placeholder="Gender"
          value={newUser.gender}
          onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}
          className="form-control w-50 d-inline-block mt-3"
          required
        />
        <button type="submit" className="btn btn-primary ms-2 mt-3">
          {editUserId ? "Update" : "Add"}
        </button>
      </form>

      <div className="mt-5">
        <h3>Saved Users</h3>
        <ul className="list-group w-75 mx-auto">
          {users.length > 0 ? (
            users.map((u) => (
              <li
                key={u._id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  <strong>{u.name}</strong> — {u.address} — {u.number} —{" "}
                  {u.gender}
                </span>
                <div>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(u)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(u._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="list-group-item">No users found</li>
          )}
        </ul>
      </div>
    </div>
  );
}
