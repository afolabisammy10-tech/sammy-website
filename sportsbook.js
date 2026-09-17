const fixtures = [
  {
    id: 1,
    league: 'UEFA Champions League',
    time: 'Live • 67:32',
    home: 'Real Madrid',
    away: 'Bayern Munich',
    homeAbbr: 'RM',
    awayAbbr: 'BM',
    homeColor: '#f3c61c',
    awayColor: '#f36a4d',
    score: '2 : 1',
    markets: [
      { label: 'Home Win', value: 1.85, key: 'home' },
      { label: 'Draw', value: 3.4, key: 'draw' },
      { label: 'Away Win', value: 4.2, key: 'away' }
    ]
  },
  {
    id: 2,
    league: 'Premier League',
    time: 'Kickoff 19:30',
    home: 'Arsenal',
    away: 'Liverpool',
    homeAbbr: 'ARS',
    awayAbbr: 'LIV',
    homeColor: '#d9ebff',
    awayColor: '#d62b2b',
    score: '—',
    markets: [
      { label: 'Arsenal', value: 2.15, key: 'home' },
      { label: 'Draw', value: 3.1, key: 'draw' },
      { label: 'Liverpool', value: 3.05, key: 'away' }
    ]
  },
  {
    id: 3,
    league: 'NBA',
    time: 'Live • 4th Qtr',
    home: 'Golden State',
    away: 'Boston',
    homeAbbr: 'GS',
    awayAbbr: 'BOS',
    homeColor: '#f9a61a',
    awayColor: '#1d4ed8',
    score: '106 : 101',
    markets: [
      { label: 'Golden State', value: 1.9, key: 'home' },
      { label: 'Boston', value: 2.4, key: 'away' },
      { label: 'Over 220.5', value: 1.95, key: 'over' }
    ]
  },
  {
    id: 4,
    league: 'ATP Tour',
    time: 'Final',
    home: 'Djokovic',
    away: 'Medvedev',
    homeAbbr: 'DJO',
    awayAbbr: 'MED',
    homeColor: '#7dd3fc',
    awayColor: '#a78bfa',
    score: '2 : 0',
    markets: [
      { label: 'Djokovic', value: 1.65, key: 'home' },
      { label: 'Medvedev', value: 2.3, key: 'away' },
      { label: 'Total Sets 3', value: 2.4, key: 'sets' }
    ]
  }
];

const betSlip = [];
const stakeInput = document.getElementById('stakeInput');
const fixtureList = document.getElementById('fixtureList');
const betSlipContainer = document.getElementById('betSlip');
const betSlipEmpty = document.getElementById('betSlipEmpty');
const betCount = document.getElementById('betCount');
const possibleWin = document.getElementById('possibleWin');
const riskAmount = document.getElementById('riskAmount');
const tabs = document.querySelectorAll('.tab');

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(value);

function renderFixtures(filter = 'all') {
  const filtered = filter === 'all'
    ? fixtures
    : fixtures.filter((fixture) => {
        if (filter === 'live') return fixture.time.includes('Live');
        if (filter === 'football') return ['UEFA Champions League', 'Premier League'].includes(fixture.league);
        if (filter === 'basketball') return fixture.league === 'NBA';
        if (filter === 'tennis') return fixture.league === 'ATP Tour';
        return true;
      });

  fixtureList.innerHTML = filtered.map((fixture) => `
    <article class="fixture-card">
      <div class="fixture-top">
        <span class="status">${fixture.time}</span>
        <span class="eyebrow" style="margin:0; font-size: 0.68rem;">${fixture.league}</span>
      </div>

      <div class="fixture-meta">
        <span>${fixture.league}</span>
        <span>${fixture.score}</span>
      </div>

      <div class="match-row">
        <div class="team">
          <div class="team-badge" style="background:${fixture.homeColor};">${fixture.homeAbbr}</div>
          <span class="team-name">${fixture.home}</span>
        </div>

        <span class="score">${fixture.score}</span>

        <div class="team">
          <span class="team-name">${fixture.away}</span>
          <div class="team-badge" style="background:${fixture.awayColor};">${fixture.awayAbbr}</div>
        </div>
      </div>

      <div class="odds-grid">
        ${fixture.markets.map((market) => `
          <button class="odd-btn" data-id="${fixture.id}" data-label="${market.label}" data-odd="${market.value}">
            <span>${market.label}</span>
            <strong>${market.value.toFixed(2)}</strong>
          </button>
        `).join('')}
      </div>
    </article>
  `).join('');

  attachOddClicks();
}

function attachOddClicks() {
  document.querySelectorAll('.odd-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const id = Number(button.dataset.id);
      const fixture = fixtures.find((item) => item.id === id);
      const option = button.dataset.label;
      const odd = Number(button.dataset.odd);

      const existing = betSlip.find((bet) => bet.id === id && bet.option === option);
      if (existing) {
        existing.odd = odd;
      } else {
        betSlip.push({ id, fixture: fixture.home + ' vs ' + fixture.away, option, odd });
      }

      button.classList.add('selected');
      renderBetSlip();
    });
  });
}

function renderBetSlip() {
  betCount.textContent = `${betSlip.length} pick${betSlip.length === 1 ? '' : 's'}`;
  betSlipEmpty.style.display = betSlip.length === 0 ? 'block' : 'none';
  betSlipContainer.innerHTML = betSlip.map((bet) => `
    <div class="bet-item">
      <div class="bet-item-head">
        <strong>${bet.fixture}</strong>
        <button class="remove-bet" data-remove-id="${bet.id}" data-remove-option="${bet.option}" type="button">×</button>
      </div>
      <small>${bet.option}</small>
      <div class="odds-line">
        <span>Odds</span>
        <span>${bet.odd.toFixed(2)}</span>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.remove-bet').forEach((button) => {
    button.addEventListener('click', () => {
      const id = Number(button.dataset.removeId);
      const option = button.dataset.removeOption;
      const index = betSlip.findIndex((bet) => bet.id === id && bet.option === option);
      if (index >= 0) betSlip.splice(index, 1);
      renderBetSlip();
      const selected = document.querySelectorAll('.odd-btn.selected');
      selected.forEach((item) => {
        if (Number(item.dataset.id) === id && item.dataset.label === option) item.classList.remove('selected');
      });
    });
  });

  const stake = Number(stakeInput.value || 0);
  const totalOdds = betSlip.reduce((sum, bet) => sum * bet.odd, 1);
  const payout = betSlip.length ? stake * totalOdds : 0;
  possibleWin.textContent = formatCurrency(payout);
  riskAmount.textContent = formatCurrency(stake);
}

stakeInput.addEventListener('input', renderBetSlip);

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((item) => item.classList.toggle('active', item === tab));
    renderFixtures(tab.dataset.filter);
  });
});

renderFixtures();
renderBetSlip();
