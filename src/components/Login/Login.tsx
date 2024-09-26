import { ChangeEvent, FormEvent, useState } from 'react';
import { addUser, getUser } from '../../api/todos';
import useTodosContext from '../../contexts/useTodosContext';
import { User } from '../../types/User';

const Login = () => {
  const { setUser } = useTodosContext();

  const [form, setForm] = useState<Omit<User, 'id'>>({
    email: '',
    name: '',
  });
  const [shouldCreateNewUser, setShouldCreateNewUser] =
    useState<boolean>(false);
  // const [isUserCreated, setIsUserCreated] = useState(true);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (shouldCreateNewUser) {
      addUser(form);
    }

    getUser(form.email).then(res =>
      res ? setUser(res) : setShouldCreateNewUser(true),
    );
  };

  return (
    <form onSubmit={submitHandler}>
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
            value={form.email}
            onChange={onChange}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
        </div>

        {shouldCreateNewUser && (
          <div className="field">
            <label className="label" htmlFor="user-name">
              Your Name
            </label>
            <div className="control has-icons-left">
              <input
                type="text"
                id="user-name"
                className="input"
                name="name"
                placeholder="Enter your name"
                required={true}
                value={form.name}
                onChange={onChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </div>
          </div>
        )}
        <div className="field">
          <button type="submit" className="button is-primary">
            Register
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
