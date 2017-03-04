import React, { Component } from 'react'
import { chooseCard, clearChoices } from '../../actions'
import SpreadCards from '../SpreadCards/SpreadCards'
import store from '../../store';
import './TarotTable.sass'

class TarotTable extends Component {

  constructor(){
    super()

    this.state = {
      canChoice: true,
      spreadType: 0
    }
  }

  componentWillMount(){
    let spreadType = store.getState().spreadState

    if(!spreadType){
      this.props.router.push('/')
      return
    }

    store.dispatch(clearChoices())
    this.setState({ spreadType });
  }

  handleChoice(choice){
    if(!this.state.canChoice) return

    store.dispatch(chooseCard(choice))
    let choices = store.getState().choiceState

    if(choices.length === this.state.spreadType){
      this.setState({ canChoice: false })
      setTimeout(() =>
        this.props.router.push(`/reading`), 500)
    }
  }

  render() {
    return (
      <div className="tarot-table">
        <SpreadCards
          handleChoice={choice => this.handleChoice(choice)}>
        </SpreadCards>
      </div>
    )
  }
}

export default TarotTable;
