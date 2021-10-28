import React, { Component } from "react";
import "./start.css"
import axios from 'axios';

class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "", // вводимый текст
    };
  }

  InputChange = (event) => {
    this.setState({
      text: event.target.value
    });
  };

  InputFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      this.setState({
        text: text
      });
    };
    reader.readAsText(e.target.files[0]);
  };

  Delete = () => {
    this.setState({
      text: ""
    });
  };

  EnterKeyPress = (event) => {
    if (event.key === "Enter") {
      this.Analyze();
    }
  };

  Analyze = () => {
    if (this.state.text !== "") {
      this.props.StartLoading()
      axios.post("http://127.0.0.1:8000/analyze/text/", { text: this.state.text })
      .then((res) => console.log(res))
      .catch((error) => console.log("SOMETHING WENT WRONG ", error))
      .then(() => {
        axios.get("http://127.0.0.1:8000/analyze/words/")
        .then((res) => {
          this.props.SetAnalyzeText()
        })
        .then(() => {
          this.props.EndLoading()
        });
      });
    } else alert("Введите текст или выберите файл");
  };

  render() {
    return (
      <div className="App">
        <h4 className="Zag">
          TEXT ANALYZER
          <a href="https://mai.ru/">
            <img 
            className="logoMAI"
            src="https://abali.ru/wp-content/uploads/2011/04/emblema_mai.png"
            alt="MAI_logo"
            />
          </a>
        </h4>
        <div>
          Введите текст или загрузите текстовый файл (txt, doc, docx)
        </div>
        <br/>
        <div>
          <textarea
            type="text"
            className="inputText"
            placeholder="Введите текст для анализа"
            value={this.state.text}
            onChange={this.InputChange}
            onKeyPress={this.EnterKeyPress}
          />
          <div>
            <input
              type="file"
              className="inputFile"
              accept=".txt,.doc,.docx"
              onChange={(e) => this.InputFile(e)}
            />
          </div>
        </div>
        <button className="button" onClick={this.Analyze}>
          Анализировать
        </button>
        <button className="button" onClick={this.Delete}>
          Стереть
        </button>
        <br/>
        <br/>
        <button className="button" onClick={this.props.BackToResult}>
          Вернуться к тексту
        </button>
      </div>
    );
  }
}

export default Start;