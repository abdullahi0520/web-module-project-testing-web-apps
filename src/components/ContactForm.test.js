import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>);
    const header = screen.queryByText(/contact form/i)
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/contact form/i)
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);
    const firstName = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstName, "Less")
    const err = await screen.findAllByTestId('error');
    expect(err).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
  render(<ContactForm/>);
  const submit = screen.getByRole('button');
  userEvent.click(submit);
  
  await waitFor(()=> {
        const err = screen.queryAllByTestId('error');
        expect(err).toHaveLength(3)
    })
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
  render (<ContactForm/>);
  
  const firstName = screen.getByLabelText(/first name*/i)
  const lastName = screen.getByLabelText(/last name*/i)
  userEvent.type(firstName, 'giovanni')
  userEvent.type(lastName, 'santana')
  const button = screen.getByRole('button');
  userEvent.click(button);

  const err = await screen.findAllByTestId('error')
  expect(err).toHaveLength(1)

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm/>);
  const eMail = screen.getByLabelText(/email*/i);
  userEvent.type(eMail, 'gio@gmail');

  const err = await screen.findByText(/email must be a valid email address/i);
  expect(err).toBeInTheDocument();

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm/>);
  const button = screen.getByRole('button');
  userEvent.click(button);

  const err = await screen.findByText(/lastName is a required field/i);
  expect(err).toBeInTheDocument();

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
   render(<ContactForm/>);
   const firstName = screen.getByLabelText(/first name*/i);
   const lastName = screen.getByLabelText(/last name*/i);
   const eMail = screen.getByLabelText(/email*/i) ;

   userEvent.type(firstName,"abdullahi")
   userEvent.type(lastName,"ahmed")
   userEvent.type(eMail,"abdullahiahmed@gmail.com")

   const button = screen.getByRole('button');
   userEvent.click(button);

   await waitFor(()=> {
      const firstNameDisplay = screen.queryByText('abdullahi') 
      const lastNameDisplay = screen.queryByText('ahmed') 
      const eMailDisplay = screen.queryByText('abdullahiahmed@gmail.com') 
      const messageDisplay = screen.queryByTestId('messageDisplay');

      expect(firstNameDisplay).toBeInTheDocument()
      expect(lastNameDisplay).toBeInTheDocument()
      expect(eMailDisplay).toBeInTheDocument()
      expect(messageDisplay).not.toBeInTheDocument()
   })

});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);
    const firstName = screen.getByLabelText(/first name*/i);
    const lastName = screen.getByLabelText(/last name*/i);
    const eMail = screen.getByLabelText(/email*/i) ;
    const message = screen.getByLabelText(/message/i)
 
    userEvent.type(firstName,"abdullahi")
    userEvent.type(lastName,"ahmed")
    userEvent.type(eMail,"abdullahiahmed@gmail.com")
    userEvent.type(message,'message display yo')
 
    const button = screen.getByRole('button');
    userEvent.click(button);
 
    await waitFor(()=> {
       const firstNameDisplay = screen.queryByText('abdullahi') 
       const lastNameDisplay = screen.queryByText('ahmed') 
       const eMailDisplay = screen.queryByText('abdullahiahmed@gmail.com') 
       const messageDisplay = screen.queryByText('message display yo');
 
       expect(firstNameDisplay).toBeInTheDocument()
       expect(lastNameDisplay).toBeInTheDocument()
       expect(eMailDisplay).toBeInTheDocument()
       expect(messageDisplay).toBeInTheDocument()
    })
 
});