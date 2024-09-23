const Login = () => {
  return (
    <form>
      <h1 className="title is-3">Log in to open todos</h1>
      <div className="field">
        <label htmlFor="user-email" className="label">
          Email
        </label>
        <div className="control has-icons-left">
          <input
            type="email"
            id="user-email"
            className="input"
            name="email"
            placeholder="Enter your email"
            required={true}
            value=""
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
        </div>
        <div className="field">
          <button type="submit" className="button is-primary">
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
