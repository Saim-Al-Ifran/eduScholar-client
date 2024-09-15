import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader
} from '@material-tailwind/react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useApplyForApplicationMutation } from '../../features/manage_application/manageApplicationApi';
import { useConfirmPaymentMutation } from '../../features/Payment/paymentApi';
import Swal from 'sweetalert2';

const CheckoutForm = ({ closeModal, scholarship }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const getUser = useSelector(state => state.auth);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    address: '',
    highestQualification: '',
    institution: '',
    yearOfGraduation: '',
    grade: ''
  });
  const { id } = useParams();
  const [clientSecret, setClientSecret] = useState('');
  const totalAmount = scholarship?.serviceCharge + scholarship?.fees;
  const [applyForApplication] = useApplyForApplicationMutation();
  const [confirmPayment, { data, isLoading, isSuccess, isError, error: paymentError }] = useConfirmPaymentMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
    if (isError) {
      console.log(paymentError);
    }
  }, [isSuccess, isError, paymentError, data]);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/payment/create-payment-intent`, { price: totalAmount });
        console.log(res);
        
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.error(err);
      }
    };

    createPaymentIntent();
  }, [totalAmount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
      return;
    }

    setError(null); // Reset any previous error
    try {
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardNumberElement,
        billing_details: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: getUser?.user.email,
          address: {
            line1: formData.address,
          },
        }
      });

      if (paymentMethodError) {
        setError(paymentMethodError.message);
        return;
      }

      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id
      });

      if (confirmError) {
        setError(confirmError.message);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        await applyForApplication({
          data: {
            scholarshipId: scholarship._id,
            personalDetails: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              dateOfBirth: formData.dateOfBirth,
              address: formData.address
            },
            academicDetails: {
              highestQualification: formData.highestQualification,
              institution: formData.institution,
              yearOfGraduation: formData.yearOfGraduation,
              grade: formData.grade
            }
          }
        }).unwrap();

        await confirmPayment({
          data: {
            userEmail: getUser?.user.email,
            scholarship: scholarship._id,
            amount: totalAmount,
            currency: 'USD',
            paymentMethod: 'stripe',
            paymentStatus: 'completed'
          }
        }).unwrap();

        closeModal();
        Swal.fire({
          title: 'Congratulations!',
          text: 'Your payment has completed successfully!',
          icon: 'success'
        });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
        padding: '10px 12px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#f5f5f5',
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      }
    },
    hidePostalCode: true
  };

  return (
    <>
      <DialogHeader>Payment Details</DialogHeader>
      <DialogBody divider className="max-h-96 overflow-y-auto">
        <p className="mb-4">Please complete the payment to apply for the scholarship.</p>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="firstName" className="block mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dateOfBirth" className="block mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              placeholder="Select your date of birth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              required
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="highestQualification" className="block mb-1">
              Highest Qualification
            </label>
            <input
              type="text"
              id="highestQualification"
              name="highestQualification"
              placeholder="Enter your highest qualification"
              value={formData.highestQualification}
              onChange={handleChange}
              required
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="institution" className="block mb-1">
              Institution
            </label>
            <input
              type="text"
              id="institution"
              name="institution"
              placeholder="Enter your institution"
              value={formData.institution}
              onChange={handleChange}
              required
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="yearOfGraduation" className="block mb-1">
              Year of Graduation
            </label>
            <input
              type="text"
              id="yearOfGraduation"
              name="yearOfGraduation"
              placeholder="Enter your year of graduation"
              value={formData.yearOfGraduation}
              onChange={handleChange}
              required
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="grade" className="block mb-1">
              Grade
            </label>
            <input
              type="text"
              id="grade"
              name="grade"
              placeholder="Enter your grade"
              value={formData.grade}
              onChange={handleChange}
              required
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="col-span-2 mb-4">
            <CardNumberElement options={cardElementOptions} />
          </div>
          <div className="col-span-1 mb-4">
            <CardExpiryElement options={cardElementOptions} />
          </div>
          <div className="col-span-1 mb-4">
            <CardCvcElement options={cardElementOptions} />
          </div>
          {error && <p className="col-span-2 text-red-500">{error}</p>}
        </form>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={closeModal} className="mr-1">
          Cancel
        </Button>
        <Button variant="gradient" color="green" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Pay'}
        </Button>
      </DialogFooter>
    </>
  );
};

export default CheckoutForm;
