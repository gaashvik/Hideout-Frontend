// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
<footer className="bg-dark">
    <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
              <a href="/" className="flex items-center">
                  <img src="https://i.ibb.co/jGMgp7r/seamless-ui.png" className="h-8 me-3" alt="Hiideout Logo" />
                  <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Traverse</span>
              </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-dark uppercase">Resources</h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                      <li className="mb-4">
                          <p  className="hover:underline"><Link to={"https://reactjs.com/"}>React JS</Link></p>
                      </li>
                      <li>
                          <p  className="hover:underline" ><Link to={"https://tailwindcss.com/"}>Tailwind CSS</Link></p>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-dark uppercase">Follow us</h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                      <li className="mb-4">
                          <p  className="hover:underline "><Link to={"https://github.com/Adity20/hideout-project-DTI"}>Github</Link></p>
                      </li>
                      <li className="mb-4">
                          <p  className="hover:underline "><Link to={'/contact'}>Contact us</Link></p>
                      </li>
                      {/* <li>
                          <a href="https://discord.gg/4eeurUVvTy" className="hover:underline">Discord</a>
                      </li> */}
                  </ul>
              </div>
              
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-dark uppercase">Useful Links</h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                      <li className="mb-4">
                          <p  className="hover:underline"><Link to={"https://www.google.co.in/maps"}>Google Maps</Link></p>
                      </li>
                      <li>
                          <p  className="hover:underline"><Link to={"https://www.airbnb.co.in/"}>Airbnb</Link></p>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="/" className="hover:underline">Hideout™</a>. All Rights Reserved.
          </span>
      </div>
    </div>
</footer>

    </>
  )
}

export default Footer