import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessage } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
  const { socket } = useSelector((store) => store.socket);
  const dispatch = useDispatch();
  const messages = useSelector((store) => store.message.messages);

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (newMessage) => {
        dispatch(setMessage([...messages, newMessage]));
      });
    }

    return () => {
      if (socket) {
        socket.off("newMessage");
      }
    };
  }, [socket, dispatch, messages]);

  return messages;
};

export default useGetRealTimeMessage;
