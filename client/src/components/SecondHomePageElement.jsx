import React from 'react'
import {Link} from 'react-router-dom'

const SecondHomePageElement = () => {
  return (
    <div className="relative overflow-hidden">
    <div className="pb-[400px] pt-5 sm:pb-[300px] sm:pt-24 lg:pb-[400px] lg:pt-[200px]"> {/* Adjusted padding values */}
      <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 mt-lg:px-8">
        <div className="sm:max-w-lg translate-y-[130px]">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Excellence Meets
          Innovation
          </h1>
          <p className="mt-4 text-xl text-gray-600">
          Step into our latest collection where heritage craftsmanship embraces contemporary design.
           Each piece is thoughtfully curated to help you make your mark with understated sophistication.
          </p>
        </div>
        <div>
          <div className="mt-10">
            <div
              aria-hidden="true"
              className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
            >
              <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                <div className="flex items-center space-x-6 lg:space-x-8">
                  <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div className="h-52 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                      <img
                        alt=""
                        src='http://localhost:3000/uploads/homepage7.jpg'
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                      <img
                        alt=""
                        src='http://localhost:3000/uploads/homepage6.jpg'
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>

                  <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div className="h-40 w-44 overflow-hidden rounded-lg">
                      <img
                        alt=""
                        src='http://localhost:3000/uploads/homepage3.jpg'
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                      <img
                        alt=""
                        src='http://localhost:3000/uploads/homepage4.jpg'
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="h-40 w-44 overflow-hidden rounded-lg">
                      <img
                        alt=""
                        src='http://localhost:3000/uploads/homepage2.jpg'
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
 
                  <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                      <img
                        alt=""
                        src='http://localhost:3000/uploads/homepage5.jpg'
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="h-52  w-44 overflow-hidden rounded-lg">
                      <img
                        alt=""
                        src='http://localhost:3000/uploads/homepage1.jpg'
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <Link
              to="/"
              className="inline-block rounded-md border border-transparent translate-y-[110px] bg-gradient-to-r from-black to-[#111080] hover:text-gray-300 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SecondHomePageElement