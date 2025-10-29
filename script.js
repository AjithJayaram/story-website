// === Premium Storytelling Website - Complete JavaScript ===

// Enhanced stories data structure
let stories = [
    {
        id: 1,
        title: "The Lost Temple of Zorath",
        description: "Explore ancient ruins and uncover hidden treasures in this jungle adventure. Your choices determine the fate of forgotten civilizations.",
        genre: "fantasy",
        author: "Your Name",
        created: "2024-01-15",
        coverColor: "#e6b325",
        chapters: [
            {
                id: 1,
                text: "You stand at the edge of a dense, emerald jungle, the ancient temple of Zorath hidden somewhere within. The humid air carries the scent of exotic flowers and ancient decay. Before you, two paths diverge into the unknown wilderness.",
                choices: [
                    { text: "Follow the overgrown stone path, worn smooth by centuries of rainfall", nextChapter: 2 },
                    { text: "Enter the dark cave mouth, from which a cool, mysterious breeze emanates", nextChapter: 3 }
                ]
            },
            {
                id: 2,
                text: "The stone path winds through vibrant jungle foliage, sunlight filtering through the canopy in golden shafts. Suddenly, you encounter a massive stone door covered in intricate carvings depicting ancient gods and forgotten rituals.",
                choices: [
                    { text: "Try to solve the mysterious rotating disk puzzle embedded in the door", nextChapter: 4 },
                    { text: "Search for a hidden mechanism or alternative entrance around the door", nextChapter: 5 }
                ]
            },
            {
                id: 3,
                text: "The cave is damp and dark, your torch casting dancing shadows on glistening walls. You discover an underground river with a small, ancient boat tied to a stalagmite. Further in, faint glowing symbols pulse with soft blue light.",
                choices: [
                    { text: "Untie the boat and venture down the mysterious underground river", nextChapter: 6 },
                    { text: "Investigate the glowing symbols - they might hold ancient knowledge", nextChapter: 7 }
                ]
            }
        ]
    },
    {
        id: 2,
        title: "Dragon's Peak Expedition",
        description: "Scale treacherous mountains to confront the legendary ice dragon in this epic high-fantasy quest.",
        genre: "fantasy",
        author: "Your Name",
        created: "2024-01-20",
        coverColor: "#4a90e2",
        chapters: [
            {
                id: 1,
                text: "The village elder has entrusted you with scaling Dragon's Peak to retrieve the legendary Ice Crystal. The mountain looms above you, its peak hidden in swirling clouds. Ice and rock challenge your every step.",
                choices: [
                    { text: "Take the steep but direct cliff path - dangerous but fast", nextChapter: 2 },
                    { text: "Follow the longer but safer forest route around the mountain", nextChapter: 3 }
                ]
            }
        ]
    },
    {
        id: 3,
        title: "Cyberpunk Neon Dreams",
        description: "Navigate the dystopian megacity of Neo-Tokyo in this sci-fi thriller filled with AI and intrigue.",
        genre: "scifi",
        author: "Your Name",
        created: "2024-01-25",
        coverColor: "#9b59b6",
        chapters: [
            {
                id: 1,
                text: "Rain slicks the neon-drenched streets of Neo-Tokyo. A mysterious data chip burns in your pocket. Corporate drones patrol the skies while street vendors sell illegal cyberware in shadowy alleys.",
                choices: [
                    { text: "Head to the hacker district to decrypt the data chip", nextChapter: 2 },
                    { text: "Lose yourself in the underground clubs to gather information", nextChapter: 3 }
                ]
            }
        ]
    }
];

// Custom sharing platforms
let customPlatforms = [
    { name: "Discord", template: "https://discord.com/channels/@me?text=Check out this story: {TEXT} - {URL}", icon: "fab fa-discord" },
    { name: "Slack", template: "https://slack.com/share?url={URL}&text={TEXT}", icon: "fab fa-slack" },
    { name: "Pinterest", template: "https://pinterest.com/pin/create/button/?url={URL}&description={TEXT}", icon: "fab fa-pinterest" }
];

