import Button from "@mui/material/Button";
import NavBar from "../components/NavBar"
import 'aos/dist/aos.css';

function Home() {
  return (
      <div className=" ">
        {/* inner conatiner */}
        <div className="ml-10 mr-10 p-3 ">
          <NavBar data-aos="fade-up"></NavBar>
          {/* landing */}
          <div className="flex justify-center items-center"  data-aos="fade-up">
            {/* left */}
            <div className="space-y-6">
              <h1>Your Gateway For Gaming And Pc Universe</h1>
              <Button variant="outlined">Shop Now</Button>
            </div>
            {/* right */}
            <div>
              <img className="rounded-2xl rightImg" src="/side.jpg" />
            </div>
          </div>
          {/* body */}
          <div className="">
            
          </div>
        </div>
      </div>
  )
}

export default Home
