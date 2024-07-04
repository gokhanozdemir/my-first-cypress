import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from 'reactstrap';

import axios from 'axios';

const initialForm = {
  name: '',
  surname: '',
  email: '',
  password: '',
  terms: false,
};

const initialErrors = {

};

const errorMessages = {
  name: 'Please enter a valid name longer than 3 characters',
  surname: 'Please enter a valid surname longer than 3 characters',
  email: 'Please enter a valid email address',
  password: 'Password must be at least 8 characters long, should contain at least one upper case, one lower case, one digit and one special character',
};

const validateEmail = (email) => {
  const regexTest = new RegExp(
    /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm
  );
  return email.match(regexTest);
};
const validatePassword = (password) => {
  const regexTest = new RegExp(
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm
  );
  return password.match(regexTest);
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [isValid, setIsValid] = useState(false);


  const handleChange = (event) => {
    let { name, value, type } = event.target;
    value = type === 'checkbox' ? event.target.checked : value;
    setForm({ ...form, [name]: value });

    if (
      (name === 'name' && value.length >= 3) ||
      (name === 'surname' && value.length >= 3) ||
      (name === 'terms' && value) ||
      (name === 'password' && value.length >= 8) && validatePassword(value) ||
      (name === 'email' && validateEmail(value))
    ) {
      setErrors({ ...errors, [name]: false });
    } else {
      setErrors({ ...errors, [name]: true });
    }
  };

  useEffect(() => {
    if (
      (form.name.length >= 3) ||
      (form.surname.length >= 3) ||
      validateEmail(form.email) &&
      (form.password.length >= 8) && validatePassword(form.password) &&
      form.terms
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [form]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValid) return;

    axios
      .post('https://reqres.in/api/users', form)
      .then((res) => {
        console.log(res);
        setForm(initialForm);
        console.log("success")
      }).catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className="App">
      <h1 className='underline text-sky-600 mb-4'>Cypress Login Güzel Soru</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="exampleName">Name</Label>
          <Input
            id="exampleName"
            name="name"
            placeholder="Enter your name"
            type="text"
            onChange={handleChange}
            invalid={errors.name}
            value={form.name}
          />
          {errors.name && <FormFeedback>{errorMessages.name}</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Label for="exampleSurName">Surname</Label>
          <Input
            id="exampleSurName"
            name="surname"
            placeholder="Enter your surname"
            type="text"
            onChange={handleChange}
            invalid={errors.surname}
            value={form.surname}
          />
          {errors.surname && <FormFeedback>{errorMessages.surname}</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            id="exampleEmail"
            name="email"
            placeholder="Enter your email"
            type="email"
            onChange={handleChange}
            invalid={errors.email}
            value={form.email}
          />
          {errors.email && <FormFeedback>{errorMessages.email}</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            id="examplePassword"
            name="password"
            placeholder="Enter your password "
            type="password"
            onChange={handleChange}
            invalid={errors.password}
            value={form.password}
          />
          {errors.password && (
            <FormFeedback>{errorMessages.password}</FormFeedback>
          )}
        </FormGroup>
        <FormGroup check>
          <Input
            id="terms"
            name="terms"
            checked={form.terms}
            type="checkbox"
            onChange={handleChange}
            invalid={errors.terms}
            data-cy="terms"
          />{' '}
          <Label htmlFor="terms" check>
            I agree to terms of service and privacy policy
          </Label>
        </FormGroup>
        <FormGroup className="text-center p-4">
          <Button disabled={!isValid} color="primary">
            Register
          </Button>
        </FormGroup>
      </Form></div>
  );
}
