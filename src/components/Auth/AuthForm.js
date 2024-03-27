import { useState, useRef } from 'react';
import classes from './AuthForm.module.css';
import SimpleModal from './SimpleModal';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setModalMessage(''); 
  };

 
  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true); 
    setModalMessage(''); 
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLogin) {
     
    } else {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDo8G727k7YUfG19hcgPOG5qJXJuU8cLLM', {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then(data => {
            let errorMessage = "Authentication failed!";
            
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .catch(err => {
    
        setModalMessage(err.message);
      });
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          {isLoading ? (
            <div className={classes.loader}>Loading...</div>
          ) : (
            <button type='submit' className={classes.btn}>
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          )}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
      {modalMessage && <SimpleModal message={modalMessage} onClose={() => setModalMessage('')} />}
    </section>
  );
};

export default AuthForm;
