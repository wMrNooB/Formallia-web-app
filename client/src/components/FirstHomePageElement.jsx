import React from 'react'
import {Link} from 'react-router-dom'

const FirstHomePageElement = () => {
  return (
    <div className="mx-auto max-w-2xl mt-8 pt-20 pb-18 mb-18 ">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-00 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Same-Day Delivery Available All Over Morocco.{' '}
              <Link to="#" className="font-semibold text-[#111080]">
                <span aria-hidden="true" className="absolute inset-0" />
                Read more <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-balance text-5xl font-semibold tracking-tight text-black sm:text-7xl">
            Daily Elegance Extraordinary Impact
            </h1>
            <p className="mt-8 text-pretty text-lg font-medium text-gray-600 sm:text-xl/8">
            Step into a world where classic tailoring meets modern sophistication. Our handpicked collection features impeccably crafted suits, luxurious timepieces, and refined accessories designed for the discerning gentleman.
            Each piece is selected to help you make a lasting impression with effortless confidence.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="#"
                className="rounded-md bg-gradient-to-r from-black to-[#111080] hover:text-gray-300 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Explore Collection
              </Link>
              <Link to="#" className="text-sm font-semibold leading-6 text-gray-900">
              Book Consultation <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
    </div>
  )
}

export default FirstHomePageElement