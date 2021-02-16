import React from 'react';
import {
  Formik, Field, Form,
} from 'formik';
import * as yup from 'yup';
import MaskedInput from 'react-text-mask';
import s from './add_form.module.css';

const phoneNumberMask = [
  '(',
  /[1-9]/,
  /\d/,
  /\d/,
  ')',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];


// type propsType = {
//   isAddUser: boolean
//   showForm:(button :string, e:any, flag: boolean) => void
//   addPerson: (values:{  id: string, firstName: string, lastName: string, email: string, phone: string }) => void
// }


const AddUserForm = (props) => {
  const { isAddUser, showForm, addPerson } = props;

  const validationSchema = yup.object().shape({
    id: yup.number().typeError('Должно быть числом').required('Поле обязательно'),
    firstName: yup.string().typeError('Должно быть строкой').required('Поле обязательно'),
    lastName: yup.string().typeError('Должно быть строкой').required('Поле обязательно'),
    email: yup.string().email('Введите валидный email').required('Поле обязательно'),
    phone: yup.string().min(13, 'Введите полный номер').required('Поле обязательно'),
  });

  return (
    <Formik
      initialValues={{
        id: '', firstName: '', lastName: '', email: '', phone: '',
      }}
      onSubmit={(values) => {
        addPerson(values);
      }}
      validationSchema={validationSchema}
      validateOnBlur
    >
      {({
        values, errors, touched, handleChange, handleBlur, isValid, dirty,
      }) => (
        <Form className={s.form_container}>
          {isAddUser
            ? (
              <div className={s.search_container}>
                <div className={s.input_container}>
                  <label htmlFor="id">
                    <Field
                      placeholder="enter id"
                      className={s.form_input}
                      name="id"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.id}
                    />
                    {touched.id && errors.id && <div className={s.error}>{errors.id}</div>}
                  </label>
                </div>

                <div className={s.input_container}>
                  <label htmlFor="firstName">
                    <Field
                      placeholder="enter firstName"
                      className={s.form_input}
                      name="firstName"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                    />
                    {touched.firstName && errors.firstName
                      && <div className={s.error}>{errors.firstName}</div>}
                  </label>
                </div>

                <div className={s.input_container}>
                  <label htmlFor="lastName">
                    <Field
                      placeholder="enter lastName"
                      className={s.form_input}
                      name="lastName"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                    />
                    {touched.lastName && errors.lastName
                      && <div className={s.error}>{errors.lastName}</div>}
                  </label>
                </div>

                <div className={s.input_container}>
                  <label htmlFor="email">
                    <Field
                      placeholder="enter email"
                      className={s.form_input}
                      name="email"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    {touched.email && errors.email && <div className={s.error}>{errors.email}</div>}
                  </label>
                </div>

                <div
                  className={s.input_container}>
                  <label htmlFor="phone">
                    <Field
                      name="phone"
                      value={values.phone}
                      onBlur={handleBlur}
                    >

                      {({ field }) => (
                        <MaskedInput
                          {...field}
                          mask={phoneNumberMask}
                          placeholder="enter phone"
                          id="phone"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.phone && touched.phone
                              ? s.form_input_error
                              : s.form_input
                          }
                          guide={false}
                        />
                      )}
                    </Field>
                    {errors.phone && touched.phone && (
                      <div className={s.error}>{errors.phone}</div>
                    )}
                  </label>
                </div>

                {values.id && values.firstName && values.lastName
                  && values.email && values.phone !== ''
                  ? <button disabled={!isValid || !dirty} className={s.button_add} type="submit">Добавить</button> : <button onClick={(e) => { showForm('close', e, false); }} className={s.button_close} type="submit"> Закрыть </button>}
              </div>
            )
            : <button onClick={(e) => { showForm('add', e, true); }} className={s.button_add} type="button">Добавить</button>}
        </Form>
      )}
    </Formik>
  );
};

export default AddUserForm;
