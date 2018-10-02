import { ToastOptions } from 'ng2-toastr';

export class CustomToastrOption extends ToastOptions {
    animate = 'fade'; // you can pass any options to override defaults
    newestOnTop = false;
    showCloseButton = true;
    dismiss = 'auto';
    positionClass = 'toast-bottom-center';
}