import React from 'react'
import { NavLink } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export default function TopNav() {
  return (
    <div >
        <List className='list-item'>
          <ListItem button key='Home' component={NavLink} to='/home'>
              <ListItemText primary='Home' />
          </ListItem>

          <ListItem button key='CovidTable' component={NavLink} to='/covid-table'>
            <ListItemText primary='Country Stats' />
          </ListItem>

          <ListItem button key='contact' component={NavLink} to='/contact'>
            <ListItemText primary='Contact' />
          </ListItem>
        </List>
    </div>
  )
}

