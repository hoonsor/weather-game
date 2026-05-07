// ===== 天氣預報遊戲 - 主要遊戲邏輯 =====

// 城市天氣資料庫（模擬真實天氣）
const WEATHER_DATA = {
  taipei: {
    name: '台北',
    emoji: '🌧️',
    conditions: {
      spring: { temp: [18, 28], weather: ['cloudy', 'rainy', 'sunny'] },
      summer: { temp: [26, 36], weather: ['sunny', 'cloudy', 'rainy'] },
      autumn: { temp: [20, 30], weather: ['sunny', 'cloudy', 'rainy'] },
      winter: { temp: [12, 22], weather: ['cloudy', 'rainy', 'sunny'] }
    }
  },
  taichung: {
    name: '台中',
    emoji: '☀️',
    conditions: {
      spring: { temp: [20, 30], weather: ['sunny', 'cloudy', 'rainy'] },
      summer: { temp: [26, 35], weather: ['sunny', 'cloudy', 'stormy'] },
      autumn: { temp: [22, 31], weather: ['sunny', 'cloudy'] },
      winter: { temp: [14, 24], weather: ['sunny', 'cloudy'] }
    }
  },
  kaohsiung: {
    name: '高雄',
    emoji: '🔥',
    conditions: {
      spring: { temp: [22, 32], weather: ['sunny', 'cloudy'] },
      summer: { temp: [27, 35], weather: ['sunny', 'stormy', 'cloudy'] },
      autumn: { temp: [24, 32], weather: ['sunny', 'cloudy'] },
      winter: { temp: [18, 27], weather: ['sunny', 'cloudy'] }
    }
  },
  tainan: {
    name: '台南',
    emoji: '🏯',
    conditions: {
      spring: { temp: [21, 30], weather: ['sunny', 'cloudy', 'rainy'] },
      summer: { temp: [26, 34], weather: ['sunny', 'stormy'] },
      autumn: { temp: [23, 31], weather: ['sunny', 'cloudy'] },
      winter: { temp: [17, 26], weather: ['sunny', 'cloudy'] }
    }
  },
  keelung: {
    name: '基隆',
    emoji: '🌧️',
    conditions: {
      spring: { temp: [17, 25], weather: ['rainy', 'cloudy', 'sunny'] },
      summer: { temp: [25, 32], weather: ['cloudy', 'rainy', 'sunny'] },
      autumn: { temp: [20, 27], weather: ['cloudy', 'rainy'] },
      winter: { temp: [12, 20], weather: ['rainy', 'cloudy', 'sunny'] }
    }
  },
  hsinchu: {
    name: '新竹',
    emoji: '💨',
    conditions: {
      spring: { temp: [18, 27], weather: ['cloudy', 'sunny'] },
      summer: { temp: [26, 34], weather: ['sunny', 'cloudy', 'stormy'] },
      autumn: { temp: [20, 28], weather: ['sunny', 'cloudy'] },
      winter: { temp: [12, 21], weather: ['cloudy', 'sunny'] }
    }
  },
  changhua: {
    name: '彰化',
    emoji: '🌾',
    conditions: {
      spring: { temp: [19, 28], weather: ['sunny', 'cloudy', 'rainy'] },
      summer: { temp: [26, 35], weather: ['sunny', 'cloudy'] },
      autumn: { temp: [21, 30], weather: ['sunny', 'cloudy'] },
      winter: { temp: [13, 23], weather: ['sunny', 'cloudy'] }
    }
  },
  chiayi: {
    name: '嘉義',
    emoji: '🍵',
    conditions: {
      spring: { temp: [20, 29], weather: ['sunny', 'cloudy', 'rainy'] },
      summer: { temp: [26, 34], weather: ['sunny', 'stormy'] },
      autumn: { temp: [22, 31], weather: ['sunny', 'cloudy'] },
      winter: { temp: [15, 25], weather: ['sunny', 'cloudy'] }
    }
  },
  yilan: {
    name: '宜蘭',
    emoji: '🌲',
    conditions: {
      spring: { temp: [18, 27], weather: ['rainy', 'cloudy', 'sunny'] },
      summer: { temp: [25, 33], weather: ['sunny', 'rainy', 'cloudy'] },
      autumn: { temp: [21, 29], weather: ['cloudy', 'rainy'] },
      winter: { temp: [14, 22], weather: ['rainy', 'cloudy', 'sunny'] }
    }
  },
  pingtung: {
    name: '屏東',
    emoji: '🌴',
    conditions: {
      spring: { temp: [22, 32], weather: ['sunny', 'cloudy'] },
      summer: { temp: [27, 36], weather: ['sunny', 'stormy'] },
      autumn: { temp: [24, 33], weather: ['sunny', 'cloudy'] },
      winter: { temp: [19, 28], weather: ['sunny', 'cloudy'] }
    }
  },
  taitung: {
    name: '台東',
    emoji: '🌋',
    conditions: {
      spring: { temp: [21, 30], weather: ['sunny', 'cloudy', 'rainy'] },
      summer: { temp: [26, 34], weather: ['sunny', 'cloudy', 'stormy'] },
      autumn: { temp: [23, 31], weather: ['sunny', 'cloudy'] },
      winter: { temp: [17, 26], weather: ['sunny', 'cloudy'] }
    }
  },
  hualien: {
    name: '花蓮',
    emoji: '🏔️',
    conditions: {
      spring: { temp: [19, 28], weather: ['cloudy', 'rainy', 'sunny'] },
      summer: { temp: [25, 33], weather: ['sunny', 'cloudy', 'rainy'] },
      autumn: { temp: [21, 29], weather: ['cloudy', 'rainy'] },
      winter: { temp: [14, 23], weather: ['cloudy', 'sunny', 'rainy'] }
    }
  }
};

