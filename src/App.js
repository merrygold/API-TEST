
import DeleteData from "./components/Delete";
import GetData from "./components/Get";
import PostData from "./components/Post";
import PutData from "./components/Put";
import { ThemeProvider } from 'styled-components'
import { light } from '@pancakeswap-libs/uikit'

function App() {

  return (
    <ThemeProvider theme={light}>   
    
    <div id="app" className="container my-3">
      <h3>React Axios example</h3>
      {/* Get Method */}
      <GetData />
      {/* Post Method */}
      <PostData />
      {/* Put Method  */}
     <PutData/>
      {/* Delete Method */}
     <DeleteData/>
    </div>
 
    
    </ThemeProvider>
  );
}

export default App;

