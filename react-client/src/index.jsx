import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import GamesList from './components/GamesList.jsx';
import GoogleMap from './components/GoogleMap.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      users: [],
    }
    this.handleClickJoin = this.handleClickJoin.bind(this);
  }

  componentDidMount() {
    axios.get('/games')
      .then((response) => {
        console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
          let adjustedDay =response.data[i].day.substring(0, 3);
          response.data[i].day = adjustedDay;
        }
        this.setState({
          games: response.data,
        })
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get('/users')
      .then((users) => {
        console.log(users.data);
        this.setState({
          users: users.data,
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleClickJoin(e, id) {
    let data = { user_id: 21, basketballgame_id: id};
    $.ajax({
      type: "POST",
      url: '/joinGame',
      data: data,
      success: ''
    });

    axios.get('/users')
      .then((users) => {
        console.log(users.data);
        this.setState({
          users: users.data,
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render () {
    return (
      <div>
        <h1><i className="fas fa-basketball-ball"></i> <strong>Ballers</strong></h1>
        <h6 className="">  An app for anyone looking to play basketball and meet new people.</h6>

        <div className='google-map-wrapper'>
          <GoogleMap />
        </div>
        <div>
          <GamesList games={this.state.games} handleClickJoin={this.handleClickJoin} users={this.state.users}/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));