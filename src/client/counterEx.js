import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import Counter from './components/Counter'
import counter from './reducers'

//createStore : store(저장소) 만드는 함수
const store = createStore(counter)
//store : createStore에서 나온 객체 담김, counter : reducer 함수
const rootEl = document.getElementById('root')

const render = () => ReactDOM.render(
    //Counter component한테 props
  <Counter
  //storage에 getState, dispatch메소드
    value={store.getState()} //실행하는 순간의 state값ㄴ
    onIncrement={() => store.dispatch({ type: 'INCREMENT' })} //dispatch: 발표, type: 'INCREMENT' => action
    onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
  />,
  rootEl
)

//store는 redux에서 준거고 createStore에는 counter라는 reducer 넣어줘서 dispatch일어나면 바로 reducer 실행

render()//초기에 렌더실행
store.subscribe(render)//subscribe해서 렌더다시 => 위에꺼 다시실행
//react redux로 실행

//reducer
//초기에는 state 없음
export default (state = 0, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1
      case 'DECREMENT':
        return state - 1
      default:
        return state
    }
  }

  //counter component
  import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Counter extends Component {
  constructor(props) {
    super(props);
    this.incrementAsync = this.incrementAsync.bind(this);
    this.incrementIfOdd = this.incrementIfOdd.bind(this);
  }

  incrementIfOdd() {
    if (this.props.value % 2 !== 0) {
      this.props.onIncrement()
    }
  }

  incrementAsync() {
    setTimeout(this.props.onIncrement, 1000)
  }

  render() {
    const { value, onIncrement, onDecrement } = this.props
    return (
      <p>
        Clicked: {value} times
        {' '}
        <button onClick={onIncrement}>
          +
        </button>
        {' '}
        <button onClick={onDecrement}>
          -
        </button>
        {' '}
        <button onClick={this.incrementIfOdd}>
          Increment if odd
        </button>
        {' '}
        <button onClick={this.incrementAsync}>
          Increment async
        </button>
      </p>
    )
  }
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired
}

export default Counter