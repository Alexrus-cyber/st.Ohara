import { PaymentSuccess } from "./PaymentSuccess";

const Payment = () => {
  const status = "success";
  return status && <PaymentSuccess status={status} />;
};

export default Payment;
