import React from 'react'

import styled from 'styled-components'

import ListItem from './ListItem'

const ListsList = ({ items, onListSelect }) => (
  <Wrapper3>
    {items.map(item => {
      const onSelect = e => {
        onListSelect(item)
      }
      return <ListItem key={item.id} {...item} onSelect={onSelect} />
    })}
  </Wrapper3>
)

const Wrapper3 = styled.div`
  display: flex;
  flex-direction: column;
`

export default ListsList
