import React from 'react';
import Game from './Game.jsx';

const GamesList = props => (
  <div>
    <h6 className="border-bottom padding-below">Available Pick Up Games</h6>
    {props.games.map(game => (
      <Game key={game.id} game={game} handleClickJoin={props.handleClickJoin} users={props.users} />
    ))}
  </div>
);

export default GamesList;
