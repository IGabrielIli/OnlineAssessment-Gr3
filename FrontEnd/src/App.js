import React from 'react';
import Test from './Core/Test';
import Home from './Core/Home';
import Dashboard from './Core/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export const App = () =>   {

  const [nav, setNav] = useState();
  const [clicked, setClicked] = useState();
  const [events, setEvents] = useState(
    localStorage.getItem('events') ? 
      JSON.parse(localStorage.getItem('events')) : 
      []
  );

  const eventForDate = date => events.find(e => e.date === date);
  
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const { days, dateDisplay } = useDate(events, nav);

  
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} exact/>
            <Route path="/t" element={<Test />} exact/>
            <Route path="/dashboard" element={<Dashboard />} exact/>
        </Routes>
      </BrowserRouter>
    );
  }


export default App;

