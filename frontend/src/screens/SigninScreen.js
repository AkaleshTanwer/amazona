import React from 'react'
import { Link } from 'react-router-dom'

const SigninScreen = () => {
    return (
        <>
            <section>
                <div className="container">
                    <div className="small_container">
                        <h1>Sign In</h1>
                        <form >
                            <div className='mb-3'>
                                <div>
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div>
                                    <input type="email" />
                                </div>
                            </div>
                            <div className='mb-3'>
                                <div>
                                    <label htmlFor="password">Password</label>
                                </div>
                                <div>
                                    <input type="password" />
                                </div>
                            </div>
                            <div className='mb-3'>
                                <button>Sign In</button>
                            </div>
                            <div className='mb-3'>
                                New Customer ? <Link to={'/signup?redirect'}>Create Account</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>

    )
}

export default SigninScreen