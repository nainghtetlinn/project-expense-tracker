import { createContext, useContext, useState } from "react";

const NotiContext = createContext({
  show: false,
  msg: "",
  type: "info",
  showNoti: ({ msg, type }: { msg: string; type?: string }) => {},
  hideNoti: () => {},
});

type NotiType = {
  show: boolean;
  msg: string;
  type: "info" | "error" | "success";
};

const types = ["info", "error", "success"];

function NotiContextProvider({ children }: { children: JSX.Element }) {
  const [show, setShow] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const [type, setType] = useState<"info" | "error" | "success">("info");

  const showNoti = ({
    msg,
    type,
  }: {
    msg: string;
    type?: "info" | "error" | "success" | any;
  }) => {
    setShow(true);
    setMsg(msg);
    setType(types.includes(type) ? type : "info");
  };
  const hideNoti = () => {
    setShow(false);
  };

  return (
    <NotiContext.Provider value={{ show, msg, type, showNoti, hideNoti }}>
      {children}
    </NotiContext.Provider>
  );
}

export const useNotiContext = () => useContext(NotiContext);
export default NotiContextProvider;
