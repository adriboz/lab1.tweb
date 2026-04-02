// База данных оружия Valorant с картинками
const weapons = [
    // Пистолеты
    {
        id: 1,
        name: "Classic",
        category: "pistol",
        image: "../images/Classic.png",
        description: "Стандартный пистолет, который есть у каждого агента. Надежный выбор для начала раунда. В альтернативном режиме стреляет очередями из трех патронов."
    },
    {
        id: 2,
        name: "Shorty",
        category: "pistol",
        image: "../images/Shorty.png",
        description: "Компактный двуствольный дробовик. Смертелен на очень близких дистанциях. Идеален для защиты узких проходов и углов."
    },
    {
        id: 3,
        name: "Frenzy",
        category: "pistol",
        image: "../images/Frenzy.png",
        description: "Автоматический пистолет с высокой скорострельностью. Отлично подходит для агрессивной игры на ближних дистанциях."
    },
    {
        id: 4,
        name: "Ghost",
        category: "pistol",
        image: "../images/Ghost.png",
        description: "Точный пистолет со встроенным глушителем. Отличается высокой точностью и бесшумностью. Любимый выбор опытных игроков."
    },
    {
        id: 5,
        name: "Sheriff",
        category: "pistol",
        image: "../images/Sheriff.png",
        description: "Мощный револьвер крупного калибра. Один точный выстрел в голову убивает врага даже с тяжелой броней."
    },
    
    // Пистолеты-пулеметы
    {
        id: 6,
        name: "Stinger",
        category: "smg",
        image: "../images/Stinger.png",
        description: "Бюджетный пистолет-пулемет с высокой скорострельностью. Эффективен на ближних дистанциях благодаря быстрой стрельбе."
    },
    {
        id: 7,
        name: "Spectre",
        category: "smg",
        image: "../images/Spectre.png",
        description: "Универсальный пистолет-пулемет с глушителем. Хорошо показывает себя как на ближних, так и на средних дистанциях."
    },
    
    // Винтовки
    {
        id: 8,
        name: "Bulldog",
        category: "rifle",
        image: "../images/Bulldog.png",
        description: "Бюджетная штурмовая винтовка. В альтернативном режиме стреляет очередями из трех патронов для большей точности."
    },
    {
        id: 9,
        name: "Guardian",
        category: "rifle",
        image: "../images/Guardian.png",
        description: "Полуавтоматическая винтовка с высокой точностью. Один выстрел в голову гарантированно убивает врага."
    },
    {
        id: 10,
        name: "Phantom",
        category: "rifle",
        image: "../images/phantom.png",
        description: "Штурмовая винтовка с глушителем. Отличается высокой скорострельностью и отличной точностью в движении."
    },
    {
        id: 11,
        name: "Vandal",
        category: "rifle",
        image: "../images/Vandal.png",
        description: "Мощная штурмовая винтовка. Убивает с одного выстрела в голову на любой дистанции. Выбор агрессивных игроков."
    },
    
    // Снайперские винтовки
    {
        id: 12,
        name: "Marshal",
        category: "sniper",
        image: "../images/Marshal.png",
        description: "Легкая снайперская винтовка. Убивает с одного выстрела в голову. Отличный выбор для эко-раундов."
    },
    {
        id: 13,
        name: "Operator",
        category: "sniper",
        image: "../images/Operator.png",
        description: "Тяжелая снайперская винтовка. Убивает с одного выстрела в любую часть тела. Самое дорогое и мощное оружие в игре."
    },
    {
        id: 14,
        name: "Outlaw",
        category: "sniper",
        image: "../images/Outlaw.png",
        description: "Новая снайперская винтовка с двумя патронами в магазине. Отличный баланс между ценой и мощностью."
    },
    
    // Тяжелое оружие
    {
        id: 15,
        name: "Bucky",
        category: "heavy",
        image: "../images/Bucky.png",
        description: "Дробовик с двумя режимами стрельбы. В альтернативном режиме стреляет разрывным снарядом на средней дистанции."
    },
    {
        id: 16,
        name: "Judge",
        category: "heavy",
        image: "../images/Judge.png",
        description: "Автоматический дробовик. Смертелен на ближних дистанциях. Идеален для защиты точек и агрессивных заходов."
    },
    {
        id: 17,
        name: "Ares",
        category: "heavy",
        image: "../images/Ares.png",
        description: "Легкий пулемет с большим магазином. Со временем стрельба становится более точной. Отлично подходит для подавления."
    },
    {
        id: 18,
        name: "Odin",
        category: "heavy",
        image: "../images/Odin.png",
        description: "Тяжелый пулемет с огромным магазином. Способен пробивать тонкие стены. Идеален для удержания позиций."
    },
    
    // Ближнее оружие
    {
        id: 19,
        name: "Tactical Knife",
        category: "melee",
        image: "../images/Knife.png",
        description: "Стандартный тактический нож. Убивает с двух ударов или одного в спину. С ним вы передвигаетесь быстрее всего."
    },
];

// История выбора
let history = [];

// Получение элементов DOM
const weaponCard = document.getElementById('weaponCard');
const weaponImg = document.getElementById('weaponImg');
const weaponName = document.getElementById('weaponName');
const weaponCategory = document.getElementById('weaponCategory');
const weaponDescription = document.getElementById('weaponDescription');
const randomBtn = document.getElementById('randomBtn');
const historySection = document.getElementById('historySection');
const historyList = document.getElementById('historyList');
const copyBtn = document.getElementById('copyBtn');
const shareBtn = document.getElementById('shareBtn');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

