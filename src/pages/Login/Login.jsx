import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { tokenValid } from 'helpers';
import { Font, H3 } from 'components';
import { appConstants } from 'modules';
import { StyledLogin, Center } from './styles';
import { Field, FieldError, Button, Spacer } from 'xerum';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import _ from 'lodash';

const dark = appConstants.themes.dark;

const defaultValues = {
  email: '',
  password: '',
};

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email.').required('Email is required.'),
  password: yup.string().required('Password is required.'),
});

const Login = props => {

  const { login, addNotification, userInfo, ...rest } = props;
  const [ passwordVisible, setPasswordVisible ] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const token = userInfo?.token;
  const darkTheme = rest?.selectedTheme === dark;

  useEffect(() => {
    const { state } = location;

    if (token) {
      const expired = !tokenValid(token);
      const route = !_.isEmpty(state) ? state.from.pathname + state.from.search : '/';
      if (!expired) navigate(route);
    }
  }, [ token, navigate, location ]);

  const handleSubmit = (values, actions) => {
    const { setSubmitting } = actions;
    const { email, password } = values;
    const loginError = { message: 'Unable to login', type: 'error' };

    const callbacks = {
      onFail : () => addNotification(loginError),
      onComplete: () => setSubmitting(false),
    };

    const payload = {
      email: email.toLowerCase(),
      password,
    };

    login(payload, callbacks);
  };

  const buildForm = () => {
    if (!token) {
      return (
        <Formik
          initialValues={defaultValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {form => (
            <Form>
              <H3>Log in</H3>
              <Spacer size={2} />

              <Field
                type='email'
                name='email'
                label={<Font weight='semibold'>Email</Font>}
                icon='fa-solid fa-envelope'
                disabled={false}
                solidFill={false}
                form={form}
                textColor={darkTheme && '#fafafa'}
                {...rest}
              />
              <FieldError name='email' {...rest} />
              <Spacer />

              <Field
                name='password'
                label={<Font weight='semibold'>Password</Font>}
                type={passwordVisible ? 'text' : 'password'}
                icon={passwordVisible ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
                iconCallback={() => setPasswordVisible(!passwordVisible)}
                autoComplete='current-password'
                disabled={false}
                form={form}
                textColor={darkTheme && '#fafafa'}
                {...rest}
              />
              <FieldError name='password' {...rest} />
              <Spacer size={2} />

              <Button
                type='submit'
                text={
                  <Font weight='semibold'>
                    {form.isSubmitting ? 'Logging in...' : 'Login'}
                  </Font>
                }
                disabled={form.isSubmitting}
                callback={form.handleSubmit}
                {...rest}
              />

              <Spacer />

              <Center>
                <Link to='/create-account'>Create account</Link> or&nbsp;
                <Link to='/reset-password'>Reset password</Link>
              </Center>
            </Form>
          )}
        </Formik>
      );
    }
  };

  return (
    <StyledLogin>
      {buildForm()}
    </StyledLogin>
  );
};

export { Login };