// 天氣類型中英文對照
const WEATHER_TYPES = {
  sunny: { zh: '晴天', emoji: '☀️' },
  cloudy: { zh: '多雲', emoji: '⛅' },
  rainy: { zh: '雨天', emoji: '🌧️' },
  stormy: { zh: '暴風雨', emoji: '⛈️' },
  snowy: { zh: '下雪', emoji: '❄️' }
};

// 取得當前季節
function getSeason() {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'autumn';
  return 'winter';
}

// 遊戲狀態
let gameState = {
  currentCity: null,
  score: 0,
  streak: 0,
  maxStreak: 0,
  round: 1,
  maxRounds: 10,
  correctAnswers: 0,
  currentQuestion: null,
  hintUsed: false,
  selectedWeather: null
};

// localStorage Keys
const STORAGE_KEYS = {
  LEADERBOARD: 'weatherGame_leaderboard',
  LAST_CITY: 'weatherGame_lastCity'
};

// ===== DOM 元素 =====
const elements = {
  citySelectSection: document.getElementById('city-select-section'),
  gameSection: document.getElementById('game-section'),
  resultSection: document.getElementById('result-section'),
  finalSection: document.getElementById('final-section'),
  cityName: document.getElementById('city-name'),
  cityEmoji: document.getElementById('city-emoji'),
  score: document.getElementById('score'),
  streak: document.getElementById('streak'),
  round: document.getElementById('round'),
  questionType: document.getElementById('question-type'),
  questionText: document.getElementById('question-text'),
  answerArea: document.getElementById('answer-area'),
  tempAnswer: document.getElementById('temp-answer'),
  weatherAnswer: document.getElementById('weather-answer'),
  tempSlider: document.getElementById('temp-slider'),
  tempValue: document.getElementById('temp-value'),
  hintBtn: document.getElementById('hint-btn'),
  hintText: document.getElementById('hint-text'),
  submitBtn: document.getElementById('submit-btn'),
  resultEmoji: document.getElementById('result-emoji'),
  resultMessage: document.getElementById('result-message'),
  resultDetail: document.getElementById('result-detail'),
  nextBtn: document.getElementById('next-btn'),
  finalScore: document.getElementById('final-score'),
  finalCorrect: document.getElementById('final-correct'),
  finalStreak: document.getElementById('final-streak'),
  leaderboardList: document.getElementById('leaderboard-list'),
  modalLeaderboardList: document.getElementById('modal-leaderboard-list'),
  showLeaderboardBtn: document.getElementById('show-leaderboard-btn'),
  leaderboardModal: document.getElementById('leaderboard-modal'),
  closeModalBtn: document.getElementById('close-modal-btn'),
  restartBtn: document.getElementById('restart-btn'),
  saveScoreBtn: document.getElementById('save-score-btn')
};

