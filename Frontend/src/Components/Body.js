// frontend/src/components/Body.js
import React, { useState, useEffect } from "react";

export default function Body() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    number: "",
    gender: "",
  });
  const [users, setUsers] = useState([]);

  // Fetch users
  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then(res => res.json())
      .then(data => Array.isArray(data) ? setUsers(data) : setUsers([]))
      .catch(err => console.log(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.address || !formData.number || !formData.gender) return;

    try {
      const res = await fetch("http://localhost:5000/api/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data._id) {
        setUsers(prev => [...prev, data]);
        setFormData({ name: "", address: "", number: "", gender: "" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (res.ok) {
        setUsers(users.filter(u => u._id !== id));
        console.log(result.message);
      } else {
        console.error(result.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container my-5 text-center">
      <h2>Add a User</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="form-control mt-3" required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="form-control mt-3" required />
        <input type="text" name="number" placeholder="Number" value={formData.number} onChange={handleChange} className="form-control mt-3" required />
        <select name="gender" value={formData.gender} onChange={handleChange} className="form-control mt-3" required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit" className="btn btn-primary mt-3">Add User</button>
      </form>

      <div className="mt-5">
        <h3>Saved Users</h3>
        <ul className="list-group w-75 mx-auto">
          {users.length > 0 ? users.map(u => (
            <li key={u._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{u.name}</strong> | {u.address} | {u.number} | {u.gender}
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u._id)}>Delete</button>
            </li>
          )) : <li className="list-group-item">No users found</li>}
        </ul>
      </div>
    </div>
  );
}
