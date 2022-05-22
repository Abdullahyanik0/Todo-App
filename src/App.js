/* eslint-disable no-lone-blocks */
import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";

const Modal = ({
  handleClose,
  open,
  modalText,
  setModalText,
  handleSubmit,
}) => {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Todo"
            type="email"
            fullWidth
            variant="standard"
            value={modalText.value}
            onChange={(e) =>
              setModalText((prevState) => ({
                id: prevState.id,
                value: e.target.value,
              }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Onayla</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const App = () => {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  function addItem() {
    if (!newItem) {
      alert("Değer Gir");

      return;
    }
   

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
    };
    setItems((prevState) => [...prevState, item]);
    setNewItem("");
  }

  function deleteItem(id) {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
  }
  const handleUpdate = (item) => {
    setOpen(true);
    setModalText(item);
  };

  const handleSubmit = () => {
    const newArr = items.map((item) =>
      item.id !== modalText.id ? item : { id: item.id, value: modalText.value }
    );
    setItems(newArr);
    setOpen(false);
  };
 

  return (
    <Box
      sx={{
        marginTop: "5rem",
        maxWidth: "100%",
        textAlign: "center",
      }}
    >
      <h1>Todo App</h1>
      <Input
        type="text"
        placeholder="Ekle"
        value={newItem}
        autoFocus
        onChange={(e) => setNewItem(e.target.value)}
      ></Input>
      <Button
        variant="contained"
        onClick={() => addItem()}
        
      >
        Ekle
      </Button>
      <List>
        {items?.map((item) => (
          <ListItemText key={item.id}>
            {item.value}{" "}
            <Button variant="outlined" onClick={() => handleUpdate(item)}>
              update
            </Button>
            <Button variant="outlined" onClick={() => deleteItem(item.id)}>
              Sil
            </Button>
          </ListItemText>
        ))}
      </List>
      <Modal
        open={open}
        handleClose={handleClose}
        setModalText={setModalText}
        modalText={modalText}
        handleSubmit={handleSubmit}
      />
    </Box>
  );
};

export default App;