// DOM Elements
const storySelection = document.getElementById('storySelection');
const addStoryScreen = document.getElementById('addStoryScreen');
const storyScreen = document.getElementById('storyScreen');
const storyList = document.getElementById('storyList');
const addStoryBtn = document.getElementById('addStoryBtn');
const backToStoriesBtn = document.getElementById('backToStoriesBtn');
const saveStoryBtn = document.getElementById('saveStoryBtn');
const backToSelectionBtn = document.getElementById('backToSelectionBtn');
const storyTitleInput = document.getElementById('storyTitle');
const storyDescriptionInput = document.getElementById('storyDescription');
const storyGenreInput = document.getElementById('storyGenre');
const currentStoryTitle = document.getElementById('currentStoryTitle');
const currentStoryGenre = document.getElementById('currentStoryGenre');
const storyText = document.getElementById('storyText');
const choicesContainer = document.getElementById('choices');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const readingTime = document.getElementById('readingTime');

// Stats elements
const totalStories = document.getElementById('totalStories');
const totalChapters = document.getElementById('totalChapters');
const totalChoices = document.getElementById('totalChoices');

// Share/Import Elements
const shareModal = document.getElementById('shareModal');
const importModal = document.getElementById('importModal');
const customShareModal = document.getElementById('customShareModal');
const shareLink = document.getElementById('shareLink');
const copyLinkBtn = document.getElementById('copyLinkBtn');
const exportJsonBtn = document.getElementById('exportJsonBtn');
const exportTextBtn = document.getElementById('exportTextBtn');
const exportPdfBtn = document.getElementById('exportPdfBtn');
const exportHtmlBtn = document.getElementById('exportHtmlBtn');
const closeShareModal = document.getElementById('closeShareModal');
const closeImportModal = document.getElementById('closeImportModal');
const importStoryBtn = document.getElementById('importStoryBtn');
const jsonFileInput = document.getElementById('jsonFileInput');
const textFileInput = document.getElementById('textFileInput');
const csvFileInput = document.getElementById('csvFileInput');
const importText = document.getElementById('importText');
const importFromTextBtn = document.getElementById('importFromTextBtn');
const importUrl = document.getElementById('importUrl');
const importFromUrlBtn = document.getElementById('importFromUrlBtn');
const qrcodeContainer = document.getElementById('qrcode');
const universalShareBtn = document.getElementById('universalShareBtn');

// Custom Share Elements
const platformName = document.getElementById('platformName');
const shareTemplate = document.getElementById('shareTemplate');
const platformIcon = document.getElementById('platformIcon');
const saveCustomPlatform = document.getElementById('saveCustomPlatform');
const closeCustomShareModal = document.getElementById('closeCustomShareModal');

// Social Media Buttons
const socialButtons = document.querySelectorAll('.social-btn');

// Current story state
let currentStory = null;
let currentChapter = null;
let currentStoryForShare = null;
let qrCodeInstance = null;

// === INITIALIZATION ===
function init() {
    loadStories();
    loadCustomPlatforms();
    setupEventListeners();
    setupShareImportListeners();
    checkUrlForImportedStory();
    updateStats();
    showStorySelection();
    
    // Add subtle background music (optional)
    // initBackgroundMusic();
}

// === DATA MANAGEMENT ===
function loadStories() {
    const savedStories = localStorage.getItem('narrativeNexusStories');
    const savedCustomPlatforms = localStorage.getItem('narrativeNexusCustomPlatforms');
    
    if (savedStories) {
        stories = JSON.parse(savedStories);
    }
    
    if (savedCustomPlatforms) {
        customPlatforms = JSON.parse(savedCustomPlatforms);
    }
    
    renderStoryList();
    updateStats();
}

function saveStories() {
    localStorage.setItem('narrativeNexusStories', JSON.stringify(stories));
    localStorage.setItem('narrativeNexusCustomPlatforms', JSON.stringify(customPlatforms));
    updateStats();
}

function loadCustomPlatforms() {
    const saved = localStorage.getItem('narrativeNexusCustomPlatforms');
    if (saved) {
        customPlatforms = JSON.parse(saved);
    }
}

