import React from "react";
import SelectCategory from "./SelectCategory";
import Quiz from "./Quiz";
import Question from "./Question";
import Header from "./Header";
import CategoryImage from "./CategoryImg";
import Footer from "./Footer";
import Start from "./Start";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "start",
      category: "",
      questionsCounter: 0,
      categories: []
    };
  }

  componentDidMount = () => {
    this.getCategories();
    this.getQuestionsCounter();
  };

  callAPI = url =>
    new Promise(function(resolve, reject) {
      fetch(url).then(response => {
        !response.ok ? reject(response.status) : resolve(response.json());
      });
    });

  getQuestionsCounter = () => {
    this.callAPI("https://opentdb.com/api_count_global.php").then(data => {
      const questionsCounter = data.overall.total_num_of_questions;
      this.setState({
        questionsCounter
      });
    });
  };

  getCategories = () => {
    this.callAPI("https://opentdb.com/api_category.php").then(data => {
      const categories = data.trivia_categories;
      this.setState({
        categories
      });
    });
  };

  getCategory = e => {
    this.setState({ category: e.target.value });
  };

  setModeQuiz = () => {
    this.setState({
      mode: "quiz"
    });
  };

  setModeQuestion = () => {
    this.setState({
      mode: "question"
    });
  };

  setModeStart = () => {
    this.setState({
      mode: "start",
      category: ""
    });
  };

  render() {
    const { categories, questionsCounter } = this.state;
    return (
      <div>
        <div className="container">
          <Header setModeStart={this.setModeStart} />

          <div>
            <h2 className="text-center">Pick your challenge</h2>
            <div className="row justify-content-center">
              <button
                className="mode-btn col-5 m-3 p-3"
                disabled={this.state.mode === "quiz"}
                onClick={() => this.setModeQuiz()}
              >
                Quiz
              </button>
              <button
                className="mode-btn col-5 m-3 p-3"
                disabled={this.state.mode === "question"}
                onClick={() => this.setModeQuestion()}
              >
                Question
              </button>

              <Start
                mode={this.state.mode}
                questionsCounter={questionsCounter}
                categories={categories}
              />

              <SelectCategory
                mode={this.state.mode}
                category={this.state.category}
                getCategory={this.getCategory}
                categories={categories}
              />

              <CategoryImage category={this.state.category} />
            </div>
          </div>

          <div className="justify-content-center mb-5 pb-5">
            <Question
              category={this.state.category}
              callAPI={this.callAPI}
              mode={this.state.mode}
            />
            <Quiz
              category={this.state.category}
              callAPI={this.callAPI}
              mode={this.state.mode}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
