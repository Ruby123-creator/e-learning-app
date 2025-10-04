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
import EmptyBox from "../../components/common/empty";

const UserList = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [modalData, setModalData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

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

  const handleConfirm = async () => {
    if (!modalData) return;

    setActionLoading(true);
    try {
      const apiStatus = modalData.action === "Activate" ? "active" : "deactive";
      await axios.post(
        `${API_ENDPOINTS.UPDATE_STATUS}?id=${modalData.id}&status=${apiStatus}`
      );
      setUsers((prev) =>
        prev.map((user) =>
          user._id === modalData.id ? { ...user, status: apiStatus } : user
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
      <TableContainer
        component={Paper}
        sx={{
          width: "max-content",
          backgroundColor: "rgb(14,17,17)",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Table sx={{ minWidth: 0 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1e1e1e" }}>
              <TableCell sx={{ color: "#fff" }}>Username</TableCell>
              <TableCell sx={{ color: "#fff" }}>Email</TableCell>
              <TableCell sx={{ color: "#fff" }}>Phone</TableCell>
              {isStudent && <TableCell sx={{ color: "#fff" }}>Class</TableCell>}
              <TableCell sx={{ color: "#fff" }}>Status</TableCell>
              <TableCell sx={{ color: "#fff" }}>Created At</TableCell>
              <TableCell sx={{ color: "#fff" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((item) => (
                <TableRow
                  key={item._id}
                  sx={{
                    "&:nth-of-type(odd)": { backgroundColor: "#1a1a1a" },
                    "&:nth-of-type(even)": { backgroundColor: "#111" },
                    "&:hover": { backgroundColor: "#222" },
                  }}
                >
                  <TableCell sx={{ color: "#fff" }}>
                    {item.username || "-"}
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    {item.email || "-"}
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    {item.phone || "-"}
                  </TableCell>
                  {isStudent && (
                    <TableCell sx={{ color: "#fff" }}>
                      {item.class || "-"}
                    </TableCell>
                  )}
                  <TableCell>
                    <Typography
                      sx={{
                        color:
                          item.status === "active" ? "limegreen" : "tomato",
                        fontWeight: "bold",
                      }}
                    >
                      {item.status || "-"}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleString()
                      : "-"}
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
                          action:
                            item.status === "active"
                              ? "Deactivate"
                              : "Activate",
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
                <TableCell
                  colSpan={isStudent ? 7 : 6}
                  align="center"
                  sx={{ color: "#fff" }}
                >
                  <EmptyBox
                    message={"No Users found"}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  return (
    <Box sx={{ p: 3, textAlign: "center", backgroundColor: "rgb(14,17,17)" }}>
      <Typography variant="h4" mb={3} sx={{ color: "#fff" }}>
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
              TabIndicatorProps={{ style: { backgroundColor: "#38b6b6" } }}
              textColor="inherit"
            >
              <Tab label="Students" sx={{ color: "#fff" }} />
              <Tab label="Admins" sx={{ color: "#fff" }} />
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
              sx={{
                minWidth: 250,
                maxWidth: 400,
                flex: 1,
                input: { color: "#fff" },
                label: { color: "#bbb" },
                fieldset: { borderColor: "#555" },
                "&:hover fieldset": { borderColor: "#888" },
              }}
            />
            {activeTab === 0 && (
              <TextField
                select
                label="Class"
                variant="outlined"
                size="small"
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                sx={{
                  minWidth: 120,
                  "& .MuiInputBase-input": { color: "#fff" }, // selected value in the input box
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#555" }, // border color
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#888",
                  },
                  "& .MuiInputLabel-root": { color: "#bbb" }, // label color
                  "& .MuiSelect-icon": { color: "#fff" }, // dropdown arrow
                  "& .MuiMenuItem-root": { color: "#fff" }, // items in dropdown
                }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="UPSC">UPSC</MenuItem>
                <MenuItem value="Current Affairs">Current Affairs</MenuItem>
                <MenuItem value="Other Competitive Exams">Other Competitive Exams</MenuItem>

                <MenuItem value="VI">VI</MenuItem>
                <MenuItem value="VII">VII</MenuItem>
                <MenuItem value="VIII">VIII</MenuItem>
                <MenuItem value="IX">IX</MenuItem>
                <MenuItem value="X">X</MenuItem>
                <MenuItem value="XI">XI</MenuItem>
                <MenuItem value="XII">XII</MenuItem>
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
      <Dialog
        open={Boolean(modalData)}
        onClose={() => setModalData(null)}
        PaperProps={{ sx: { backgroundColor: "#1a1a1a", color: "#fff" } }}
      >
        <DialogTitle sx={{ color: "#fff" }}>Confirmation</DialogTitle>
        <DialogContent sx={{ color: "#fff" }}>
          Are you sure you want to <strong>{modalData?.action}</strong>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setModalData(null)}
            disabled={actionLoading}
            sx={{ color: "#fff", borderColor: "#555" }}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color={
              modalData?.action?.toLowerCase() === "deactivate"
                ? "error"
                : "success"
            }
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
