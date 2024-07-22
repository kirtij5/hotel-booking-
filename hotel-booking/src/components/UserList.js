import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import './userList.css'; // Import the CSS file

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8081/user'); // Replace with your API endpoint
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        message.error('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  const userColumns = [
    { title: 'Username', dataIndex: 'username', key: 'username' },
    { title: 'Email', dataIndex: 'user_email', key: 'user_email' },
    // Add more columns for user data as needed
  ];

  return (
    <div className="user-list-page">
      <h2 className="user-list-title">User Listings</h2>
      <Table dataSource={users} columns={userColumns} className="user-list-table" />
    </div>
  );
};

export default UserList;
