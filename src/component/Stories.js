import React, { useEffect,useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';


function Stories   () {
  let API = 'https://dummyjson.com/products'
  const [search, setSearch] = useState("")
    const [data, setData] = useState([])
  const [Loading, setLoading] = useState(true);
  console.log(Loading)
    const fetchDataApi= async (url)=>{
       try {
        const response= await fetch(url);
        const BackendData =await response.json();
        console.log('datas',BackendData)
        setData(BackendData)
        setLoading(false)

       } catch (error) {
        console.log(error)
       }
    }
    
  useEffect(() => {
    fetchDataApi(API)
  },[])
  
 
  if (Loading)
  return (
    <>
      <h1>
        Loading....
      </h1>
    </>
  )

  return (
     <>
     <Box className="input-data" >
    <h1> Api Fetching </h1>
  <input  type='text' placeholder='Search...' onChange={(e)=>setSearch(e.target.value)}/>
  </Box>
  
     <Box className='maindata' >
     {
        data?.products?.filter((value)=>{
        
        if(search===''){
          return value
        }
        else if(value.title.toLowerCase().includes(search.toLowerCase())){
          console.log('value',value )
          return value
        }
        })
         .map((value,index)=>{
          return(
           <>
        <Box className='data' >
           <Card sx={{ maxWidth: 350 ,marginTop:2  }}>
      <CardMedia   
             sx={{ height: 300, width:400 }}
         image={value.thumbnail
         }
         
         title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div"  sx={{ height: 100, width:350 }} >
          {value.title}
        </Typography>
        <Typography variant="body2" color="text.secondary"   sx={{ height: 100, width:350 }} >
         {value.description}
        </Typography>
        <Typography   > {value.price}  {value.discountPercentage} </Typography>
      </CardContent>
      <CardActions>
        <Button   sx={{ height: 20, width:30 }} size="small">Share</Button>
        <Button   sx={{ height:50, width:100 }} size="small">Learn More</Button>
      </CardActions>
    </Card>
    </Box>
           </>
          )
        })
     }
     </Box>
  
     </>
     
  )
}

export default Stories   