import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3'
import Color from '../abis/Color.json';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state ={
      account:'',
      colors:[],
      contract:null,
    };
  }

  async componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockchainData();
  }
  async loadBlockchainData(){
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({account:accounts[0]});
    const networkId = await web3.eth.getId();
    if (Color.networks[networkId]) {
      const address = Color.networks[networkId].address;//   Color.networks[window.ethereum.networkVersion]
      const abi = Color.abi
      const colorsContract = new web3.eth.Contract(
       abi,
        address,
      );
      this.setState({contract:colorsContract});
      for (let index = 0; index < 6; index++) {
          const color =  await colorsContract.methods.colors(index).call();
          this.setState({
            colors:[...this.state.colors,color]
          })
        }

    }else{
      alert('Smart Contract mot deployed to current network')
    }  
}

  async loadWeb3(){
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if (window.web3) {
  window.web3 =new Web3(window.web3.currentProvider)      
    }
    else{
      window.alert('No ethereum avalable in the browser');
    }
  }

   mint=(color)=>{
    this.state.contract.methods.mint(color).send({from:this.state.account})
    .once('receipt',(receipt)=>{
          this.setState({
            color:[...this.state.colors,color]
          })
    });
  }

  render() {
    return (
<div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Color Tokens 
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white"><span id="account">{this.state.account}</span></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1>Issue Token</h1>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const color = this.color.value
                  this.mint(color)
                }}>
                  <input
                    type='text'
                    className='form-control mb-1'
                    placeholder='e.g. #FFFFFF'
                    ref={(input) => { this.color = input }}
                  />
                  <input
                    type='submit'
                    className='btn btn-block btn-primary'
                    value='MINT'
                  />
                </form>
              </div>
            </main>
          </div>
          <hr/>
          <div className="row text-center">
            { this.state.colors.map((color, key) => {
              return(
                <div key={key} className="col-md-3 mb-3">
                  <div className="token" style={{ backgroundColor: color }}></div>
                  <div>{color}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
