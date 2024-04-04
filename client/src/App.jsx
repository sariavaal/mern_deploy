import './App.css';
import PageNotFound from './components/NotFoundPage';
import LoginRegister from './views/LoginRegister';
import UserContext from './context/UserContext';
import { useState } from 'react';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import CreatePirate from './components/CreatePirate';
import PirateList from './components/PirateList';
import EditPirate from './components/EditPirate';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    const userDetails = JSON.parse(localStorage.getItem("user"));
    const userInfo = userDetails ? userDetails : null;
    const [user, setUser] = useState(userInfo)

    const setUserKeyValue = (clave, valor) => {
        setUser({ ...user, [clave]: valor })
    }

    const objetoContexto = {
        user,
        setUser,
        setUserKeyValue
    }


    return (
        <UserContext.Provider value={objetoContexto}>
            <Router>
                <Routes>
                    <Route path="/" element={<PublicRoute redirectPath="/"><LoginRegister /></PublicRoute>} />
                    <Route path='pirate/new' element={<PrivateRoute redirectPath="/"><CreatePirate /></PrivateRoute>} />
                    <Route path="*" element={<PageNotFound />} />
                    <Route path='/pirates' element={<PrivateRoute redirectPath="/"><PirateList /></PrivateRoute>} /> <Route path="/pirates" element={<PirateList />} />
                    <Route path="/pirate/edit/:id" element={<PrivateRoute redirectPath="/"><EditPirate /></PrivateRoute>} />
                </Routes>
            </Router>
        </UserContext.Provider>
    );
}

export default App