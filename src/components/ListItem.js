import React from 'react'

import styled from 'styled-components'

const ListItem = ({ text, completed, onSelect }) => (
  <Wrapper2 onClick={onSelect}>
    <code>
      [{completed ? 'x' : '  '}] <Text completed={completed}>{text}</Text>
    </code>
  </Wrapper2>
)

const Wrapper2 = styled.p`
  font-size: 24px;
  cursor: pointer;
`

const Text = styled.span`
  text-decoration: ${props => (props.completed ? 'line-through' : 'none')};
`

export default ListItem
