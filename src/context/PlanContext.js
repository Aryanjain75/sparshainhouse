"use client";
import { createContext, useState, useEffect ,useContext} from "react";
export const PlanContext = createContext();
import shortid from "shortid";
export const PlanCartprovider = ({ children }) => {   
    // State for managing bill
    const [bill,setbill]=useState({});
    const [foodItemSelected, setFoodItemSelected] = useState([]);
    const [MovieItemSelected, setMovieItemSelected] = useState("");
    const [MoviehallItemSelected, setMoviehallItemSelected] = useState("");
    
    const TheaterJson = {
        h9wea6zaeh5sododtfqt: {
          Imageurl: "https://res.cloudinary.com/devj7oonz/image/upload/v1735369318/h9wea6zaeh5sododtfqt.jpg",
          caption: "Cinematic Luxury at Home.",
          Price: 50,
        },
        nfpjuyqifhhbonsd59vb: {
          Imageurl: "https://res.cloudinary.com/devj7oonz/image/upload/v1735369318/h9wea6zaeh5sododtfqt.jpg", 
          caption: "Sleek and Sophisticated Cinema",
          Price: 230,
        },
        havriv6h1ebvx20byrjb: {
          Imageurl: "https://res.cloudinary.com/devj7oonz/image/upload/v1735369317/havriv6h1ebvx20byrjb.jpg",
          caption: "Immersive Sound, Sleek Design",
          Price: 225,
        },
        vow3igduygjnmbxqoaxd: {
          Imageurl: "https://res.cloudinary.com/devj7oonz/image/upload/v1735369317/vow3igduygjnmbxqoaxd.jpg",
          caption: "Cinema Comfort", 
          Price: 200,
        },
        tsmunt7zmxorzpmwd0wk: {
          Imageurl: "https://res.cloudinary.com/devj7oonz/image/upload/v1735369317/tsmunt7zmxorzpmwd0wk.jpg",
          caption: "Timeless Movie Magic",
          Price: 240,
        },
      };

    const [moviesData, setMoviesData] = useState([]);
    const [data, setData] = useState([]);
  const [orders, setOrders] = useState([]);
 const [formData, setFormData] = useState({
     EventPlanning: [],
     GuestPlanning: [],
     VendorManagement: [],
     FoodItemsandMovieItems:{
      FoodItems:[],
      Movie:[],
      Moviehall:[]
     },
     BudgetandExpenseManagement: [],
     CommunicationandNotificationsCard: [],
   });
   const [activeStep, setActiveStep] = useState(0);

  
  const steps = [
    'Event Information',
    'Guest Management',
    'Vendor Management',
    'FoodItemsandMovieItems',
    'Budget & Expenses',
    'Communication & Invitation',
    'Preview'
  ];

  const handleNext = () => setActiveStep(prevStep => prevStep + 1);
  const handleBack = () => setActiveStep(prevStep => prevStep - 1);

    
    return (
        <PlanContext.Provider
            value={{
                foodItemSelected,
                setFoodItemSelected,
                MovieItemSelected, 
                setMovieItemSelected,
                MoviehallItemSelected,
                 setMoviehallItemSelected,
                 TheaterJson,
                 moviesData, 
                 setMoviesData,
                 data, 
                 setData,
                 orders, setOrders,
                 formData, setFormData,
                 activeStep, setActiveStep,
                 handleNext,
                 handleBack,
                 steps,
                 
            }}
        >
            {children}
        </PlanContext.Provider>
    );
 };
