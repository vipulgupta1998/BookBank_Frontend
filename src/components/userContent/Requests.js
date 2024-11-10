import React, { useEffect, useState } from 'react';
import UserBookCard from '../helper/UserBookCard';
import RequestCard from '../helper/RequestCard';

export default function Requests(props) {
  const [requests,setRequests] = React.useState([]);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const host = process.env.REACT_APP_PORT;

  useEffect(() => {
    const fetchUserRequests = async () => {
      try {
        const response = await fetch(`${host}/user/allRequests`, {
          method: "GET",
          headers: {
            'Content-Type': "application/json",
            "auth-token": localStorage.getItem('token'),
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }
        const json = await response.json();
        setRequests(json.requestHistory);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    fetchUserRequests();
  }, [triggerFetch]);


  const handleApprove = async(request) => {
    console.log("i was approved");
    const response = await fetch(`${host}/book/grantRequest`, {
      method:"post",
      headers: {
         'Content-Type': "application/json",
          "auth-token": localStorage.getItem('token'),
      },
      body:JSON.stringify({bookId:request._id,owner:request.owner,newOwner:request.requestedBy})
    });
    const json = await response.json();
    setTriggerFetch(prev => !prev)
    console.log(json);
  };

  const handleDisapprove = async(request) => {
    const response = await fetch(`${host}/book/rejectRequests`, {
      method:"post",
      headers: {
        'Content-Type': "application/json",
          "auth-token": localStorage.getItem('token'),
      },
      body:JSON.stringify({bookId:request._id,owner:request.owner,newOwner:request.requestedBy})
    });
    const json = await response.json();
    setTriggerFetch(prev => !prev)
    console.log(json);
  };


  console.log(requests);
  return (
    <div>
      {requests.map((request) => (
        <RequestCard
          key={request._id}
          request={request}
          onApprove={handleApprove}
          onDisapprove={handleDisapprove}
        />
      ))}
    </div>
  )
}
