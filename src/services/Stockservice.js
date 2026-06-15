const BASE_URL = "http://localhost:8080/api";

async function apiFetch(endpoint, options = {}) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrYXVzaGlrMSIsImlhdCI6MTc4MTUzNTQwMSwiZXhwIjoxNzgxNjIxODAxfQ.vrEsg1tyLZxGYQZHMaJfRd1TTsy6Mf5HcIJS24IgyRg",
            ...options.headers,
        },
        ...options,
    });

    if ( !response.ok){
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
}


export async function getAllStocks(){
    // return apiFetch("/stock");
    return apiFetch("/stock/gainers");
}


export async function searchStocks(query) {
    return apiFetch(`/stock/search?q=${encodeURIComponent(query)}`);
}

export async function getStockBySymbol(symbol) {
    return apiFetch(`/stock/${symbol}`);
}

export async function getTopGainers(){
    return apiFetch("/stock/gainers");
}

export async function getTopLosers(){
    return apiFetch("/stock/losers");
}

export async function getPortfolio(){
    return apiFetch("/portfolio");
}

export async function addToPortfolio(payload){
    return apiFetch("/portfolio", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export async function removeFromPortfolio(symbol){
    return apiFetch(`/portfolio/${symbol}`, {method: "DELETE"});
}

export async function getAlerts(){
    return apiFetch("/alerts");
}

export async function createAlert(payload){
    return apiFetch("/alerts",{
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export async function updateAlert(id, active){
    return apiFetch(`/alerts/${id}`,{
        method: "PATCH",
        body: JSON.stringify({active}),
    });
}

export async function deleteAlert(id){
    return apiFetch(`/alerts/${id}`, {method: "DELETE"});
}