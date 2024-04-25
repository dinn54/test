'use client'
import React from 'react'
import RightHeader from './rightHeader'
import LeftHeader from './leftHeder'

export function Header() {
  const menus = {
    carrieverse: [
      { link: "/", title: "W3C", description: "Web3 Content Site 관련 기능" },
      { link : "/", title: "Cling-DEFI", description : "Web3 Content Site 관련 기능" },
      { link : "/", title: "Helper", description : "CVTX 이벤트 물량 전송 기능 등 도우미 기능" }
    ],
    megalink: [
      { link: "/", title: "Vesting", description: "Token Lockup 관련 기능" },
    ]
  }

  return (
    <div className='flex justify-between items-center m-3'>
    {/* Left Header Menus */}
      <LeftHeader />
      <RightHeader />
    </div>
  )
}

export default Header
