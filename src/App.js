import React from 'react'
import { Provider, Subscribe } from 'unstated'

import styled from 'styled-components'

import TodosContainer from './store'

import ListsList from './components/ListsList'
import AddTodo from './components/AddTodo'
import AddList from './components/AddList'
import TodoList from './components/TodoList'

function App() {
  return (
    <Provider>
      <Wrapper>
        <Subscribe to={[TodosContainer]}>
          {todos => {
            const list = todos.getList();
            const onPage = todos.getCurrentPage();
            const selectedListId = todos.getSelectedListId();
            const selectedItem = todos.getSelectedItem();
            const selectedFilter = todos.getSelectedFilter();            
            return (
              <TodosWrapper>
                {onPage === "list" &&
                  <ListWrapper>
                    <AddList onAddList={todos.createList} />
                    <ListsList items={list} onListSelect={todos.onListSelect} />
                  </ListWrapper>}
                {onPage === "todos" &&
                  <ListWrapper>
                    <AddTodo onAddTodo={todos.createTodo} onBackLinkClick={todos.onBackLinkClick}  />
                    <TodoList items={list} selectedItem={selectedItem} selectedListId={selectedListId} toggleComplete={todos.toggleComplete}  selectedFilter={selectedFilter} />
                    <div>Show <button onClick={e=>{todos.changeFilter("all")}}>All</button> <button onClick={e=>{todos.changeFilter("completed")}}>Completed</button> <button onClick={e=>{todos.changeFilter("active")}}>Active</button> </div>                      
                  </ListWrapper>
                }
              </TodosWrapper>
            )
          }}
        </Subscribe>
      </Wrapper>
    </Provider>
  )
}

const Wrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
`

const TodosWrapper = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
`
const ListWrapper = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
`

export default App
