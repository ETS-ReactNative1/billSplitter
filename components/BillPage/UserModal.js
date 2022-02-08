import React from "react";
import {
  Button,
  Modal,
  FormControl,
  Input,
  Center,
  NativeBaseProvider,
} from "native-base";
import { useState } from "react";
import UsersList from "./UsersList";
import { Platform } from "react-native";

export default function UserModal({ userList, setUserList }) {
  const [inputValue, setInputValue] = useState("");
  const [showModal, setShowModal] = useState(false);

  const addUser = (user) => {
    setUserList([...userList, user]);
  };

  return (
    <>
      <UsersList userList={userList} />
      <>
        <Button
          shadow={2}
          style={{ borderRadius: 0 }}
          onPress={() => setShowModal(true)}
        >
          Add User
        </Button>

        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          avoidKeyboard
        >
          <Modal.Content minWidth="300px" maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>New User</Modal.Header>
            <Modal.Body>
              <FormControl>
                <Input
                  onChangeText={(v) => setInputValue(v)}
                  value={inputValue}
                />
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onPress={() => {
                    setShowModal(false);
                    addUser(inputValue);
                    setInputValue("");
                  }}
                >
                  Add
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </>
    </>
  );
}