// Функция для получения названия категории на русском
function getCategoryName(category) {
    const categories = {
        pistol: 'Пистолет',
        smg: 'Пистолет-пулемёт',
        rifle: 'Винтовка',
        sniper: 'Снайперская винтовка',
        heavy: 'Тяжёлое оружие',
        melee: 'Ближний бой'
    };
    return categories[category] || category;
}

// Функция для обновления карточки оружия
function updateWeaponCard(weapon) {
    // Анимация появления
    weaponCard.style.animation = 'none';
    weaponCard.offsetHeight;
    weaponCard.style.animation = 'fadeIn 0.5s ease-out';
    
    // Обновление изображения
    weaponImg.src = weapon.image;
    weaponImg.alt = weapon.name;
    
    // Обработка ошибки загрузки изображения
    weaponImg.onerror = function() {
        this.src = '../images/weapons/default.png';
        this.alt = 'Изображение не найдено';
    };
    
    // Обновление имени
    weaponName.textContent = weapon.name;
    
    // Обновление категории
    const categoryName = getCategoryName(weapon.category);
    weaponCategory.innerHTML = `<span class="category-badge ${weapon.category}">${categoryName}</span>`;
    
    // Обновление описания
    weaponDescription.textContent = weapon.description;
}

// Функция для получения случайного оружия
function getRandomWeapon() {
    const randomIndex = Math.floor(Math.random() * weapons.length);
    return weapons[randomIndex];
}

// Функция для добавления в историю
function addToHistory(weapon) {
    const timestamp = new Date().toLocaleTimeString();
    const date = new Date().toLocaleDateString();
    history.unshift({
        weapon: weapon,
        time: timestamp,
        date: date
    });
    
    // Сохраняем только последние 10 выборов
    if (history.length > 10) {
        history.pop();
    }
    
    updateHistoryDisplay();
    saveHistoryToLocalStorage();
}

// Функция для обновления отображения истории
function updateHistoryDisplay() {
    if (history.length > 0) {
        historySection.style.display = 'block';
        historyList.innerHTML = '';
        
        history.forEach((item) => {
            const li = document.createElement('li');
            li.style.cursor = 'pointer';
            li.onclick = () => updateWeaponCard(item.weapon);
            li.innerHTML = `
                <strong>${item.weapon.name}</strong> 
                <span style="color: #999; font-size: 0.75rem;">${item.date} ${item.time}</span>
                <br>
                <small style="color: #ff4655;">${getCategoryName(item.weapon.category)}</small>
            `;
            historyList.appendChild(li);
        });
    } else {
        historySection.style.display = 'none';
    }
}

// Функция для очистки истории
function clearHistory() {
    if (confirm('Вы уверены, что хотите очистить историю?')) {
        history = [];
        updateHistoryDisplay();
        saveHistoryToLocalStorage();
        showNotification('История очищена!', '#28a745');
    }
}

// Функция для копирования результата
function copyResult() {
    const currentWeapon = weapons.find(w => w.name === weaponName.textContent);
    if (currentWeapon) {
        const text = `${currentWeapon.name} - ${getCategoryName(currentWeapon.category)}\n\n${currentWeapon.description}`;
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Скопировано в буфер обмена!', '#28a745');
        }).catch(() => {
            showNotification('Не удалось скопировать', '#dc3545');
        });
    }
}

// Функция для шаринга
function shareResult() {
    const currentWeapon = weapons.find(w => w.name === weaponName.textContent);
    if (currentWeapon && navigator.share) {
        navigator.share({
            title: 'Моё случайное оружие в Valorant',
            text: `${currentWeapon.name} - ${getCategoryName(currentWeapon.category)}`,
            url: window.location.href
        }).catch(() => {
            copyResult();
        });
    } else {
        copyResult();
    }
}

// Функция для показа уведомления
function showNotification(message, color) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${color};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 0.9rem;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Сохранение в localStorage
function saveHistoryToLocalStorage() {
    localStorage.setItem('valorantWeaponHistory', JSON.stringify(history));
}

// Загрузка из localStorage
function loadHistoryFromLocalStorage() {
    const savedHistory = localStorage.getItem('valorantWeaponHistory');
    if (savedHistory) {
        try {
            history = JSON.parse(savedHistory);
            updateHistoryDisplay();
        } catch (e) {
            console.error('Failed to load history', e);
        }
    }
}

// Основная функция выбора случайного оружия
function randomWeapon() {
    const weapon = getRandomWeapon();
    updateWeaponCard(weapon);
    addToHistory(weapon);
    
    // Эффект вибрации
    if (randomBtn && 'vibrate' in navigator) {
        navigator.vibrate(100);
    }
}

// Добавляем CSS анимации
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Инициализация событий
if (randomBtn) randomBtn.addEventListener('click', randomWeapon);
if (copyBtn) copyBtn.addEventListener('click', copyResult);
if (shareBtn) shareBtn.addEventListener('click', shareResult);
if (clearHistoryBtn) clearHistoryBtn.addEventListener('click', clearHistory);

// Добавляем эффект наведения на карточку
if (weaponCard) {
    weaponCard.addEventListener('mouseenter', () => {
        weaponCard.style.transform = 'translateY(-5px)';
    });
    
    weaponCard.addEventListener('mouseleave', () => {
        weaponCard.style.transform = 'translateY(0)';
    });
}

// Горячая клавиша пробела
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !e.target.matches('input, textarea, button')) {
        e.preventDefault();
        randomWeapon();
    }
});

// Инициализация при загрузке
window.addEventListener('load', () => {
    loadHistoryFromLocalStorage();
    setTimeout(() => {
        randomWeapon();
    }, 100);
});

console.log('🔫 Генератор случайного оружия Valorant готов! Нажмите пробел для быстрого выбора.');