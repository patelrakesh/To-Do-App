import { Container } from 'unstated'

const defaultState = {
  onPage:"list",
  listId: 0,
  selectedItem: {},  
  selectedFilter: "all",  

  lists: [
    {
      id:1,
      completed:false,
      text:"First todos list ",
      todos:[
    {
      id: 1,
      completed: false,
      text: 'Read README'
    },
    {
      id: 2,
      completed: false,
      text: 'Add one todo'
    },
    {
      id: 3,
      completed: false,
      text: 'Add filters'
    },
    {
      id: 4,
      completed: false,
      text: 'Add multiple lists'
    },
    {
      id: 5,
      completed: false,
      text: 'Optional: add tests'
    }
  ]


  },
  {
    id:2,
    completed:false,
    text:"Second todos list ",
    todos:[
  {
    id: 1,
    completed: false,
    text: 'Read README'
  },
  {
    id: 2,
    completed: false,
    text: 'Add one todo'
  },
  {
    id: 3,
    completed: false,
    text: 'Add filters'
  },
  {
    id: 4,
    completed: false,
    text: 'Add multiple lists'
  },
  {
    id: 5,
    completed: false,
    text: 'Optional: add tests'
  }]


}
  ]
}

class TodosContainer extends Container {
  constructor (props) {
    super(props)
    this.state = this.readStorage();  
    this.syncStorage();

  }

  readStorage () {
    if (window && window.localStorage) {
      const state = window.localStorage.getItem('appState')
      if (state) {
        return JSON.parse(state)
      }
    }
    return defaultState;
  }

  syncStorage () {
    
    if (window && window.localStorage) {
      const state = JSON.stringify(this.state);
      window.localStorage.setItem('appState', state)

    }
  }

  getList () {
    return this.state.lists
  }

  toggleComplete = async id => {

   // const completed = !this.state.selectedItem.todos[id-1].completed
    // We're using await on setState here because this comes from unstated package, not React
    // See: https://github.com/jamiebuilds/unstated#introducing-unstated


    await this.setState(state => {
      let newState = {}
      newState = state
      let todos = newState.lists[this.state.listId].todos;
      todos[id-1].completed = todos[id-1].completed == true ? false : true;
      newState.lists[this.state.listId].todos = todos;
      const lists = newState.lists
      return { lists }
    })

    await this.setState(state => {
      let selectedItem = state.selectedItem
      selectedItem.todos[id-1].completed = selectedItem.todos[id-1].completed == true ? false : true;
      return { selectedItem:selectedItem }
    })

    this.syncStorage()
  }

  onListSelect = async (item) => {

    await this.setState(state => {
      
      return {listId:item.id-1}
    })
    await this.setState(state => {
      
      return {selectedItem:item}
    })
    await this.setState(state => {
      
      return {onPage:'todos'}
    })

    this.syncStorage()
  }


  createTodo = async text => {
    await this.setState(state => {

      const item = {
        completed: false,
        text,
        id: state.lists[this.state.listId].todos.length + 1,

      }

      let todos = state.lists[this.state.listId].todos.concat(item);
      let newState = {}
      newState = this.state
      newState.lists[this.state.listId].todos = todos    
      const list = state.lists
      return { list }
    })

    this.syncStorage()
  }

  createList = async text => {

    await this.setState(state => {
      const item = {
        completed: false,
        text,
        id: state.lists.length + 1,
        todos:[]
      }

      const lists = state.lists.concat(item)
      return { lists }
    })

    this.syncStorage()
  }

  getCurrentPage = () =>{

    return this.state.onPage;
  }
  getSelectedListId = () => {
    return this.state.listId;
  }
  getSelectedItem = () =>{
    return this.state.selectedItem;
  }
  getSelectedFilter = () =>{
    return this.state.selectedFilter;
  }

  onBackLinkClick = async() => {

    await this.setState(state => {
      
      return { onPage:"list" }
    })

    this.syncStorage()
  
  }

  changeFilter = async (filter) =>{

    await this.setState(state => {
      
      return { selectedFilter:filter }
    })

    this.syncStorage()
    
  }

}

export default TodosContainer
