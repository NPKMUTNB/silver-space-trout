import './App.css';
import Counter from './components/Counter';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="Octocat.png" className="App-logo" alt="logo" />
        <h1>Redux Examples</h1>
        <p>
          ตัวอย่างการใช้งาน Redux Toolkit กับ React
        </p>
      </header>
      
      <main className="App-main">
        <Counter />
        <TodoList />
      </main>
      
      <footer className="App-footer">
        <p>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            เรียนรู้ Redux Toolkit
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
