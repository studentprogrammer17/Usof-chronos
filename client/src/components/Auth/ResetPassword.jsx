import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../../api/axios';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import SpinnerLoading from "../Other/Spinner";
import Button from 'react-bootstrap/Button';
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const RESETPASS_URL = '/api/auth/password-reset';

const ResetPassword = () => {
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [isLoading, setLoading] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    const resetPassword = async (e) =>{
        e.preventDefault();
        const v = EMAIL_REGEX.test(email);
        if (!v) {
            setErrMsg("Invalid Entry");
            return;
        }
        try{
            setLoading(true);
            console.log(email)
            // const response = await axios.post(RESETPASS_URL, 
            //     JSON.stringify({email: email}),
            //     {
            //         headers: { 'Content-Type': 'application/json' },
            //         withCredentials: true
            //     }
            // )
            // console.log(response?.data.status, response?.data.values.message);
            setSuccess(true);
            setLoading(false);
        }
        catch(err){
            setLoading(false);
            if (!err?.response) {
                setErrMsg('Сервер спить, вибачте');
            }
            else if(err.response.data.values.message === `User with email - ${email} does not exist`){
                setErrMsg('На цей email ніхто не зареєстрований');
            }
            else{
                setErrMsg('Шось не так');
            }
            errRef.current.focus();
        }
    }

    return(
        <>
        <div className="form-background p-5 d-flex justify-content-center text-white">
        {success ? (
                <section className="reset-passSection email-reg  bg-dark text-white rounded d-flex flex-column p-3 justify-content-center">
                    <h1 className="text-center">Відновлення паролю</h1>
                    
                    <p className="reset-msg">Посилання на відновлення паролю було відправлено на ваш email.</p>
                </section>
            ) : (
        <section  className='registration bg-dark text-white rounded d-flex flex-column p-3 justify-content-center'>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Відновлення паролю</h1>
            <form onSubmit={resetPassword}>
             <Form.Label className="form_label" htmlFor="email">
                            Елекронна пошта:
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                        </Form.Label>
                        <Form.Control
                            className="bg-dark text-white"
                            type="text"
                            id="email"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Ваша пошта для відновлення паролю.
                        </p>
                        <Button  type="submit" variant="secondary" className="login-btn rounded"  disabled={isLoading}>{isLoading ? <SpinnerLoading /> : 'Відновити пароль'}</Button>
                    </form>
        </section>
            )}
            </div>
        </>
    )

}
export default ResetPassword;