// Message Carousel Management
let messageRows = [];

function createMessageElement(messageData) {
    const message = document.createElement('div');
    message.className = 'message';
    message.dataset.messageId = Math.random().toString(36).substr(2, 9);
    
    // Extract color from the avatar URL or use a default
    const colorMatch = messageData.avatar.match(/background=([A-F0-9]+)/);
    const bgColor = colorMatch ? `#${colorMatch[1]}` : '#4285F4';
    
    // Get initials from name
    const initials = messageData.name.split(' ').map(n => n[0]).join('');
    
    // Get first name for image path
    const firstName = messageData.name.split(' ')[0].toLowerCase();
    const imagePath = `avatars/${firstName}.webp`;
    
    message.innerHTML = `
        <div class="message-header">
            <div class="avatar" style="background: ${bgColor}; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px;">
                <img src="${imagePath}" alt="${messageData.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" 
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                <span style="display: none;">${initials}</span>
            </div>
            <div class="sender-name">${messageData.name}</div>
        </div>
        <div class="message-text">${messageData.message}</div>
    `;
    
    // Click handler to remove and re-queue
    message.addEventListener('click', function(e) {
        e.stopPropagation();
        const track = this.parentElement;
        this.classList.add('removing');
        
        setTimeout(() => {
            this.remove();
            // Re-add the message to the same track after a delay
            setTimeout(() => {
                if (track && track.classList.contains('message-track')) {
                    const newMessage = createMessageElement(messageData);
                    track.appendChild(newMessage);
                }
            }, 1000);
        }, 500);
    });
    
    return message;
}

function createMessageRow(rowIndex) {
    const wrapper = document.createElement('div');
    wrapper.className = 'row-wrapper';
    
    const row = document.createElement('div');
    // Apply alternating scroll direction classes
    if (rowIndex % 2 === 0) {
        row.className = 'message-row scroll-left-to-right';
    } else {
        row.className = 'message-row scroll-right-to-left';
    }
    
    const track = document.createElement('div');
    track.className = 'message-track';
    
    // Set initial position based on direction with staggered start
    // rowIndex 0, 2, 4... (rows 1, 3, 5...) go left to right - start from left
    // rowIndex 1, 3, 5... (rows 2, 4, 6...) go right to left - start from right
    if (rowIndex % 2 === 0) {
        // Rows 1, 3, 5... (left to right) - start from different positions for staggered effect
        const startOffset = rowIndex === 0 ? '-20%' : '-100%'; // First row starts more visible
        track.style.transform = `translate3d(${startOffset}, 0, 0)`;
    } else {
        // Rows 2, 4, 6... (right to left) - start from right side  
        const startOffset = rowIndex === 1 ? '80vw' : '100vw'; // Second row starts more visible
        track.style.transform = `translate3d(${startOffset}, 0, 0)`;
    }
    
    // Shuffle messages for this row
    const shuffledMessages = [...window.teamMessages].sort(() => Math.random() - 0.5);
    
    // Create enough sets of messages for seamless loop
    for (let set = 0; set < 6; set++) {
        shuffledMessages.forEach(msg => {
            track.appendChild(createMessageElement(msg));
        });
    }
    
    row.appendChild(track);
    wrapper.appendChild(row);
    return wrapper;
}

function startMessages() {
    const container = document.getElementById('messagesContainer');
    container.innerHTML = ''; // Clear any existing messages
    messageRows = []; // Reset the array
    
    // Determine number of rows based on screen size
    let numberOfRows = 3; // Default for desktop
    
    if (window.innerWidth <= 768) {
        numberOfRows = 1; // Mobile
    } else if (window.innerWidth <= 1024) {
        numberOfRows = 2; // Tablet
    }
    
    // Create rows
    for (let i = 0; i < numberOfRows; i++) {
        const rowWrapper = createMessageRow(i);
        container.appendChild(rowWrapper);
        messageRows.push(rowWrapper);
    }
}

// Handle window resize
let resizeTimeout;
function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        startMessages(); // Recreate messages for new screen size
    }, 250);
}

// Make functions globally available
window.startMessages = startMessages;
window.handleResize = handleResize;