// === EVENT LISTENERS ===
function setupEventListeners() {
    addStoryBtn.addEventListener('click', showAddStoryScreen);
    backToStoriesBtn.addEventListener('click', showStorySelection);
    backToSelectionBtn.addEventListener('click', showStorySelection);
    saveStoryBtn.addEventListener('click', saveNewStory);
}

function setupShareImportListeners() {
    // Modal controls
    importStoryBtn.addEventListener('click', openImportModal);
    closeShareModal.addEventListener('click', closeModals);
    closeImportModal.addEventListener('click', closeModals);
    closeCustomShareModal.addEventListener('click', closeModals);
    
    // Share functionality
    copyLinkBtn.addEventListener('click', copyShareLink);
    exportJsonBtn.addEventListener('click', exportAsJson);
    exportTextBtn.addEventListener('click', exportAsText);
    exportPdfBtn.addEventListener('click', () => showToast('PDF export coming soon!', 'warning'));
    exportHtmlBtn.addEventListener('click', () => showToast('HTML export coming soon!', 'warning'));
    universalShareBtn.addEventListener('click', universalShare);
    
    // Import functionality
    jsonFileInput.addEventListener('change', handleJsonImport);
    textFileInput.addEventListener('change', handleTextImport);
    csvFileInput.addEventListener('change', handleCsvImport);
    importFromTextBtn.addEventListener('click', importFromText);
    importFromUrlBtn.addEventListener('click', importFromUrl);
    
    // Custom share platform
    saveCustomPlatform.addEventListener('click', saveCustomSharePlatform);
    
    // Social media sharing
    socialButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const platform = e.currentTarget.dataset.platform;
            shareToSocialMedia(platform);
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === shareModal) closeModals();
        if (e.target === importModal) closeModals();
        if (e.target === customShareModal) closeModals();
    });
    
    // Add custom share button to social grid
    addCustomShareButton();
}

// === SCREEN MANAGEMENT ===
function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
}

function showStorySelection() {
    showScreen(storySelection);
    renderStoryList();
    updateStats();
}

function showAddStoryScreen() {
    showScreen(addStoryScreen);
    storyTitleInput.value = '';
    storyDescriptionInput.value = '';
    storyGenreInput.value = 'fantasy';
}

function showStoryScreen(story) {
    currentStory = story;
    currentChapter = story.chapters[0];
    currentStoryTitle.textContent = story.title;
    currentStoryGenre.textContent = formatGenre(story.genre);
    showScreen(storyScreen);
    displayChapter(currentChapter);
    updateProgress();
    updateReadingTime();
}

