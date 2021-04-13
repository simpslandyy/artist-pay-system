import React from 'react'
import { Container } from '@material-ui/core'
import { Nav } from '../components/molecules'
import { Equalizer, Settings } from '@material-ui/icons'

const navList = [
  {
    key: 'reports',
    value: 'Reports',
    icon: <Equalizer></Equalizer>
  },
  {
    key: 'settings',
    value: 'Settings',
    icon: <Settings></Settings>
  }
]

const Home: React.FC = () => {
  return (
    <Container>
      <Nav
        label="RosterApp"
        items={navList}
        />
    </Container>
  )
}


export default Home