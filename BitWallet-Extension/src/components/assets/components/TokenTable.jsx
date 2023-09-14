import React from 'react';
import { WiDirectionUpRight } from 'react-icons/wi';
const TokenTable = (props) => {
  return (
    <>
      <div className='flex justify-between h-fit'>
        {' '}
        <th
          scope='row'
          // onClick={props.action}
          className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap w-fit dark:text-white'>
          {props.symb}{' '}
        </th>{' '}
        <td
          // onClick={props.action}
          className='px-6 py-4 flex text-white'>
          {' '}
          {props.value}{' '}
          <WiDirectionUpRight className='text-3xl font-bold text-blue-400 hover:cursor-pointer' />{' '}
        </td>{' '}
      </div>
    </>
  );
};
export default TokenTable;
