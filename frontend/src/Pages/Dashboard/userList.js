import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
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
  CircularProgress,
} from "@mui/material";

import { API_ENDPOINTS } from "../../utils/api-endpoints";

const UserList = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [modalData, setModalData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false); // For modal button loading

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(API_ENDPOINTS.GET_ALL_USERS);
        setUsers(data.users || data || []);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users.");
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const students = useMemo(() => users.filter((u) => !u.isAdmin), [users]);
  const admins = useMemo(() => users.filter((u) => u.isAdmin), [users]);

  const filteredStudents = useMemo(
    () =>
      students.filter(
        (s) =>
          (s.username?.toLowerCase().includes(searchText.toLowerCase()) ||
            s.email?.toLowerCase().includes(searchText.toLowerCase())) &&
          (classFilter ? s.class === classFilter : true)
      ),
    [searchText, classFilter, students]
  );

  const filteredAdmins = useMemo(
    () =>
      admins.filter(
        (a) =>
          a.username?.toLowerCase().includes(searchText.toLowerCase()) ||
          a.email?.toLowerCase().includes(searchText.toLowerCase())
      ),
    [searchText, admins]
  );

  // Handle Activate/Deactivate API call
const handleConfirm = async () => {
  if (!modalData) return;

  setActionLoading(true);
  try {
    // Map the modal action to API status
    const apiStatus = modalData.action === "Activate" ? "active" : "deactive";

    // POST request with query params
    await axios.post(`${API_ENDPOINTS.UPDATE_STATUS}?id=${modalData.id}&status=${apiStatus}`);

    // Update local table data
    setUsers((prev) =>
      prev.map((user) =>
        user._id === modalData.id
          ? { ...user, status: apiStatus }
          : user
      )
    );

    setModalData(null);
  } catch (err) {
    console.error("Failed to update status:", err);
    alert("Failed to update status. Try again.");
  } finally {
    setActionLoading(false);
  }
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
            {data.length > 0 ? (
              data.map((item) => (
                <TableRow
                  key={item._id}
                  sx={{
                    "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                    "&:hover": { backgroundColor: "#f1f5f9" },
                  }}
                >
                  <TableCell>{item.username || "-"}</TableCell>
                  <TableCell>{item.email || "-"}</TableCell>
                  <TableCell>{item.phone || "-"}</TableCell>
                  {isStudent && <TableCell>{item.class || "-"}</TableCell>}
                  <TableCell>
                    <Typography
                      sx={{
                        color: item.status === "active" ? "green" : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {item.status || "-"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {item.createdAt ? new Date(item.createdAt).toLocaleString() : "-"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color={item.status === "active" ? "error" : "success"}
                      size="small"
                      onClick={() =>
                        setModalData({
                          id: item._id,
                          type: isStudent ? "student" : "admin",
                          action: item.status === "active" ? "Deactivate" : "Activate",
                        })
                      }
                    >
                      {item.status === "active" ? "Deactivate" : "Activate"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={isStudent ? 7 : 6} align="center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
      <Typography variant="h4" mb={3}>
        User's List
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              mb: 2,
              flexWrap: "wrap",
            }}
          >
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
                <MenuItem value="VII">VI</MenuItem>
                <MenuItem value="VII">VII</MenuItem>
                <MenuItem value="VIII">VIII</MenuItem>
                <MenuItem value="IX">IX</MenuItem>
                <MenuItem value="X">X</MenuItem>
                <MenuItem value="X">X</MenuItem>
                <MenuItem value="X">XII</MenuItem>
              </TextField>
            )}
          </Box>

          {/* Table */}
          <Box sx={{ overflowX: "auto" }}>
            {activeTab === 0 && renderTable(filteredStudents, true)}
            {activeTab === 1 && renderTable(filteredAdmins, false)}
          </Box>
        </>
      )}

      {/* Confirmation Modal */}
      <Dialog open={Boolean(modalData)} onClose={() => setModalData(null)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to <strong>{modalData?.action}</strong>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalData(null)} disabled={actionLoading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color={modalData?.action?.toLowerCase() === "deactivate" ? "error" : "success"}
            onClick={handleConfirm}
            disabled={actionLoading}
          >
            {actionLoading ? "Updating..." : modalData?.action}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserList;