// === STORY RENDERING ===
function renderStoryList() {
    storyList.innerHTML = '';
    
    if (stories.length === 0) {
        storyList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-book-open fa-3x"></i>
                <h3>No Stories Yet</h3>
                <p>Create your first interactive story to begin the adventure!</p>
                <button class="btn-premium" onclick="showAddStoryScreen()">
                    <i class="fas fa-plus"></i>
                    Create First Story
                </button>
            </div>
        `;
        return;
    }
    
    stories.forEach(story => {
        const storyCard = document.createElement('div');
        storyCard.className = 'story-card-premium';
        storyCard.style.borderLeft = `4px solid ${story.coverColor || '#e6b325'}`;
        
        const totalChoices = story.chapters.reduce((acc, chapter) => acc + chapter.choices.length, 0);
        
        storyCard.innerHTML = `
            <div class="story-meta-premium">
                <span class="story-genre-tag">${formatGenre(story.genre)}</span>
                <span class="story-stats">${story.chapters.length} chapters</span>
            </div>
            <h3>${story.title}</h3>
            <p>${story.description}</p>
            <div class="story-actions-premium">
                <button class="btn-small-premium play-btn" data-id="${story.id}">
                    <i class="fas fa-play"></i>
                    Play
                </button>
                <button class="btn-small-premium share-btn" data-id="${story.id}">
                    <i class="fas fa-share-alt"></i>
                    Share
                </button>
                <button class="btn-small-premium edit-btn" data-id="${story.id}">
                    <i class="fas fa-edit"></i>
                    Edit
                </button>
            </div>
        `;
        
        // Add event listeners
        const playBtn = storyCard.querySelector('.play-btn');
        const shareBtn = storyCard.querySelector('.share-btn');
        const editBtn = storyCard.querySelector('.edit-btn');
        
        playBtn.addEventListener('click', () => showStoryScreen(story));
        shareBtn.addEventListener('click', () => {
            currentStoryForShare = story;
            openShareModal();
        });
        editBtn.addEventListener('click', () => {
            showToast('Story editor coming soon!', 'info');
        });
        
        storyList.appendChild(storyCard);
    });
}

function displayChapter(chapter) {
    storyText.textContent = chapter.text;
    choicesContainer.innerHTML = '';

    chapter.choices.forEach((choice, index) => {
        const choiceBtn = document.createElement('button');
        choiceBtn.className = 'choice-btn-premium';
        choiceBtn.innerHTML = `
            <span class="choice-number">${index + 1}</span>
            <span class="choice-text">${choice.text}</span>
        `;
        
        choiceBtn.addEventListener('click', () => {
            const nextChapter = currentStory.chapters.find(ch => ch.id === choice.nextChapter);
            if (nextChapter) {
                currentChapter = nextChapter;
                displayChapter(nextChapter);
                updateProgress();
                updateReadingTime();
                
                // Add subtle animation
                choiceBtn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    choiceBtn.style.transform = '';
                }, 150);
            } else {
                showToast('This story path is still being written!', 'info');
            }
        });
        
        choicesContainer.appendChild(choiceBtn);
    });

    // Add fade-in animation
    storyText.style.animation = 'none';
    setTimeout(() => {
        storyText.style.animation = 'typewriter 1s ease';
    }, 10);
}

// === PROGRESS & STATS ===
function updateProgress() {
    if (!currentStory || !currentChapter) return;

    const currentIndex = currentStory.chapters.findIndex(ch => ch.id === currentChapter.id);
    const totalChapters = currentStory.chapters.length;
    const progress = ((currentIndex + 1) / totalChapters) * 100;

    progressFill.style.width = `${progress}%`;
    progressText.textContent = `Chapter ${currentIndex + 1} of ${totalChapters}`;
}

function updateReadingTime() {
    if (!currentStory || !currentChapter) return;
    
    const words = currentChapter.text.split(' ').length;
    const readingTimeMinutes = Math.ceil(words / 200); // Average reading speed
    readingTime.textContent = `${readingTimeMinutes} min read`;
}

function updateStats() {
    const totalChaptersCount = stories.reduce((acc, story) => acc + story.chapters.length, 0);
    const totalChoicesCount = stories.reduce((acc, story) => 
        acc + story.chapters.reduce((chapAcc, chapter) => chapAcc + chapter.choices.length, 0), 0);
    
    totalStories.textContent = stories.length;
    totalChapters.textContent = totalChaptersCount;
    totalChoices.textContent = totalChoicesCount;
}

// === STORY CREATION ===
function saveNewStory() {
    const title = storyTitleInput.value.trim();
    const description = storyDescriptionInput.value.trim();
    const genre = storyGenreInput.value;

    if (!title || !description) {
        showToast('Please fill in both title and description', 'error');
        return;
    }

    const newStory = {
        id: Date.now(),
        title,
        description,
        genre,
        author: "Your Name",
        created: new Date().toISOString().split('T')[0],
        coverColor: getRandomColor(),
        chapters: [
            {
                id: 1,
                text: "This is the beginning of your epic story. You stand at a crossroads, with destiny waiting to be written...",
                choices: [
                    { text: "Take the first step into the unknown", nextChapter: 2 },
                    { text: "Wait and observe your surroundings carefully", nextChapter: 3 }
                ]
            },
            {
                id: 2,
                text: "Your journey begins! The path ahead is filled with mystery and adventure. What will you discover?",
                choices: [
                    { text: "Continue forward with courage", nextChapter: 4 },
                    { text: "Look back one last time", nextChapter: 5 }
                ]
            }
        ]
    };

    stories.push(newStory);
    saveStories();
    showStorySelection();
    showToast('✨ Your story has been created!', 'success');
}

// === SHARE FUNCTIONALITY ===
function openShareModal() {
    if (!currentStoryForShare) return;
    
    const storyData = encodeURIComponent(JSON.stringify(currentStoryForShare));
    const shareUrl = `${window.location.origin}${window.location.pathname}?import=${storyData}`;
    shareLink.value = shareUrl;
    
    // Generate QR Code
    generateQRCode(shareUrl);
    
    // Update social grid with custom platforms
    updateSocialGrid();
    
    shareModal.classList.add('active');
    showToast('Share options ready!', 'success');
}

function generateQRCode(url) {
    qrcodeContainer.innerHTML = '';
    
    QRCode.toCanvas(qrcodeContainer, url, {
        width: 180,
        height: 180,
        margin: 1,
        color: {
            dark: '#1a1a2e',
            light: '#ffffff'
        }
    }, function(error) {
        if (error) {
            console.error('QR Code generation failed:', error);
            qrcodeContainer.innerHTML = `
                <div class="qr-error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>QR Code failed to generate</p>
                </div>
            `;
        }
    });
}

function copyShareLink() {
    shareLink.select();
    shareLink.setSelectionRange(0, 99999);
    
    navigator.clipboard.writeText(shareLink.value).then(() => {
        showToast('📋 Link copied to clipboard!', 'success');
    }).catch(() => {
        // Fallback for older browsers
        document.execCommand('copy');
        showToast('📋 Link copied to clipboard!', 'success');
    });
}

function shareToSocialMedia(platform) {
    if (!currentStoryForShare) return;
    
    const shareUrl = shareLink.value;
    const shareText = `Check out "${currentStoryForShare.title}" on Narrative Nexus`;
    
    const shareUrls = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
        reddit: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`,
        telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
    };
    
    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    } else {
        // Check if it's a custom platform
        const customPlatform = customPlatforms.find(p => p.name.toLowerCase() === platform);
        if (customPlatform) {
            const customUrl = customPlatform.template
                .replace('{URL}', encodeURIComponent(shareUrl))
                .replace('{TEXT}', encodeURIComponent(shareText));
            window.open(customUrl, '_blank', 'width=600,height=400');
        }
    }
}

