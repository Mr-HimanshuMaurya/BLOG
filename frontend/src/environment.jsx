let IS_PROD = true;

const server = IS_PROD ?

    "https://blog-backend-mn9k.onrender.com"    

           :   

     "http://localhost:8000"
     


export default server;