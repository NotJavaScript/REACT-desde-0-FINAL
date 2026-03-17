import React, {useState} from "react";
import registerService from "services/register";
import { useForm } from 'react-hook-form'
import { ErrorMessage } from "@hookform/error-message";

export default function Register() {
const { register, handleSubmit, formState: { errors } } = useForm();

  const [registered, setRegistered] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = values => {
    setIsSubmitting(true)
    registerService(values)
      .then(() => {
        setRegistered(true)
        setIsSubmitting(false)
      })
  }

  if (registered) {
    return <h4>
      Congratulations ✅! You've been successfully registered!
    </h4>
  }

  return (
    <>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <label>
        <input
          className={errors.username ? 'error' : ''}
          placeholder="Inserte su username"
          name="username"
          {...register("username", { required: 'This is required' })}
        />
        <ErrorMessage errors={errors} name='username' as="small"/>
        </label>
        <label>
        <input
          className={errors.password ? 'error' : ''}
          placeholder="Inserte su password"
          name="password"
          {...register("password", { required: 'This is required' })}
          type='password'
        />
        </label>
        <ErrorMessage errors={errors} name='password' as="small" />

        <button className="btn" disabled={isSubmitting}>
          Registrarse
        </button>
      </form>
    </>
  );
}