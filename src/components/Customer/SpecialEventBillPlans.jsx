import React,{useState,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import img1 from "../../assets/img/specialEvent.png";
import "../../assets/css/Customer/specialEventPlans.css";
import { Link } from "react-router-dom";
import Axios from 'axios';
import  {useHistory}  from 'react-router-dom'
const useStyles = makeStyles({
  root: {
    // minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  pos: {
    marginBottom: 12,
  },
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "20px",
    marginLeft: "10%",
    marginTop: "8%",
  },

  gridMain: {
    width: "80%",
  },
  button: {
    width: "100%",
    margin: "3px",
    textDecoration: "none"
  },
  iconCardsButtons: {
    justifyContent: "right",
  },
  buttonMoreDetails: {
    width: "100%",
    margin: "3px",
    backgroundColor: "#49ad74",
    color: "white",
    textDecoration: "none",
    "&:hover": {
      background: "#439c69",
    },
  },
  linkStyle:{
    textDecoration:"none"
  }
  

});

const cardDetails = [
  { Bill_Title: "Special Event Plan 1", Choose_model: "TOU Model", Duration:"1 days", moreDetails:"TOU-Event-Form",device_wise:"/special-tou-device-wise"},
  { Bill_Title: "Special Event Plan 2", Choose_model: "Fixed Model",Duration:"2 days", moreDetails:"special-event-fixed",device_wise:"/special-fixed-device-wise" },
  { Bill_Title: "Special Event Plan 3", Choose_model: "Fixed Model", Duration:"2 days", moreDetails:"special-event-fixed",device_wise:"/special-fixed-device-wise" },
  { Bill_Title: "Special Event Plan 4", Choose_model: "TOU Model",Duration:"1 days", moreDetails:"TOU-Event-Form",device_wise:"/special-tou-device-wise" },
  { Bill_Title: "Special Event Plan 5", Choose_model:"Fixed Model", Duration:"2 days", moreDetails:"special-event-fixed",device_wise:"/special-fixed-device-wise" },
  { Bill_Title: "Special Event Plan 6", Choose_model: "TOU Model", Duration:"1 days", moreDetails:"TOU-Event-Form",device_wise:"/special-tou-device-wise" },
];

export default function DeviceWisePlans() {
  const classes = useStyles();
  const [cardDetails, setCardDetails] = useState([]);
  let history = useHistory();
  async  function getCalculatedData(){

    var token = document.cookie
    .split(';')
    .map(cookie => cookie.split('='))
    .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {}).token;


    var ParamsUserId = document.cookie
    .split(';')
    .map(cookie => cookie.split('='))
    .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {}).userId;



    const response = await Axios.get(`${process.env.REACT_APP_BASE_URL}/get-all-special-event-bill-plans/${ParamsUserId}`,  {
      headers: {
          authorization: `Token ${token}`
      }
  })
  // console.log(response.data);
  // if (response.data.status){
  //   if(response.data.data){
  //     setCardDetails(response.data.data);
  //     console.log(response.data.data);
  //   }else{
  //     setCardDetails([]);
  //     console.log("No any bill details");
  //   }
    
    
    
  // }else {
  //   console.log(response.data.message);
  //   history.push("/sign-in");
  //   window.location.reload();//reload browser
  //   deleteAllCookies();//delete all cookies
  // }
        
  } 

  // const onDeletebill = async (bill_id) => {
  //   setConfirmDialog({
  //     ...confirmDialog,
  //     isOpen: false,
  //   });
  //   await DeleteBillPlan(bill_id);
  //   await getCalculatedData();
    
  //   setNotify({
  //     isOpen: true,
  //     message: "Deleted Successfully",
  //     variant: "danger",
  //   });
  // };

  useEffect( async () => {

    await getCalculatedData();
   
 },[]);


  function deleteAllCookies() {
    var cookies = document.cookie.split(";");
  
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }

  return (
    <div className={classes.gridMain}>
      <Grid
        container
        spacing={4}
        className={classes.gridContainer}
        justify="center"
      >
        {cardDetails.map((card, index) => {
          return (
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                    key={index}
                  >
                    {card.Bill_Title}
                  </Typography>
                  <div>
                    <img src={img1} alt="Image1" className="card-img-top" />
                  </div>
                  <div>
                    <label>Selected Model : {card.Choose_model}</label>
                    <label>Duration :  {card.Duration}</label>
                  </div>
                </CardContent>
                <CardActions>
                  <div className="buttonContainer">
                    <Link className={classes.linkStyle} to={card.device_wise}>
                      <Button
                        className="iconCardsButtons"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                      >
                        Device Wise Usage &nbsp;&nbsp;&nbsp;
                      </Button>
                    </Link>
                    <Link className={classes.linkStyle} to={card.moreDetails}>
                      <Button
                        className="iconCardsButtons"
                        variant="contained"
                        className={classes.buttonMoreDetails}
                      >
                        More Details &nbsp;&nbsp;&nbsp;
                      </Button>
                    </Link>
                    <Link className={classes.linkStyle} to="#">
                      <Button
                        className="iconCardsButtons"
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                      >
                        Delete Plan &nbsp;&nbsp;&nbsp;
                      </Button>
                    </Link>
                  </div>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

// }

// );
