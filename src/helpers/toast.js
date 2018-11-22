import toastr from 'toastr';


const toast = {
  success: (displayText) => {
    toastr.clear();
    toastr.success(displayText);
  },
  error: (displayText) => {
    toastr.clear();
    toastr.error(displayText);
  }
};

export default toast;
