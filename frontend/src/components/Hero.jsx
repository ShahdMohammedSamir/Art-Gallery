import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
    return (
        <div className='flex flex-col sm:flex-row border border-gray-400'>
            <img src={assets.ForHome} className='w-full sm:w-5/5' alt="" />
        </div>
    )
}

export default Hero