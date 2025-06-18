import { FaArrowLeft } from "react-icons/fa6";

function Register(props) {
  return (
    <div className='flex flex-col items-center p-2 w-84 justify-center'>
      
        <div className="flex flex-row items-center justify-between px-2 rounded-t-lg w-full">
                    <FaArrowLeft onClick={() => props.setShowAuth(false)} className="text-2xl cursor-pointer" />
                    <div className="flex flex-row items-center w-full">
                        <h1 className='w-full text-center text-2xl font-bold text-blue-400'>Register</h1>
                    </div>
                </div>

        <div className="w-full">
            <input type="text" placeholder='Email' className='p-4 w-full rounded-lg border border-gray-200 outline-none mt-5' />
        </div>

        <div className="w-full">
            <input type="password" placeholder='Password' className='p-4 w-full rounded-lg border border-gray-200 outline-none mt-5' />
        </div>
        <div className="w-full">
            <input type="password" placeholder='Confirm Password' className='p-4 w-full rounded-lg border border-gray-200 outline-none mt-5' />
        </div>

        <div className="w-full">
            <button className='w-full py-2 px-4 font-bold text-white bg-blue-400 rounded-lg mt-5'>Register</button>
        </div>

        <div className='flex flex-row w-full mt-2 items-center justify-center'>
            <span className='text-sm'>Have an account? </span>
            <span
              onClick={() => props.setShowRegister(false)}
              className='ml-4 text-blue-500 cursor-pointer'>Login</span>
          </div>

    </div>
  )
}

export default Register

