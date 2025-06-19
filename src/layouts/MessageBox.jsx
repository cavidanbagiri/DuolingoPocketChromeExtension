

// import React from 'react'
// import { motion } from 'framer-motion';

// function MessageBox(props) {
//   return (
//     <motion.div
//       initial={{ x: '100%', opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       exit={{ x: '100%', opacity: 0 }}
//       transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      
//       className='fixed right-10 bottom-10 z-50 flex flex-col items-center justify-center text-white p-4 rounded-md'
//     >
//       <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam, deleniti.</span>
//     </motion.div>
//   );
// }
// export default MessageBox


import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { AiOutlineExclamationCircle } from "react-icons/ai";


import { AnimatePresence, motion } from 'framer-motion';


function MessageBox(props) {
    return (

        <AnimatePresence>

            <motion.div exit={{ opacity: 0, x: -800, }} initial={{ opacity: 0, x: 800, }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}
            className={`z-20 fixed bottom-10 flex w-full justify-end `}>
                {
                    props.color === 'bg-green-500'
                        ?
                        <div className={` bg-green-500 rounded-lg flex items-center mr-20 text-lg  py-4 px-10 text-white shadow-xl`}>
                            <IoMdCheckmarkCircleOutline className={'text-3xl mr-3 text-green-700 '} /> {props.message}
                        </div>
                        :
                        <div className={` bg-red-500 rounded-lg flex mr-20 text-lg py-4 px-10 text-white shadow-xl`}>
                            <AiOutlineExclamationCircle className={'text-3xl mr-3 text-red-700'} /> {props.message}
                        </div>
                }
            </motion.div>
        </AnimatePresence>

    )
}

export default MessageBox