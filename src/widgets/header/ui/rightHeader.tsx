import React from 'react';
import { PersonIcon } from '@radix-ui/react-icons';

const RightHeader = () => {
    const user = {
        name: "testName",
        avatarUrl : ""
    }

  return (
    <div className="flex items-center space-x-4">
    <PersonIcon className="h-6 w-6 text-gray-500" />
    <div className="text-sm font-medium">{user.name}</div>
    <button className="text-sm text-gray-500 hover:text-gray-700">Logout</button>
  </div>
  );
};

export default RightHeader;