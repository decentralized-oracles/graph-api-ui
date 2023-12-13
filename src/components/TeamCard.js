import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import github_svg from "../images/github.svg"
import discord_svg from "../images/discord.svg"
import telegram_svg from "../images/telegram.svg"
import x_svg from "../images/x.svg"


export default function TeamCard(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
    
  return (
    <Card sx={{maxWidth: 345 , display: "inline-block", margin:"0 20px 20px 0"}}>
      <CardHeader
        avatar={
          <Avatar aria-label="team-member">
            <img style={{width: "100%"}} src={props.avatar} />
          </Avatar>
        }
        title={props.name}
        subheader={props.title}
      />
      <CardContent>
        <Typography fontSize={'1em'} color="text.secondary">
        {props.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton className='card-btn' aria-label="Github">
        {/* icons from https://simpleicons.org/ */}
          <a href={"https://github.com/"+props.github}><img className="card-btn-img" src={github_svg} /></a>
        </IconButton>
        <IconButton className='card-btn' aria-label="X">
          <a href={"https://x.com/"+props.x}><img className="card-btn-img" src={x_svg} /></a>
        </IconButton>
        <IconButton className='card-btn' aria-label="Discord">
          <a href={"https://discordapp.com/users/"+props.discord}><img className="card-btn-img" src={discord_svg} /></a>
        </IconButton>
        <IconButton className='card-btn' aria-label="Telegram">
          <a href={"https://t.me/"+props.telegram}><img className="card-btn-img" src={telegram_svg} /></a>
        </IconButton>
      </CardActions>
    </Card>
  );
}