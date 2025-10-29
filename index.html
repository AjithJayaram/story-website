// Sample stories data
let stories = [
    {
        id: 1,
        title: "The Lost Temple of Zorath",
        description: "Explore ancient ruins and uncover hidden treasures in this jungle adventure.",
        chapters: [
            {
                id: 1,
                text: "You stand at the edge of a dense jungle, the ancient temple of Zorath hidden somewhere within. The humid air carries the scent of exotic flowers and decay. Two paths diverge before you.",
                choices: [
                    { text: "Follow the stone path", nextChapter: 2 },
                    { text: "Enter the dark cave", nextChapter: 3 }
                ]
            },
            {
                id: 2,
                text: "The stone path winds through vibrant jungle foliage. You encounter a massive stone door covered in intricate carvings.",
                choices: [
                    { text: "Try to solve the rotating disk puzzle", nextChapter: 4 },
                    { text: "Look for another entrance", nextChapter: 5 }
                ]
            },
            {
                id: 3,
                text: "The cave is damp and dark. You discover an underground river with a small boat tied to a stalagmite.",
                choices: [
                    { text: "Take the boat down the river", nextChapter: 6 },
                    { text: "Continue on foot", nextChapter: 7 }
                ]
            }
        ]
    },
    {
        id: 2,
        title: "Dragon's Peak Expedition",
        description: "Climb the treacherous mountains to confront the legendary ice dragon.",
        chapters: [
            {
                id: 1,
                text: "The village elder has tasked you with scaling Dragon's Peak. The mountain looms above you, its peak hidden in clouds.",
                choices: [
                    { text: "Take the steep cliff path", nextChapter: 2 },
                    { text: "Follow the forest route", nextChapter: 3 }
                ]
            }
        ]
    }
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
const currentStoryTitle = document.getElementById('currentStoryTitle');
const storyText = document.getElementById('storyText');
const choicesContainer = document.getElementById('choices');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');

// Share/Import Elements
const shareModal = document.getElementById('shareModal');
const importModal = document.getElementById('importModal');
const shareLink = document.getElementById('shareLink');
const copyLinkBtn = document.getElementById('copyLinkBtn');
const exportJsonBtn = document.getElementById('exportJsonBtn');
const exportTextBtn = document.getElementById('exportTextBtn');
const closeShareModal = document.getElementById('closeShareModal');
const closeImportModal = document.getElementById('closeImportModal');
const importStoryBtn = document.getElementById('importStoryBtn');
const jsonFileInput = document.getElementById('jsonFileInput');
const importText = document.getElementById('importText');
const importFromTextBtn = document.getElementById('importFromTextBtn');
const qrcodeContainer = document.getElementById('qrcode');

// Current story state
let currentStory = null;
let currentChapter = null;
let currentStoryForShare = null;
let qrCodeInstance = null;

// Initialize the app
function init() {
    loadStories();
    setupEventListeners();
    setupShareImportListeners();
    checkUrlForImportedStory();
    showStorySelection();
}

// Load stories from localStorage or use sample data
function loadStories() {
    const savedStories = localStorage.getItem('adventureStories');
    if (savedStories) {
        stories = JSON.parse(savedStories);
    }
    renderStoryList();
}

// Save stories to localStorage
function saveStories() {
    localStorage.setItem('adventureStories', JSON.stringify(stories));
}

// Event listeners
function setupEventListeners() {
    addStoryBtn.addEventListener('click', showAddStoryScreen);
    backToStoriesBtn.addEventListener('click', showStorySelection);
    backToSelectionBtn.addEventListener('click', showStorySelection);
    saveStoryBtn.addEventListener('click', saveNewStory);
}

// Share/Import event listeners
function setupShareImportListeners() {
    importStoryBtn.addEventListener('click', openImportModal);
    closeShareModal.addEventListener('click', closeModals);
    closeImportModal.addEventListener('click', closeModals);
    copyLinkBtn.addEventListener('click', copyShareLink);
    exportJsonBtn.addEventListener('click', exportAsJson);
    exportTextBtn.addEventListener('click', exportAsText);
    jsonFileInput.addEventListener('change', handleFileImport);
    importFromTextBtn.addEventListener('click', importFromText);
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === shareModal) closeModals();
        if (e.target === importModal) closeModals();
    });
}

