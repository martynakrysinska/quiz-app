import React from "react";
import QuizResultModal from "./ResultModal";
import escapeHtml from "../utils/escapeHtml";

export default class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizQuestions: [],
      category: "",
      amount: 0,
      answeredQuestions: new Map(),
      isVisible: false,
      isDisabled: false,
      isSubmitted: false,
      modalOpen: false,
      errorMessage: "",
      result: {
        percent: 0,
        points: 0
      }
    };
  }

  setAmount = e => {
    this.setState({
      amount: Number(e.target.value)
    });
  };

  callQuiz = () => {
    this.props
      .callAPI(
        `https://opentdb.com/api.php?amount=${this.state.amount}&category=${
          this.props.category
        }&type=multiple`
      )
      .then(data => this.renderQuiz(data))
      .catch(e => {
        console.log(e);
        const errorMessage = e
          ? "Sorry, there are not enough questions in this category"
          : "";
        this.setState({
          errorMessage
        });
      });

    this.setState({
      quizQuestions: [],
      answeredQuestions: new Map(),
      isVisible: false,
      isDisabled: false,
      isSubmitted: false,
      modalOpen: false,
      errorMessage: ""
    });
  };

  renderQuiz = data => {
    const quizQuestions = data.results.reduce((arr, quest) => {
      const { incorrect_answers, correct_answer, category, question } = quest;
      const answers = incorrect_answers.concat(correct_answer).sort();
      const newObj = {
        question: escapeHtml(question),
        answers: answers.map(answer => escapeHtml(answer)),
        category,
        correctAnswer: escapeHtml(correct_answer)
      };
      return arr.concat(newObj);
    }, []);

    this.setState({
      quizQuestions,
      isVisible: true,
      category: quizQuestions[0].category
    });
  };

  getAnswer = (question, answer) => {
    const answeredQuestions = this.state.answeredQuestions.set(
      question,
      answer
    );
    this.setState({
      answeredQuestions
    });
  };

  getResult = () => {
    const result = this.state.quizQuestions.filter(question => {
      return (
        question.correctAnswer === this.state.answeredQuestions.get(question)
      );
    });
    const points = result.length;
    const percent = Math.floor(
      (points / this.state.quizQuestions.length) * 100
    );
    this.setState({
      result: {
        points,
        percent
      }
    });
  };

  submit = e => {
    e.preventDefault();
    this.getResult();
    this.setState({
      isDisabled: true,
      isSubmitted: true,
      modalOpen: true
    });
  };

  assignClass = (question, answer) => {
    return question.correctAnswer === answer ? "correct" : "wrong";
  };

  assignClass2 = question => {
    return this.state.answeredQuestions.get(question) === question.correctAnswer
      ? "correct"
      : "wrong";
  };

  closeModal = () => this.setState({ modalOpen: false });

  render() {
    const { mode, category } = this.props;

    if (mode === "quiz" && category !== "") {
      return (
        <div className="row justify-content-center mb-5">
          <div className="col-10 text-center">
            <p>Number of questions: </p>
            <input
              type="number"
              min="1"
              max="50"
              className="amountInput"
              placeholder={this.state.amount}
              onChange={e => this.setAmount(e)}
            />
            <p>{this.state.errorMessage}</p>
          </div>
          {category !== "" && (
            <button className="col-8 m-3 p-3 mode-btn" onClick={this.callQuiz}>
              Generate a Quiz
            </button>
          )}

          <h2 className="col-10 m-3 p-3">{this.state.category}</h2>

          {this.state.quizQuestions.map((question, i) => (
            <div className="quiz-box col-3 m-3 p-3" key={i}>
              <h3
                className={
                  this.state.isSubmitted
                    ? this.assignClass2(question)
                    : "notSubmitted"
                }
              >{`${i + 1}. ${question.question}`}</h3>
              {question.answers.map((answer, i) => (
                <div className="text-center" key={i}>
                  <input
                    disabled={this.state.isSubmitted}
                    type="radio"
                    id={`${question.question}_${i}`}
                    name={question.question}
                    value={answer}
                    onChange={() => this.getAnswer(question, answer)}
                  />
                  <label
                    className={
                      this.state.isSubmitted
                        ? this.assignClass(question, answer)
                        : "label"
                    }
                    htmlFor={`${question.question}_${i}`}
                  >
                    {answer}
                  </label>
                </div>
              ))}
            </div>
          ))}

          {this.state.isVisible && (
            <div className="col-10 text-center">
              <button
                className="m-3 p-3 mode-btn"
                disabled={this.state.isDisabled}
                onClick={e => this.submit(e)}
              >
                CHECK
              </button>
            </div>
          )}

          <QuizResultModal
            isSubmitted={this.state.isSubmitted}
            result={this.state.result}
            closeModal={this.closeModal}
            isOpen={this.state.modalOpen}
            callQuiz={this.callQuiz}
          />
        </div>
      );
    } else return null;
  }
}
