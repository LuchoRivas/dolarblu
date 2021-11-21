import React from "react";
import { Dimensions } from "react-native";
import { Modal, RadioButton, Portal } from "react-native-paper";
import { COLORS } from "../constants/Colors";
import { MODAL_STYLES } from "../constants/ComponentStyles";
import TextHelper from "../helpers/TextHelper";

export default function TypesModal(props: TypesModalProps) {
  // Props
  const { visible, toggleModal, selected, options, onChangeType } = props;
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={toggleModal}
        contentContainerStyle={MODAL_STYLES}
      >
        <RadioButton.Group
          onValueChange={(value) => onChangeType(value)}
          value={selected._id.$oid}
        >
          {options &&
            options.map((type, index) => {
              return (
                <RadioButton.Item
                  style={{ width: Dimensions.get("window").width * 0.7 }}
                  key={index}
                  label={TextHelper.capitalize(type.name)}
                  value={type._id.$oid}
                  color={COLORS.primary}
                />
              );
            })}
        </RadioButton.Group>
      </Modal>
    </Portal>
  );
}