// ===== 遊戲函數 =====

// 初始化遊戲
function initGame() {
  setupEventListeners();
  loadLastCity();
  updateLeaderboard();
}

// 設定事件監聽器
function setupEventListeners() {
  // 城市選擇
  document.querySelectorAll('.city-btn').forEach(btn => {
    btn.addEventListener('click', () => selectCity(btn.dataset.city));
  });

  // 溫度滑桿
  elements.tempSlider.addEventListener('input', (e) => {
    elements.tempValue.textContent = e.target.value;
  });

  // 天氣按鈕
  document.querySelectorAll('.weather-btn').forEach(btn => {
    btn.addEventListener('click', () => selectWeather(btn.dataset.weather));
  });

  // 送出答案
  elements.submitBtn.addEventListener('click', submitAnswer);

  // 下一題
  elements.nextBtn.addEventListener('click', nextQuestion);

  // 提示
  elements.hintBtn.addEventListener('click', showHint);

  // 排行榜
  elements.showLeaderboardBtn.addEventListener('click', () => {
    elements.leaderboardModal.classList.remove('hidden');
    updateLeaderboardInModal();
  });

  elements.closeModalBtn.addEventListener('click', () => {
    elements.leaderboardModal.classList.add('hidden');
  });

  elements.leaderboardModal.addEventListener('click', (e) => {
    if (e.target === elements.leaderboardModal) {
      elements.leaderboardModal.classList.add('hidden');
    }
  });

  // 重新開始
  elements.restartBtn.addEventListener('click', restartGame);

  // 儲存分數
  elements.saveScoreBtn.addEventListener('click', saveScore);
}

// 選擇城市
function selectCity(cityKey) {
  gameState.currentCity = cityKey;
  localStorage.setItem(STORAGE_KEYS.LAST_CITY, cityKey);
  
  const city = WEATHER_DATA[cityKey];
  elements.cityName.textContent = city.name;
  elements.cityEmoji.textContent = city.emoji;
  
  elements.citySelectSection.classList.add('hidden');
  elements.gameSection.classList.remove('hidden');
  
  generateQuestion();
}

// 載入上次城市
function loadLastCity() {
  const lastCity = localStorage.getItem(STORAGE_KEYS.LAST_CITY);
  if (lastCity && WEATHER_DATA[lastCity]) {
    const btn = document.querySelector(`[data-city="${lastCity}"]`);
    if (btn) btn.style.boxShadow = '0 0 0 3px #ffd700, 0 4px 15px rgba(102, 126, 234, 0.4)';
  }
}

