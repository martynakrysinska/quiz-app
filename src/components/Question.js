import React from "react";
import escapeHtml from "../utils/escapeHtml";
//import ResultModal from "./ResultModal";

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    return {
      question: {
        category: "",
        type: "",
        difficulty: "",
        question: "",
        answers: [],
        correctAnswer: ""
      },
      isVisible: false,
      isDisabled: false,
      isSubmitted: false,
      selectedAnswer: "",
      result: {
        message: "",
        result: ""
      },
      modalOpen: false
    };
  };
  callQuestion = () => {
    this.props
      .callAPI(
        `https://opentdb.com/api.php?amount=20&category=${
          this.props.category
        }&type=multiple`
      )
      .then(data => {
        this.renderQuestion(data);
      });

    this.setState(this.getInitialState());
  };

  renderQuestion(data) {
    const response = data.results[0];
    const answers = response.incorrect_answers
      .concat(response.correct_answer)
      .sort();
    const question = {
      category: response.category,
      type: response.type,
      difficulty: response.difficulty,
      question: escapeHtml(response.question),
      answers: answers.map(answer => escapeHtml(answer)),
      correctAnswer: escapeHtml(response.correct_answer)
    };
    this.setState({
      question,
      isVisible: true,
      isDisabled: false
    });
  }

  getAnswer = answer => {
    this.setState({
      selectedAnswer: answer
    });
  };

  submit = () => {
    let result =
      this.state.question.correctAnswer === this.state.selectedAnswer
        ? "correct"
        : "wrong";
    let message = this.resultMessage(result);
    this.setState({
      isDisabled: true,
      isSubmitted: true,
      modalOpen: true,
      result: {
        message,
        result
      }
    });
  };

  resultMessage = result => {
    return result === "correct"
      ? `Correct!`
      : `Wrong! Correct answer: <br> ${this.state.question.correctAnswer}`;
  };

  assignClass = answer => {
    return this.state.question.correctAnswer === answer ? "correct" : "wrong";
  };

  openModal = () => this.setState({ modalOpen: true });
  closeModal = () => this.setState({ modalOpen: false });

  render() {
    const { mode, category } = this.props;
    if (mode === "question") {
      return (
        <div className="row justify-content-center">
          {category !== "" && (
            <button
              className="col-8 p-3 m-3 mode-btn"
              onClick={() => this.callQuestion()}
            >
              Get a question
            </button>
          )}
          <div className="col-10 m-2  text-center">
            <h2>{this.state.question.category}</h2>
            <h3>{this.state.question.question}</h3>

            {this.state.question.answers.map((answer, i) => (
              <div className="justify-content-center" key={i}>
                <input
                  disabled={this.state.isSubmitted}
                  onChange={() => this.getAnswer(answer, i)}
                  type="radio"
                  id={answer}
                  name="question"
                  value={answer}
                />
                <label
                  className={
                    this.state.isSubmitted ? this.assignClass(answer) : "label"
                  }
                  htmlFor={answer}
                >
                  {answer}
                </label>
              </div>
            ))}

            {this.state.isVisible && (
              <button
                className="col-6 m-3 p-3 mode-btn"
                disabled={this.state.isDisabled}
                onClick={this.submit}
              >
                Check
              </button>
            )}
          </div>
        </div>
      );
    } else return null;
  }
}

export default Question;
