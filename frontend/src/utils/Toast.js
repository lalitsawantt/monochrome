import { toast } from 'react-toastify';

const Toast = (message, type) => {
  if(type === "success"){
    toast.success(message);
  }else if(type==="error"){
    toast.error(message);
  }else if(type === "warn"){
    toast.warn(message);
  }else{
    toast.info(message);
  }
}

export default Toast