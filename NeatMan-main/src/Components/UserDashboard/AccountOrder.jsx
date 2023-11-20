import React from 'react';
import { Table } from 'antd';
import Header from '../Navigation/Header';
import Hamburger from '../Navigation/Hamburger';
import Footer from '../Navigation/Footer';

export default function AccountOrder() {
  const columns = [
    {
      title: 'Item',
      dataIndex: 'item',
      key: 'item',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Item Number',
      dataIndex: 'itemNumber',
      key: 'itemNumber',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const data = [
    {
      key: '1',
      item: '$400.00',
      amount: '2023-07-01',
      date: 'Delivered',
      status: 'ABC123',
      itemNumber: '123 Main St, City, State, 12345',
      address: 'ABC123',
    },
    {
      key: '2',
      item: '$50000.00',
      amount: '2023-07-05',
      date: 'Pending',
      status: 'DEF456',
      itemNumber: '456 Elm St, City, State, 67890',
      address: 'DEF456',
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="md:w-[90%] md:mx-auto p-4">
        <div>
          <Header />
          <Hamburger />
        </div>
        <div>
        <h1 className='text-2xl mt-5'>Order History</h1>

        </div>
        <div className=' my-16 justify-center overflow-scroll w-full'>
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
      <Footer/>
    </div>
  );
}
