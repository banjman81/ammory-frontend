import React, {useContext, useState} from "react";
import {Link} from "react-router-dom"
import './nav.css'

import {
    AppBar,
    Toolbar,
    Avatar,
    Box,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    CssBaseline,
    Drawer,
    Typography
  } from "@material-ui/core";
//   import {
//     Apps,
//     Menu,
//     ContactMail,
//     AssignmentInd,
//     Home
//   } from "@material-ui/icons";
// import Button from '@mui/material/Button';
// import MenuIcon from '@mui/icons-material/Menu';

import {UserContext} from '../context/userContext'
import SearchList from "./SearchList";
import { SearchContext } from "../context/searchContext";
import AxiosBackend from "../lib/axiosBackend";
const useStyles = makeStyles((theme) => ({
    menuSliderContainer: {
      width: 250,
      background: "#511",
      height: "100%"
    },
    avatar: {
      margin: "0.5rem auto",
      padding: "1rem",
      width: theme.spacing(13),
      height: theme.spacing(13)
    },
    listItem: {
      color: "tan"
    }
  }));
  
  // const listItems = [
  //   {
  //     listIcon: <Home />,
  //     listText: "Home"
  //   },
  //   {
  //     listIcon: <AssignmentInd />,
  //     listText: "Resume"
  //   },
  //   {
  //     listIcon: <Apps />,
  //     listText: "Portfolio"
  //   },
  //   {
  //     listIcon: <ContactMail />,
  //     listText: "Contacts"
  //   }
  // ];

function Nav(){
    const {user} = useContext(UserContext)
    const [search, setSearch] = useState("")
    const [results, setResults] = useState([])
    // const classes = useStyles();
    // const [open, setOpen] = useState(false);
  
    // const toggleSlider = () => {
    //   setOpen(!open);
    // };
  
    // const sideList = () => (
    //   <Box className={classes.menuSliderContainer} component="div">
    //     <Avatar
    //       className={classes.avatar}
    //       src="https://i.ibb.co/rx5DFbs/avatar.png"
    //       alt="Juaneme8"
    //     />
    //     <Divider />
    //     <List>
    //       {listItems.map((listItem, index) => (
    //         <ListItem className={classes.listItem} button key={index}>
    //           <ListItemIcon className={classes.listItem}>
    //             {listItem.listIcon}
    //           </ListItemIcon>
    //           <ListItemText primary={listItem.listText} />
    //         </ListItem>
    //       ))}
    //     </List>
    //   </Box>
    // );

    let linkTitle1= user?.username ? user.username : "Sign Up"
    let link1 = user?.username ? "/profile" : "/signup"

    let linkTitle2= user?.username ? "Logout" : "Sign In"
    let link2 = user?.username ? '/logout' : "/signin"

    async function handleOnChange(e){
        // e.preventDefault()
        setSearch(e.target.value)
        const response = await AxiosBackend.get('https://mmo-games.p.rapidapi.com/games', {
            headers: {
                'X-RapidAPI-Host': 'mmo-games.p.rapidapi.com',
                'X-RapidAPI-Key': '5c90bd75d5mshf619a3c3f092c0bp175212jsn17382299e947'
            }
        }
    )
        setResults(response.data.filter(item => item.title.toLowerCase().includes(search.toLowerCase())))
        if(e.target.value ===""){
            setResults([])
        }
    }

    const searchValues = {
        results, setResults, setSearch
    }
    
    
    return(
        <div>
            <div className="nav-container">
                <ul className="nav-bar">
                    <li><Link className="nav-link" to="/"><h2>Home</h2></ Link></li>
                    <li><Link className="nav-link" to='/games/1'>Games</ Link></li>
                    {user?.username ? (
                        <li><Link className="nav-link" to='/news'>MMO News</Link></li>
                    ): ("")}
                    {/* {user?.username ? (
                        <li><Link className="nav-link" to='/giveaways'>Giveaways</Link></li>
                    ): ("")} */}
                    <li><Link className="nav-link" to={link1}>{linkTitle1}</ Link></li>
                    <li><Link className="nav-link" to={link2}>{linkTitle2}</Link></li>
                    
                </ul>
                <div className="search-bar">
                    <input className="search-bar" type="text" name={search} placeholder="Search" onChange={e => handleOnChange(e)} />
                    {/* <button className="btn btn-secondary" onClick={() => handleOnSubmit()}>Search</button> */}
                    {results.length > 0 ? <SearchContext.Provider value={searchValues}>
                        <SearchList />
                    </SearchContext.Provider> : ""}
                </div>
            </div>


            {/* <div className="m-nav-container">
                <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <MenuIcon onClick={toggleSlider} />
                </IconButton>
                <Link className="nav-link" to='/signin'><Button color="inherit">Sign In</Button></Link>
                
            <Drawer open={open} anchor="right" onClose={toggleSlider}>
                {sideList()}
            </Drawer>
            </div> */}
            
        </div>
    )
}

export default Nav