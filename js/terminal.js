fetch('../json/command.json')
  .then(response => response.json())
  .then(data => {
    commands = data;
}).catch(error => console.error('Erreur de chargement des commandes:', error));

const terminal = document.querySelector('.sandbox-in-border');
let username = '';
let userPrompt = '';

const terminalContent = document.createElement('div');
terminalContent.style.padding = '10px';
terminalContent.style.color = 'var(--text-primary)';
terminalContent.style.fontFamily = 'monospace';
terminalContent.style.whiteSpace = 'pre-wrap';
terminalContent.style.height = '100%';
terminalContent.style.overflowY = 'auto';
terminalContent.style.display = 'flex';
terminalContent.style.flexDirection = 'column';
terminal.appendChild(terminalContent);

const activeLine = document.createElement('div');
activeLine.style.display = 'flex';
activeLine.style.alignItems = 'center';
activeLine.style.marginTop = 'auto';
terminalContent.appendChild(activeLine);

const promptSpan = document.createElement('span');
activeLine.appendChild(promptSpan);

const commandInput = document.createElement('input');
commandInput.type = 'text';
commandInput.style.backgroundColor = 'transparent';
commandInput.style.border = 'none';
commandInput.style.color = 'var(--text-primary)';
commandInput.style.fontFamily = 'monospace';
commandInput.style.width = '50%';
commandInput.style.outline = 'none';
commandInput.style.marginLeft = '5px';
activeLine.appendChild(commandInput);

let commandHistory = [];
let historyIndex = -1;
let loginStep = 'username';
let commands = null;
let currentDirectory = '/home/' + username;



let fileSystem = {
  '/': {
      type: 'directory',
      content: {
          'home': {
              type: 'directory',
              content: {}
          }
      }
  }
};

fileSystem['/']['content']['home'][username] = {
    type: 'directory',
    content: {
      'Documents': { type: 'directory', content: {}},
      'Images': { type: 'directory', content: {}},
      'Téléchargements': { type: 'directory', content: {} },
      'Bureau': { type: 'directory', content: {} },
      '.bashrc': { type: 'file', content: '# Configuration du terminal'}
    }
};

let permissions = fileSystem.permission


