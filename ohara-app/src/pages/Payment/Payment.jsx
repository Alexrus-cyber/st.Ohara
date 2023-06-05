import { PaymentSuccess } from "./PaymentSuccess";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getStatusBooking } from "../../slices/booking";
import { useParams } from "react-router-dom";

const Payment = () => {
  const { paymentId } = useParams();
  const dispatch = useDispatch();
  const { statusPay } = useSelector((state) => state.booking);
  console.log(paymentId);
  console.log(statusPay);
  useEffect(() => {
    dispatch(getStatusBooking(paymentId));
  }, []);
  return statusPay ? (
    <PaymentSuccess status={statusPay} />
  ) : (
    <PaymentSuccess status={false} />
  );
};

export default Payment;
