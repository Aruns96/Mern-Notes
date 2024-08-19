import React,{useState} from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const Signup = () => {
  const history = useHistory()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [error, setError] = useState('');


   
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setError('');
  
      if (!email || !password || !cpassword) {
        setError('All fields are required');
        return;
      }
  
      if (password !== cpassword) {
        setError('Passwords do not match');
        return;
      }
  
      
     
      let data =  { email, password }
      console.log(data)
      axios.post("http://localhost:3000/user/signup" ,data)
      .then(res =>{
          history.replace("/login")
          console.log(res.data.message);
          
          setEmail('');
          setPassword('');
          setCPassword('');
      })
      .catch(e => {
          console.log(e)
          alert(e.response.data.message)
          
      })
  
  }


  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2
          className="text-2xl font-bold
 mb-4"
        >
          Signup
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700
 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3   
 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter   
 your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>{" "}
           
            <div className="flex items-center">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full
 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
                required
              />
             
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="cpassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              confirm password
            </label>{" "}
           
            <div className="flex items-center">
              <input
                type="password"
                id="cpassword"
                value={cpassword}
                onChange={(e) => setCPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full
 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="confirm your password"
                required
              />
             
            </div>
          </div>
          <h2 className='text-sm font-semibold text-red-500'>{error}</h2>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none
 focus:shadow-outline"
          >
            Signup
          </button>
          <p className="text-sm text-center mt-7 text-blue-500">
            Have an Account?
            <Link to="/login">Login account</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signup