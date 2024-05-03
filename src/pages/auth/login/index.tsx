import { useState } from "react";
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginTest: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('https://reqres.in/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error);
            }

            // Handle successful login
            console.log('Login successful:', data);
            router.push('/pages/homepage');
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
                            <div className="card-body p-5 text-center">
                                <h3 className="mb-5">LOGIN</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-outline mb-4">
                                        <input
                                            type="email"
                                            id="typeEmailX-2"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="form-control form-control-lg"
                                        />
                                        <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input
                                            type="password"
                                            id="typePasswordX-2"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="form-control form-control-lg"
                                        />
                                        <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                                    </div>

                                    <button className="btn btn-primary btn-lg btn-block" type="submit">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginTest;