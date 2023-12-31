
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/layout/header/header";
import Footer from "../../components/layout/footer/footer";
import Banner from "../../components/banner/banner";
import Sidebox from "../../components/sidebox/sidebox";
import Loginbox from "../../components/layout/loginbox/loginbox";
import Registerbox from "../../components/layout/registerbox/registerbox";

export default function Homepage() {
  useEffect(() => {
    document.getElementById("root").classList.add("homepage");
  }, []);

  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));

  const [loginboxVisibility, setLoginboxVisibility] = useState(false);
  const [registerboxVisibility, setRegisterboxVisibility] = useState(false);

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState("individual");

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirmation: "",
  });


  const navigate = useNavigate();

  
  const login = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/user/login', {
        email:email,
        password:password
      });
     
      if (response.status === 201) {
        localStorage.setItem("auth", JSON.stringify(response));
        setAuth(true);
        setLoginboxVisibility(false);
        setLoading(false);
        
/*         setTimeout(() =>
     navigate("/profile"); */
        alert("Login successful");
        
      } else {
        alert("Unexpected response from server"); 
      }
    } catch (error) {
      if (error.response) {
        setLoading(false);
       
        if (error.response.status === 401) {
          alert("Password are not matched");
        } else {
          alert("Server error. Please try again later."); 
        }
      } else if (error.request) {
       
        alert("No response from server. Please try again later.");
      } else {
    
        alert("Request failed. Please check your internet connection and try again.");
      }
    }
  };
  const logout = () => {
    setAuth(false);
    setLoginboxVisibility(false);
    localStorage.removeItem("auth");
  };

  
  const register = async (event) => {
    
    event.preventDefault();
    if (activeTab==="corporate"){

    try {
    const response = await axios.post("http://localhost:3001/user/company/register",{
    registerData:registerData});

    if (response.status === 201) {
      setRegisterboxVisibility(false);
      setLoading(false);
      
      alert("Register successful");
      
    } else {
      alert("Unexpected response from server"); 
    }}
   
   catch (error) {
    if (error.response) {
      setLoading(false);
     
      if (error.response.status === 401) {
        alert(error.response.data.error);
      } else {
        alert("Server error. Please try again later."); 
      }
    } else if (error.request) {
     
      alert("No response from server. Please try again later.");
    } else {
  
      alert("Request failed. Please check your internet connection and try again.");
    }
  }
}
   else if (activeTab==="individual"){
   
    try {
      const response = await axios.post("http://localhost:3001/user/personal/register",{
      registerData:registerData});
  
      if (response.status === 201) {
        setRegisterboxVisibility(false);
        setLoading(false);
        
        alert("Register successful");
        
      } else {
        alert("Unexpected response from server"); 
      }}
     
     catch (error) {
      if (error.response) {
        setLoading(false);
       
        if (error.response.status === 401) {
          alert(error.response.data.error);
        }else if(error.response.status===409){
          alert(error.response.data)
        }
        
        else {
          alert("Server error. Please try again later."); 
        }
      } else if (error.request) {
       
        alert("No response from server. Please try again later.");
      } else {
    
        alert("Request failed. Please check your internet connection and try again.");
      }
    }
  }}

  return (
    <div className="wrapper homepage">
      <Header
        auth={auth}
        logout={logout}
        setLoginboxVisibility={setLoginboxVisibility}
        setRegisterboxVisibility={setRegisterboxVisibility}
      />
      <Banner setRegisterboxVisibility={setRegisterboxVisibility} />
      <Sidebox />
      <Footer />
      {!auth && (
        <>
          <Loginbox
            login={login}
            loginboxVisibility={loginboxVisibility}
            setLoginboxVisibility={setLoginboxVisibility}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            error={error}
            setError={setError}
            loading={loading}
          />
          <Registerbox
            register={register}
            registerboxVisibility={registerboxVisibility}
            setRegisterboxVisibility={setRegisterboxVisibility}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            registerData={registerData}
            setRegisterData={setRegisterData}
            error={error}
            setError={setError}
            loading={loading}
          />
        </>
      )}
    </div>
  );
}
