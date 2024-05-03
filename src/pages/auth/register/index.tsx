import { useState } from "react";
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterTest: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('https://reqres.in/api/register', {
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
      console.log('Register successful:', data);
      router.push('/auth/login');
    } catch (error) {
      console.error('Register error:', error);
    }
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div className="card shadow-2-strong card-registration" style={{ borderRadius: "15px" }}>
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 text-center">REGISTRATION</h3>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-4 pb-2">
                      <div data-mdb-input-init className="form-outline">
                        <input type="email" id="emailAddress" value={email}
                          onChange={(e) => setEmail(e.target.value)} className="form-control form-control-lg" />
                        <label className="form-label" htmlFor="emailAddress">Email</label>
                      </div>

                    </div>
                    <div className="col-md-6 mb-4 pb-2">

                      <div data-mdb-input-init className="form-outline">
                        <input type="password" id="password" value={password}
                          onChange={(e) => setPassword(e.target.value)} className="form-control form-control-lg" />
                        <label className="form-label" htmlFor="password">Password</label>
                      </div>

                    </div>
                  </div>
                  <div className="mt-4 pt-2">
                    
                    <input data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg btn-block " type="submit" value="Registor" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterTest;