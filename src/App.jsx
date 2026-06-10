import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

import Navbar from './components/Navbar';
import Logo from './components/Logo';
import { COLORS } from './constants/Theme';
import { Route, Routes } from 'react-router-dom';
import SearchPage from './pages/SearchPage';

// import { useStocks } from './hooks/useStocks';
import { useStocks } from './hooks/useStocks';

function App() {
  const [selectedStock, setSelectedStock] = useState(null);

  const {
    stocks, gainers, losers,
    searchResults, loading: stockLoading,
    search, clearSearch,
  } = useStocks();


  return (
    <div style={{
      background: COLORS.bg,
      minHeight: "100vh",
      fontFamily: "'Inter', 'Segoe UI',sans-serif",
    }}>
      <Navbar />

      <div style={{ maxWidth: 1280, margin: " 0 auto"}}>
        <Routes>
          <Route
          path="/search"
          elsement={
            <SearchPage
            stock={stocks}
            gainers={gainers}
            losers={losers}
            searchResults={searchResults}
            loading={stockLoading}
            onSearch={search}
            onClearSearch={clearSearch}
            onStockClick={setSelectedStock}
            ></SearchPage>
          }
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