// 生成題目
function generateQuestion() {
  const season = getSeason();
  const city = WEATHER_DATA[gameState.currentCity];
  const conditions = city.conditions[season];
  
  // 隨機決定題目類型
  const questionTypes = ['temp', 'weather'];
  const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
  
  if (questionType === 'temp') {
    // 溫度題目
    const [minTemp, maxTemp] = conditions.temp;
    const actualTemp = Math.floor(Math.random() * (maxTemp - minTemp + 1)) + minTemp;
    
    gameState.currentQuestion = {
      type: 'temp',
      answer: actualTemp,
      range: { min: minTemp, max: maxTemp }
    };
    
    elements.questionType.textContent = '🌡️ 猜溫度';
    elements.questionText.textContent = `${city.name}今天的天氣預測最高溫度是多少？`;
    elements.tempAnswer.classList.remove('hidden');
    elements.weatherAnswer.classList.add('hidden');
    elements.tempSlider.value = Math.floor((minTemp + maxTemp) / 2);
    elements.tempValue.textContent = elements.tempSlider.value;
    
  } else {
    // 天氣題目
    const actualWeather = conditions.weather[Math.floor(Math.random() * conditions.weather.length)];
    
    gameState.currentQuestion = {
      type: 'weather',
      answer: actualWeather
    };
    
    elements.questionType.textContent = '🌤️ 猜天氣';
    elements.questionText.textContent = `${city.name}今天的天氣狀況是什麼？`;
    elements.weatherAnswer.classList.remove('hidden');
    elements.tempAnswer.classList.add('hidden');
    gameState.selectedWeather = null;
    document.querySelectorAll('.weather-btn').forEach(btn => btn.classList.remove('selected'));
  }
  
  // 重置提示
  gameState.hintUsed = false;
  elements.hintText.classList.add('hidden');
  elements.hintBtn.disabled = false;
  
  // 更新顯示
  elements.round.textContent = gameState.round;
  elements.score.textContent = gameState.score;
  elements.streak.textContent = gameState.streak;
}

// 選擇天氣
function selectWeather(weather) {
  gameState.selectedWeather = weather;
  document.querySelectorAll('.weather-btn').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.weather === weather);
  });
}

// 送出答案
function submitAnswer() {
  if (gameState.currentQuestion.type === 'temp') {
    const userTemp = parseInt(elements.tempSlider.value);
    const actualTemp = gameState.currentQuestion.answer;
    const diff = Math.abs(userTemp - actualTemp);
    
    let points = 0;
    let message = '';
    
    if (diff === 0) {
      points = 100;
      message = '太神了！完全命中！';
      gameState.correctAnswers++;
      gameState.streak++;
    } else if (diff <= 2) {
      points = 70;
      message = '很接近了！';
      gameState.correctAnswers++;
      gameState.streak++;
    } else if (diff <= 5) {
      points = 40;
      message = '還不錯唷！';
      gameState.streak = 0;
    } else {
      points = 10;
      message = '差了一點點...';
      gameState.streak = 0;
    }
    
    gameState.maxStreak = Math.max(gameState.maxStreak, gameState.streak);
    
    showResult(points, message, `正確答案是 ${actualTemp}°C，你猜了 ${userTemp}°C`);
    
  } else {
    const userWeather = gameState.selectedWeather;
    const actualWeather = gameState.currentQuestion.answer;
    
    if (!userWeather) {
      alert('請選擇一種天氣狀況！');
      return;
    }
    
    let points = 0;
    let message = '';
    
    if (userWeather === actualWeather) {
      points = 100;
      message = '太神了！完全命中！';
      gameState.correctAnswers++;
      gameState.streak++;
    } else {
      points = 0;
      message = '答錯了...';
      gameState.streak = 0;
    }
    
    gameState.maxStreak = Math.max(gameState.maxStreak, gameState.streak);
    
    showResult(points, message, 
      `正確答案是「${WEATHER_TYPES[actualWeather].emoji} ${WEATHER_TYPES[actualWeather].zh}」，你選擇了「${WEATHER_TYPES[userWeather].emoji} ${WEATHER_TYPES[userWeather].zh}」`
    );
  }
  
  // 如果使用過提示，扣分
  if (gameState.hintUsed) {
    points = Math.max(0, points - 50);
  }
  
  gameState.score += points;
}

// 顯示結果
function showResult(points, message, detail) {
  elements.gameSection.classList.add('hidden');
  elements.resultSection.classList.remove('hidden');
  
  let emoji = '😊';
  if (points >= 100) emoji = '🎉';
  else if (points >= 70) emoji = '👏';
  else if (points >= 40) emoji = '🤔';
  else emoji = '😅';
  
  elements.resultEmoji.textContent = emoji;
  elements.resultMessage.textContent = message;
  elements.resultDetail.textContent = detail;
  
  // 更新分數顯示
  elements.score.textContent = gameState.score;
  elements.streak.textContent = gameState.streak;
}

