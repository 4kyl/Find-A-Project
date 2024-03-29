import React from 'react';
import { useSelector } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProfileSettings from '../Components/ProfileSettings'
const useStyles = makeStyles({
    root: {
        minWidth: 275,
        maxHeight: 300
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    info:
    {
        fontSize: 15
    }
});
export default function ProfilePage() {
  const { userProfile } = useSelector(state => state.profileData);
  const { userType, firstName, lastName, email,profile } = userProfile;
  let school, major, selfintro;
  if (profile) {
    school = profile.school;
    major = profile.major;
    selfintro = profile.selfintro;
  }
   const classes=useStyles();
    return (
    <Card>
      <CardContent>
      <ProfileSettings></ProfileSettings>
        <Typography>
        <Typography variant="h3" component="h2">
          Personal Information
        </Typography>
        <Avatar> { firstName[0].toString() } </Avatar> 
            <Typography variant="h6" component="h2">
            { firstName + " " + lastName }
            </Typography>
            <Typography  className={classes.info}     variant="subtitle1" component="h2">
            { school }
            </Typography>
            <Typography  className={classes.info}     variant="subtitle1" component="h2">
            { major }
            </Typography>
           <Typography className={classes.info} variant="subtitle2" component="h2">
            { email }
           </Typography>
           <Typography className={classes.info} variant="subtitle2" component="h2">
            { selfintro }
           </Typography>
        </Typography>
      </CardContent>
    </Card>
  );
}