import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  
  ClockIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  PowerIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/solid";
import { FaHeart ,FaBookmark } from "react-icons/fa"; 
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export const Sidebar = () => {
    const [open, setOpen] = React.useState(0);

    const handleOpen = (value) => {
      setOpen(open === value ? 0 : value);
    };
  return (
    <Card className=" text-white bg-black w-full h-full max-w-[20rem] p-4 ">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>

      <List>
        <ListItem>
          <ListItemPrefix>
            <ClockIcon className="h-5 w-5" />
          </ListItemPrefix>
          Historique
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <FaHeart className="h-5 w-5 " />
          </ListItemPrefix>
          <Link to="/favoris"> Favoris</Link>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <BellIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="">Alerte</Link>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <FaBookmark className="h-5 w-5" />
          </ListItemPrefix>
          Enregistrements
        </ListItem>
        
        <ListItem>
          <ListItemPrefix>
            <ChatBubbleLeftIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/chat">Messagerie</Link>
        </ListItem>

        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
};
