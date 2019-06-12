import React from 'react'

import styled from 'styled-components'

import TodoItem from './TodoItem'

const TodoList = ({ items, selectedFilter, toggleComplete, selectedItem }) => (

  <Wrapper>

    {
      selectedItem.todos.map(item2 => {
        const onComplete = e => {
          toggleComplete(item2.id)
        }
        return (
          <div>
           { selectedFilter =="all" && <TodoItem key={item2.id} {...item2} onComplete={onComplete} /> }
          
          </div>
        )
      })
    }

{
      selectedItem.todos.map(item2 => {
        const onComplete = e => {
          toggleComplete(item2.id)
        }
        return (
          <div>
           { 
             selectedFilter =="completed" && item2.completed == true && <TodoItem key={item2.id} {...item2} onComplete={onComplete} /> 
            }
          
          </div>
        )
      })
    }
   {
      selectedItem.todos.map(item2 => {
        const onComplete = e => {
          toggleComplete(item2.id)
        }
        return (
          <div>
           { selectedFilter =="active" && item2.completed != true && <TodoItem key={item2.id} {...item2} onComplete={onComplete} /> }
          
          </div>
        )
      })
    } 
    
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export default TodoList
