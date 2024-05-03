import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField
} from "@mui/material";
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


export default function Homepage() {

  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  interface User {
    id: number; email: string; first_name: string; last_name: string; avatar: string;
  }

  const handleDelete = async (id: number) => {
    const response = await fetch(`/api/delete/${id}`, {
      method: "DELETE"

    });

  };

  const handleEdit = (id: any) => {
    setIsEditing(true); 
    setSelectedId(id); 
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://reqres.in/api/users?page=2');
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error);
        }
        setUsers(data.data); // Assuming data.data contains the array of users
        console.log('User data fetched successfully:', data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/edit/${selectedId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, job }), // Send name and job in the request body
      });

      const data = await response.json();
      const status = await response.status;

      console.log(data); // Log the data to the console
      console.log("status", status);

      setIsEditing(false); // Close the dialog after submitting the form
    } catch (error) {
      console.error(error); // Log any errors
    }
  };
  

  return (
   
    <div className="container">
      <div className="text-center mx-auto pb-4 wow fadeInUp ">
        <h1 className=" text-center text-title wink-bg"> LIST USERS</h1>
      </div>
      <div className="row  row-cols-md-4">
        {users.map((user, index) => (
          <div className="col mb-4 d-flex justify-content-center" key={index}>
            <div className="card editcard">
            <img src= "https://www.everwallpaper.co.uk/cdn/shop/collections/marble-wallpaper-mural-living-room.jpg?v=1660199303"  alt="Cover" className="card-img-top"/>
            <div className="card-body text-center">
              <img src= {user.avatar}  alt="User" className="img-fluid img-thumbnail rounded-circle border-0 mb-3"/>
              <h5 className="card-title">{`${user.first_name} ${user.last_name}`}</h5>
              <p className="text-secondary mb-1">Email : {user.email}</p>
                <div className="row">
                  <div className="col">
                    <i className="bi bi-pencil-square editicon" onClick={() => handleEdit(user.id)}></i>
                  </div>
                  <div className="col">
                    <i className="bi bi-trash-fill editiconn" onClick={() => handleDelete(user.id)}></i>
                  </div>
                  <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        To edit this user, please enter the new name and job.
                      </DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <TextField
                        margin="dense"
                        id="job"
                        label="Job"
                        type="text"
                        fullWidth
                        value={job}
                        onChange={(e) => setJob(e.target.value)}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSubmit}>Submit</Button>
                    </DialogActions>
                  </Dialog>


                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
  );
}
