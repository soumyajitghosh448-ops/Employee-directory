import { useState } from "react";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      employeeId: "EMP001",
      department: "Farming",
      gender: "Male",
      phone: "9876543210",
      localAddress: "Kolkata",
      permanentAddress: "Siliguri",
    },
    {
      id: 2,
      name: "Priya Das",
      employeeId: "EMP002",
      department: "Sales",
      gender: "Female",
      phone: "9123456780",
      localAddress: "Howrah",
      permanentAddress: "Durgapur",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    department: "",
    gender: "",
    phone: "",
    localAddress: "",
    permanentAddress: "",
  });

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Add or Update Employee
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.employeeId ||
      !formData.department ||
      !formData.gender ||
      !formData.phone ||
      !formData.localAddress ||
      !formData.permanentAddress
    ) {
      alert("Please fill all fields");
      return;
    }

    if (editingId) {
      setEmployees(
        employees.map((employee) =>
          employee.id === editingId
            ? { ...employee, ...formData }
            : employee
        )
      );

      setEditingId(null);
    } else {
      const newEmployee = {
        id: Date.now(),
        ...formData,
      };

      setEmployees([...employees, newEmployee]);
    }

    setFormData({
      name: "",
      employeeId: "",
      department: "",
      gender: "",
      phone: "",
      localAddress: "",
      permanentAddress: "",
    });
  };

  // Delete Employee
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (confirmDelete) {
      setEmployees(
        employees.filter((employee) => employee.id !== id)
      );
    }
  };

  // Edit Employee
  const handleEdit = (employee) => {
    setFormData({
      name: employee.name,
      employeeId: employee.employeeId,
      department: employee.department,
      gender: employee.gender,
      phone: employee.phone,
      localAddress: employee.localAddress,
      permanentAddress: employee.permanentAddress,
    });

    setEditingId(employee.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Cancel Editing
  const handleCancelEdit = () => {
    setEditingId(null);

    setFormData({
      name: "",
      employeeId: "",
      department: "",
      gender: "",
      phone: "",
      localAddress: "",
      permanentAddress: "",
    });
  };

  // Search + Department Filter
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      departmentFilter === "All" ||
      employee.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="app">
      <header>
        <h1>Employee Directory</h1>
        <p>Farm Employee Management System</p>
      </header>

      <div className="container">

        {/* Employee Count */}
        <div className="count-box">
          <h2>Total Employees: {employees.length}</h2>
        </div>

        {/* Employee Form */}
        <div className="form-container">
          <h2>
            {editingId ? "Edit Employee" : "Add Employee"}
          </h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Employee Name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="employeeId"
              placeholder="Employee ID"
              value={formData.employeeId}
              onChange={handleChange}
            />

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              <option value="Farming">Farming</option>
              <option value="Sales">Sales</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Management">Management</option>
            </select>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />

            <input
              type="text"
              name="localAddress"
              placeholder="Local Address"
              value={formData.localAddress}
              onChange={handleChange}
            />

            <input
              type="text"
              name="permanentAddress"
              placeholder="Permanent Address"
              value={formData.permanentAddress}
              onChange={handleChange}
            />

            <button type="submit">
              {editingId ? "Update Employee" : "Add Employee"}
            </button>

            {editingId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* Search and Filter */}
        <div className="controls">

          <input
            type="text"
            placeholder="Search by name or Employee ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={departmentFilter}
            onChange={(e) =>
              setDepartmentFilter(e.target.value)
            }
          >
            <option value="All">All Departments</option>
            <option value="Farming">Farming</option>
            <option value="Sales">Sales</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Management">Management</option>
          </select>

        </div>

        {/* Employee List */}
        <div className="employee-list">

          {filteredEmployees.length === 0 ? (
            <div className="no-data">
              <h3>No Employees Found</h3>
              <p>Try changing your search or department filter.</p>
            </div>
          ) : (
            filteredEmployees.map((employee) => (

              <div className="employee-card" key={employee.id}>

                <h2>{employee.name}</h2>

                <p>
                  <strong>Employee ID:</strong>{" "}
                  {employee.employeeId}
                </p>

                <p>
                  <strong>Department:</strong>{" "}
                  {employee.department}
                </p>

                <p>
                  <strong>Gender:</strong>{" "}
                  {employee.gender}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {employee.phone}
                </p>

                <p>
                  <strong>Local Address:</strong>{" "}
                  {employee.localAddress}
                </p>

                <p>
                  <strong>Permanent Address:</strong>{" "}
                  {employee.permanentAddress}
                </p>

                <div className="card-buttons">

                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(employee)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(employee.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))
          )}

        </div>

      </div>
    </div>
  );
}

export default App;