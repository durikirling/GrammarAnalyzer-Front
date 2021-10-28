import React, { Component } from "react";
import "./loading.css";

class Loading extends Component {

  createCircul = () => {
    let content = []
    for (let i=1; i<=8; i++)
    {
      content.push(<div key={i} id={"circularG_"+i} className="circularG"></div>);
    }
    return content
  }

  render() {    
    return (
        <div id="circularG">
          {this.createCircul()}
          <div className="Zag2">Идет анализ...</div>
        </div>
    );
  }
}

export default Loading;