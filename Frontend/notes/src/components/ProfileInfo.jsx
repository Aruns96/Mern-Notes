import React from 'react'

const ProfileInfo = ({handleLogOut,person}) => {
  return (
    <div className='flex items-center gap-3 justify-end'>
        <div className='w-12 h-12 flex items-center  bg-gray-200 justify-center rounded-full'>N</div>
        <div>
            <p>{person}</p>
            <button className='text-sm text-red-600 underline' onClick={handleLogOut}>
                Logout
            </button>
        </div>
    </div>
  )
}

export default ProfileInfo