import {
  Box,
  Button,
  Checkbox,
  Container,
  Drawer,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Navbar from "./Navbar";
import { Add, Close } from "@mui/icons-material";
import { categoriesJSON } from "../CategoriesJson";
import Widgets from "./Widgets";
import AddWidgetModal from "./AddWidgetModal";

const DrawerComponent = ({ onClose, categories, setCategories }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCheckboxChange = (categoryId, widgetId) => {
    const updatedCategories = categories.map((category) => {
      if (category.id === categoryId) {
        const updatedWidgets = category.widgets.map((widget) => {
          if (widget.id === widgetId) {
            return { ...widget, include: !widget.include };
          }
          return widget;
        });
        return { ...category, widgets: updatedWidgets };
      }
      return category;
    });

    setCategories(updatedCategories);
  };

  return (
    <Box minWidth={"500px"}>
      <Box
        p={2}
        bgcolor={"#14147D"}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Typography color={"#fff"}>Add Widget</Typography>
        <Close onClick={onClose} sx={{ color: "#fff" }} />
      </Box>
      <Typography pt={1} px={1}>
        Personalise your Dashboard by adding the widgets
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          {categories.map((item) => (
            <Tab label={item.name} />
          ))}
        </Tabs>
      </Box>

      <Box p={2}>
        {categories[value].widgets.map((widget) => (
          <Box key={widget.id} display="flex" alignItems="center" my={1}>
            <Checkbox
              checked={widget.include}
              onChange={() =>
                handleCheckboxChange(categories[value].id, widget.id)
              }
            />
            <Typography variant="body1">{widget.name}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const Dashboard = () => {
  const [categories, setCategories] = useState(categoriesJSON);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newWidgetName, setNewWidgetName] = useState("");
  const [newWidgetText, setNewWidgetText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenModal = (categoryId) => {
    setSelectedCategory(categoryId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNewWidgetName("");
    setNewWidgetText("");
  };

  const handleAddWidget = () => {
    const updatedCategories = categories.map((category) => {
      if (category.id === selectedCategory) {
        const newWidget = {
          id: category.widgets.length + 1,
          name: "widget " + newWidgetName,
          text: newWidgetText,
          include: true,
        };
        return { ...category, widgets: [...category.widgets, newWidget] };
      }
      return category;
    });

    setCategories(updatedCategories);
    handleCloseModal();
  };

  const filteredCategories = categories
    .map((category) => ({
      ...category,
      widgets: category.widgets.filter((widget) =>
        widget.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.widgets.length > 0);

  const handleOpenDrawer = () => setOpenDrawer(true);
  const handleCloseDrawer = () => setOpenDrawer(false);
  return (
    <Box bgcolor={"#F0F5FA"} minHeight={"100vh"}>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <Container>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          py={2}
        >
          <Typography color={"#050505"} fontWeight={"bold"}>
            CNAPP Dashboard
          </Typography>
          <Button
            onClick={handleOpenDrawer}
            endIcon={<Add />}
            sx={{
              border: "2px solid #E5EAEF",
              bgcolor: "#fff",
              padding: "4px 8px",
              color: "#000",
              borderRadius: "8px",
            }}
          >
            Add Widget
          </Button>
        </Box>

        <Box pb={4}>
          {filteredCategories.map((item) => (
            <Box key={item.id} mt={2}>
              <Typography
                color={"#050505"}
                fontWeight={"bold"}
                fontSize={"14px"}
              >
                {item.name}
              </Typography>
              <Box display={"flex"} gap={2} flexWrap={"wrap"}>
                {item.widgets.map((widget) => (
                  <>
                    {widget.include && (
                      <Widgets data={widget} key={widget.id} />
                    )}
                  </>
                ))}
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  borderRadius={"12px"}
                  bgcolor={"#fff"}
                  boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"}
                  mt={2}
                  width={"350px"}
                  height={"200px"}
                  cursor={"pointer"}
                  onClick={() => handleOpenModal(item.id)}
                >
                  <Typography color={"#888"}>+ Add Widget</Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        <AddWidgetModal
          open={openModal}
          setNewWidgetName={setNewWidgetName}
          setNewWidgetText={setNewWidgetText}
          newWidgetName={newWidgetName}
          newWidgetText={newWidgetText}
          handleClose={handleCloseModal}
          handleAddWidget={handleAddWidget}
        />
      </Container>

      <Drawer open={openDrawer} onClose={handleCloseDrawer} anchor="right">
        <DrawerComponent
          onClose={handleCloseDrawer}
          categories={categories}
          setCategories={setCategories}
        />
      </Drawer>
    </Box>
  );
};

export default Dashboard;
