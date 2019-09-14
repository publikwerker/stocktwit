import React from 'react';

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    console.log(event.target.value);
    this.setState({value: event.target.value});
  }


  handleSubmit(event){
    console.log("this state value =" + this.state.value);
    event.preventDefault();
  }

  render(){

    return (
      <main>
      <div className="symbol-input">
        <form name="symbolInput" onSubmit={this.handleSubmit}>
          <label>
            Symbol or list of symbols:
            <input type="text" name="name" placeholder="AAPL" onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    </main>
  )
}
}