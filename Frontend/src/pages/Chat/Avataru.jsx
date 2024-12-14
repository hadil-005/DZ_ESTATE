import React from 'react'
import { Avatar, Typography } from "@material-tailwind/react";

const Avataru = () => {
  return (
     <div className="flex items-center gap-4">
              <Avatar
                src="https://docs.material-tailwind.com/img/face-2.jpg"
                alt="avatar"
              />
              <div>
                <Typography variant="h6">Tania Andrew</Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal"
                >
                 azeer
                </Typography>
              </div>
            
            </div>

          
  )
}

export default Avataru