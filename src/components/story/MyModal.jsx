import { Modal, Form, FloatingLabel } from "react-bootstrap";

const PostModal = ({ show, onHide, newPost, newPostChangeHandler, file }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">New Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={newPost}>
          <div className="select_form_div">
            <Form.Select
              aria-label="Default select example"
              name="media_type"
              size="sm"
              onChange={newPostChangeHandler}
            >
              <option value="">Media Type</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="text">Text</option>
            </Form.Select>{" "}
            <br />
            {/* <Form.Select
              aria-label="Default select example"
              name="category"
              size="sm"
              onChange={newPostChangeHandler}
            >
              <option value="">Select Category</option>
              <option value="all">all</option>
              <option value="food">food</option>
            </Form.Select> */}
          </div>
          <br />
          <div style={{ display: "flex", gap: "10px" }}>
            <Form.Control
              type="file"
              name="images"
              onChange={newPostChangeHandler}
              style={{ height: "fit-content", alignSelf: "center" }}
            />{" "}
            {file && (
              <img
                alt=""
                src={URL.createObjectURL(file)}
                style={{ width: "100px" }}
              />
            )}
          </div>
          <br />
          <FloatingLabel
            controlId="floatingTextarea"
            label="Caption"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              name="caption"
              className="new_post_caption"
              onChange={newPostChangeHandler}
            />
          </FloatingLabel>
          <button type="submit" className="newPost_submit_btn" >
            Add
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PostModal;
