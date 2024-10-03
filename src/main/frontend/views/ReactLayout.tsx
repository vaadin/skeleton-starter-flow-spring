import React from 'react';
import {Link} from 'react-router-dom';
import {
  AppBar,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material';

import {
  ReactAdapterElement,
  RenderHooks
} from "Frontend/generated/flow/ReactAdapter";

class ReactLayoutElement extends ReactAdapterElement {
  protected render(hooks: RenderHooks): React.ReactElement | null {
    // create content element for name attribute 'flowContent'
    const content = hooks.useContent('flowContent');

    return (
      <>
      <div style={{ display: 'flex' }}>
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <div>
            <nav aria-label="main mailbox folders">
              <List>
                <ListItem disablePadding component={Link} to="/">
                  <ListItemButton>
                    <ListItemText primary="Hello World"/>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding component={Link} to="/editor">
                  <ListItemButton>
                    <ListItemText primary="Editor"/>
                  </ListItemButton>
                </ListItem>
              </List>
            </nav>
          </div>
        </Drawer>

        <div style={{flexGrow: 1, padding: '20px'}}>
          <AppBar position="fixed"
                  sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                React Layout
              </Typography>
            </Toolbar>
          </AppBar>
          <Toolbar/>
          {content}
        </div>
      </div>
        <CssBaseline/>
      </>
    );
  }
}

customElements.define('react-layout', ReactLayoutElement);