const commandActions = {
  showHelp: () => {
    let helpText = 'Commandes disponibles:\n\n';
    for (const [cmd, info] of Object.entries(commands)) {
    helpText += `${cmd.padEnd(10)} - ${info.description}\n`;
    helpText += `           Usage: ${info.usage}\n\n`;
    }
    return helpText;
  },
  
  clearScreen: () => {
    const oldActiveLine = activeLine;
    terminalContent.innerHTML = '';
    terminalContent.appendChild(oldActiveLine);
    return '';
  },
  
  showCurrentDirectory: () => {
    return currentDirectory;
  },
  
  listFiles: (args) => {
    const path = currentDirectory;
    let current = navigateToPath(path);
    if (!current) return `Erreur: Chemin invalide ${path}`;
  
    const showDetails = args.includes('-l');
    let output = '';
  
    for (const [name, item] of Object.entries(current.content)) {
      if (showDetails) {
        const type = item.type === 'directory' ? 'd' : '-';
        const permissions = item.permissions || 'rw-r--r--';
        const date = new Date().toLocaleString();
        output += `${type}${permissions} 1 ${username} ${username} 4096 ${date} ${name}\n`;
      } else {
        output += `${name}  `;
      }
    }
    return output;
  },
  
  changeDirectory: (args) => {
    if (!args[0]) {
      currentDirectory = '/home/' + username;
      userPrompt = `${username}@machine: ${currentDirectory} $ `;
      updatePrompt();
      return '';
    }
  
    const newPath = resolvePath(args[0]);
    const dir = navigateToPath(newPath);
  
    if (!dir || dir.type !== 'directory') {
      return `cd: ${args[0]}: Aucun fichier ou dossier de ce type`;
    }
  
    currentDirectory = newPath;
    userPrompt = `${username}@machine: ${currentDirectory} $ `;
    updatePrompt();
    return '';
  },
  
  makeDirectory: (args) => {
    if (!args[0]) return 'mkdir: opérande manquant';
    
    const path = resolvePath(args[0]);
    const parentPath = path.substring(0, path.lastIndexOf('/'));
    const dirName = path.substring(path.lastIndexOf('/') + 1);
    
    let parent = navigateToPath(parentPath);
    if (!parent) return `mkdir: impossible de créer le répertoire '${args[0]}': Chemin invalide`;
    
    parent.content[dirName] = { type: 'directory', content: {} };
    return '';
  },
  
  touchFile: (args) => {
    if (!args[0]) return 'touch: opérande manquant';
    
    const path = resolvePath(args[0]);
    const parentPath = path.substring(0, path.lastIndexOf('/'));
    const fileName = path.substring(path.lastIndexOf('/') + 1);
    
    let parent = navigateToPath(parentPath);
    if (!parent) return `touch: impossible de créer '${args[0]}': Chemin invalide`;
    
    parent.content[fileName] = { type: 'file', content: '' };
    return '';
  },
  
  showFileContent: (args) => {
    if (!args[0]) return 'cat: opérande manquant';
    
    const path = resolvePath(args[0]);
    const file = navigateToPath(path);
    
    if (!file) return `cat: ${args[0]}: Aucun fichier ou dossier de ce type`;
    if (file.type !== 'file') return `cat: ${args[0]}: Est un dossier`;
    
    return file.content;
  },
  
  removeFile: (args) => {
    if (!args[0]) return 'rm: opérande manquant';
    
    const recursive = args.includes('-r');
    const target = args[args.length - 1];
    const path = resolvePath(target);
    
    const parentPath = path.substring(0, path.lastIndexOf('/'));
    const name = path.substring(path.lastIndexOf('/') + 1);
    
    let parent = navigateToPath(parentPath);
    if (!parent) return `rm: impossible de supprimer '${target}': Aucun fichier ou dossier de ce type`;
    
    const item = parent.content[name];
    if (!item) return `rm: impossible de supprimer '${target}': Aucun fichier ou dossier de ce type`;
    
    if (item.type === 'directory' && !recursive) {
    return `rm: impossible de supprimer '${target}': Est un dossier`;
    }
    
    delete parent.content[name];
    return '';
  },
  
  echo: (args) => {
    if (args.length === 0) return '';
    
    const outputIndex = args.indexOf('>');
    if (outputIndex === -1) {
    return args.join(' ');
    }
    
    const message = args.slice(0, outputIndex).join(' ');
    const fileName = args[outputIndex + 1];
    
    if (!fileName) return 'echo: syntaxe incorrecte';
    
    const path = resolvePath(fileName);
    const parentPath = path.substring(0, path.lastIndexOf('/'));
    const name = path.substring(path.lastIndexOf('/') + 1);
    
    let parent = navigateToPath(parentPath);
    if (!parent) return `echo: impossible de créer '${fileName}': Chemin invalide`;
    
    parent.content[name] = { type: 'file', content: message };
    return '';
  },
  
  showUsername: () => {
    return username;
  },
  
  showHistory: () => {
    return commandHistory.map((cmd, i) => `${i + 1}  ${cmd}`).join('\n');
  },
  
  showManual: (args) => {
    if (!args[0]) return 'Quelle page de manuel voulez-vous voir ?';
    
    const cmd = args[0];
    if (!commands[cmd]) return `Aucune entrée de manuel pour ${cmd}`;
    
    return `NOM\n\t${cmd} - ${commands[cmd].description}\n\nSYNOPSIS\n\t${commands[cmd].usage}\n`;
  },
  
  showSystemInfo: (args) => {
    const info = {
    sysname: 'Linux',
    nodename: 'sandbox-machine',
    release: '5.15.0-generic',
    version: '#1 SMP Debian 11',
    machine: 'x86_64'
    };
    
    if (args.includes('-a')) {
    return `${info.sysname} ${info.nodename} ${info.release} ${info.version} ${info.machine}`;
    }
    return info.sysname;
  },
  
  grepSearch: (args) => {
    if (args.length < 2) return 'grep: utilisation: grep <motif> <fichier>';
    
    const pattern = args[0];
    const fileName = args[1];
    const path = resolvePath(fileName);
    
    const file = navigateToPath(path);
    if (!file) return `grep: ${fileName}: Aucun fichier ou dossier de ce type`;
    if (file.type !== 'file') return `grep: ${fileName}: Est un dossier`;
    
    const matches = file.content.split('\n')
    .filter(line => line.includes(pattern))
    .join('\n');
    
    return matches || '';
  },
  
  showDate: () => {
    return new Date().toLocaleString();
  },

  exitTerminal: () => {
    loginStep = 'username';
    username = '';
    currentDirectory = '/home/' + username;
    commandHistory = [];
    historyIndex = -1;
    
    const oldActiveLine = activeLine;
    terminalContent.innerHTML = '';
    terminalContent.appendChild(oldActiveLine);
    
    fileSystem = {
      '/': {
        type: 'directory',
        content: {
          'home': {
            type: 'directory',
            content: {}
          }
        }
      }
    };
    
    updatePrompt();
    return 'Déconnexion...';
  },

  moveFile: (args) => {
    if (args.length !== 2) return 'mv: utilisation: mv <source> <destination>';
    
    const sourcePath = resolvePath(args[0]);
    const destPath = resolvePath(args[1]);
    
    const sourceParentPath = sourcePath.substring(0, sourcePath.lastIndexOf('/'));
    const sourceName = sourcePath.substring(sourcePath.lastIndexOf('/') + 1);
    
    const destParentPath = destPath.substring(0, destPath.lastIndexOf('/'));
    const destName = destPath.substring(destPath.lastIndexOf('/') + 1);
    
    const sourceParent = navigateToPath(sourceParentPath);
    const destParent = navigateToPath(destParentPath);
    
    if (!sourceParent || !sourceParent.content[sourceName]) {
      return `mv: impossible de déplacer '${args[0]}': Aucun fichier ou dossier de ce type`;
    }
    
    if (!destParent) {
      return `mv: impossible de déplacer vers '${args[1]}': Chemin invalide`;
    }
    
    
    destParent.content[destName] = sourceParent.content[sourceName];
    delete sourceParent.content[sourceName];
    return '';
  },

  copyFile: (args) => { 
    if (args.length !== 2) return 'cp: utilisation: cp [-r] <source> <destination>';
    
    const recursive = args[0] === '-r';
    const sourceArg = recursive ? args[1] : args[0];
    const destArg = recursive ? args[2] : args[1];
    
    const sourcePath = resolvePath(sourceArg);
    const destPath = resolvePath(destArg);
    
    const source = navigateToPath(sourcePath);
    if (!source) return `cp: impossible de copier '${sourceArg}': Aucun fichier ou dossier de ce type`;
    
    if (source.type === 'directory' && !recursive) {
      return `cp: impossible de copier '${sourceArg}': Est un dossier`;
    }
    
    const deepCopy = obj => JSON.parse(JSON.stringify(obj));
    
    const destParentPath = destPath.substring(0, destPath.lastIndexOf('/'));
    const destName = destPath.substring(destPath.lastIndexOf('/') + 1);
    
    const destParent = navigateToPath(destParentPath);
    if (!destParent) return `cp: impossible de copier vers '${destArg}': Chemin invalide`;
    
    destParent.content[destName] = deepCopy(source);
    return '';
  },

  findFiles: (args) => {
    if (!args[0]) return 'find: utilisation: find <pattern>';
    
    const pattern = args[0];
    const results = [];
    
    const searchInDirectory = (path, dir) => {
      for (const [name, item] of Object.entries(dir.content)) {
        const fullPath = `${path}/${name}`;
        if (name.includes(pattern)) {
          results.push(fullPath);
        }
        if (item.type === 'directory') {
          searchInDirectory(fullPath, item);
        }
      }
    };
    
    searchInDirectory('', fileSystem['/']);
    return results.join('\n') || 'Aucun fichier trouvé';
  },

  showProcesses: () => {
    const processes = [
      'PID TTY          TIME CMD',
      '1   pts/0    00:00:00 bash',
      '15  pts/0    00:00:00 ps',
      '24  pts/0    00:00:01 node',
      '35  pts/0    00:00:00 terminal'
    ];
    return processes.join('\n');
  },

  showDiskUsage: (args) => {
    const path = args[0] || '.';
    const resolvedPath = resolvePath(path);
    const target = navigateToPath(resolvedPath);
    
    if (!target) return `du: impossible d'accéder à '${path}': Aucun fichier ou dossier de ce type`;
    
    const calculateSize = (item) => {
      if (item.type === 'file') return 4;
      let size = 4;
      for (const subItem of Object.values(item.content)) {
        size += calculateSize(subItem);
      }
      return size;
    };
    
    return `${calculateSize(target)}\t${resolvedPath}`;
  },

  changePermissions: (args) => {
    if (args.length !== 2) return 'chmod: utilisation: chmod <mode> <fichier>';
    
    const mode = args[0];
    const path = resolvePath(args[1]);
    const file = navigateToPath(path);
    
    if (!file) return `chmod: impossible d'accéder à '${args[1]}': Aucun fichier ou dossier de ce type`;
    
    if (!/^[0-7]{3}$/.test(mode)) {
        return 'chmod: mode invalide: ' + mode;
    }

    const permissions = {
        
        '777': 'rwxrwxrwx',
        '770': 'rwxrwx---',
        '760': 'rwxrw----',
        '750': 'rwxr-x---',
        '740': 'rwxr-----',
        '730': 'rwxrwx---',
        '720': 'rwx-w----',
        '710': 'rwx--x---',
        '700': 'rwx------',
        
        
        '677': 'rw-rwxrwx',
        '670': 'rw-rwx---',
        '660': 'rw-rw----',
        '650': 'rw-r-x---',
        '640': 'rw-r-----',
        '630': 'rw--wx---',
        '620': 'rw--w----',
        '610': 'rw---x---',
        '600': 'rw-------',
        
        
        '577': 'r-xrwxrwx',
        '570': 'r-xrwx---',
        '560': 'r-xrw----',
        '550': 'r-xr-x---',
        '540': 'r-xr-----',
        '530': 'r-x-wx---',
        '520': 'r-x-w----',
        '510': 'r-x--x---',
        '500': 'r-x------',
        
        
        '644': 'rw-r--r--',
        '755': 'rwxr-xr-x',
        '766': 'rwxrw-rw-',
        '777': 'rwxrwxrwx',
        '400': 'r--------',
        '444': 'r--r--r--',
        '666': 'rw-rw-rw-',
        '700': 'rwx------',
        '744': 'rwxr--r--',
        '555': 'r-xr-xr-x',
        '600': 'rw-------',
        '711': 'rwx--x--x',
        '444': 'r--r--r--'
    };

    if (permissions[mode]) {
        file.permissions = permissions[mode];
    } else {
        const owner = parseInt(mode[0]);
        const group = parseInt(mode[1]);
        const others = parseInt(mode[2]);
        
        const convertToRWX = (num) => {
            return [
                (num & 4) ? 'r' : '-',
                (num & 2) ? 'w' : '-',
                (num & 1) ? 'x' : '-'
            ].join('');
        };
        
        file.permissions = convertToRWX(owner) + convertToRWX(group) + convertToRWX(others);
    }

    return '';
  }
};

  
function resolvePath(path) {
    if (path.startsWith('/')) return path;
    if (path === '..') {
        return currentDirectory.substring(0, currentDirectory.lastIndexOf('/'));
    }
    if (path === '.') return currentDirectory;
        return `${currentDirectory}/${path}`;
}
  
