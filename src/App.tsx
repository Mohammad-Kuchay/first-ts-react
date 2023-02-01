import { Component, useState } from "react";
import "./App.css";
import axios from "axios";

// function App() {
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setHeading(e.target.value);
//   };
//   const [heading, setHeading] = useState("Hello");
//   const [count, setCount] = useState(0);
//   function increment() {
//     setCount(count + 1);
//     setCount(count + 1);
//   }
//   return (
//     <div>
//       <input type="text" name={heading} id="mext" onChange={handleChange} />
//       <h1>{heading}</h1>
//       <h1>{count}</h1>
//       <button onClick={increment}>Increment</button>
//     </div>
//   );
// }

const CardList = (props: any) => (
  <div>
    {props.profiles.map((profile: any) => (
      <Card key={profile.id} {...profile} />
    ))}
  </div>
);
class Card extends Component {
  constructor(public props: any) {
    super(props);
  }
  render() {
    const profile = this.props;
    return (
      <div className="github-profile">
        <img src={profile.avatar_url} />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    );
  }
}

class Form extends Component {
  constructor(public props: any) {
    super(props);
  }
  state = { userName: "" };
  handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const resp = await axios.get(
      `https://api.github.com/users/${this.state.userName}`
    );
    this.props.onSubmit(resp.data);
    this.setState({ userName: "" });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.userName}
          onChange={(event) => this.setState({ userName: event.target.value })}
          placeholder="GitHub username"
          required
        />
        <button>Add card</button>
      </form>
    );
  }
}

class App extends Component {
  constructor(public props: { title: string }) {
    super(props);
  }
  state = {
    profiles: [],
  };
  addNewProfile = (profileData: any) => {
    this.setState((prevState: any) => ({
      profiles: [...prevState.profiles, profileData],
    }));
  };
  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
      </div>
    );
  }
}

export default App;
