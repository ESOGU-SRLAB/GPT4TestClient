import React from 'react';
import {
    Box,
    SwipeableDrawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import DashboardIcon from '../assets/sidebarIcons/dashboard.png';
import AccountIcon from '../assets/sidebarIcons/account.png';
import EditorIcon from '../assets/sidebarIcons/editor.png';
import UnitTestIcon from '../assets/sidebarIcons/unittest.png';
import HistoryIcon from '../assets/sidebarIcons/history.png';
import TerminaIcon from '../assets/sidebarIcons/terminal.png';

const Sidebar = ({ open, toggleSidebar }) => {
    const sidebarRoutingItems = [
        {
            primaryText: 'Dashboard',
            secondaryText:
                'Navigate to dashboard page to see your overall entities.',
            to: '/',
            image: (
                <img
                    src={DashboardIcon}
                    style={{ width: '24px', height: '24px' }}
                />
            ),
        },
        {
            primaryText: 'Unit Test Generation',
            secondaryText:
                'Write or upload your own Python code, generate unit tests & run to see the results.',
            to: '/generation',
            image: (
                <img
                    src={UnitTestIcon}
                    style={{ width: '24px', height: '24px' }}
                />
            ),
        },
        {
            primaryText: 'Editor Settings',
            secondaryText:
                'Configure your editor settings as you wish, change keyboard shortcuts, editor theme and more',
            to: '/editor-settings',
            image: (
                <img
                    src={EditorIcon}
                    style={{ width: '24px', height: '24px' }}
                />
            ),
        },
        {
            primaryText: 'Terminal Settings',
            secondaryText:
                'Configure your terminal settings as you wish, change terminal colors & more',
            to: '/terminal-settings',
            image: (
                <img
                    src={TerminaIcon}
                    style={{ width: '24px', height: '24px' }}
                />
            ),
        },
        {
            primaryText: 'Unit Test Generation History',
            secondaryText:
                'List your recent unit test codes and their execution results.',
            to: '/generation-history',
            image: (
                <img
                    src={HistoryIcon}
                    style={{ width: '24px', height: '24px' }}
                />
            ),
        },
        {
            primaryText: 'Account',
            secondaryText:
                'Navigate to account page to see & modify your personal information.',
            to: '/account',
            image: (
                <img
                    src={AccountIcon}
                    style={{ width: '24px', height: '24px' }}
                />
            ),
        },
    ];
    return (
        <>
            <SwipeableDrawer
                anchor="left"
                open={open}
                onClose={toggleSidebar}
                onOpen={toggleSidebar}
            >
                <Box sx={{ width: 400 }} role="presentation" mb={5}>
                    <Box sx={{ padding: 2, textAlign: 'center' }}>
                        <Typography variant="h5">Navigation</Typography>
                    </Box>
                    <Divider />
                    <List>
                        {sidebarRoutingItems.map((item, index) => {
                            let { primaryText, secondaryText, to, image } =
                                item;
                            return (
                                <React.Fragment key={index}>
                                    <ListItem
                                        disablePadding
                                        sx={{
                                            justifyContent: 'center',
                                            marginY: '0.75rem',
                                        }}
                                    >
                                        <RouterLink
                                            to={to}
                                            style={{
                                                textDecoration: 'none',
                                                color: 'inherit',
                                                width: '100%',
                                                display: 'block',
                                            }}
                                        >
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    {image}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={primaryText}
                                                    secondary={secondaryText}
                                                />
                                            </ListItemButton>
                                        </RouterLink>
                                    </ListItem>
                                    {index < sidebarRoutingItems.length - 1 && (
                                        <Divider />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </List>
                </Box>
            </SwipeableDrawer>
        </>
    );
};

export default Sidebar;