// 下一題
function nextQuestion() {
  gameState.round++;
  
  if (gameState.round > gameState.maxRounds) {
    showFinalResult();
  } else {
    elements.resultSection.classList.add('hidden');
    elements.gameSection.classList.remove('hidden');
    generateQuestion();
  }
}

// 顯示提示
function showHint() {
  if (gameState.hintUsed) return;
  
  gameState.hintUsed = true;
  elements.hintBtn.disabled = true;
  
  let hint = '';
  
  if (gameState.currentQuestion.type === 'temp') {
    const { min, max } = gameState.currentQuestion.range;
    hint = `💡 提示：溫度範圍在 ${min}°C 到 ${max}°C 之間`;
  } else {
    const city = WEATHER_DATA[gameState.currentCity];
    const season = getSeason();
    const possibleWeathers = city.conditions[season].weather;
    const emojiList = possibleWeathers.map(w => WEATHER_TYPES[w].emoji).join(' ');
    hint = `💡 提示：可能的天氣有 ${emojiList}`;
  }
  
  elements.hintText.textContent = hint;
  elements.hintText.classList.remove('hidden');
}

// 顯示最終結果
function showFinalResult() {
  elements.resultSection.classList.add('hidden');
  elements.finalSection.classList.remove('hidden');
  
  elements.finalScore.textContent = gameState.score;
  elements.finalCorrect.textContent = gameState.correctAnswers;
  elements.finalStreak.textContent = gameState.maxStreak;
  
  updateLeaderboard();
}

// 排行榜
function updateLeaderboard() {
  const leaderboard = getLeaderboard();
  
  // 只顯示前10名
  const top10 = leaderboard.slice(0, 10);
  
  elements.leaderboardList.innerHTML = top10.map((entry, index) => `
    <div class="leaderboard-entry ${index < 3 ? 'top-3' : ''}">
      <span class="leaderboard-rank">${index + 1}</span>
      <span class="leaderboard-name">${entry.name}</span>
      <span class="leaderboard-score">${entry.score}</span>
    </div>
  `).join('');
}

function updateLeaderboardInModal() {
  const leaderboard = getLeaderboard();
  const top10 = leaderboard.slice(0, 10);
  
  elements.modalLeaderboardList.innerHTML = top10.map((entry, index) => `
    <div class="leaderboard-entry ${index < 3 ? 'top-3' : ''}">
      <span class="leaderboard-rank">${index + 1}</span>
      <span class="leaderboard-name">${entry.name}</span>
      <span class="leaderboard-score">${entry.score}</span>
    </div>
  `).join('');
}

function getLeaderboard() {
  const data = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
  return data ? JSON.parse(data) : [];
}

function saveScore() {
  const playerName = prompt('請輸入你的名字（用於排行榜）：', '玩家');
  
  if (!playerName || playerName.trim() === '') return;
  
  const leaderboard = getLeaderboard();
  
  leaderboard.push({
    name: playerName.trim().substring(0, 10),
    score: gameState.score,
    correct: gameState.correctAnswers,
    maxStreak: gameState.maxStreak,
    date: new Date().toISOString()
  });
  
  // 按分數排序
  leaderboard.sort((a, b) => b.score - a.score);
  
  // 只保留前50名
  const trimmed = leaderboard.slice(0, 50);
  
  localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(trimmed));
  
  updateLeaderboard();
  alert('分數已儲存！');
}

// 重新開始遊戲
function restartGame() {
  gameState = {
    currentCity: gameState.currentCity,
    score: 0,
    streak: 0,
    maxStreak: 0,
    round: 1,
    maxRounds: 10,
    correctAnswers: 0,
    currentQuestion: null,
    hintUsed: false,
    selectedWeather: null
  };
  
  elements.finalSection.classList.add('hidden');
  elements.citySelectSection.classList.remove('hidden');
}

// 啟動遊戲
document.addEventListener('DOMContentLoaded', initGame);