function universalShare() {
    if (!currentStoryForShare) return;
    
    const shareUrl = shareLink.value;
    const shareData = {
        title: currentStoryForShare.title,
        text: `Check out "${currentStoryForShare.title}" on Narrative Nexus`,
        url: shareUrl
    };
    
    if (navigator.share) {
        navigator.share(shareData)
            .then(() => showToast('Story shared successfully!', 'success'))
            .catch(() => showToast('Share cancelled', 'info'));
    } else {
        showToast('Web Share API not supported on this device', 'warning');
    }
}

function addCustomShareButton() {
    const socialGrid = document.querySelector('.social-grid');
    const customButton = document.createElement('button');
    customButton.className = 'social-btn custom-platform';
    customButton.innerHTML = `
        <i class="fas fa-plus-circle"></i>
        Add Platform
    `;
    customButton.addEventListener('click', openCustomShareModal);
    socialGrid.appendChild(customButton);
}

function updateSocialGrid() {
    const socialGrid = document.querySelector('.social-grid');
    
    // Remove existing custom platform buttons (except the "Add Platform" button)
    const existingCustomButtons = socialGrid.querySelectorAll('.custom-platform:not(.social-btn)');
    existingCustomButtons.forEach(btn => btn.remove());
    
    // Add custom platform buttons
    customPlatforms.forEach(platform => {
        const platformButton = document.createElement('button');
        platformButton.className = `social-btn custom-platform ${platform.name.toLowerCase()}`;
        platformButton.innerHTML = `
            <i class="${platform.icon}"></i>
            ${platform.name}
        `;
        platformButton.addEventListener('click', () => shareToSocialMedia(platform.name.toLowerCase()));
        socialGrid.insertBefore(platformButton, socialGrid.lastElementChild);
    });
}

