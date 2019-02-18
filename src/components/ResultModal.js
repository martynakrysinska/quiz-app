import React from "react";
import Modal from "react-responsive-modal";

const QuizResultModal = props => {
  if (props.result.result !== "") {
    const { isOpen, closeModal, result, callQuiz } = props;
    return (
      <Modal open={isOpen} onClose={closeModal} center>
        <div className="resultModal text-center">
          <h2>Quiz result</h2>
          <p className="result-percent">{result.percent}%</p>
          <button className="m-3" onClick={closeModal}>
            See the answers
          </button>
          <button className="m-3" onClick={callQuiz}>
            Try another quiz
          </button>
        </div>
      </Modal>
    );
  } else return null;
};

export default QuizResultModal;
