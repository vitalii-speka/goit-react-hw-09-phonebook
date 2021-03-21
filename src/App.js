import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AppBar from './componets/AppBar';
import Container from './componets/Container';
import { getCurrentUser } from './redux/auth';
import './style/App.css';
import Content from './componets/Content';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <div className="App">
      <Container>
        <AppBar />
        <Content />
      </Container>
    </div>
  );
}
