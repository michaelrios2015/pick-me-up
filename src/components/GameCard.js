import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const GameCard = props => {
  const { game, request, players, openGame } = props

  return (
    <div className='game-card'>
      <div className='game-card-header'>
        <h3>Game { game.id }</h3>
      </div>
      <div className='game-card-content'>
        {
          openGame ? (
            <h4>Player Count: {players.length}</h4>
            ) : (
            <h4>Score: { game.finalScore }</h4>
          )
        }
        <h4>Player Names: 
          { 
            players.map(player => {
              return (
                <span key={player.id}> {player.name} </span>
              )
            }) 
          }
        </h4>
        <h4>Court: { request.location }</h4>
        {/* <h4>Date: { request.date }</h4> */}
        <h4>Time: { request.time }</h4>
      </div>
    </div>
  )
}


export default connect(state => state)(GameCard)

