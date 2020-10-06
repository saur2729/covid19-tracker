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
            <ListItemText primary='Worldwide Stats' />
          </ListItem>

          <ListItem button key='country' component={NavLink} to='/country/USA'>
            <ListItemText primary='Country Stats' />
          </ListItem>
        </List>
    </div>
  )
}

