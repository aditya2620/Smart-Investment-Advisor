/**
 * Financial Calculation Utilities for Smart Investment Advisor
 */

// Format numbers in Indian Numbering System (Lakhs & Crores) or International
export function formatCurrency(amount, currency = 'INR') {
  if (isNaN(amount) || amount === null) return currency === 'INR' ? '₹0' : '$0';
  const val = Math.round(amount);
  
  if (currency === 'INR') {
    if (Math.abs(val) >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    if (Math.abs(val) >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakh`;
    }
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  } else {
    if (Math.abs(val) >= 1000000) {
      return `$${(val / 1000000).toFixed(2)}M`;
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  }
}

// SIP (Systematic Investment Plan) Future Value Calculator
export function calculateSIP(monthlyInvestment, annualRate = 12, years = 10) {
  const i = annualRate / 12 / 100;
  const n = years * 12;
  
  // Future Value of Monthly SIP formula: P * [((1 + i)^n - 1) / i] * (1 + i)
  const futureValue = i === 0 
    ? monthlyInvestment * n 
    : monthlyInvestment * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    
  const totalInvested = monthlyInvestment * n;
  const wealthGained = Math.max(0, futureValue - totalInvested);

  // Generate yearly trajectory for chart comparisons
  const yearlyData = [];
  for (let y = 1; y <= years; y++) {
    const months = y * 12;
    const invested = monthlyInvestment * months;
    
    // Savings Account (approx 3% interest)
    const iSav = 0.03 / 12;
    const fvSavings = monthlyInvestment * ((Math.pow(1 + iSav, months) - 1) / iSav) * (1 + iSav);
    
    // Fixed Deposit (approx 6.5% interest)
    const iFD = 0.065 / 12;
    const fvFD = monthlyInvestment * ((Math.pow(1 + iFD, months) - 1) / iFD) * (1 + iFD);

    // Broad Market Index SIP (e.g. 12% interest)
    const iIndex = (annualRate / 100) / 12;
    const fvIndex = monthlyInvestment * ((Math.pow(1 + iIndex, months) - 1) / iIndex) * (1 + iIndex);

    // Cash in locker (0% return)
    const fvCash = invested;

    yearlyData.push({
      year: `Yr ${y}`,
      invested: Math.round(invested),
      cashInLocker: Math.round(fvCash),
      savingsAccount: Math.round(fvSavings),
      fixedDeposit: Math.round(fvFD),
      indexSIP: Math.round(fvIndex),
      wealthGained: Math.round(Math.max(0, fvIndex - invested))
    });
  }

  return {
    futureValue: Math.round(futureValue),
    totalInvested: Math.round(totalInvested),
    wealthGained: Math.round(wealthGained),
    yearlyData
  };
}

// 50-30-20 Rule breakdown calculator
export function calculateBudgetSplit(monthlySalary, needsPct = 50, wantsPct = 30, investPct = 20) {
  const needs = Math.round((monthlySalary * needsPct) / 100);
  const wants = Math.round((monthlySalary * wantsPct) / 100);
  const investments = Math.round((monthlySalary * investPct) / 100);

  return {
    needs,
    wants,
    investments,
    needsPct,
    wantsPct,
    investPct
  };
}

// Portfolio asset allocation based on risk profile
export function getPortfolioAllocation(monthlyAmount, riskScore) {
  // riskScore: 'conservative' (Turtle), 'balanced' (Owl), 'growth' (Cheetah)
  let slices = [];

  if (riskScore === 'conservative') {
    slices = [
      {
        name: 'Safe Haven (Emergency / Liquid / FD)',
        percentage: 50,
        color: '#10b981',
        icon: 'Shield',
        description: 'Guaranteed capital safety. Zero fear of market dips.',
        exampleAsset: 'HDFC/ICICI Liquid Fund or High Interest Savings Account'
      },
      {
        name: 'Broad Market Index (Nifty 50)',
        percentage: 35,
        color: '#3b82f6',
        icon: 'TrendingUp',
        description: 'Own top 50 Indian companies. Beats inflation with moderate growth.',
        exampleAsset: 'UTI Nifty 50 Index Fund or Navi Nifty 50'
      },
      {
        name: 'Sovereign Gold / Digital Gold',
        percentage: 15,
        color: '#eab308',
        icon: 'Coins',
        description: 'Classic hedge against inflation and economic turbulence.',
        exampleAsset: 'Sovereign Gold Bond (SGB) or Nippon India Gold ETF'
      }
    ];
  } else if (riskScore === 'growth') {
    slices = [
      {
        name: 'Nifty 50 & Large Cap Index',
        percentage: 55,
        color: '#3b82f6',
        icon: 'TrendingUp',
        description: 'The engine of India’s top 50 companies (Tata, Reliance, Infosys).',
        exampleAsset: 'UTI Nifty 50 Index Fund Direct-Growth'
      },
      {
        name: 'Flexi Cap / Mid-Cap Fund',
        percentage: 30,
        color: '#8b5cf6',
        icon: 'Zap',
        description: 'Fast-growing rising companies with higher wealth potential over 7+ years.',
        exampleAsset: 'Parag Parikh Flexi Cap Fund Direct-Growth'
      },
      {
        name: 'Safety & Liquid Buffer',
        percentage: 10,
        color: '#10b981',
        icon: 'Shield',
        description: 'Instant liquidity so you never sell your equity in a panic.',
        exampleAsset: 'Quantum Liquid Fund'
      },
      {
        name: 'Gold Hedge',
        percentage: 5,
        color: '#eab308',
        icon: 'Coins',
        description: 'Small wealth preserver.',
        exampleAsset: 'SGB or Gold BeES ETF'
      }
    ];
  } else {
    // Balanced (Default)
    slices = [
      {
        name: 'Nifty 50 Index Fund',
        percentage: 65,
        color: '#3b82f6',
        icon: 'TrendingUp',
        description: 'Core building block: Top 50 solid businesses in India.',
        exampleAsset: 'HDFC / Bandhan Nifty 50 Index Fund Direct-Growth'
      },
      {
        name: 'Emergency / Safe Liquid Fund',
        percentage: 20,
        color: '#10b981',
        icon: 'Shield',
        description: 'Peace of mind buffer. Withdraw within 24 hours anytime.',
        exampleAsset: 'SBI / ICICI Prudential Liquid Fund'
      },
      {
        name: 'Gold (SGB or ETF)',
        percentage: 15,
        color: '#eab308',
        icon: 'Coins',
        description: 'Gold gains when stock market wobbles. Keeps portfolio balanced.',
        exampleAsset: 'Sovereign Gold Bond or Tata Gold ETF'
      }
    ];
  }

  // Calculate actual amount for each slice
  return slices.map(s => ({
    ...s,
    amount: Math.round((monthlyAmount * s.percentage) / 100)
  }));
}