// === CUSTOM SHARE PLATFORMS ===
function openCustomShareModal() {
    platformName.value = '';
    shareTemplate.value = '';
    platformIcon.value = '';
    customShareModal.classList.add('active');
}

function saveCustomSharePlatform() {
    const name = platformName.value.trim();
    const template = shareTemplate.value.trim();
    const icon = platformIcon.value.trim();
    
    if (!name || !template) {
        showToast('Please fill in platform name and URL template', 'error');
        return;
    }
    
    // Validate template contains required placeholders
    if (!template.includes('{URL}') || !template.includes('{TEXT}')) {
        showToast('URL template must include {URL} and {TEXT} placeholders', 'error');
        return;
    }
    
    const newPlatform = {
        name,
        template,
        icon: icon || 'fas fa-share-alt'
    };
    
    customPlatforms.push(newPlatform);
    saveStories();
    closeModals();
    showToast(`✅ ${name} platform added!`, 'success');
}

// === IMPORT FUNCTIONALITY ===
function openImportModal() {
    importModal.classList.add('active');
}

function handleJsonImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const storyData = JSON.parse(e.target.result);
            importStory(storyData);
        } catch (error) {
            showToast('Invalid JSON file format', 'error');
            console.error('JSON Import Error:', error);
        }
    };
    reader.readAsText(file);
}

function handleTextImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const textContent = e.target.result;
            const storyData = parseTextToStory(textContent, file.name);
            importStory(storyData);
        } catch (error) {
            showToast('Error parsing text file', 'error');
            console.error('Text Import Error:', error);
        }
    };
    reader.readAsText(file);
}

function handleCsvImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const csvContent = e.target.result;
            const storyData = parseCsvToStory(csvContent, file.name);
            importStory(storyData);
        } catch (error) {
            showToast('Error parsing CSV file', 'error');
            console.error('CSV Import Error:', error);
        }
    };
    reader.readAsText(file);
}

function importFromText() {
    const text = importText.value.trim();
    if (!text) {
        showToast('Please paste or type your story content', 'error');
        return;
    }
    
    try {
        let storyData;
        
        // Try to parse as JSON first
        try {
            storyData = JSON.parse(text);
        } catch (e) {
            // If not JSON, try to parse as structured text
            storyData = parseTextToStory(text, 'Imported Story');
        }
        
        importStory(storyData);
    } catch (error) {
        showToast('Error parsing story content', 'error');
        console.error('Text Import Error:', error);
    }
}

function importFromUrl() {
    const url = importUrl.value.trim();
    if (!url) {
        showToast('Please enter a valid URL', 'error');
        return;
    }
    
    showToast('Fetching story from URL...', 'info');
    
    // Note: This would need a backend service for cross-origin requests
    // For now, we'll simulate this functionality
    setTimeout(() => {
        showToast('URL import requires backend setup. Currently supports direct JSON URLs only.', 'warning');
    }, 1500);
}

function importStory(storyData) {
    // Validate story structure
    if (!storyData.title || !storyData.chapters || !Array.isArray(storyData.chapters)) {
        showToast('Invalid story format - missing required fields', 'error');
        return;
    }
    
    // Enhance story data
    storyData.id = Date.now();
    storyData.author = storyData.author || "Your Name";
    storyData.created = storyData.created || new Date().toISOString().split('T')[0];
    storyData.coverColor = storyData.coverColor || getRandomColor();
    storyData.genre = storyData.genre || 'fantasy';
    
    // Add to stories
    stories.push(storyData);
    saveStories();
    renderStoryList();
    closeModals();
    
    showToast(`📖 "${storyData.title}" imported successfully!`, 'success');
    importText.value = '';
    importUrl.value = '';
    
    // Clear file inputs
    [jsonFileInput, textFileInput, csvFileInput].forEach(input => input.value = '');
}

