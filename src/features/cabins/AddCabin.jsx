import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <Button onClick={() => setShowModal((show) => !show)}>
        {showModal ? "Hide" : "Add New Cabin"}
      </Button>
      {showModal && (
        <Modal onCloseModal={() => setShowModal(false)}>
          <CreateCabinForm onCloseModal={() => setShowModal(false)} />
        </Modal>
      )}
    </div>
  );
}

export default AddCabin;
