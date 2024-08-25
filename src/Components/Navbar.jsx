import { Search } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  return (
    <Box
      py={1}
      px={3}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      bgcolor={"#fff"}
    >
      <Typography color={"#395B7B"} fontWeight={"bold"}>
        Dashboard V2
      </Typography>

      <Box>
        {/* <Search /> */}
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px 12px",
            width: "280px",
            outline: "none",
            border: "1px solid #DDEBFF",
            borderRadius: "6px",
            background: "#F0F5FA",
          }}
          type="text"
          placeholder="Search widgets..."
        />
      </Box>

      <Box>
        <NotificationsActiveIcon />
      </Box>
    </Box>
  );
};

export default Navbar;