// === FILE PARSING UTILITIES ===
function parseTextToStory(text, filename) {
    const lines = text.split('\n').filter(line => line.trim());
    
    // Simple heuristic parsing
    const title = filename.replace(/\.[^/.]+$/, ""); // Remove extension
    let currentChapter = null;
    const chapters = [];
    let chapterId = 1;
    
    for (const line of lines) {
        const trimmed = line.trim();
        
        if (trimmed.match(/^chapter\s+\d+/i) || trimmed.match(/^#+/)) {
            // New chapter
            if (currentChapter) {
                chapters.push(currentChapter);
            }
            currentChapter = {
                id: chapterId++,
                text: trimmed.replace(/^#+\s*/, '').replace(/^chapter\s+\d+\s*:?\s*/i, ''),
                choices: []
            };
        } else if (trimmed.match(/^[-*]\s*/) && currentChapter) {
            // Choice
            const choiceText = trimmed.replace(/^[-*]\s*/, '');
            currentChapter.choices.push({
                text: choiceText,
                nextChapter: chapterId // Simple sequential linking
            });
        } else if (currentChapter && trimmed) {
            // Chapter text continuation
            currentChapter.text += ' ' + trimmed;
        }
    }
    
    if (currentChapter) {
        chapters.push(currentChapter);
    }
    
    // Fix choice links
    chapters.forEach((chapter, index) => {
        chapter.choices.forEach(choice => {
            choice.nextChapter = index + 2; // Link to next chapter
        });
    });
    
    return {
        title: title || 'Imported Story',
        description: `Imported from text file on ${new Date().toLocaleDateString()}`,
        genre: 'fantasy',
        chapters: chapters.length ? chapters : [{
            id: 1,
            text: text.substring(0, 500) + (text.length > 500 ? '...' : ''),
            choices: [
                { text: "Continue the story", nextChapter: 2 }
            ]
        }]
    };
}

function parseCsvToStory(csv, filename) {
    const lines = csv.split('\n').filter(line => line.trim());
    const title = filename.replace(/\.[^/.]+$/, "");
    
    // Simple CSV parsing - assuming format: Chapter,Text,Choice1,Choice2,...
    const chapters = [];
    
    for (let i = 1; i < lines.length; i++) { // Skip header
        const cells = lines[i].split(',').map(cell => cell.trim().replace(/^"|"$/g, ''));
        if (cells.length >= 2) {
            const chapter = {
                id: i,
                text: cells[1],
                choices: []
            };
            
            // Parse choices (cells 2+)
            for (let j = 2; j < cells.length; j++) {
                if (cells[j]) {
                    chapter.choices.push({
                        text: cells[j],
                        nextChapter: i + 1 // Simple sequential
                    });
                }
            }
            
            chapters.push(chapter);
        }
    }
    
    return {
        title: title || 'Imported CSV Story',
        description: `Imported from CSV file with ${chapters.length} chapters`,
        genre: 'fantasy',
        chapters: chapters.length ? chapters : [{
            id: 1,
            text: "Story imported from CSV file",
            choices: [
                { text: "Begin reading", nextChapter: 2 }
            ]
        }]
    };
}

// === EXPORT FUNCTIONALITY ===
function exportAsJson() {
    if (!currentStoryForShare) return;
    
    const dataStr = JSON.stringify(currentStoryForShare, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `${currentStoryForShare.title.replace(/[^a-z0-9]/gi, '_')}.json`;
    link.click();
    
    showToast('📁 Story exported as JSON!', 'success');
}

function exportAsText() {
    if (!currentStoryForShare) return;
    
    let textContent = `NARRATIVE NEXUS STORY EXPORT\n`;
    textContent += `Title: ${currentStoryForShare.title}\n`;
    textContent += `Author: ${currentStoryForShare.author || 'Your Name'}\n`;
    textContent += `Genre: ${formatGenre(currentStoryForShare.genre)}\n`;
    textContent += `Description: ${currentStoryForShare.description}\n`;
    textContent += `Chapters: ${currentStoryForShare.chapters.length}\n\n`;
    textContent += `=== STORY CONTENT ===\n\n`;
    
    currentStoryForShare.chapters.forEach((chapter, index) => {
        textContent += `CHAPTER ${index + 1}\n`;
        textContent += `${chapter.text}\n\n`;
        
        if (chapter.choices.length > 0) {
            textContent += `CHOICES:\n`;
            chapter.choices.forEach((choice, choiceIndex) => {
                textContent += `${choiceIndex + 1}. ${choice.text}\n`;
            });
        }
        textContent += `\n${'-'.repeat(50)}\n\n`;
    });
    
    const dataBlob = new Blob([textContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `${currentStoryForShare.title.replace(/[^a-z0-9]/gi, '_')}.txt`;
    link.click();
    
    showToast('📄 Story exported as text!', 'success');
}

// === UTILITY FUNCTIONS ===
function closeModals() {
    shareModal.classList.remove('active');
    importModal.classList.remove('active');
    customShareModal.classList.remove('active');
    currentStoryForShare = null;
    qrcodeContainer.innerHTML = '';
}

function formatGenre(genre) {
    const genreMap = {
        fantasy: 'Fantasy',
        scifi: 'Sci-Fi',
        mystery: 'Mystery',
        adventure: 'Adventure',
        romance: 'Romance',
        horror: 'Horror',
        historical: 'Historical'
    };
    return genreMap[genre] || genre;
}

function getRandomColor() {
    const colors = ['#e6b325', '#4a90e2', '#9b59b6', '#e74c3c', '#2ecc71', '#1abc9c', '#f39c12'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function checkUrlForImportedStory() {
    const urlParams = new URLSearchParams(window.location.search);
    const importData = urlParams.get('import');
    
    if (importData) {
        try {
            const storyData = JSON.parse(decodeURIComponent(importData));
            
            if (confirm(`Would you like to import the story "${storyData.title}" into your library?`)) {
                importStory(storyData);
                
                // Clean URL
                const cleanUrl = window.location.origin + window.location.pathname;
                window.history.replaceState({}, document.title, cleanUrl);
            }
        } catch (error) {
            console.error('Error parsing imported story:', error);
            showToast('Invalid share link format', 'error');
        }
    }
}

// === TOAST NOTIFICATIONS ===
function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toastContainer');
    
    const toast = document.createElement('div');
    toast.className = `toast-premium ${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="${icons[type] || icons.info}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
            <div class="toast-message">${message}</div>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Remove toast after animation
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 4000);
}

// === ENHANCED FEATURES (Optional) ===
function initBackgroundMusic() {
    // Optional: Add subtle background music
    const audio = new Audio('https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3');
    audio.volume = 0.1;
    audio.loop = true;
    
    // Add music toggle button to header
    const musicToggle = document.createElement('button');
    musicToggle.className = 'btn-premium-outline music-toggle';
    musicToggle.innerHTML = '<i class="fas fa-music"></i>';
    musicToggle.style.position = 'fixed';
    musicToggle.style.bottom = '20px';
    musicToggle.style.right = '20px';
    musicToggle.style.zIndex = '1000';
    
    let playing = false;
    musicToggle.addEventListener('click', () => {
        playing = !playing;
        if (playing) {
            audio.play();
            musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
            showToast('Background music enabled', 'info');
        } else {
            audio.pause();
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        }
    });
    
    document.body.appendChild(musicToggle);
}

// === INITIALIZE APP ===
document.addEventListener('DOMContentLoaded', init);

// Add CSS for empty state
const emptyStateCSS = `
    .empty-state {
        text-align: center;
        padding: 4rem 2rem;
        color: var(--text-gray);
    }
    
    .empty-state i {
        margin-bottom: 1.5rem;
        opacity: 0.5;
    }
    
    .empty-state h3 {
        margin-bottom: 1rem;
        color: var(--text-light);
    }
    
    .qr-error {
        text-align: center;
        padding: 2rem;
        color: var(--error);
    }
    
    .qr-error i {
        font-size: 2rem;
        margin-bottom: 1rem;
    }
    
    .choice-number {
        background: var(--accent-gold);
        color: var(--primary-dark);
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 0.8rem;
    }
    
    .choice-text {
        flex: 1;
    }
    
    .music-toggle {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = emptyStateCSS;
document.head.appendChild(style);
