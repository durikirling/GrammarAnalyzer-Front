import React, { Component } from "react";
import "./App.css";
import Loading from "./components/loading.jsx"
import Start from "./components/start.jsx";
import Result from "./components/result.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // проанализированный текст:
      analyzeText: [
        // тестовый результат:
        {word:'В доме', normal_form: 'дом', role: 'дополнение', number: ''},
        {word:'рыжий', normal_form: 'рыжий', role: 'определение'},
        {word:'кот', normal_form: 'кот', role: 'подлежащее', number: 'единственное', speech_part: "существительное", gender: "мужской", case: "именительный"},
        {word:'спал', normal_form: 'спать', role: 'сказуемое'},
        {word:'тихо', normal_form: 'тихо', role: 'обстоятельство'}
      ],
      page: "start" // переключение между страницами - начальная/загрузка/результат
    };
  }

  // Analyze = () => {
  //   if (this.state.text !== "") {
  //     this.setState({
  //       loading: true 
  //     })
  //     axios.post("http://127.0.0.1:8000/analyze/text/",{ text: this.state.text })
  //       .then((res) => console.log(res))
  //       .catch((error) => console.log("SOMETHING WENT WRONG ", error))
  //     .then(() => {
  //       axios.get("http://127.0.0.1:8000/analyze/words/")
  //     .then((res) => {
  //       this.setState({
  //         analyzeText: res.data
  //       });
  //     })
  //     .then(() => {this.setState({
  //       bool: false,
  //       loading: false
  //     })
  //   });
  //   });
  //   } else alert("Введите текст или выберите файл");
  // };

  StartLoading = () => {
    this.setState({
      page: "loading" 
    })
  }

  EndLoading = () => {
    this.setState({
      page: "result"
    })
  }

  SetAnalyzeText = (text) => {
    this.setState({
      analyzeText: text
    });
  }

  BackToStartPage = () => {
    this.setState({
      page: "start"
    });
  };

  BackToResult = () => {
    if (this.state.analyzeText !== "")
    this.setState({
      page: "result"
    });
    else alert("Вы еще не анализировали текст")
  }

  render() {
    switch (this.state.page) {
      case "start": 
        return (
          <Start
          BackToResult={this.BackToResult}
          StartLoading={this.StartLoading}
          EndLoading={this.EndLoading}
          SetAnalyzeText={this.SetAnalyzeText}
          />
        );
      case "loading": 
        return (
          <Loading/>
        );
      case "result": 
        return (
          <Result
          analyzeText={this.state.analyzeText}
          BackToStartPage={this.BackToStartPage}
          />
        );
      default:         
        return (
          <Start
          BackToResult={this.BackToResult}
          StartLoading={this.StartLoading}
          EndLoading={this.EndLoading}
          SetAnalyzeText={this.SetAnalyzeText}
          />
        );
    }
  }
}

export default App;