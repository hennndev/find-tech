"use client"
import React from 'react'
import { BiLike, BiDislike } from 'react-icons/bi'

const Comments = () => {
  return (
    <div className="mt-16 pt-7 border-t border-gray-200">
      <div className="mb-10 text-gray-700">
        <h2 className="mb-2 text-xl font-semibold">The Conversations (5)</h2>
        <p className="">Start to discussion, dont use bad words</p>
      </div>
      <div className="mt-7">
        {/* {Array(5).fill("").map((_, idx) => (
          <div key={idx} className="flex mb-7 border-b border-gray-200 pb-7">
            <div className="w-12 h-12 rounded-full mr-5">
              <img src="https://www.ohchr.org/sites/default/files/styles/hero_5_image_desktop/public/2022-11/women-rights-main-image.jpg?itok=RRGl2PFb" alt="sample" className="w-full h-full rounded-full object-cover"/>
            </div>
            <div>
              <div className="flexx space-x-3">
                <h3 className="font-semibold mb-1">Fani Ovi Mariana</h3>
                <span>&middot;</span>
                <p className="text-gray-600 text-sm">11 h ago</p>
              </div>
              <p className="font-medium text-gray-600">Nice blog, I appreciate it about your blog</p>
              <div className="flexx text-sm text-gray-600 mt-2">
                <p>Reply</p>
                <span className="mx-1.5">&middot;</span>
                <p>Share</p>
                <div className="flexx ml-3">
                    <BiLike className="text-gray-400 text-lg mr-1"/>
                    <BiDislike className="text-gray-400 text-lg"/>
                </div>
              </div>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  )
}

export default Comments