import React, { Component } from 'react';
import './App.css';


class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      title: 'Food List App',
      act: 0,
      index: '',
      datas:[]
    }
  }
  
  componentDidMount(){
    this.refs.name.focus();
  }

  fSubmit = (e) => {
    e.preventDefault();
    console.log('try');

    let datas = this.state.datas;
    let name = this.refs.name.value;
    let cost = this.refs.cost.value;
    
    if(this.state.act === 0){   //new
      let data = {
        name, cost
      }
      datas.push(data);
    }else{                      //update
      let index = this.state.index;
      datas[index].name = name;
      datas[index].cost = cost;
    }    

    this.setState({
      datas: datas,
      act: 0
    });
    this.refs.myform.reset();
    this.refs.name.focus();
  }
  fRemove = (i) => {
    let datas = this.state.datas;
    datas.splice(i,1);
    this.setState({
      datas: datas
    });

    this.refs.myform.reset();
    this.refs.name.focus();
  }
   
  fEdit = (i) => {
    let data = this.state.datas[i];
    console.log('#', data);
    console.log('#', i);
    this.refs.name.value = data.name;
    this.refs.cost.value = data.cost;

    this.setState({
      act: 1,
      index: i
    });

    this.refs.name.focus();
  }  

  render() { 
    let datas = this.state.datas; 
    return (
     <div className="App">
       <h2>{this.state.title}</h2>
       <form ref= "myform" className = "myForm">
            <input type="text" ref="name" placeholder= "food name" className="formField"/>
            <input type="number" ref="cost" placeholder= "food cost" className="formField"/>
            <button onClick={(e)=>this.fSubmit(e)} className="myButton">Submit</button>
       </form>
       <pre>
            {datas.map((data, i) =>
              <li key={i} className="myList">
                    {i+1}, {data.name},{data.cost}
                    <button onClick={()=>this.fRemove(i)} className="myListButton">Delete</button>
                    <button onClick={()=>this.fEdit(i)} className="myListButton">Edit</button>
              </li>
              )}
       </pre>
     </div>
   );
 }
}

export default App;
