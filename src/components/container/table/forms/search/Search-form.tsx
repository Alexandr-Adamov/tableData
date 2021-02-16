import React from 'react';
import { Formik, Field, Form } from 'formik';
import s from './search_form.module.css';
import { valuesType } from '../../../../../types';




type propsType = {
  setSerchUsers: (values: valuesType) => void
}

const SearchForm: React.FC<propsType> = (props) => (

  <Formik
  initialValues={{ sortString: '', column: '' }}
  onSubmit={(values: valuesType) => {
    props.setSerchUsers(values);
  }}
>
  <Form>
    <div className={s.search_container}>
      <Field className={s.search_input} name="sortString" type="text" />
      <Field className={s.select_list} name="column" as="select">
        <option value="">All</option>
        <option value="firstName">Only name</option>
        <option value="lastName">Only last name</option>
        <option value="email">Only email</option>
      </Field>
      <button className={s.button_submit} type="submit">Найти</button>
      <button className={s.button_reset} onClick={() => { props.setSerchUsers({ sortString: '', column: '' }); }} type="button"> Сбросить </button>
    </div>
  </Form>

</Formik>


);

export default SearchForm;
