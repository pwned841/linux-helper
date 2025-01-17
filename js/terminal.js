const terminal = document.querySelector('.sandbox-in-border');
let username = '';
let userPrompt = '';

const terminalContent = document.createElement('div');
terminalContent.style.padding = '10px';
terminalContent.style.color = 'var(--text-primary)';
terminalContent.style.fontFamily = 'monospace';
terminalContent.style.whiteSpace = 'pre-wrap';
terminal.appendChild(terminalContent);

const activeLine = document.createElement('div');
activeLine.style.display = 'flex';
activeLine.style.alignItems = 'center';
terminalContent.appendChild(activeLine);

const promptSpan = document.createElement('span');
activeLine.appendChild(promptSpan);

const commandInput = document.createElement('input');
commandInput.type = 'text';
commandInput.style.backgroundColor = 'transparent';
commandInput.style.border = 'none';
commandInput.style.color = 'var(--text-primary)';
commandInput.style.fontFamily = 'monospace';
commandInput.style.width = '80%';
commandInput.style.outline = 'none';
commandInput.style.marginLeft = '5px';
activeLine.appendChild(commandInput);

let commandHistory = [];
let historyIndex = -1;
let loginStep = 'username';

function addToHistory(input, isCommand = true) {
    const line = document.createElement('div');
    line.style.marginBottom = '5px';
    
    if (isCommand && loginStep === 'complete') {
        line.textContent = userPrompt + input;
    } else {
        line.textContent = input;
    }
    
    terminalContent.insertBefore(line, activeLine);
}

function updatePrompt() {
    switch(loginStep) {
        case 'username':
            promptSpan.textContent = 'Login: ';
            break;
        case 'password':
            promptSpan.textContent = 'Password: ';
            commandInput.type = 'password';
            break;
        case 'complete':
            promptSpan.textContent = userPrompt;
            commandInput.type = 'text';
            break;
    }
}

function handleLogin(input) {
    if (loginStep === 'username') {
        username = input;
        userPrompt = `${username}@linux $ `;
        addToHistory('Login: ' + input);
        loginStep = 'password';
        updatePrompt();
    } else if (loginStep === 'password') {
        addToHistory('Password: *****');
        addToHistory(`Bienvenue ${username} !`, false);
        loginStep = 'complete';
        updatePrompt();
    }
}

commandInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && this.value.trim() !== '') {
        const command = this.value;
        
        if (loginStep !== 'complete') {
            handleLogin(command);
        } else {
            commandHistory.push(command);
            historyIndex = commandHistory.length;
            addToHistory(command);
            addToHistory('Commande non reconnue: ' + command, false);
        }
        
        this.value = '';
        
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            this.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            this.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            this.value = '';
        }
    }
});

terminal.addEventListener('click', function() {
    commandInput.focus();
});

updatePrompt();
commandInput.focus();