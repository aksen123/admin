"use client";

import { useEffect, useState } from "react";
import Alert from "@/app/Components/modal/Alert";
import Confirm from "@/app/Components/modal/Confirm";
import Warning from "@/app/Components/modal/Warning";
import { CheckType, modalState } from "@/app/atoms/modal-atom";
import { useRecoilState } from "recoil";

const GlobalComponent = () => {
  const [modal, setModal] = useRecoilState(modalState);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.alert = (message: string, cb?: () => void) => {
      const handle = () => {
        cb && cb();
        setOpen(false);
      };
      setTimeout(() => {
        setModal({
          ...modal,
          type: CheckType.alert,
          title: message,
          handleEvent: handle,
        });
        setOpen(true);
      }, 100);
    };

    window.yesNo = (
      title: string,
      message: string,
      yes?: string,
      cb?: () => void
    ) => {
      const handle = () => {
        cb && cb();
        setOpen(false);
      };
      setTimeout(() => {
        setModal({
          ...modal,
          type: CheckType.yesNo,
          title: title,
          message: message,
          yes: yes ? yes : "확인",
          handleEvent: handle,
        });
        setOpen(true);
      }, 100);
    };
  }, []);
  return (
    <Warning open={open}>
      {modal.type === CheckType.alert && (
        <Alert message={modal.title} callback={modal.handleEvent} />
      )}
      {modal.type === CheckType.yesNo && (
        <Confirm
          title={modal.title}
          message={modal.message}
          yes={modal.yes}
          cb1={modal.handleEvent}
          cb2={() => setOpen(false)}
        />
      )}
    </Warning>
  );
};

export default GlobalComponent;
