import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import GamesList from './GamesList.jsx';
import GoogleMap from './GoogleMap.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      users: []
    };
    this.handleClickJoin = this.handleClickJoin.bind(this);
  }

  componentDidMount() {
    axios
      .get('/games')
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
          let adjustedDay = response.data[i].day.substring(0, 3);
          response.data[i].day = adjustedDay;
        }
        this.setState({
          games: response.data
        });
      })
      .catch(error => {
        console.log('GET games error: ', error);
      });

    axios
      .get('/users')
      .then(users => {
        this.setState({
          users: users.data
        });
      })
      .catch(err => {
        console.log('GET users error: ', err);
      });
  }

  handleClickJoin(e, id) {
    let data = { user_id: 21, basketballgame_id: id };
    axios
      .post('/joinGame', data)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log('POST join game error: ', error);
      });

    axios
      .get('/users')
      .then(users => {
        console.log(users.data);
        this.setState({
          users: users.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="wrapper">
        <nav>something</nav>
        <header>
          <i className="fas fa-basketball-ball" /> <strong>CityHoops</strong>
          <h6 className="">
            {' '}
            A web app for anyone looking to play basketball and meet new people.
          </h6>
        </header>
        <section className="google-map-wrapper">
          <GoogleMap />
        </section>
        <section>
          <GamesList
            games={this.state.games}
            handleClickJoin={this.handleClickJoin}
            users={this.state.users}
          />
        </section>
        <footer>SOME FOOTER</footer>
      </div>
    );
  }
}

export default App;