// Screen management
function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
}

function showStorySelection() {
    showScreen(storySelection);
    renderStoryList();
}

function showAddStoryScreen() {
    showScreen(addStoryScreen);
    storyTitleInput.value = '';
    storyDescriptionInput.value = '';
}

function showStoryScreen(story) {
    currentStory = story;
    currentChapter = story.chapters[0];
    currentStoryTitle.textContent = story.title;
    showScreen(storyScreen);
    displayChapter(currentChapter);
    updateProgress();
}

// Render story list
function renderStoryList() {
    storyList.innerHTML = '';
    stories.forEach(story => {
        const storyCard = document.createElement('div');
        storyCard.className = 'story-card';
        storyCard.innerHTML = `
            <h3>${story.title}</h3>
            <p>${story.description}</p>
            <small>${story.chapters.length} chapters</small>
            <div class="story-actions">
                <button class="btn-small play-btn" data-id="${story.id}">🎮 Play</button>
                <button class="btn-small share-btn" data-id="${story.id}">📤 Share</button>
            </div>
        `;
        
        // Add event listeners
        const playBtn = storyCard.querySelector('.play-btn');
        const shareBtn = storyCard.querySelector('.share-btn');
        
        playBtn.addEventListener('click', () => showStoryScreen(story));
        shareBtn.addEventListener('click', () => {
            currentStoryForShare = story;
            openShareModal();
        });
        
        storyList.appendChild(storyCard);
    });
}

