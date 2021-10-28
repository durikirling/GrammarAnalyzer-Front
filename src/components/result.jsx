import React, { Component } from "react";
import "./result.css";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      obj: false, // дополнение
      sub: false, // подлежащее
      pre: false, // сказуемое
      att: false, // определение
      ad: false, // обстоятельство
    };
  }

  BackToStartPage = () => {
    this.setState({
      obj: false,
      sub: false,
      pre: false,
      att: false,
      ad: false
    });
    this.props.BackToStartPage()
  };

  underlineWord = (role) => {
    this.checkSelectAll()
    this.setState({ [role]: !this.state.[role] }) 
  };

  // underlineSubject = () => {
  //   this.checkSelectAll()
  //   this.setState({ sub: !this.state.sub }) 
  // };

  // underlineObject = () => {
  //   this.checkSelectAll()
  //   this.setState({ obj: !this.state.obj })
  // };

  // underlinePredicate = () => {
  //   this.checkSelectAll()
  //     this.setState({ pre: !this.state.pre })
  // };

  // underlineAdverbial_modifier = () => {
  //   this.checkSelectAll()
  //     this.setState({ ad: !this.state.ad })
  // };

  // underlineAttribute = () => {
  //   let words = "att"
  //   this.checkSelectAll()
  //     this.setState({ [words]: !this.state.[words] })
  // };

  checkSelectAll = () => {
    let array = Array.from(document.querySelectorAll('input[type=checkbox]'))
    if (array[array.length-1].checked)
    {
      array[array.length-1].checked = false
    }
    for (let i = 0; i < array.length-1; i++) {
      if (!array[i].checked)
        break;
      if (i===array.length-2)
        array[array.length-1].checked = true
    } 
  }

  SelectAll = () => {
    let array = Array.from(document.querySelectorAll('input[type=checkbox]'))
    if (array[array.length-1].checked)
    {
      for (let i = 0; i < array.length-1; i++) {
        array[i].checked = true
      }
      this.setState({ 
        sub: true, 
        obj: true,
        pre: true,
        ad: true,
        att: true
      })
    }
    else 
    {
      for (let i = 0; i < array.length-1; i++) {
        array[i].checked = false
      }
      this.setState({ 
        sub: false, 
        obj: false,
        pre: false,
        ad: false,
        att: false
      })
    }
  };

createClassName = (role) => {
  var myClassName="output_words dropdown "
  switch (role) {
    case "дополнение": 
      if (this.state.obj === true)
        myClassName+="Object";
      break;
    case "подлежащее": 
      if (this.state.sub === true)
        myClassName+="Subject";
      break;
    case "сказуемое": 
      if (this.state.pre === true)
        myClassName+="Predicate";
      break;
    case "определение": 
      if (this.state.att === true)
        myClassName+="Attribute";
      break;
    case "обстоятельство": 
      if (this.state.ad === true)
        myClassName+="Adverbial_modifier";
      break;
    default: break
  }
  return myClassName
}

wordInfo = (word, id) => {
  let content = []
  if (word.normal_form)
    content.push(<p key={id+"nf"}><b>Начальная форма:</b> {word.normal_form}</p>);
  if (word.speech_part)
    content.push(<p key={id+"sp"}><b>Часть речи:</b> {word.speech_part}</p>);
  if (word.case)
    content.push(<p key={id+"c"}><b>Падеж:</b> {word.case}</p>);
  if (word.gender)
    content.push(<p key={id+"g"}><b>Род:</b> {word.gender}</p>);
  if (word.number )
    content.push(<p key={id+"n"}><b>Число:</b> {word.number}</p>);
  if (word.person)
    content.push(<p key={id+"p"}><b>Лицо:</b> {word.person}</p>);
  if (word.voice)
    content.push(<p key={id+"v"}><b>Залог:</b> {word.voice}</p>);
  if (word.role)
    content.push(<p key={id+"r"}><b>Член предложения:</b> {word.role}</p>);
  return content
}

  render() {
    return (
      <div className="App">
        <div className="output">
          {this.props.analyzeText.map((postDetail, id) => {
            // var myClassName=this.createClassName(postDetail.role)
            return (
              <div className={this.createClassName(postDetail.role)} key={id}>
                {postDetail.word}
                <div className="dropdown-content">
                  {this.wordInfo(postDetail, id)}
                  {/* <p>Начальная форма: {postDetail.normal_form}</p>
                  <p>Часть речи: {postDetail.speech_part}</p>
                  <p>Падеж: {postDetail.case}</p>
                  <p>Род: {postDetail.gender}</p>
                  <p>Число: {postDetail.number}</p>
                  <p>Лицо: {postDetail.person}</p>
                  <p>Залог: {postDetail.voice}</p>
                  <p>Член предложения: {postDetail.role}</p> */}
                </div>
              </div>
            );
          })}
        </div>
        <br/>
        <div  className="InLine">
          <input 
          type="checkbox"
          className="custom-checkbox"
          id="btn1"
          onChange={()=>this.underlineWord("sub")} 
          />
            <label htmlFor="btn1">
              Подлежащее
            </label>
          <br/>
          <input 
          type="checkbox" 
          className="custom-checkbox" 
          id="btn2"
          onChange={()=>this.underlineWord("pre")} />
            <label htmlFor="btn2">
              Сказуемое
            </label>
          <br/>
          <input 
          type="checkbox" 
          className="custom-checkbox" 
          id="btn3" 
          onChange={()=>this.underlineWord("obj")} />
            <label htmlFor="btn3">
              Дополнение
            </label>
          <br/>
          <input 
          type="checkbox" 
          className="custom-checkbox" 
          id="btn4"
          onChange={()=>this.underlineWord("att")} />
            <label htmlFor="btn4">
              Определение
            </label>
          <br/>
          <input 
          type="checkbox" 
          className="custom-checkbox" 
          id="btn5"
          onChange={()=>this.underlineWord("ad")} />
            <label htmlFor="btn5">
              Обстоятельство
            </label>
          <br/><br/>
          <input 
          type="checkbox" 
          className="custom-checkbox" 
          id="btn6"
          onChange={this.SelectAll} />
            <label htmlFor="btn6">
              Выделить всё
            </label>
          <br/><br/>
        </div>
        <div>
          <button className="button" onClick={this.BackToStartPage}>
            Назад
          </button>
        </div>
      </div>
    );
  }
}

export default Result;