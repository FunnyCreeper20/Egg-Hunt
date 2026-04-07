document.addEventListener('DOMContentLoaded', function() {
    const gameArea = document.getElementById('game-area');
    const countElement = document.getElementById('count');
    const totalElement = document.getElementById('total');
    const introEggElement = document.querySelector('.intro-egg');
    const collectionSlots = document.querySelectorAll('.collection-slot');
    const backgrounds = {
        0: 'linear-gradient(to bottom, #87ceeb, #98fb98)', // field
        1: 'linear-gradient(to bottom, #164cb7, #0b0b57)', // ocean
        2: '#000000', // space
        3: 'linear-gradient(to bottom, #dff6ff 0%, #9bd3ff 45%, #b7ebff 72%, #edfaff 100%)' // ice stage
    };

    let currentBg = 0; //0 is field, 1 is ocean, 2 is space
    let introEggFound = false; // track if the intro egg has been found
    let directionEggFound = false; // track if the direction egg has been found
    let eggFound = false; // track if the floral egg has been found
    let smallEggFound = false; // track if the small egg has been found
    let woodEggFound = false; // track if the wood egg has been found
    let mapleEggFound = false; // track if the maple egg has been found
    let cloudEggFound = false; // track if the cloud egg has been found
    let rainEggFound = false; // track if the rain egg has been found
    let snowEggFound = false; // track if the snow egg has been found
    let bubbleEggFound = false; // track if the bubble egg has been found
    let fishEggFound = false; // track if the fish egg has been found
    let coralEggFound = false; // track if the coral egg has been found
    let sunkenEggFound = false; // track if the sunken egg has been found
    let trashEggFound = false; // track if the trash egg has been found
    let iceEggFound = false; // track if the ice egg has been found
    let penguinEggFound = false; // track if the penguin egg has been found
    let presentEggFound = false; // track if the present egg has been found
    let chocolateEggFound = false; // track if the chocolate egg has been found
    let chocolateEggRevealed = false; // track if the presents have been opened
    let elfEggFound = false; // track if the elf egg has been found
    let icicleEggFound = false; // track if the icicle egg has been found
    let polarEggFound = false; // track if the polar egg has been found
    let krakenEggFound = false; // track if the kraken egg has been found
    let eggSwingFound = false; // track if the eggswing has been found
    let deathEggFound = false; // track if the death egg has been found
    let sunEggFound = false; // track if the sun egg has been found
    let blackHoleEggFound = false; // track if the black hole egg has been found
    let asteroidEggFound = false; // track if the asteroid egg has been found
    let pixelEggFound = false; // track if the pixel egg has been found
    let galaxyEggFound = false; // track if the galaxy egg has been found
    let comingSoonEggFound = false; // track if the preview egg has been revealed
    let planetDestroyed = false; // track if the space planet has been destroyed
    let confettiLaunched = false;
    let eggsCollected = 0;
    let rainEggActive = false;
    let rainEggFrameId = null;
    let snowEggActive = false;
    let snowEggFrameId = null;
    let bubbleIntervalId = null;
    let bubbleEggIntervalId = null;
    let bubbleSpawnTimeoutIds = [];
    let bubbleEggSpawnTimeoutId = null;
    let fishEggIntervalId = null;
    let tentacleCheckIntervalId = null;
    let tentacleRetryTimeoutId = null;
    let eggSwingIntervalId = null;
    let asteroidEggIntervalId = null;
    let blackHoleAttractionIntervalId = null;
    let iceEggIntervalId = null;
    let penguinEggCycleTimeoutId = null;
    let elfEggCycleTimeoutId = null;
    let icicleEggCycleTimeoutId = null;
    let polarEggCycleTimeoutId = null;
    let directionEggIntervalId = null;
    let directionEggX = null;
    let directionEggY = null;
    let directionEggLastInputAt = 0;
    gameArea.style.background = backgrounds[currentBg];

    function getAvailableSceneIndexes() {
        const scenes = [0, 1, 2];

        if (iceEggFound && snowEggFound) {
            scenes.push(3);
        }

        return scenes;
    }

    function stopRainEggCycle() {
        rainEggActive = false;
        if (rainEggFrameId !== null) {
            cancelAnimationFrame(rainEggFrameId);
            rainEggFrameId = null;
        }
    }

    function stopSnowEggCycle() {
        snowEggActive = false;
        if (snowEggFrameId !== null) {
            cancelAnimationFrame(snowEggFrameId);
            snowEggFrameId = null;
        }
    }

    function stopBubbleCycle() {
        if (bubbleIntervalId !== null) {
            clearInterval(bubbleIntervalId);
            bubbleIntervalId = null;
        }
        bubbleSpawnTimeoutIds.forEach(timeoutId => {
            clearTimeout(timeoutId);
        });
        bubbleSpawnTimeoutIds = [];
    }

    function stopBubbleEggCycle() {
        if (bubbleEggIntervalId !== null) {
            clearInterval(bubbleEggIntervalId);
            bubbleEggIntervalId = null;
        }
        if (bubbleEggSpawnTimeoutId !== null) {
            clearTimeout(bubbleEggSpawnTimeoutId);
            bubbleEggSpawnTimeoutId = null;
        }
    }

    function stopFishEggCycle() {
        if (fishEggIntervalId !== null) {
            clearInterval(fishEggIntervalId);
            fishEggIntervalId = null;
        }
    }

    function stopTentacleCycle() {
        if (tentacleCheckIntervalId !== null) {
            clearInterval(tentacleCheckIntervalId);
            tentacleCheckIntervalId = null;
        }
        if (tentacleRetryTimeoutId !== null) {
            clearTimeout(tentacleRetryTimeoutId);
            tentacleRetryTimeoutId = null;
        }
    }

    function stopEggSwingCycle() {
        if (eggSwingIntervalId !== null) {
            clearInterval(eggSwingIntervalId);
            eggSwingIntervalId = null;
        }
    }

    function stopAsteroidEggCycle() {
        if (asteroidEggIntervalId !== null) {
            clearInterval(asteroidEggIntervalId);
            asteroidEggIntervalId = null;
        }
    }

    function stopBlackHoleAttraction() {
        if (blackHoleAttractionIntervalId !== null) {
            clearInterval(blackHoleAttractionIntervalId);
            blackHoleAttractionIntervalId = null;
        }
    }

    function stopIceEggCycle() {
        if (iceEggIntervalId !== null) {
            clearInterval(iceEggIntervalId);
            iceEggIntervalId = null;
        }
    }

    function stopPenguinEggCycle() {
        if (penguinEggCycleTimeoutId !== null) {
            clearTimeout(penguinEggCycleTimeoutId);
            penguinEggCycleTimeoutId = null;
        }
    }

    function stopElfEggCycle() {
        if (elfEggCycleTimeoutId !== null) {
            clearTimeout(elfEggCycleTimeoutId);
            elfEggCycleTimeoutId = null;
        }
    }

    function stopIcicleEggCycle() {
        if (icicleEggCycleTimeoutId !== null) {
            clearTimeout(icicleEggCycleTimeoutId);
            icicleEggCycleTimeoutId = null;
        }
    }

    function stopPolarEggCycle() {
        if (polarEggCycleTimeoutId !== null) {
            clearTimeout(polarEggCycleTimeoutId);
            polarEggCycleTimeoutId = null;
        }
    }

    function stopDirectionEggCycle() {
        if (directionEggIntervalId !== null) {
            clearInterval(directionEggIntervalId);
            directionEggIntervalId = null;
        }
    }

    function updateScore() {
        countElement.textContent = eggsCollected;

        if (!confettiLaunched && eggsCollected >= Number.parseInt(totalElement.textContent, 10)) {
            confettiLaunched = true;
            launchConfettiCelebration();
        }
    }

    function launchConfettiCelebration() {
        const overlay = document.createElement('div');
        const colors = ['#ff6b6b', '#ffd166', '#4ecdc4', '#5dade2', '#f78fb3', '#6c5ce7'];

        overlay.id = 'confetti-overlay';

        for (let i = 0; i < 90; i += 1) {
            const piece = document.createElement('div');
            const size = 7 + Math.random() * 8;

            piece.className = 'confetti-piece';
            piece.style.left = `${Math.random() * 100}vw`;
            piece.style.top = `${-10 - Math.random() * 25}vh`;
            piece.style.width = `${size}px`;
            piece.style.height = `${size * (1.2 + Math.random() * 0.8)}px`;
            piece.style.background = colors[Math.floor(Math.random() * colors.length)];
            piece.style.animationDelay = `${Math.random() * 0.8}s`;
            piece.style.animationDuration = `${3.1 + Math.random() * 1.6}s`;
            piece.style.setProperty('--confetti-drift', `${-90 + Math.random() * 180}px`);
            piece.style.setProperty('--confetti-rotate', `${180 + Math.random() * 540}deg`);

            overlay.appendChild(piece);
        }

        document.body.appendChild(overlay);

        setTimeout(() => {
            overlay.remove();
        }, 5200);
    }

    function getCollectionParticlePalette(eggType) {
        const greenEggs = ['small', 'floral', 'cloud', 'rain', 'wood', 'maple', 'snow'];
        const blueEggs = ['bubble', 'fish', 'coral', 'sunken', 'trash', 'kraken'];
        const iceEggs = ['ice', 'penguin', 'present', 'chocolate', 'elf', 'icicle', 'polar'];
        const darkEggs = ['eggswing', 'death', 'sun', 'black-hole', 'asteroid', 'pixel', 'galaxy'];

        if (eggType === 'intro') {
            return ['#ffd76a', '#ffbf3c', '#fff0a8'];
        }

        if (eggType === 'direction') {
            return ['#ffd76a', '#ffbf3c', '#fff0a8'];
        }

        if (greenEggs.includes(eggType)) {
            return ['#9dd96f', '#66bb55', '#c8f08b'];
        }

        if (blueEggs.includes(eggType)) {
            return ['#8bd4ff', '#53aee8', '#c2ecff'];
        }

        if (iceEggs.includes(eggType)) {
            return ['#f7fdff', '#d8edf8', '#bcd8ea'];
        }

        if (darkEggs.includes(eggType)) {
            return ['#050505', '#1a1a1a', '#343434'];
        }

        if (eggType === 'coming-soon') {
            return ['#ffd76a', '#ffbf3c', '#fff0a8'];
        }

        return ['#ffd7a3', '#f0a05a', '#fff1dc'];
    }

    function emitCollectionParticles(slot, eggType) {
        const colors = getCollectionParticlePalette(eggType);

        for (let i = 0; i < 14; i += 1) {
            const particle = document.createElement('span');
            const angle = Math.random() * Math.PI * 2;
            const distance = 18 + Math.random() * 42;
            const size = 6 + Math.random() * 7;

            particle.className = 'collection-particle';
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${50 + (Math.random() * 16 - 8)}%`;
            particle.style.top = `${42 + (Math.random() * 12 - 6)}%`;
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.color = particle.style.background;
            particle.style.setProperty('--particle-x', `${Math.cos(angle) * distance}px`);
            particle.style.setProperty('--particle-y', `${Math.sin(angle) * distance}px`);
            particle.style.setProperty('--particle-rotate', `${-120 + Math.random() * 240}deg`);

            slot.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 700);
        }
    }

    function emitScreenParticlesAtElement(element, eggType) {
        if (!element || !element.isConnected) {
            return;
        }

        const colors = getCollectionParticlePalette(eggType);
        const gameRect = gameArea.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const centerX = elementRect.left - gameRect.left + elementRect.width / 2;
        const centerY = elementRect.top - gameRect.top + elementRect.height / 2;

        for (let i = 0; i < 14; i += 1) {
            const particle = document.createElement('span');
            const angle = Math.random() * Math.PI * 2;
            const distance = 16 + Math.random() * 36;
            const size = 5 + Math.random() * 7;

            particle.className = 'screen-particle';
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${centerX}px`;
            particle.style.top = `${centerY}px`;
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.color = particle.style.background;
            particle.style.setProperty('--particle-x', `${Math.cos(angle) * distance}px`);
            particle.style.setProperty('--particle-y', `${Math.sin(angle) * distance}px`);
            particle.style.setProperty('--particle-rotate', `${-120 + Math.random() * 240}deg`);

            gameArea.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 700);
        }
    }

    function emitViewportParticlesAtElement(element, eggType) {
        if (!element || !element.isConnected) {
            return;
        }

        const colors = getCollectionParticlePalette(eggType);
        const elementRect = element.getBoundingClientRect();
        const centerX = elementRect.left + elementRect.width / 2;
        const centerY = elementRect.top + elementRect.height / 2;

        for (let i = 0; i < 14; i += 1) {
            const particle = document.createElement('span');
            const angle = Math.random() * Math.PI * 2;
            const distance = 16 + Math.random() * 36;
            const size = 5 + Math.random() * 7;

            particle.className = 'screen-particle viewport-particle';
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${centerX}px`;
            particle.style.top = `${centerY}px`;
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.color = particle.style.background;
            particle.style.setProperty('--particle-x', `${Math.cos(angle) * distance}px`);
            particle.style.setProperty('--particle-y', `${Math.sin(angle) * distance}px`);
            particle.style.setProperty('--particle-rotate', `${-120 + Math.random() * 240}deg`);

            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 700);
        }
    }

    function addEggToCollection(eggType, imagePath, label) {
        const slot = document.querySelector(`.collection-slot[data-egg="${eggType}"]`);

        if (!slot || slot.classList.contains('filled')) {
            return;
        }

        const description = slot.dataset.description || '';
        const collectionVisual = eggType === 'intro'
            ? '<span class="collection-emoji" aria-hidden="true">🥚</span>'
            : `<img class="collection-egg" src="${imagePath}" alt="${label}">`;
        slot.classList.add('filled');
        slot.innerHTML = `
            ${collectionVisual}
            <span class="slot-label">${label}</span>
            <span class="slot-description">${description}</span>
        `;
        requestAnimationFrame(() => {
            emitCollectionParticles(slot, eggType);
        });

        eggsCollected += 1;
        updateScore();
    }

    function getValidSpaceEggPosition(width, height, excludedSelectors = []) {
        const minimumDistance = 95;
        const maxLeft = 800 - width;
        const maxTop = 600 - height;
        const existingEggs = Array.from(gameArea.querySelectorAll('.death-egg, .sun-egg, .black-hole-egg'))
            .filter(egg => !excludedSelectors.some(selector => egg.matches(selector)));

        for (let attempt = 0; attempt < 40; attempt += 1) {
            const left = Math.random() * maxLeft;
            const top = Math.random() * maxTop;
            const centerX = left + width / 2;
            const centerY = top + height / 2;
            const tooClose = existingEggs.some(egg => {
                const eggLeft = Number.parseFloat(egg.style.left) || 0;
                const eggTop = Number.parseFloat(egg.style.top) || 0;
                const eggWidth = Number.parseFloat(egg.style.width) || 0;
                const eggHeight = Number.parseFloat(egg.style.height) || 0;
                const eggCenterX = eggLeft + eggWidth / 2;
                const eggCenterY = eggTop + eggHeight / 2;

                return Math.hypot(centerX - eggCenterX, centerY - eggCenterY) < minimumDistance;
            });

            if (!tooClose) {
                return { left, top };
            }
        }

        return {
            left: Math.random() * maxLeft,
            top: Math.random() * maxTop
        };
    }

    function applyBlackHoleAttractionToEgg(egg, blackHoleEgg) {
        if (!egg || !blackHoleEgg) {
            return;
        }

        const minimumDistance = 95;
        const currentLeft = Number.parseFloat(egg.style.left) || 0;
        const currentTop = Number.parseFloat(egg.style.top) || 0;
        const eggWidth = parseFloat(egg.style.width) || 0;
        const eggHeight = parseFloat(egg.style.height) || 0;
        const blackHoleLeft = parseFloat(blackHoleEgg.style.left) || 0;
        const blackHoleTop = parseFloat(blackHoleEgg.style.top) || 0;
        const blackHoleWidth = parseFloat(blackHoleEgg.style.width) || 0;
        const blackHoleHeight = parseFloat(blackHoleEgg.style.height) || 0;
        const dx = (blackHoleLeft + blackHoleWidth / 2) - (currentLeft + eggWidth / 2);
        const dy = (blackHoleTop + blackHoleHeight / 2) - (currentTop + eggHeight / 2);
        const distance = Math.hypot(dx, dy) || 1;

        if (distance <= minimumDistance) {
            return;
        }

        const pullStrength = Math.min(1.6, distance * 0.015);
        const pullX = (dx / distance) * pullStrength;
        const pullY = (dy / distance) * pullStrength;

        egg.style.left = `${currentLeft + pullX}px`;
        egg.style.top = `${currentTop + pullY}px`;
    }

    function updateBlackHoleAttraction() {
        const blackHoleEgg = gameArea.querySelector('.black-hole-egg');
        const deathEgg = gameArea.querySelector('.death-egg');
        const sunEgg = gameArea.querySelector('.sun-egg');

        if (!blackHoleEgg) {
            stopBlackHoleAttraction();
            return;
        }

        applyBlackHoleAttractionToEgg(deathEgg, blackHoleEgg);
        applyBlackHoleAttractionToEgg(sunEgg, blackHoleEgg);
    }

    function startBlackHoleAttraction() {
        if (currentBg !== 2 || blackHoleAttractionIntervalId !== null) {
            return;
        }

        blackHoleAttractionIntervalId = setInterval(() => {
            updateBlackHoleAttraction();
        }, 40);
    }

    function revealComingSoonEgg() {
        if (comingSoonEggFound) {
            return;
        }

        const slot = document.querySelector('.collection-slot[data-egg="coming-soon"]');

        if (!slot) {
            return;
        }

        comingSoonEggFound = true;
        addEggToCollection('coming-soon', 'images/comingsoonegg.png', 'Coming Soon Egg');
    }

    function collectIntroEgg() {
        if (introEggFound || !introEggElement) {
            return;
        }

        introEggFound = true;
        addEggToCollection('intro', 'images/comingsoonegg.png', 'Intro Egg');
        introEggElement.classList.add('intro-egg-found');
        introEggElement.setAttribute('aria-hidden', 'true');
        introEggElement.removeAttribute('role');
        introEggElement.removeAttribute('tabindex');
    }

    function initializeDirectionEggPosition() {
        if (directionEggX !== null && directionEggY !== null) {
            return;
        }

        const width = 52;
        const height = 66;
        const viewportWidth = window.innerWidth;
        directionEggX = viewportWidth / 2 - width / 2;
        directionEggY = -height - 25;
    }

    function updateDirectionEggElementPosition() {
        const egg = document.querySelector('.direction-egg');

        if (!egg || directionEggX === null || directionEggY === null) {
            return;
        }

        egg.style.left = `${directionEggX}px`;
        egg.style.top = `${directionEggY}px`;
    }

    function moveDirectionEggTowardCenter() {
        if (directionEggFound) {
            return;
        }

        initializeDirectionEggPosition();
        directionEggLastInputAt = Date.now();

        const width = 52;
        const height = 66;
        const centerX = window.innerWidth / 2 - width / 2;
        const centerY = window.innerHeight / 2 - height / 2;
        const dx = centerX - directionEggX;
        const dy = centerY - directionEggY;
        const distance = Math.hypot(dx, dy) || 1;
        const step = Math.min(4, distance);

        directionEggX += (dx / distance) * step;
        directionEggY += (dy / distance) * step;
        updateDirectionEggElementPosition();
    }

    function startDirectionEggCycle() {
        if (directionEggFound || directionEggIntervalId !== null) {
            return;
        }

        directionEggIntervalId = setInterval(() => {
            if (directionEggFound) {
                stopDirectionEggCycle();
                return;
            }

            const egg = document.querySelector('.direction-egg');

            if (!egg) {
                return;
            }

            if (Date.now() - directionEggLastInputAt < 650) {
                return;
            }

            const width = 52;
            const height = 66;
            const centerX = window.innerWidth / 2 - width / 2;
            const centerY = window.innerHeight / 2 - height / 2;
            const dx = directionEggX - centerX;
            const dy = directionEggY - centerY;
            const distance = Math.hypot(dx, dy) || 1;
            const drift = 1.1;
            const maxOffscreenDistance = 110;

            if (
                directionEggX < -width - maxOffscreenDistance ||
                directionEggX > window.innerWidth + maxOffscreenDistance ||
                directionEggY < -height - maxOffscreenDistance ||
                directionEggY > window.innerHeight + maxOffscreenDistance
            ) {
                return;
            }

            directionEggX += (dx / distance) * drift;
            directionEggY += (dy / distance) * drift;
            updateDirectionEggElementPosition();
        }, 45);
    }

    function addPixelEggAtPlanet(planet) {
        if (!planet || pixelEggFound || gameArea.querySelector('.pixel-egg')) {
            return;
        }

        const planetLeft = parseFloat(planet.style.left) || 0;
        const planetTop = parseFloat(planet.style.top) || 0;
        const planetWidth = parseFloat(planet.style.width) || 0;
        const planetHeight = parseFloat(planet.style.height) || 0;
        const egg = document.createElement('div');
        const eggWidth = 50;
        const eggHeight = 62;

        egg.className = 'egg pixel-egg';
        egg.style.backgroundImage = 'url(images/pixelegg.png)';
        egg.style.backgroundSize = 'cover';
        egg.style.width = `${eggWidth}px`;
        egg.style.height = `${eggHeight}px`;
        egg.style.position = 'absolute';
        egg.style.cursor = 'pointer';
        egg.style.left = `${planetLeft + (planetWidth / 2) - (eggWidth / 2)}px`;
        egg.style.top = `${planetTop + (planetHeight / 2) - (eggHeight / 2)}px`;
        egg.style.zIndex = '3';

        egg.addEventListener('click', () => {
            emitScreenParticlesAtElement(egg, 'pixel');
            egg.remove();
            pixelEggFound = true;
            addEggToCollection('pixel', 'images/pixelegg.png', 'Pixel Egg');
        });

        gameArea.appendChild(egg);
    }

    function spawnGalaxyEggAt(left, top) {
        if (galaxyEggFound || gameArea.querySelector('.galaxy-egg')) {
            return;
        }

        const egg = document.createElement('div');
        const eggCore = document.createElement('div');
        const width = 54;
        const height = 68;

        egg.className = 'egg galaxy-egg';
        egg.style.width = `${width}px`;
        egg.style.height = `${height}px`;
        egg.style.position = 'absolute';
        egg.style.cursor = 'pointer';
        egg.style.left = `${Math.max(0, Math.min(800 - width, left - width / 2))}px`;
        egg.style.top = `${Math.max(0, Math.min(600 - height, top - height / 2))}px`;
        egg.style.zIndex = '3';

        eggCore.className = 'galaxy-egg-core';
        eggCore.style.backgroundImage = 'url(images/galaxyegg.png)';

        egg.appendChild(eggCore);
        egg.addEventListener('click', () => {
            emitScreenParticlesAtElement(egg, 'galaxy');
            egg.remove();
            galaxyEggFound = true;
            addEggToCollection('galaxy', 'images/galaxyegg.png', 'Galaxy Egg');
        });

        gameArea.appendChild(egg);
    }

    function spawnKrakenEggAt(left, bottom) {
        if (krakenEggFound || gameArea.querySelector('.kraken-egg')) {
            return;
        }

        const egg = document.createElement('div');

        egg.className = 'egg kraken-egg';
        egg.style.backgroundImage = 'url(images/krakenegg.png)';
        egg.style.backgroundSize = 'cover';
        egg.style.width = '54px';
        egg.style.height = '68px';
        egg.style.position = 'absolute';
        egg.style.cursor = 'pointer';
        egg.style.left = `${left + 28}px`;
        egg.style.bottom = `${bottom + 10}px`;
        egg.style.zIndex = '2';
        egg.addEventListener('click', () => {
            emitScreenParticlesAtElement(egg, 'kraken');
            egg.remove();
            krakenEggFound = true;
            addEggToCollection('kraken', 'images/krakenegg.png', 'Kraken Egg');
        });

        gameArea.appendChild(egg);
    }

    function showInkSplotch(left, bottom) {
        const ink = document.createElement('div');
        const inkWidth = 120;
        const inkHeight = 90;
        const minLeft = Math.max(0, left - 140);
        const maxLeft = Math.min(800 - inkWidth, left + 80);
        const maxBottom = Math.min(600 - inkHeight, 520);
        const minBottom = Math.max(bottom + 80, 120);
        const inkLeft = minLeft + Math.random() * Math.max(1, maxLeft - minLeft);
        const inkBottom = minBottom + Math.random() * Math.max(1, maxBottom - minBottom);

        ink.className = 'ink-splotch';
        ink.style.left = `${inkLeft}px`;
        ink.style.bottom = `${inkBottom}px`;

        gameArea.appendChild(ink);
        spawnKrakenEggAt(inkLeft, inkBottom);

        setTimeout(() => {
            ink.remove();
        }, 2000);
    }

    function showPlanetExplosion(planet) {
        const explosion = document.createElement('div');
        const planetLeft = parseFloat(planet.style.left) || 0;
        const planetTop = parseFloat(planet.style.top) || 0;
        const planetWidth = parseFloat(planet.style.width) || 0;
        const planetHeight = parseFloat(planet.style.height) || 0;
        const size = Math.max(planetWidth, planetHeight) * 1.2;

        explosion.className = 'planet-explosion';
        explosion.style.width = `${size}px`;
        explosion.style.height = `${size}px`;
        explosion.style.left = `${planetLeft + (planetWidth / 2) - (size / 2)}px`;
        explosion.style.top = `${planetTop + (planetHeight / 2) - (size / 2)}px`;

        gameArea.appendChild(explosion);

        setTimeout(() => {
            explosion.remove();
        }, 700);
    }

    function launchAsteroidIntoPlanet(asteroidEgg) {
        const planet = gameArea.querySelector('.planet');

        if (!planet) {
            emitScreenParticlesAtElement(asteroidEgg, 'asteroid');
            asteroidEgg.remove();
            asteroidEggFound = true;
            addEggToCollection('asteroid', 'images/asteroidegg.png', 'Asteroid Egg');
            return;
        }

        const gameRect = gameArea.getBoundingClientRect();
        const asteroidRect = asteroidEgg.getBoundingClientRect();
        const planetRect = planet.getBoundingClientRect();
        const currentLeft = asteroidRect.left - gameRect.left;
        const currentTop = asteroidRect.top - gameRect.top;
        const targetLeft = planetRect.left - gameRect.left + (planetRect.width - asteroidRect.width) / 2;
        const targetTop = planetRect.top - gameRect.top + (planetRect.height - asteroidRect.height) / 2;
        const dx = targetLeft - currentLeft;
        const dy = targetTop - currentTop;

        asteroidEgg.style.animation = 'none';
        asteroidEgg.style.left = `${currentLeft}px`;
        asteroidEgg.style.top = `${currentTop}px`;

        const asteroidCore = asteroidEgg.querySelector('.asteroid-egg-core');
        if (asteroidCore) {
            asteroidCore.style.animation = 'none';
        }

        requestAnimationFrame(() => {
            asteroidEgg.classList.add('asteroid-impact');
            asteroidEgg.style.setProperty('--impact-dx', `${dx}px`);
            asteroidEgg.style.setProperty('--impact-dy', `${dy}px`);
        });

        setTimeout(() => {
            planetDestroyed = true;
            planet.style.backgroundImage = 'url(images/flowers/planet2.png)';
            showPlanetExplosion(planet);
            addPixelEggAtPlanet(planet);
        }, 560);

        setTimeout(() => {
            emitScreenParticlesAtElement(asteroidEgg, 'asteroid');
            asteroidEgg.remove();
            asteroidEggFound = true;
            addEggToCollection('asteroid', 'images/asteroidegg.png', 'Asteroid Egg');
        }, 750);
    }

    function clearDecorations() {
        stopRainEggCycle();
        stopSnowEggCycle();
        stopBubbleCycle();
        stopBubbleEggCycle();
        stopFishEggCycle();
        stopTentacleCycle();
        stopEggSwingCycle();
        stopAsteroidEggCycle();
        stopBlackHoleAttraction();
        stopIceEggCycle();
        stopPenguinEggCycle();
        stopElfEggCycle();
        stopIcicleEggCycle();
        stopPolarEggCycle();
        stopDirectionEggCycle();
        const decorations = gameArea.querySelectorAll('.egg, .flower, .tree, .star, .cloud, .rain-egg, .snow-egg, .bubble, .bubble-egg, .fish-egg, .ship, .mountain, .tentacle, .ink-splotch, .egg-swing, .asteroid-egg, .planet, .planet-explosion, .screen-particle, .frost-flake, .ice-ridge, .ice-present, .penguin-egg, .chocolate-egg, .elf-egg, .icicle-egg, .polar-egg');
        decorations.forEach(d => d.remove());
    }

    function addGreenEgg() {
        if (eggFound) return; // don't add if already found
        const egg = document.createElement('div');
        egg.className = 'egg';
        egg.style.backgroundImage = 'url(images/floralegg.png)';
        egg.style.backgroundSize = 'cover';
        egg.style.left = Math.random() * (800 - 48) + 'px'; // random position at bottom
        egg.style.top = '540px';
        egg.style.width = '48px';
        egg.style.height = '60px';
        egg.style.position = 'absolute';
        egg.style.cursor = 'pointer';
        egg.addEventListener('click', () => {
            emitScreenParticlesAtElement(egg, 'floral');
            egg.style.display = 'none';
            eggFound = true; // mark as found
            addEggToCollection('floral', 'images/floralegg.png', 'Floral Egg');
        });
        gameArea.appendChild(egg);
    }

    function addSmallEgg() {
        if (smallEggFound) return;
        const egg = document.createElement('div');
        egg.className = 'egg';
        egg.style.backgroundImage = 'url(images/smallegg.png)';
        egg.style.backgroundSize = 'cover';
        egg.style.left = Math.random() * (800 - 48) + 'px';
        egg.style.top = '555px';
        egg.style.width = '48px';
        egg.style.height = '60px';
        egg.style.position = 'absolute';
        egg.style.cursor = 'pointer';
        egg.addEventListener('click', () => {
            emitScreenParticlesAtElement(egg, 'small');
            egg.style.display = 'none';
            smallEggFound = true;
            addEggToCollection('small', 'images/smallegg.png', 'Small Egg');
        });
        gameArea.appendChild(egg);
    }

    function addDirectionEgg() {
        if (directionEggFound) {
            return;
        }

        const existingEgg = document.querySelector('.direction-egg');

        if (existingEgg) {
            updateDirectionEggElementPosition();
            startDirectionEggCycle();
            return;
        }

        initializeDirectionEggPosition();

        const egg = document.createElement('div');
        egg.className = 'egg direction-egg';
        egg.style.backgroundImage = 'url(images/directionegg.png)';
        egg.style.backgroundSize = 'cover';
        egg.style.width = '52px';
        egg.style.height = '66px';
        egg.style.position = 'fixed';
        egg.style.cursor = 'pointer';
        egg.style.zIndex = '20';
        egg.style.left = `${directionEggX}px`;
        egg.style.top = `${directionEggY}px`;
        egg.addEventListener('click', () => {
            emitViewportParticlesAtElement(egg, 'direction');
            directionEggFound = true;
            stopDirectionEggCycle();
            egg.remove();
            addEggToCollection('direction', 'images/directionegg.png', 'Direction Egg');
        });

        document.body.appendChild(egg);
        startDirectionEggCycle();
    }

    function addWoodEgg() {
        if (woodEggFound) return; // don't add if already found
        const egg = document.createElement('div');
        egg.className = 'egg';
        egg.style.backgroundImage = 'url(images/woodegg.png)';
        egg.style.backgroundSize = 'cover';
        egg.style.width = '52px'; //original image is 52x64, but we want to make it a bit smaller for better fitting in
        egg.style.height = '64px';
        egg.style.position = 'absolute';
        egg.style.cursor = 'pointer';
        egg.style.right = '210px';
        egg.style.top = '450px';
        egg.style.zIndex = '3';
        egg.addEventListener('click', () => {
            emitScreenParticlesAtElement(egg, 'wood');
            egg.style.display = 'none';
            woodEggFound = true;
            addEggToCollection('wood', 'images/woodegg.png', 'Wood Egg');
        });
        gameArea.appendChild(egg);
    }

    function addMapleEgg() {
        if (mapleEggFound) return; // don't add if already found
        const egg = document.createElement('div');
        egg.className = 'egg maple-egg';
        egg.style.backgroundImage = 'url(images/maplegg.png)';
        egg.style.backgroundSize = 'cover';
        egg.style.width = '60px';
        egg.style.height = '74px';
        egg.style.position = 'absolute';
        egg.style.cursor = 'pointer';
        egg.style.right = '180px';
        egg.style.top = '305px';
        egg.style.zIndex = '3';
        egg.addEventListener('click', () => {
            emitScreenParticlesAtElement(egg, 'maple');
            egg.style.display = 'none';
            mapleEggFound = true;
            addEggToCollection('maple', 'images/maplegg.png', 'Maple Egg');
        });
        gameArea.appendChild(egg);
    }

    function addCloudEgg() {
        if (cloudEggFound) return; // don't add if already found
        const egg = document.createElement('div');
        egg.className = 'egg';
        egg.style.backgroundImage = 'url(images/cloudegg.png)';
        egg.style.backgroundSize = 'cover';
        egg.style.width = '56px';
        egg.style.height = '70px';
        egg.style.position = 'absolute';
        egg.style.cursor = 'pointer';
        egg.style.left = '205px';
        egg.style.top = '80px';
        egg.style.zIndex = '1';
        egg.addEventListener('click', () => {
            emitScreenParticlesAtElement(egg, 'cloud');
            egg.style.display = 'none';
            cloudEggFound = true;
            addEggToCollection('cloud', 'images/cloudegg.png', 'Cloud Egg');
            const cloud = gameArea.querySelector('.cloud');
            if (cloud) {
                cloud.classList.add('cloud-dark');
                cloud.classList.add('cloud-interactive');
                cloud.addEventListener('click', startRainEggCycle);
            }
        });
        gameArea.appendChild(egg);
    }

    function addCoralEgg() {
        if (coralEggFound) return;
        const egg = document.createElement('div');
        const maxLeft = 600 - 50;
        egg.className = 'egg';
        egg.style.backgroundImage = 'url(images/coralegg.png)';
        egg.style.backgroundSize = 'cover';
        egg.style.width = '50px';
        egg.style.height = '64px';
        egg.style.position = 'absolute';
        egg.style.cursor = 'pointer';
        egg.style.left = `${Math.random() * maxLeft}px`;
        egg.style.top = '540px';
        egg.style.zIndex = '2';
        egg.addEventListener('click', () => {
            emitScreenParticlesAtElement(egg, 'coral');
            egg.style.display = 'none';
            coralEggFound = true;
            addEggToCollection('coral', 'images/coralegg.png', 'Coral Egg');
        });
        gameArea.appendChild(egg);
    }

    function addSunkenEgg() {
        if (sunkenEggFound) return;

        const egg = document.createElement('div');
        const minLeft = 600;
        const maxLeft = 800 - 54;

        egg.className = 'egg sunken-egg';
        egg.style.backgroundImage = 'url(images/sunkenegg.png)';
        egg.style.backgroundSize = 'cover';
        egg.style.width = '54px';
        egg.style.height = '68px';
        egg.style.position = 'absolute';
        egg.style.cursor = 'pointer';
        egg.style.left = `${minLeft + Math.random() * (maxLeft - minLeft)}px`;
        egg.style.top = '540px';
        egg.style.zIndex = '2';
        egg.addEventListener('click', () => {
            emitScreenParticlesAtElement(egg, 'sunken');
            egg.style.display = 'none';
            sunkenEggFound = true;
            addEggToCollection('sunken', 'images/sunkenegg.png', 'Sunken Egg');
        });

        gameArea.appendChild(egg);
    }

    function addTrashEgg() {
        if (trashEggFound) return;

        const egg = document.createElement('div');
        const width = 52;
        const height = 66;
        const left = Math.random() * (800 - width);
        const top = Math.random() * (600 - height);

        egg.className = 'egg trash-egg';
        egg.style.backgroundImage = 'url(images/trashegg.png)';
        egg.style.backgroundSize = 'cover';
        egg.style.width = `${width}px`;
        egg.style.height = `${height}px`;
        egg.style.position = 'absolute';
        egg.style.cursor = 'pointer';
        egg.style.left = `${left}px`;
        egg.style.top = `${top}px`;
        egg.style.zIndex = '2';
        egg.addEventListener('click', () => {
            emitScreenParticlesAtElement(egg, 'trash');
            egg.style.display = 'none';
            trashEggFound = true;
            addEggToCollection('trash', 'images/trashegg.png', 'Trash Egg');
        });

        gameArea.appendChild(egg);
    }

    function addIceEgg() {
        if (iceEggFound) return;

        const egg = document.createElement('div');
        const width = 52;
        const height = 66;
        let left = Math.random() * (800 - width);
        let velocityX = Math.random() < 0.5 ? 1.6 : -1.6;
        let bobPhase = Math.random() * Math.PI * 2;

        egg.className = 'egg ice-egg';
        egg.style.backgroundImage = 'url(images/iceegg.png)';
        egg.style.backgroundSize = 'cover';
        egg.style.width = `${width}px`;
        egg.style.height = `${height}px`;
        egg.style.position = 'absolute';
        egg.style.cursor = 'pointer';
        egg.style.left = `${left}px`;
        egg.style.top = '0px';
        egg.style.zIndex = '2';
        egg.addEventListener('click', () => {
            stopIceEggCycle();
            emitScreenParticlesAtElement(egg, 'ice');
            egg.style.display = 'none';
            iceEggFound = true;
            addEggToCollection('ice', 'images/iceegg.png', 'Ice Egg');
        });

        gameArea.appendChild(egg);

        iceEggIntervalId = setInterval(() => {
            if (currentBg !== 1 || iceEggFound || !egg.isConnected) {
                stopIceEggCycle();
                return;
            }

            left += velocityX;
            bobPhase += 0.06;

            if (left <= 0) {
                left = 0;
                velocityX = Math.abs(velocityX);
            } else if (left >= 800 - width) {
                left = 800 - width;
                velocityX = -Math.abs(velocityX);
            }

            egg.style.left = `${left}px`;
            egg.style.top = `${((Math.sin(bobPhase) + 1) / 2) * 8}px`;
            egg.style.transform = `rotate(${Math.sin(bobPhase * 0.85) * 6}deg)`;
        }, 16);
    }

    function startPenguinEggCycle() {
        if (currentBg !== 3 || penguinEggFound || gameArea.querySelector('.penguin-egg')) {
            return;
        }

        const width = 54;
        const height = 70;
        const left = 70 + Math.random() * (800 - 140 - width);
        const egg = document.createElement('div');

        egg.className = 'egg penguin-egg';
        egg.style.backgroundImage = 'url(images/penguinegg.png)';
        egg.style.backgroundSize = 'cover';
        egg.style.width = `${width}px`;
        egg.style.height = `${height}px`;
        egg.style.left = `${left}px`;
        egg.style.bottom = '-34px';
        egg.style.zIndex = '8';

        egg.addEventListener('click', () => {
            stopPenguinEggCycle();
            emitScreenParticlesAtElement(egg, 'penguin');
            egg.remove();
            penguinEggFound = true;
            addEggToCollection('penguin', 'images/penguinegg.png', 'Penguin Egg');
        });

        egg.addEventListener('animationend', event => {
            if (event.animationName !== 'penguin-egg-hop') {
                return;
            }

            egg.remove();

            if (currentBg === 3 && !penguinEggFound) {
                penguinEggCycleTimeoutId = setTimeout(() => {
                    penguinEggCycleTimeoutId = null;
                    startPenguinEggCycle();
                }, 900 + Math.random() * 1400);
            }
        });

        gameArea.appendChild(egg);
    }

    function addIcePresents() {
        if (chocolateEggRevealed) {
            return;
        }

        const presents = document.createElement('div');

        presents.className = 'ice-present';
        presents.style.backgroundImage = 'url(images/flowers/presents.png)';
        presents.style.right = '60px';
        presents.style.bottom = '70px';
        presents.style.width = '150px';
        presents.style.height = '120px';

        if (presentEggFound) {
            presents.classList.add('ice-present-interactive');
            presents.addEventListener('click', () => {
                chocolateEggRevealed = true;
                presents.remove();
                addChocolateEgg();
            });
        }

        gameArea.appendChild(presents);
    }

    function addPresentEgg() {
        if (presentEggFound) {
            return;
        }

        const egg = document.createElement('div');

        egg.className = 'egg present-egg';
        egg.style.backgroundImage = 'url(images/presentegg.png)';
        egg.style.backgroundSize = 'cover';
        egg.style.width = '50px';
        egg.style.height = '63px';
        egg.style.position = 'absolute';
        egg.style.cursor = 'pointer';
        egg.style.right = '155px';
        egg.style.bottom = '104px';
        egg.style.zIndex = '2';
        egg.addEventListener('click', () => {
            emitScreenParticlesAtElement(egg, 'present');
            egg.style.display = 'none';
            presentEggFound = true;
            addEggToCollection('present', 'images/presentegg.png', 'Present Egg');
            const presents = gameArea.querySelector('.ice-present');
            if (presents && !chocolateEggRevealed) {
                presents.classList.add('ice-present-interactive');
                presents.addEventListener('click', () => {
                    chocolateEggRevealed = true;
                    presents.remove();
                    addChocolateEgg();
                }, { once: true });
            }
        });

        gameArea.appendChild(egg);
    }

    function addChocolateEgg() {
        if (!chocolateEggRevealed || chocolateEggFound || gameArea.querySelector('.chocolate-egg')) {
            return;
        }

        const egg = document.createElement('div');

        egg.className = 'egg chocolate-egg';
        egg.style.backgroundImage = 'url(images/chocolateegg.png)';
        egg.style.backgroundSize = 'cover';
        egg.style.width = '54px';
        egg.style.height = '68px';
        egg.style.position = 'absolute';
        egg.style.cursor = 'pointer';
        egg.style.right = '108px';
        egg.style.bottom = '104px';
        egg.style.zIndex = '2';
        egg.addEventListener('click', () => {
            emitScreenParticlesAtElement(egg, 'chocolate');
            egg.style.display = 'none';
            chocolateEggFound = true;
            addEggToCollection('chocolate', 'images/chocolateegg.png', 'Chocolate Egg');
        });

        gameArea.appendChild(egg);
    }

    function startElfEggCycle() {
        if (currentBg !== 3 || elfEggFound || gameArea.querySelector('.elf-egg')) {
            return;
        }

        const spawnElfEgg = () => {
            if (currentBg !== 3 || elfEggFound || gameArea.querySelector('.elf-egg')) {
                return;
            }

            const egg = document.createElement('div');
            const width = 50;
            const height = 66;
            const startFromLeft = Math.random() < 0.5;

            egg.className = 'egg elf-egg';
            egg.style.backgroundImage = 'url(images/elfegg.png)';
            egg.style.backgroundSize = 'cover';
            egg.style.width = `${width}px`;
            egg.style.height = `${height}px`;
            egg.style.position = 'absolute';
            egg.style.cursor = 'pointer';
            egg.style.bottom = '62px';
            egg.style.left = startFromLeft ? '-70px' : '820px';
            egg.style.zIndex = '3';
            egg.style.animationDirection = startFromLeft ? 'normal' : 'reverse';

            if (!startFromLeft) {
                egg.style.transform = 'scaleX(-1)';
            }

            egg.addEventListener('click', () => {
                stopElfEggCycle();
                emitScreenParticlesAtElement(egg, 'elf');
                egg.remove();
                elfEggFound = true;
                addEggToCollection('elf', 'images/elfegg.png', 'Elf Egg');
            });

            egg.addEventListener('animationend', event => {
                if (event.animationName !== 'elf-egg-walk') {
                    return;
                }

                egg.remove();

                if (currentBg === 3 && !elfEggFound) {
                    elfEggCycleTimeoutId = setTimeout(() => {
                        elfEggCycleTimeoutId = null;
                        startElfEggCycle();
                    }, 1800 + Math.random() * 3200);
                }
            });

            gameArea.appendChild(egg);
        };

        elfEggCycleTimeoutId = setTimeout(() => {
            elfEggCycleTimeoutId = null;
            spawnElfEgg();
        }, 1600 + Math.random() * 2600);
    }

    function startIcicleEggCycle() {
        if (currentBg !== 3 || icicleEggFound || gameArea.querySelector('.icicle-egg')) {
            return;
        }

        const spawnIcicleEgg = () => {
            if (currentBg !== 3 || icicleEggFound || gameArea.querySelector('.icicle-egg')) {
                return;
            }

            const egg = document.createElement('div');
            const width = 46;
            const height = 72;
            const left = 40 + Math.random() * (800 - 80 - width);

            egg.className = 'egg icicle-egg';
            egg.style.backgroundImage = 'url(images/icicleegg.png)';
            egg.style.backgroundSize = 'cover';
            egg.style.width = `${width}px`;
            egg.style.height = `${height}px`;
            egg.style.position = 'absolute';
            egg.style.cursor = 'pointer';
            egg.style.left = `${left}px`;
            egg.style.top = '-90px';
            egg.style.zIndex = '3';

            egg.addEventListener('click', () => {
                stopIcicleEggCycle();
                emitScreenParticlesAtElement(egg, 'icicle');
                egg.remove();
                icicleEggFound = true;
                addEggToCollection('icicle', 'images/icicleegg.png', 'Icicle Egg');
            });

            egg.addEventListener('animationend', event => {
                if (event.animationName !== 'icicle-egg-fall') {
                    return;
                }

                if (egg.isConnected && !icicleEggFound) {
                    emitScreenParticlesAtElement(egg, 'icicle');
                    egg.remove();
                }

                if (currentBg === 3 && !icicleEggFound) {
                    icicleEggCycleTimeoutId = setTimeout(() => {
                        icicleEggCycleTimeoutId = null;
                        startIcicleEggCycle();
                    }, 1300 + Math.random() * 2200);
                }
            });

            gameArea.appendChild(egg);
        };

        icicleEggCycleTimeoutId = setTimeout(() => {
            icicleEggCycleTimeoutId = null;
            spawnIcicleEgg();
        }, 1100 + Math.random() * 2200);
    }

    function startPolarEggCycle() {
        if (currentBg !== 3 || polarEggFound || gameArea.querySelector('.polar-egg')) {
            return;
        }

        const spawnPolarEgg = () => {
            if (currentBg !== 3 || polarEggFound || gameArea.querySelector('.polar-egg')) {
                return;
            }

            const egg = document.createElement('div');
            const width = 58;
            const height = 72;
            const startLeft = 273;
            const startTop = 369;
            const targetLeft = 300 + Math.random() * 400;
            const targetTop = 446 + Math.random() * 52;
            const dx = targetLeft - startLeft;
            const dy = targetTop - startTop;

            egg.className = 'egg polar-egg';
            egg.style.backgroundImage = 'url(images/polaregg.png)';
            egg.style.backgroundSize = 'cover';
            egg.style.width = `${width}px`;
            egg.style.height = `${height}px`;
            egg.style.position = 'absolute';
            egg.style.cursor = 'pointer';
            egg.style.left = `${startLeft}px`;
            egg.style.top = `${startTop}px`;
            egg.style.zIndex = '4';
            egg.style.setProperty('--polar-dx', `${dx}px`);
            egg.style.setProperty('--polar-dy', `${dy}px`);

            egg.addEventListener('click', () => {
                stopPolarEggCycle();
                emitScreenParticlesAtElement(egg, 'polar');
                egg.remove();
                polarEggFound = true;
                addEggToCollection('polar', 'images/polaregg.png', 'Polar Egg');
            });

            egg.addEventListener('animationend', event => {
                if (event.animationName !== 'polar-egg-trip') {
                    return;
                }

                egg.remove();

                if (currentBg === 3 && !polarEggFound) {
                    polarEggCycleTimeoutId = setTimeout(() => {
                        polarEggCycleTimeoutId = null;
                        startPolarEggCycle();
                    }, 2000 + Math.random() * 2600);
                }
            });

            gameArea.appendChild(egg);
        };

        polarEggCycleTimeoutId = setTimeout(() => {
            polarEggCycleTimeoutId = null;
            spawnPolarEgg();
        }, 1400 + Math.random() * 2400);
    }

    function addDeathEgg() {
        if (deathEggFound) return;

        const egg = document.createElement('div');
        const width = 58;
        const height = 72;
        const { left, top } = getValidSpaceEggPosition(width, height);

        egg.className = 'egg death-egg';
        egg.style.backgroundImage = 'url(images/deathegg.png)';
        egg.style.backgroundSize = 'cover';
        egg.style.width = `${width}px`;
        egg.style.height = `${height}px`;
        egg.style.position = 'absolute';
        egg.style.cursor = 'pointer';
        egg.style.left = `${left}px`;
        egg.style.top = `${top}px`;
        egg.style.zIndex = '2';
        egg.addEventListener('click', () => {
            emitScreenParticlesAtElement(egg, 'death');
            egg.style.display = 'none';
            deathEggFound = true;
            addEggToCollection('death', 'images/deathegg.png', 'Death Egg');
        });

        gameArea.appendChild(egg);
        startBlackHoleAttraction();
    }

    function addSunEgg() {
        if (sunEggFound) return;

        const egg = document.createElement('div');
        const width = 58;
        const height = 72;
        const { left, top } = getValidSpaceEggPosition(width, height);

        egg.className = 'egg sun-egg';
        egg.style.backgroundImage = 'url(images/sunegg.png)';
        egg.style.backgroundSize = 'cover';
        egg.style.width = `${width}px`;
        egg.style.height = `${height}px`;
        egg.style.position = 'absolute';
        egg.style.cursor = 'pointer';
        egg.style.left = `${left}px`;
        egg.style.top = `${top}px`;
        egg.style.zIndex = '2';
        egg.addEventListener('click', () => {
            emitScreenParticlesAtElement(egg, 'sun');
            egg.style.display = 'none';
            sunEggFound = true;
            addEggToCollection('sun', 'images/sunegg.png', 'Sun Egg');
        });

        gameArea.appendChild(egg);
        startBlackHoleAttraction();
    }

    function addBlackHoleEgg() {
        if (blackHoleEggFound) return;

        const egg = document.createElement('div');
        const width = 58;
        const height = 72;
        const { left, top } = getValidSpaceEggPosition(width, height);

        egg.className = 'egg black-hole-egg';
        egg.style.backgroundImage = 'url(images/blackholeegg.png)';
        egg.style.backgroundSize = 'cover';
        egg.style.width = `${width}px`;
        egg.style.height = `${height}px`;
        egg.style.position = 'absolute';
        egg.style.cursor = 'pointer';
        egg.style.left = `${left}px`;
        egg.style.top = `${top}px`;
        egg.style.zIndex = '2';
        egg.addEventListener('click', () => {
            emitScreenParticlesAtElement(egg, 'black-hole');
            egg.remove();
            blackHoleEggFound = true;
            addEggToCollection('black-hole', 'images/blackholeegg.png', 'Black Hole Egg');
            stopBlackHoleAttraction();
        });

        gameArea.appendChild(egg);
        startBlackHoleAttraction();
    }

    function addShipwreck() {
        const ship = document.createElement('div');

        ship.className = 'ship';
        ship.style.backgroundImage = 'url(images/flowers/ship.png)';
        ship.style.right = '0px';
        ship.style.bottom = '-30px';
        ship.style.width = '380px';
        ship.style.height = '300px';
        gameArea.appendChild(ship);
    }

    function addIceMountain() {
        const mountain = document.createElement('div');

        mountain.className = 'mountain';
        mountain.style.backgroundImage = 'url(images/flowers/mountain.png)';
        mountain.style.left = '-18px';
        mountain.style.bottom = '-85px';
        mountain.style.width = '640px';
        mountain.style.height = '560px';

        gameArea.appendChild(mountain);
    }

    function startTentacleCycle() {
        if (currentBg !== 1) {
            return;
        }

        let attempts = 0;

        function maybeSpawnTentacle(forceSpawn = false) {
            if (currentBg !== 1 || gameArea.querySelector('.tentacle')) {
                return;
            }

            attempts += 1;
            const shouldSpawn = forceSpawn || Math.random() < 0.35;

            if (!shouldSpawn && attempts < 5) {
                return;
            }

            stopTentacleCycle();

            const tentacle = document.createElement('div');
            const left = 560 + Math.random() * 170;

            tentacle.className = 'tentacle';
            tentacle.style.left = `${left}px`;
            tentacle.style.bottom = '-10px';
            tentacle.style.backgroundImage = 'url(images/flowers/tentacle.png)';
            tentacle.addEventListener('click', () => {
                showInkSplotch(left - 10, 12);
            });

            tentacle.addEventListener('animationend', () => {
                tentacle.remove();
                if (currentBg === 1) {
                    tentacleRetryTimeoutId = setTimeout(() => {
                        startTentacleCycle();
                    }, 1200);
                }
            });

            gameArea.appendChild(tentacle);
        }

        tentacleCheckIntervalId = setInterval(() => {
            maybeSpawnTentacle(false);
        }, 1000);
    }

    function startRainEggCycle() {
        if (rainEggActive || currentBg !== 0 || !cloudEggFound || rainEggFound) {
            return;
        }

        rainEggActive = true;

        const rainEgg = document.createElement('div');
        const minX = 95;
        const maxX = 315;
        const startY = 145;
        let x = minX + Math.random() * (maxX - minX);
        let y = startY;

        rainEgg.className = 'rain-egg';
        rainEgg.style.backgroundImage = 'url(images/rainegg.png)';
        rainEgg.style.left = `${x}px`;
        rainEgg.style.top = `${startY}px`;
        rainEgg.addEventListener('click', () => {
            rainEggFound = true;
            stopRainEggCycle();
            emitScreenParticlesAtElement(rainEgg, 'rain');
            rainEgg.remove();
            addEggToCollection('rain', 'images/rainegg.png', 'Rain Egg');
            const cloud = gameArea.querySelector('.cloud');
            if (cloud) {
                cloud.classList.remove('cloud-dark');
                cloud.classList.add('cloud-bright');
                cloud.removeEventListener('click', startRainEggCycle);
                cloud.addEventListener('click', startSnowEggCycle);
            }
            startSnowEggCycle();
        });
        gameArea.appendChild(rainEgg);

        function animateRainEgg() {
            if (!rainEggActive || !rainEgg.isConnected) {
                return;
            }

            y += 4.5;

            if (y >= 600) {
                x = minX + Math.random() * (maxX - minX);
                y = startY;
                rainEgg.style.left = `${x}px`;
            }

            rainEgg.style.top = `${y}px`;
            rainEggFrameId = requestAnimationFrame(animateRainEgg);
        }

        rainEggFrameId = requestAnimationFrame(animateRainEgg);
    }

    function startSnowEggCycle() {
        if (snowEggActive || currentBg !== 0 || !rainEggFound || snowEggFound) {
            return;
        }

        snowEggActive = true;

        const snowEgg = document.createElement('div');
        const minX = 95;
        const maxX = 315;
        const startY = 145;
        let x = minX + Math.random() * (maxX - minX);
        let y = startY;

        snowEgg.className = 'snow-egg';
        snowEgg.style.backgroundImage = 'url(images/snowegg.png)';
        snowEgg.style.left = `${x}px`;
        snowEgg.style.top = `${startY}px`;
        snowEgg.addEventListener('click', () => {
            snowEggFound = true;
            stopSnowEggCycle();
            emitScreenParticlesAtElement(snowEgg, 'snow');
            snowEgg.remove();
            addEggToCollection('snow', 'images/snowegg.png', 'Snow Egg');
        });
        gameArea.appendChild(snowEgg);

        function animateSnowEgg() {
            if (!snowEggActive || !snowEgg.isConnected) {
                return;
            }

            y += 3;

            if (y >= 600) {
                x = minX + Math.random() * (maxX - minX);
                y = startY;
                snowEgg.style.left = `${x}px`;
            }

            snowEgg.style.top = `${y}px`;
            snowEggFrameId = requestAnimationFrame(animateSnowEgg);
        }

        snowEggFrameId = requestAnimationFrame(animateSnowEgg);
    }

    function addCanadaTree() {
        const tree = document.createElement('div');
        tree.className = 'tree';
        tree.style.backgroundImage = 'url(images/flowers/canadatree.png)';
        tree.style.right = '0';
        tree.style.bottom = '-10px';
        tree.style.width = '560px';
        tree.style.height = '823px';
        gameArea.appendChild(tree);
    }

    function addCloud() {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        if (rainEggFound) {
            cloud.classList.add('cloud-bright');
            cloud.classList.add('cloud-interactive');
            if (!snowEggFound) {
                cloud.addEventListener('click', startSnowEggCycle);
            }
        } else if (cloudEggFound) {
            cloud.classList.add('cloud-dark');
            cloud.classList.add('cloud-interactive');
            if (!rainEggFound) {
                cloud.addEventListener('click', startRainEggCycle);
            }
        }
        cloud.style.backgroundImage = 'url(images/flowers/cluod.png)';
        cloud.style.left = '20px';
        cloud.style.top = '20px';
        cloud.style.width = '350px';
        cloud.style.height = '200px';
        gameArea.appendChild(cloud);
    }

    function addFlowers() {
        let currentLeft = 0;
        while (currentLeft < 800) {
            const flower = document.createElement('div');
            flower.className = 'flower';
            flower.style.position = 'absolute';
            const size = 40 + Math.random() * 20; // 40-60px bigger flowers
            flower.style.width = size + 'px';
            flower.style.height = size + 'px';
            flower.style.left = currentLeft + 'px';
            flower.style.top = (600 - size) + 'px';
            const flowerNum = Math.floor(Math.random() * 6) + 1;
            flower.style.backgroundImage = `url(images/flowers/flower${flowerNum}.png)`;
            flower.style.backgroundSize = '200%';
            flower.style.backgroundPosition = '0 100%';
            flower.style.backgroundRepeat = 'no-repeat';
            flower.style.pointerEvents = 'none';
            gameArea.appendChild(flower);
            currentLeft += size * 0.7; // more overlap for denser coverage
        }
    }

    function addCoralDecorations() {
        let currentLeft = 0;
        const maxWidth = 600;

        while (currentLeft < maxWidth) {
            const coral = document.createElement('div');
            const width = 36 + Math.random() * 24;
            const height = width * 1.35;
            const coralNum = Math.floor(Math.random() * 4) + 1;

            coral.className = 'flower coral';
            coral.style.position = 'absolute';
            coral.style.width = `${width}px`;
            coral.style.height = `${height}px`;
            coral.style.left = `${currentLeft}px`;
            coral.style.top = `${605 - height}px`;
            coral.style.backgroundImage = `url(images/flowers/coral${coralNum}.png)`;
            coral.style.backgroundSize = 'contain';
            coral.style.backgroundPosition = 'center bottom';
            coral.style.backgroundRepeat = 'no-repeat';
            coral.style.pointerEvents = 'none';

            gameArea.appendChild(coral);
            currentLeft += width * 0.78;
        }
    }

    function addStars() {
        for (let i = 0; i < 90; i += 1) {
            const star = document.createElement('div');
            const size = 1 + Math.random() * 3;

            star.className = 'star';
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${Math.random() * 800}px`;
            star.style.top = `${Math.random() * 600}px`;
            star.style.opacity = (0.45 + Math.random() * 0.55).toFixed(2);
            star.style.animationDuration = `${1.2 + Math.random() * 2.4}s`;
            star.style.animationDelay = `${Math.random() * 2.5}s`;
            star.addEventListener('click', () => {
                const starLeft = parseFloat(star.style.left) || 0;
                const starTop = parseFloat(star.style.top) || 0;
                spawnGalaxyEggAt(starLeft, starTop);
            });

            gameArea.appendChild(star);
        }
    }

    function addIceRidges() {
        const ridgeConfigs = [
            { left: -30, width: 300, height: 140, opacity: 0.7 },
            { left: 170, width: 260, height: 120, opacity: 0.62 },
            { left: 410, width: 330, height: 150, opacity: 0.76 },
            { left: 610, width: 240, height: 110, opacity: 0.58 }
        ];

        ridgeConfigs.forEach(config => {
            const ridge = document.createElement('div');

            ridge.className = 'ice-ridge';
            ridge.style.left = `${config.left}px`;
            ridge.style.width = `${config.width}px`;
            ridge.style.height = `${config.height}px`;
            ridge.style.opacity = `${config.opacity}`;

            gameArea.appendChild(ridge);
        });
    }

    function addFrostFlurries() {
        for (let i = 0; i < 28; i += 1) {
            const flake = document.createElement('div');
            const size = 5 + Math.random() * 9;

            flake.className = 'frost-flake';
            flake.style.width = `${size}px`;
            flake.style.height = `${size}px`;
            flake.style.left = `${Math.random() * (800 - size)}px`;
            flake.style.top = `${-40 - Math.random() * 520}px`;
            flake.style.animationDuration = `${5.2 + Math.random() * 4.2}s`;
            flake.style.animationDelay = `${Math.random() * 2.5}s`;
            flake.style.setProperty('--flake-drift', `${-26 + Math.random() * 52}px`);
            flake.style.setProperty('--flake-spin', `${-120 + Math.random() * 240}deg`);

            gameArea.appendChild(flake);
        }
    }

    function addPlanet() {
        const planet = document.createElement('div');
        const size = 120 + Math.random() * 120;
        const left = Math.random() * (800 - size);
        const top = Math.random() * (600 - size);

        planet.className = 'planet';
        planet.style.width = `${size}px`;
        planet.style.height = `${size}px`;
        planet.style.left = `${left}px`;
        planet.style.top = `${top}px`;
        planet.style.backgroundImage = planetDestroyed ? 'url(images/flowers/planet2.png)' : 'url(images/flowers/planet.png)';

        gameArea.appendChild(planet);

        if (planetDestroyed && !pixelEggFound) {
            addPixelEggAtPlanet(planet);
        }
    }

    function addEggSwing() {
        if (eggSwingFound) {
            return;
        }

        function spawnEggSwing() {
            if (currentBg !== 2 || eggSwingFound || gameArea.querySelector('.egg-swing')) {
                return;
            }

            const eggSwing = document.createElement('div');
            const size = 70 + Math.random() * 40;
            const paths = [
                { startX: -140, startY: 40 + Math.random() * 180, endX: 920, endY: 220 + Math.random() * 220 },
                { startX: 920, startY: 40 + Math.random() * 180, endX: -140, endY: 220 + Math.random() * 220 },
                { startX: 80 + Math.random() * 220, startY: -120, endX: 520 + Math.random() * 220, endY: 720 },
                { startX: 520 + Math.random() * 220, startY: -120, endX: 80 + Math.random() * 220, endY: 720 }
            ];
            const path = paths[Math.floor(Math.random() * paths.length)];
            const dx = path.endX - path.startX;
            const dy = path.endY - path.startY;
            const rotation = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

            eggSwing.className = 'egg-swing';
            eggSwing.style.left = `${path.startX}px`;
            eggSwing.style.top = `${path.startY}px`;
            eggSwing.style.width = `${size}px`;
            eggSwing.style.height = `${size}px`;
            eggSwing.style.backgroundImage = 'url(images/eggswing.png)';
            eggSwing.style.animationDuration = `${1.4 + Math.random() * 0.8}s`;
            eggSwing.style.setProperty('--egg-swing-dx', `${dx}px`);
            eggSwing.style.setProperty('--egg-swing-dy', `${dy}px`);
            eggSwing.style.setProperty('--egg-swing-rotation', `${rotation}deg`);
            eggSwing.addEventListener('click', () => {
                eggSwingFound = true;
                stopEggSwingCycle();
                emitScreenParticlesAtElement(eggSwing, 'eggswing');
                eggSwing.remove();
                addEggToCollection('eggswing', 'images/eggswing.png', 'Eggswing');
            });

            eggSwing.addEventListener('animationend', () => {
                eggSwing.remove();
            });

            gameArea.appendChild(eggSwing);
        }

        spawnEggSwing();
        eggSwingIntervalId = setInterval(() => {
            spawnEggSwing();
        }, 3200);
    }

    function addAsteroidEgg() {
        if (asteroidEggFound) {
            return;
        }

        function spawnAsteroidEgg() {
            if (currentBg !== 2 || asteroidEggFound || gameArea.querySelector('.asteroid-egg')) {
                return;
            }

            const asteroidEgg = document.createElement('div');
            const asteroidCore = document.createElement('div');
            const size = 76 + Math.random() * 28;
            const paths = [
                { startX: -180, startY: 20 + Math.random() * 140, endX: 920, endY: 220 + Math.random() * 220 },
                { startX: 920, startY: 30 + Math.random() * 160, endX: -180, endY: 220 + Math.random() * 220 },
                { startX: 40 + Math.random() * 160, startY: -180, endX: 640 + Math.random() * 160, endY: 720 }
            ];
            const path = paths[Math.floor(Math.random() * paths.length)];
            const dx = path.endX - path.startX;
            const dy = path.endY - path.startY;
            const rotation = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

            asteroidEgg.className = 'asteroid-egg';
            asteroidEgg.style.left = `${path.startX}px`;
            asteroidEgg.style.top = `${path.startY}px`;
            asteroidEgg.style.width = `${size}px`;
            asteroidEgg.style.height = `${size}px`;
            asteroidEgg.style.animationDuration = `${3.8 + Math.random() * 1.6}s`;
            asteroidEgg.style.setProperty('--asteroid-dx', `${dx}px`);
            asteroidEgg.style.setProperty('--asteroid-dy', `${dy}px`);
            asteroidEgg.style.setProperty('--asteroid-rotation', `${rotation}deg`);

            asteroidCore.className = 'asteroid-egg-core';
            asteroidCore.style.backgroundImage = 'url(images/asteroidegg.png)';
            asteroidEgg.appendChild(asteroidCore);

            asteroidEgg.addEventListener('click', () => {
                stopAsteroidEggCycle();
                launchAsteroidIntoPlanet(asteroidEgg);
            });
            asteroidEgg.addEventListener('animationend', () => {
                asteroidEgg.remove();
            });

            gameArea.appendChild(asteroidEgg);
        }

        spawnAsteroidEgg();
        asteroidEggIntervalId = setInterval(() => {
            spawnAsteroidEgg();
        }, 5200);
    }

    function addBubbles() {
        function spawnBubble() {
            if (document.hidden || currentBg !== 1) {
                return;
            }

            const bubble = document.createElement('div');
            const size = 10 + Math.random() * 22;

            bubble.className = 'bubble';
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${Math.random() * (800 - size)}px`;
            bubble.style.bottom = `${-size}px`;
            bubble.style.animationDuration = `${3.5 + Math.random() * 2.5}s`;
            bubble.style.animationDelay = `${Math.random() * 0.6}s`;

            gameArea.appendChild(bubble);
            bubble.addEventListener('animationend', () => {
                bubble.remove();
            });
        }

        for (let i = 0; i < 6; i += 1) {
            const timeoutId = setTimeout(spawnBubble, i * 220);
            bubbleSpawnTimeoutIds.push(timeoutId);
        }

        bubbleIntervalId = setInterval(() => {
            spawnBubble();
        }, 900);
    }

    function addBubbleEggs() {
        if (bubbleEggFound) {
            return;
        }

        function spawnBubbleEgg() {
            if (document.hidden || currentBg !== 1 || bubbleEggFound || gameArea.querySelector('.bubble-egg')) {
                return;
            }

            const bubbleEgg = document.createElement('div');
            const size = 40;
            const x = 40 + Math.random() * (800 - 120);

            bubbleEgg.className = 'bubble-egg';
            bubbleEgg.style.width = `${size}px`;
            bubbleEgg.style.height = '52px';
            bubbleEgg.style.left = `${x}px`;
            bubbleEgg.style.bottom = '-60px';
            bubbleEgg.style.backgroundImage = 'url(images/bubbleegg.png)';
            bubbleEgg.style.animationDuration = `${4.8 + Math.random() * 1.6}s`;

            bubbleEgg.addEventListener('click', () => {
                bubbleEggFound = true;
                stopBubbleEggCycle();
                emitScreenParticlesAtElement(bubbleEgg, 'bubble');
                bubbleEgg.remove();
                addEggToCollection('bubble', 'images/bubbleegg.png', 'Bubble Egg');
            });

            bubbleEgg.addEventListener('animationend', () => {
                bubbleEgg.remove();
            });

            gameArea.appendChild(bubbleEgg);
        }

        bubbleEggSpawnTimeoutId = setTimeout(() => {
            bubbleEggSpawnTimeoutId = null;
            spawnBubbleEgg();
        }, 1200);
        bubbleEggIntervalId = setInterval(() => {
            spawnBubbleEgg();
        }, 5200);
    }

    function addFishEggs() {
        if (fishEggFound) {
            return;
        }

        function spawnFishEgg() {
            if (currentBg !== 1 || fishEggFound) {
                return;
            }

            if (gameArea.querySelector('.fish-egg')) {
                return;
            }

            const fishEgg = document.createElement('div');
            const y = 120 + Math.random() * 320;

            fishEgg.className = 'fish-egg';
            fishEgg.style.left = '-90px';
            fishEgg.style.top = `${y}px`;
            fishEgg.style.backgroundImage = 'url(images/flowers/fishegg.png)';
            fishEgg.style.animationDuration = `${6 + Math.random() * 2.5}s`;

            fishEgg.addEventListener('click', () => {
                fishEggFound = true;
                stopFishEggCycle();
                emitScreenParticlesAtElement(fishEgg, 'fish');
                fishEgg.remove();
                addEggToCollection('fish', 'images/flowers/fishegg.png', 'Fish Egg');
            });

            fishEgg.addEventListener('animationend', () => {
                fishEgg.remove();
            });

            gameArea.appendChild(fishEgg);
        }

        setTimeout(spawnFishEgg, 1800);
        fishEggIntervalId = setInterval(() => {
            spawnFishEgg();
        }, 6200);
    }

    function renderCurrentScene() {
        const availableScenes = getAvailableSceneIndexes();

        if (!availableScenes.includes(currentBg)) {
            currentBg = availableScenes[0];
        }

        gameArea.style.background = backgrounds[currentBg];
        clearDecorations();

        if (currentBg === 0) {
            addCloud();
            addCloudEgg();
            addCanadaTree();
            addMapleEgg();
            addWoodEgg();
            addGreenEgg();
            addSmallEgg();
            addFlowers();
        } else if (currentBg === 1) {
            addCoralDecorations();
            addShipwreck();
            addCoralEgg();
            addSunkenEgg();
            addTrashEgg();
            addIceEgg();
            addBubbles();
            addBubbleEggs();
            addFishEggs();
            startTentacleCycle();
        } else if (currentBg === 2) {
            addStars();
            addPlanet();
            addEggSwing();
            addAsteroidEgg();
            addDeathEgg();
            addSunEgg();
            addBlackHoleEgg();
        } else if (currentBg === 3) {
            addIceMountain();
            addIceRidges();
            addFrostFlurries();
            addIcePresents();
            addPresentEgg();
            addChocolateEgg();
            startPenguinEggCycle();
            startElfEggCycle();
            startIcicleEggCycle();
            startPolarEggCycle();
        }

        addDirectionEgg();
    }

    function changeScene(direction) {
        const availableScenes = getAvailableSceneIndexes();
        const currentSceneIndex = availableScenes.indexOf(currentBg);

        moveDirectionEggTowardCenter();
        currentBg = availableScenes[(currentSceneIndex + direction + availableScenes.length) % availableScenes.length];
        renderCurrentScene();
    }

    // Initial decorations for field
    renderCurrentScene();

    collectionSlots.forEach(slot => {
        if (!slot.dataset.egg) {
            slot.setAttribute('aria-hidden', 'true');
        }
    });

    const comingSoonSlot = document.querySelector('.collection-slot[data-egg="coming-soon"]');
    if (comingSoonSlot) {
        comingSoonSlot.classList.add('collection-preview');
        comingSoonSlot.addEventListener('click', revealComingSoonEgg);
    }

    if (introEggElement) {
        introEggElement.addEventListener('click', collectIntroEgg);
        introEggElement.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                collectIntroEgg();
            }
        });
    }

    updateScore();

    // Background change buttons
    document.getElementById('left-arrow').addEventListener('click', () => {
        changeScene(-1);
    });

    document.getElementById('right-arrow').addEventListener('click', () => {
        changeScene(1);
    });

    document.addEventListener('keydown', event => {
        if (event.repeat) {
            return;
        }

        if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
            changeScene(-1);
        } else if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
            changeScene(1);
        }
    });
});
