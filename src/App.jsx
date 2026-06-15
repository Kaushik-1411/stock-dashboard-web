import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

import Navbar from './components/Navbar';
import Logo from './components/Logo';
import { COLORS } from './constants/Theme';
import { Navigate, Route, Routes } from 'react-router-dom';
import SearchPage from './pages/SearchPage';

// import { useStocks } from './hooks/useStocks';
import { useStocks } from './hooks/useStocks';
import StockDetail from './components/Stockdetails';
import { usePortfolio } from './hooks/usePortfolio';
import { useAlerts } from './hooks/useAlerts';
import PortfolioPage from './pages/PortfolioPage';
import AlertsPage from './pages/AlertsPage';

function App() {
  const [selectedStock, setSelectedStock] = useState(null);

  const {
    stocks, gainers, losers,
    searchResults, loading: stockLoading,
    search, clearSearch,
  } = useStocks();

  const {
    holdings, 
    addHolding, removeHolding,
    totalValue, totalInvested, totalPL, totalPLPct
  } = usePortfolio();

  const {
    alerts, activeCount, inactiveCount,
    addAlert, toggleAlert, removeAlert,
  } = useAlerts();


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
            element={
              <SearchPage
              stocks={stocks}
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

          <Route
            path='/portfolio'
            element={
              <PortfolioPage
                holdings={holdings}
                totalValue={totalValue}
                totalInvested={totalInvested}
                totalPL={totalPL}
                totalPLPct={totalPLPct}
                onRemove={removeHolding}
              ></PortfolioPage>
            }
          ></Route>

          <Route
            path='/alerts'
            element={
              <AlertsPage
                alerts={alerts}
                activeCount={activeCount}
                inactiveCount={inactiveCount}
                stocks={stocks}
                onAdd={addAlert}
                onToggle={toggleAlert}
                onRemove={removeAlert}
              ></AlertsPage>
            }
          ></Route>

          <Route path='*' element={<Navigate to="/search" replace />}/>

        </Routes>
      </div>

      {selectedStock && (
        <StockDetail
          stock={selectedStock}
          onClose={() => setSelectedStock(null)}
          onAddToPortfolio={addHolding}
        ></StockDetail>
      )}
    </div>
  );
}

export default App;
