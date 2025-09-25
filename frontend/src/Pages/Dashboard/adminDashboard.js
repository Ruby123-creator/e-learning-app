import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Tabs,
  Tab,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [modalData, setModalData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [classFilter, setClassFilter] = useState("");

  const students = [
    { id: 1, username: "Simran", email: "simran@example.com", phone: "9876543210", class: "VII", status: "active", createdAt: "2025-09-24T11:47:21.012Z" },
    { id: 2, username: "Rahul", email: "rahul@example.com", phone: "9876500000", class: "X", status: "inactive", createdAt: "2025-08-10T09:20:11.012Z" },
  ];

  const admins = [
    { id: 1, username: "Admin1", email: "admin1@example.com", phone: "9876501111", status: "active", createdAt: "2025-07-15T11:20:21.012Z" },
    { id: 2, username: "Admin2", email: "admin2@example.com", phone: "9876502222", status: "inactive", createdAt: "2025-06-01T08:47:21.012Z" },
  ];

  const filteredStudents = useMemo(
    () =>
      students.filter(
        (s) =>
          (s.username.toLowerCase().includes(searchText.toLowerCase()) ||
            s.email.toLowerCase().includes(searchText.toLowerCase())) &&
          (classFilter ? s.class === classFilter : true)
      ),
    [searchText, classFilter, students]
  );

  const filteredAdmins = useMemo(
    () =>
      admins.filter(
        (a) =>
          a.username.toLowerCase().includes(searchText.toLowerCase()) ||
          a.email.toLowerCase().includes(searchText.toLowerCase())
      ),
    [searchText, admins]
  );

  const handleConfirm = () => {
    if (modalData) {
      console.log(`${modalData.action} user with id: ${modalData.id} from ${modalData.type}`);
    }
    setModalData(null);
  };

 const renderTable = (data, isStudent = true) => (
  <Box sx={{ display: "flex", justifyContent: "center", overflowX: "auto" }}>
    <TableContainer component={Paper} sx={{ width: "max-content" }}>
      <Table sx={{ minWidth: 0 }}>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            {isStudent && <TableCell>Class</TableCell>}
            <TableCell>Status</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" }, "&:hover": { backgroundColor: "#f1f5f9" } }}>
              <TableCell>{item.username}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.phone}</TableCell>
              {isStudent && <TableCell>{item.class}</TableCell>}
              <TableCell>
                <Typography sx={{ color: item.status === "active" ? "green" : "red", fontWeight: "bold" }}>
                  {item.status}
                </Typography>
              </TableCell>
              <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color={item.status === "active" ? "error" : "success"}
                  size="small"
                  onClick={() =>
                    setModalData({
                      id: item.id,
                      type: isStudent ? "student" : "admin",
                      action: item.status === "active" ? "Deactivate" : "Activate",
                    })
                  }
                >
                  {item.status === "active" ? "Deactivate" : "Activate"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);


  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
      <Typography variant="h4" mb={3}>
        Admin Dashboard
      </Typography>

      <Box sx={{ display: "inline-block", mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(e, val) => {
            setActiveTab(val);
            setSearchText("");
            setClassFilter("");
          }}
          centered
        >
          <Tab label="Students" />
          <Tab label="Admins" />
        </Tabs>
      </Box>

      {/* Filters */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2, flexWrap: "wrap" }}>
        <TextField
          label="Search by Username or Email"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ minWidth: 250, maxWidth: 400, flex: 1 }}
        />
        {activeTab === 0 && (
          <TextField
            select
            label="Class"
            variant="outlined"
            size="small"
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="VII">VII</MenuItem>
            <MenuItem value="VIII">VIII</MenuItem>
            <MenuItem value="IX">IX</MenuItem>
            <MenuItem value="X">X</MenuItem>
          </TextField>
        )}
      </Box>

      {/* Table */}
      <Box sx={{ overflowX: "auto" }}>
        {activeTab === 0 && renderTable(filteredStudents, true)}
        {activeTab === 1 && renderTable(filteredAdmins, false)}
      </Box>

      {/* Confirmation Modal */}
      <Dialog open={Boolean(modalData)} onClose={() => setModalData(null)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to <strong>{modalData?.action}</strong> this {modalData?.type} (id: {modalData?.id})?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalData(null)}>Cancel</Button>
          <Button
            variant="contained"
            color={modalData?.action.toLowerCase() === "deactivate" ? "error" : "success"}
            onClick={handleConfirm}
          >
            {modalData?.action}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;
