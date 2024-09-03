import AppBar from './componets/AppBar';
import Container from './componets/Container';
import './style/App.css';
import Content from './componets/Content';

export default function App() {
  return (
    <div className="App">
      <Container>
        <AppBar />
        <Content />
      </Container>
    </div>
  );
}
