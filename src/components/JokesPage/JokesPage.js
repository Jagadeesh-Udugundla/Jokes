import React, { useEffect, useState } from 'react';
import './JokesPage.css';

const JokesPage = ({ handleLogout }) => {
  const [jokes, setJokes] = useState([]);
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    const fetchJokes = async () => {
      try {
        const response = await fetch('https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=en&amount=10');
        const data = await response.json();
        setJokes(data.jokes);
      } catch (error) {
        console.error('Error fetching jokes:', error);
      }
    };

    fetchJokes();
  }, []);

  const handleLogoutClick = () => {
    handleLogout();
    setLogout(true);
  };

  return (
    <div className="jokes-container">
        <div style={{display:'flex',justifyContent:"space-between",alignItems:'center',paddingBottom:"20px"}}>
        <h1>Jokes</h1>
        <button className="logout-button" onClick={handleLogoutClick}>Logout</button>
        {logout ? (<p>Please refresh the page to continue</p>) : null}
      </div>

      <div className="table-container">
        <table className="jokes-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Joke 🤣</th>
            </tr>
          </thead>
          <tbody>
            {jokes.map((joke, index) => (
              <tr key={index}>
                <td>{joke.category}</td>
                <td>{joke.joke} 🤣</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JokesPage;
