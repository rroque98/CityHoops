import React from 'react';

const Game = ({ game, users }) => (
  <div>
    <div key={game.id} className='game padding-below shadow-lg full-container'>
      <div className='half-container'>
        <div>
          <strong>Game {game.id}</strong>
        </div>
        <div>
          Location: {game.location}
        </div>
        <div>
          When: {game.day}
        </div>
        <div>
          Start time: {game.start_time}
        </div>
        <div>
          End time:{game.end_time}
        </div>
        <button className='shadow-lg teal' onClick={(e) => this.props.handleClickJoin(e, game.id)}>Join pick-up game {game.id}!</button>
      </div>
      {users.filter((player) => player.basketballgames_id === game.id)
        .map(playerForGame => {
          return (
            <div className='images-container half-container'>
              <span className='inner-images-container'>
              <div>
                {playerForGame.name}
              </div>
              <div>
                {playerForGame.level}
              </div>
              <img src={playerForGame.image} className='user-image'></img>
              </span>
            </div>)})}
    </div>
  </div>
);
    

export default Game;