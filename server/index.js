require( "dotenv" ).config();
const app = require( "./app" );
const dbConnection = require( "./config/db/dbConnection" );



const PORT = process.env.PORT || 4000;

app.listen( PORT, () => {
  dbConnection()
  console.log(`your server is running on ${PORT} and your address : http://localhost:${PORT}`);
})