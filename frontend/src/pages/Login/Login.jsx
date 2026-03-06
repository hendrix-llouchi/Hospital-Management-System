import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (role === 'nurse') navigate('/nurse');
    else if (role === 'doctor') navigate('/doctor');
    else if (role === 'pharmacist') navigate('/pharmacist');
  };

  return (
    <div className="login-page">
      {/* Header */}
      <header className="login-header">
        <div className="login-header__brand">
          <svg className="login-header__icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="3" stroke="#0f172a" strokeWidth="2" />
            <path d="M12 7v10M7 12h10" stroke="#6bcb75" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="login-header__title">Hospital PMS</span>
        </div>
        <nav className="login-header__nav">
          <a href="#" className="login-header__link">Help</a>
          <a href="#" className="login-header__link">Contact</a>
        </nav>
      </header>

      {/* Main content */}
      <div className="login-container">
        {/* Illustration side */}
        <div className="login-illustration">
          <div className="login-illustration__image" />
          <div className="login-illustration__gradient" />
          <div className="login-illustration__content">
            <h2 className="login-illustration__heading">Streamline Patient Care</h2>
            <p className="login-illustration__text">
              Access comprehensive patient records, manage appointments,
              <br />
              and collaborate with your medical team seamlessly.
            </p>
          </div>
        </div>

        {/* Form side */}
        <div className="login-form-side">
          <div className="login-form-wrapper">
            <div className="login-form-header">
              <h1 className="login-form__title">Welcome Back</h1>
              <p className="login-form__subtitle">Please sign in to access your dashboard.</p>
            </div>

            <form className="login-form" onSubmit={handleLogin}>
              <div className="login-form__fields">
                {/* Role dropdown */}
                <div className="form-group">
                  <label className="form-label">Role</label>
                  <div className="select-wrapper">
                    <select
                      id="role-select"
                      className="form-select"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="">Select your role</option>
                      <option value="nurse">Nurse</option>
                      <option value="doctor">Doctor</option>
                      <option value="pharmacist">Pharmacist</option>
                    </select>
                    <svg className="select-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
                      <path d="M1 1L5 5L9 1" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                {/* Username */}
                <div className="form-group">
                  <label className="form-label">Username / Email</label>
                  <div className="input-wrapper">
                    <svg className="input-icon" width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" stroke="#94a3b8" strokeWidth="1.5" />
                      <path d="M13.3 14C13.3 11.5 10.9 9.5 8 9.5C5.1 9.5 2.7 11.5 2.7 14" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <input
                      id="email-input"
                      type="text"
                      className="form-input"
                      placeholder="Enter your username or email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div className="input-wrapper">
                    <svg className="input-icon" width="14" height="18" viewBox="0 0 14 18" fill="none">
                      <rect x="1" y="8" width="12" height="9" rx="2" stroke="#94a3b8" strokeWidth="1.5" />
                      <path d="M4 8V5C4 3.34315 5.34315 2 7 2C8.65685 2 10 3.34315 10 5V8" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <input
                      id="password-input"
                      type={showPassword ? 'text' : 'password'}
                      className="form-input"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                    >
                      <svg width="18" height="17" viewBox="0 0 20 18" fill="none">
                        <path d="M2 9C2 9 5 3 10 3C15 3 18 9 18 9C18 9 15 15 10 15C5 15 2 9 2 9Z" stroke="#94a3b8" strokeWidth="1.5" />
                        <circle cx="10" cy="9" r="3" stroke="#94a3b8" strokeWidth="1.5" />
                        {!showPassword && <line x1="3" y1="16" x2="17" y2="2" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />}
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Remember me + Forgot */}
                <div className="login-form__options">
                  <label className="checkbox-label" id="remember-me-label">
                    <input
                      type="checkbox"
                      className="checkbox-input"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span className="checkbox-custom" />
                    <span className="checkbox-text">Remember me</span>
                  </label>
                  <a href="#" className="forgot-link">Forgot Password?</a>
                </div>

                {/* Sign In Button */}
                <div className="login-form__button-wrap">
                  <button type="submit" className="btn-primary" id="sign-in-btn">
                    Sign In
                  </button>
                </div>
              </div>
            </form>

            <div className="login-form__footer">
              <p className="login-form__footer-text">
                Need access? <a href="#" className="contact-admin-link">Contact Administrator</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
