import React, { useEffect } from "react";
import Online from "../online/Online";
import "./Rightbar.css";
// import { socket } from "../../socket";
import { getAllOnlineUsers } from "../../api/userApiService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { socket } from "../../socket";

const Rightbar = () => {
  const queryClient = useQueryClient();

  const { data: onlineUsersData } = useQuery({
    queryKey: ["onlineUsers"],
    queryFn: getAllOnlineUsers,
  });

  useEffect(() => {
    socket.on("getOnlineUsers", () =>
      queryClient.invalidateQueries({ queryKey: ["onlineUsers"] })
    );
  }, [queryClient]);

  return (
    <div className="rightbar">
      <div className="rightbarWrap">
        <h4 className="onlineheading">Online Friends</h4>
        <ul className="onlineFriendList">
          {onlineUsersData?.data.length < 1 ? (
            <div>No Users Online</div>
          ) : (
            onlineUsersData?.data.map((user) => (
              <Online key={user._id} user={user} />
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Rightbar;