// Display current chapter
function displayChapter(chapter) {
    storyText.textContent = chapter.text;
    choicesContainer.innerHTML = '';

    chapter.choices.forEach(choice => {
        const choiceBtn = document.createElement('button');
        choiceBtn.className = 'choice-btn';
        choiceBtn.textContent = choice.text;
        choiceBtn.addEventListener('click', () => {
            const nextChapter = currentStory.chapters.find(ch => ch.id === choice.nextChapter);
            if (nextChapter) {
                currentChapter = nextChapter;
                displayChapter(nextChapter);
                updateProgress();
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

// Update progress bar
function updateProgress() {
    if (!currentStory || !currentChapter) return;

    const currentIndex = currentStory.chapters.findIndex(ch => ch.id === currentChapter.id);
    const totalChapters = currentStory.chapters.length;
    const progress = ((currentIndex + 1) / totalChapters) * 100;

    progressFill.style.width = `${progress}%`;
    progressText.textContent = `Chapter ${currentIndex + 1} of ${totalChapters}`;
}

// Save new story
function saveNewStory() {
    const title = storyTitleInput.value.trim();
    const description = storyDescriptionInput.value.trim();

    if (!title || !description) {
        alert('Please fill in both title and description');
        return;
    }

    const newStory = {
        id: Date.now(),
        title,
        description,
        chapters: [
            {
                id: 1,
                text: "This is the beginning of your story. Edit the code to add more chapters!",
                choices: [
                    { text: "Choice 1", nextChapter: 2 },
                    { text: "Choice 2", nextChapter: 3 }
                ]
            }
        ]
    };

    stories.push(newStory);
    saveStories();
    showStorySelection();
    showToast('Story created successfully!');
}

// Share/Import Functions
function openShareModal() {
    if (!currentStoryForShare) return;
    
    const storyData = encodeURIComponent(JSON.stringify(currentStoryForShare));
    const shareUrl = `${window.location.origin}${window.location.pathname}?import=${storyData}`;
    shareLink.value = shareUrl;
    
    // Generate QR Code
    generateQRCode(shareUrl);
    
    shareModal.classList.add('active');
    showToast('Share link generated!');
}

function generateQRCode(url) {
    // Clear previous QR code
    qrcodeContainer.innerHTML = '';
    
    // Generate new QR code
    QRCode.toCanvas(qrcodeContainer, url, {
        width: 200,
        height: 200,
        margin: 1,
        color: {
            dark: '#1a2a6c',
            light: '#ffffff'
        }
    }, function(error) {
        if (error) {
            console.error('QR Code generation failed:', error);
            qrcodeContainer.innerHTML = '<p style="color: red;">QR Code failed to generate</p>';
        }
    });
}

function openImportModal() {
    importModal.classList.add('active');
}

function closeModals() {
    shareModal.classList.remove('active');
    importModal.classList.remove('active');
    currentStoryForShare = null;
    // Clear QR code when closing modal
    qrcodeContainer.innerHTML = '';
}

function copyShareLink() {
    shareLink.select();
    shareLink.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(shareLink.value).then(() => {
        showToast('Link copied to clipboard!');
    }).catch(() => {
        // Fallback for older browsers
        document.execCommand('copy');
        showToast('Link copied to clipboard!');
    });
}

function exportAsJson() {
    if (!currentStoryForShare) return;
    
    const dataStr = JSON.stringify(currentStoryForShare, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `${currentStoryForShare.title.replace(/\s+/g, '_')}.json`;
    link.click();
    
    showToast('Story exported as JSON!');
}

function exportAsText() {
    if (!currentStoryForShare) return;
    
    let textContent = `Title: ${currentStoryForShare.title}\n`;
    textContent += `Description: ${currentStoryForShare.description}\n\n`;
    
    currentStoryForShare.chapters.forEach((chapter, index) => {
        textContent += `=== Chapter ${index + 1} ===\n`;
        textContent += `${chapter.text}\n\n`;
        textContent += `Choices:\n`;
        chapter.choices.forEach((choice, choiceIndex) => {
            textContent += `${choiceIndex + 1}. ${choice.text}\n`;
        });
        textContent += '\n';
    });
    
    const dataBlob = new Blob([textContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `${currentStoryForShare.title.replace(/\s+/g, '_')}.txt`;
    link.click();
    
    showToast('Story exported as text!');
}

function handleFileImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const storyData = JSON.parse(e.target.result);
            importStory(storyData);
        } catch (error) {
            showToast('Invalid JSON file!', true);
        }
    };
    reader.readAsText(file);
}

function importFromText() {
    const text = importText.value.trim();
    if (!text) {
        showToast('Please paste JSON data!', true);
        return;
    }
    
    try {
        const storyData = JSON.parse(text);
        importStory(storyData);
    } catch (error) {
        showToast('Invalid JSON format!', true);
    }
}

function importStory(storyData) {
    if (!storyData.title || !storyData.chapters || !Array.isArray(storyData.chapters)) {
        showToast('Invalid story format!', true);
        return;
    }
    
    storyData.id = Date.now();
    stories.push(storyData);
    saveStories();
    renderStoryList();
    closeModals();
    
    showToast(`"${storyData.title}" imported successfully!`);
    importText.value = '';
    jsonFileInput.value = '';
}

function checkUrlForImportedStory() {
    const urlParams = new URLSearchParams(window.location.search);
    const importData = urlParams.get('import');
    
    if (importData) {
        try {
            const storyData = JSON.parse(decodeURIComponent(importData));
            if (confirm(`Import the story "${storyData.title}"?`)) {
                importStory(storyData);
                const cleanUrl = window.location.origin + window.location.pathname;
                window.history.replaceState({}, document.title, cleanUrl);
            }
        } catch (error) {
            showToast('Invalid share link!', true);
        }
    }
}

function showToast(message, isError = false) {
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    const toast = document.createElement('div');
    toast.className = `toast ${isError ? 'error' : ''}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 3000);
}

// Initialize the app when page loads
document.addEventListener('DOMContentLoaded', init);
