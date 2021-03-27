import {Button, Modal} from "react-bootstrap";

const SimpleModal = ({showModal, handleCloseModal, bodyTxt, title}) => {
    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{bodyTxt}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default SimpleModal