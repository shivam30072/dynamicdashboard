import { Box, Typography } from "@mui/material";
import React from "react";

const Widgets = ({ data }) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"350px"}
      height={"200px"}
      borderRadius={"12px"}
      bgcolor={"#fff"}
      boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"}
      mt={2}
    >
      <Typography color={"#050505"} fontWeight={"bold"} fontSize={"14px"}>
        {data.name}
      </Typography>
    </Box>
  );
};

export default Widgets;
