import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();
  document.title = "FlickNest | Contact";
  const form = useRef();
  const [isFormValid, setIsFormValid] = useState(false);

  // Function to validate form inputs
  const validateForm = () => {
    const nameInput = document.getElementById("user_name");
    const emailInput = document.getElementById("user_email");
    const messageInput = document.getElementById("message");

    // Check if all inputs are filled
    if (nameInput.value && emailInput.value && messageInput.value.trim()) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      alert("Please fill out the form correctly.");
      return;
    }

    emailjs.sendForm(
      import.meta.env.VITE_REACT_APP_EMAIL_SERVICE_ID,
      import.meta.env.VITE_REACT_APP_EMAIL_TEMPLATE_ID,
      form.current,
      import.meta.env.VITE_REACT_APP_EMAIL_PUBLIC_KEY
    )
   .then((result) => {
        console.log('SUCCESS!', result.text);
        alert("Form submitted successfully."); // Notify the user upon success
    }, (error) => {
        console.log('FAILED...', error.text);
    });
  }

  return (
    <div className="flex items-center justify-center w-full bg-[#18171d]">
      <div className="bg-[#1f1e24] p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className='text-xl text-zinc-400 font-semibold mb-6'>
          <i onClick={() => navigate(-1)} className="hover:text-[#6556cd] ri-arrow-left-line cursor-pointer inline-block mr-2"></i>
          Contact Me
        </h1>

        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <div className='grid grid-cols-2 gap-3'>
            <div>
              <label htmlFor="user_name" className="block text-sm font-medium text-gray-300">Name</label>
              <input type="text" name="from_name" id="user_name" required onChange={validateForm} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="user_email" className="block text-sm font-medium text-gray-300">Email</label>
              <input type="email" name="from_email" id="user_email" required onChange={validateForm} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className='col-span-2'>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
              <textarea name="message" id="message" rows="4" required onChange={validateForm} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
            </div>
          </div>
          <div className='mt-3 flex justify-end'>
            <button 
              type="submit" 
              disabled={!isFormValid} 
              className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md ${isFormValid? 'bg-[#6556cd] hover:bg-[#3f386f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' : 'opacity-20 cursor-not-allowed bg-gray-300 text-zinc'}`}
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
