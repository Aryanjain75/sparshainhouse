"use client"
import React from "react";
import { 
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  styled
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import InsertChartOutlinedSharpIcon from "@mui/icons-material/InsertChartOutlinedSharp";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Link from 'next/link';

const StyledDrawer = styled(Drawer)({
  width: 240,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
    backgroundColor: '#1a202c',
    color: 'white',
    borderRight: 'none'
  },
});

const Logo = styled(Typography)({
  background: 'linear-gradient(to right, #dc2626, #991b1b)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 'bold',
  fontSize: '1.5rem',
  padding: '1.5rem'
});

const ListHeader = styled(Typography)({
  color: '#9ca3af',
  textTransform: 'uppercase',
  fontSize: '0.75rem',
  fontWeight: 600,
  padding: '0.75rem 1rem'
});

const StyledListItem = styled(ListItem)({
  borderRadius: '0.5rem',
  margin: '0.25rem 0.5rem',
  '&:hover': {
    backgroundColor: '#1f2937'
  }
});

function Sidebar() {
  return (
    <StyledDrawer variant="permanent">
      <Box>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Logo>Sparsha.</Logo>
        </Link>
        <Divider sx={{ borderColor: '#374151' }} />
        
        <List>
          <ListHeader>MAIN</ListHeader>
          <Link href="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>
            <StyledListItem button>
              <ListItemIcon sx={{ color: '#9ca3af' }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </StyledListItem>
          </Link>

          <ListHeader>LISTS</ListHeader>
          <Link href="/admin/users" style={{ textDecoration: 'none', color: 'inherit' }}>
            <StyledListItem button>
              <ListItemIcon sx={{ color: '#9ca3af' }}>
                <Person3OutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </StyledListItem>
          </Link>

          <Link href="/admin/foodproducts" style={{ textDecoration: 'none', color: 'inherit' }}>
            <StyledListItem button>
              <ListItemIcon sx={{ color: '#9ca3af' }}>
                <LocalGroceryStoreOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Food Products" />
            </StyledListItem>
          </Link>

          <Link href="/admin/theaterproducts" style={{ textDecoration: 'none', color: 'inherit' }}>
            <StyledListItem button>
              <ListItemIcon sx={{ color: '#9ca3af' }}>
                <LocalGroceryStoreOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Theater Products" />
            </StyledListItem>
          </Link>

          <Link href="/admin/birthdayhallproducts" style={{ textDecoration: 'none', color: 'inherit' }}>
            <StyledListItem button>
              <ListItemIcon sx={{ color: '#9ca3af' }}>
                <LocalGroceryStoreOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Birthday Hall Products" />
            </StyledListItem>
          </Link>

          <Link href="/admin/orders" style={{ textDecoration: 'none', color: 'inherit' }}>
            <StyledListItem button>
              <ListItemIcon sx={{ color: '#9ca3af' }}>
                <LocalGroceryStoreOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </StyledListItem>
          </Link>

          <Link href="/admin/RestroSeatBooking" style={{ textDecoration: 'none', color: 'inherit' }}>
            <StyledListItem button>
              <ListItemIcon sx={{ color: '#9ca3af' }}>
                <LocalGroceryStoreOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Restro SeatBooking" />
            </StyledListItem>
          </Link>

          
            <StyledListItem button sx={{ color: '#ef4444' }}>
              <ListItemIcon sx={{ color: '#ef4444' }}>
                <ExitToAppOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </StyledListItem>
        </List>
      </Box>
    </StyledDrawer>
  );
}

export default Sidebar;
