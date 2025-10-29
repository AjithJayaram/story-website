// Sample stories data
let stories = [
    {
        id: 1,
        title: "The Lost Temple of Zorath",
        description: "Explore ancient ruins and uncover hidden treasures in this jungle adventure.",
        chapters: [
            {
                id: 1,
                text: "You stand at the edge of a dense jungle, the ancient temple of Zorath hidden somewhere within. The humid air carries the scent of exotic flowers and decay. Two paths diverge before you: one follows a overgrown stone path, the other leads into a dark cave entrance.",
                choices: [
                    { text: "Follow the stone path", nextChapter: 2 },
                    { text: "Enter the dark cave", nextChapter: 3 }
                ]
            },
            {
                id: 2,
                text: "The stone path winds through vibrant jungle foliage. Suddenly, you encounter a massive stone door covered in intricate carvings. It seems locked, but there are two unusual mechanisms: one resembles a series of rotating disks, the other appears to be a musical instrument made of crystal.",
                choices: [
                    { text: "Try to solve the rotating disk puzzle", nextChapter: 4 },
                    { text: "Attempt to play the crystal instrument", nextChapter: 5 }
                ]
            },
            {
                id: 3,
                text: "The cave is damp and dark, your torch casting dancing shadows on the walls. You discover an underground river with a small boat tied to a stalagmite. Further in, you notice ancient writings on the wall that might be important.",
                choices: [
                    { text: "Take the boat down the river", nextChapter: 6 },
                    { text: "Study the ancient writings", nextChapter: 7 }
                ]
            },
            {
                id: 4,
                text: "After hours of careful manipulation, the disks align perfectly. The massive stone door groans open, revealing a treasure chamber filled with gold artifacts and precious gems. You've found the main treasure room!",
                choices: [
                    { text: "Take the treasures and return home", nextChapter: 8 },
                    { text: "Explore further into the temple", nextChapter: 9 }
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
                text: "The village elder has tasked you with scaling Dragon's Peak to retrieve the legendary Ice Crystal. The mountain looms above you, its peak hidden in clouds. You can see two possible routes up the mountain.",
                choices: [
                    { text: "Take the steep but direct cliff path", nextChapter: 2 },
                    { text: "Follow the longer but safer forest route", nextChapter: 3 }
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

// Current story state
let currentStory = null;
let currentChapter = null;

// Initialize the app
function init() {
    loadStories();
    setupEventListeners();
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
        `;
        storyCard.addEventListener('click', () => showStoryScreen(story));
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
        id: Date.now(), // Simple ID generation
        title,
        description,
        chapters: [
            {
                id: 1,
                text: "This is the beginning of your story. Click 'Add Chapter' to continue building your adventure!",
                choices: [
                    { text: "Add your first choice here", nextChapter: 2 }
                ]
            },
            {
                id: 2,
                text: "This is your second chapter. You can edit these in the code to create your full story!",
                choices: [
                    { text: "Continue the adventure", nextChapter: 3 }
                ]
            }
        ]
    };

    stories.push(newStory);
    saveStories();
    showStorySelection();
    
    alert('Story created! You can now edit the chapters in the stories.json file to build your full adventure.');
}

// Initialize the app when page loads
document.addEventListener('DOMContentLoaded', init);