function navigateToPath(path) {
  const parts = path.split('/').filter(p => p);
  let current = fileSystem['/'];

  for (const part of parts) {
      if (part === '..') {
          continue;
      }
      if (!current.content[part]) return null;
      current = current.content[part];
  }

  return current;
}

function addToHistory(input, isCommand = true) {
    const line = document.createElement('div');
    line.style.marginBottom = '5px';
    
    if (isCommand && loginStep === 'complete') {
        line.textContent = userPrompt + input;
    } else {
        line.textContent = input;
    }
    
    terminalContent.insertBefore(line, activeLine);
    terminalContent.scrollTop = terminalContent.scrollHeight;
}

function updatePrompt() {
    switch(loginStep) {
        case 'username':
            promptSpan.textContent = 'Login :';
            break;
        case 'password':
            promptSpan.textContent = 'Password :';
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
      if (!fileSystem['/'].content['home']) {
          fileSystem['/'].content['home'] = {
              type: 'directory',
              content: {}
          };
      }
      fileSystem['/'].content['home'].content[username] = {
          type: 'directory',
          content: {
              'Documents': { type: 'directory', content: {} },
              'Images': { type: 'directory', content: {} },
              'Téléchargements': { type: 'directory', content: {} },
              'Bureau': { type: 'directory', content: {} },
              '.bashrc': { type: 'file', content: '# Configuration du terminal' }
          }
      };
      
      currentDirectory = `/home/${username}`;
      userPrompt = `${username}@machine: ${currentDirectory} $ `;
      addToHistory('Login: ' + input);
      loginStep = 'password';
      updatePrompt();
  } else if (loginStep === 'password') {
      addToHistory(`Welcome ${username} !`, false);
      loginStep = 'complete';
      updatePrompt();
  }
}

function executeCommand(commandStr) {
    const [cmd, ...args] = commandStr.trim().split(' ');
    
    if (!commands[cmd]) {
      return `Commande non reconnue: ${cmd}`;
    }
  
    const commandInfo = commands[cmd];
    const action = commandActions[commandInfo.action];
    
    if (!action) {
      return `Erreur: Action non définie pour la commande ${cmd}`;
    }
  
    try {
      return action(args);
    } catch (error) {
      return `Erreur lors de l'exécution de la commande: ${error.message}`;
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
            const output = executeCommand(command);
            if (output) {
                addToHistory(output, false);
            }
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