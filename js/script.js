




// Configuration Mistral
// https://console.mistral.ai/api-keys/
const MISTRAL_API_KEY = '';

// Liste des commandes Linux
const commands = [
    {
        name: "ls",
        description: "Lister le contenu d'un répertoire",
        example: "ls -l\nls -a\nls /chemin/dossier"
    },
    {
        name: "cd",
        description: "Changer de répertoire",
        example: "cd /home\ncd ..\ncd ~"
    },
    {
        name: "pwd",
        description: "Afficher le répertoire courant",
        example: "pwd"
    },
    {
        name: "mkdir",
        description: "Créer un nouveau répertoire",
        example: "mkdir nouveau_dossier\nmkdir -p chemin/vers/dossier"
    },
    {
        name: "rm",
        description: "Supprimer des fichiers ou répertoires",
        example: "rm fichier.txt\nrm -r dossier\nrm -rf dossier # forcé"
    },
    {
        name: "cp",
        description: "Copier des fichiers ou répertoires",
        example: "cp fichier1 fichier2\ncp -r dossier1 dossier2"
    },
    {
        name: "mv",
        description: "Déplacer ou renommer des fichiers",
        example: "mv fichier1 fichier2\nmv fichier dossier/"
    },
    {
        name: "touch",
        description: "Créer un nouveau fichier vide",
        example: "touch nouveau_fichier.txt\ntouch -a fichier # modif access time"
    },
    {
        name: "cat",
        description: "Afficher le contenu d'un fichier",
        example: "cat fichier.txt\ncat -n fichier.txt # avec numéros"
    },
    {
        name: "grep",
        description: "Rechercher du texte dans des fichiers",
        example: "grep 'motif' fichier.txt\ngrep -r 'texte' dossier\ngrep -i 'MOTIF'"
    },
    {
        name: "find",
        description: "Rechercher des fichiers",
        example: "find . -name '*.txt'\nfind / -type f -size +100M"
    },
    {
        name: "chmod",
        description: "Modifier les permissions de fichiers",
        example: "chmod 755 fichier\nchmod +x script.sh"
    },
    {
        name: "chown",
        description: "Changer le propriétaire d'un fichier",
        example: "chown utilisateur fichier\nchown -R utilisateur:groupe dossier"
    },
    {
        name: "ps",
        description: "Lister les processus en cours",
        example: "ps aux\nps -ef\nps -u utilisateur"
    },
    {
        name: "kill",
        description: "Terminer un processus",
        example: "kill PID\nkill -9 PID # forcé\nkillall nom_processus"
    },
    {
        name: "top",
        description: "Monitorer les processus en temps réel",
        example: "top\nhtop # version améliorée"
    },
    {
        name: "df",
        description: "Afficher l'espace disque",
        example: "df -h\ndf -T # types de systèmes\ndf -i # inodes"
    },
    {
        name: "du",
        description: "Afficher l'utilisation disque",
        example: "du -h\ndu -sh /chemin\ndu -ah /chemin"
    },
    {
        name: "tar",
        description: "Archiver et compresser des fichiers",
        example: "tar -cvf archive.tar dossier\ntar -xvf archive.tar\ntar -czvf archive.tar.gz dossier"
    },
    {
        name: "gzip",
        description: "Compresser des fichiers",
        example: "gzip fichier.txt\ngzip -k fichier.txt # garder l'original\ngzip -d fichier.txt.gz # décompresser"
    },
    {
        name: "wget",
        description: "Télécharger des fichiers depuis internet",
        example: "wget https://exemple.com/fichier.zip\nwget -c URL # reprendre download\nwget -r -np URL # télécharger site"
    },
    {
        name: "ssh",
        description: "Se connecter à distance à un serveur",
        example: "ssh utilisateur@serveur\nssh -p 2222 user@serveur\nssh -i clé.pem user@serveur"
    },
    {
        name: "scp",
        description: "Copier des fichiers via SSH",
        example: "scp fichier.txt user@serveur:/chemin\nscp -r dossier user@serveur:/chemin\nscp -P 2222 fichier user@serveur:/chemin"
    },
    {
        name: "curl",
        description: "Transférer des données avec URL",
        example: "curl https://api.exemple.com\ncurl -O https://site.com/fichier\ncurl -X POST -d 'data' URL"
    },
    {
        name: "ping",
        description: "Tester la connectivité réseau",
        example: "ping google.com\nping -c 4 IP # 4 paquets\nping -i 2 IP # intervalle 2s"
    },
    {
        name: "netstat",
        description: "Afficher les connexions réseau",
        example: "netstat -tuln\nnetstat -anp\nnetstat -r # table routage"
    },
    {
        name: "ifconfig",
        description: "Configurer interfaces réseau",
        example: "ifconfig\nifconfig eth0 up\nifconfig eth0 192.168.1.1"
    },
    {
        name: "uname",
        description: "Afficher informations système",
        example: "uname -a # toutes infos\nuname -r # version kernel\nuname -m # architecture"
    },
    {
        name: "history",
        description: "Afficher historique des commandes",
        example: "history\nhistory 20 # 20 dernières\n!42 # exécuter cmd #42"
    },
    {
        name: "man",
        description: "Afficher le manuel d'une commande",
        example: "man ls\nman -k recherche\nman 5 passwd"
    },
    {
        name: "less",
        description: "Visualiser fichier page par page",
        example: "less fichier.txt\nless -N fichier # avec numéros\nless +F fichier # suivi"
    },
    {
        name: "tail",
        description: "Afficher fin d'un fichier",
        example: "tail fichier.log\ntail -n 50 fichier\ntail -f fichier # suivi"
    },
    {
        name: "head",
        description: "Afficher début d'un fichier",
        example: "head fichier.txt\nhead -n 20 fichier\nhead -c 100 fichier # caractères"
    },
    {
        name: "sort",
        description: "Trier les lignes d'un fichier",
        example: "sort fichier.txt\nsort -r fichier # inverse\nsort -n fichier # numérique"
    },
    {
        name: "wc",
        description: "Compter lignes, mots, caractères",
        example: "wc fichier.txt\nwc -l fichier # lignes\nwc -w fichier # mots"
    },
    {
        name: "chmod",
        description: "Modifier les permissions",
        example: "chmod 644 fichier\nchmod u+x fichier\nchmod -R a+r dossier"
    },
    {
        name: "ln",
        description: "Créer des liens symboliques",
        example: "ln -s source lien\nln fichier1 fichier2 # lien dur\nln -sf source lien # forcer"
    },
    {
        name: "alias",
        description: "Créer des raccourcis de commandes",
        example: "alias ll='ls -l'\nalias update='apt update'\nalias rm='rm -i'"
    },
    {
        name: "passwd",
        description: "Changer mot de passe utilisateur",
        example: "passwd\npasswd utilisateur\npasswd -l user # verrouiller"
    },
    {
        name: "useradd",
        description: "Créer un nouvel utilisateur",
        example: "useradd nom\nuseradd -m -s /bin/bash nom\nuseradd -G groupe user"
    },
    {
        name: "usermod",
        description: "Modifier un compte utilisateur",
        example: "usermod -aG groupe user\nusermod -s /bin/bash user\nusermod -L user # verrouiller"
    },
    {
        name: "who",
        description: "Afficher utilisateurs connectés",
        example: "who\nwho -H # avec en-tête\nwho -b # dernier boot"
    },
    {
        name: "date",
        description: "Afficher/modifier date et heure",
        example: "date\ndate +%Y-%m-%d\ndate -s '2024-01-14 12:00:00'"
    },
    {
        name: "whereis",
        description: "Localiser binaires/manuels",
        example: "whereis python\nwhereis -b commande # binaires\nwhereis -m commande # manuel"
    },
    {
        name: "whatis",
        description: "Description courte d'une commande",
        example: "whatis ls\nwhatis -w 'lp*'\nwhatis -r commande"
    },
    {
        name: "iptables",
        description: "Configurer le pare-feu Linux. Gère les règles de filtrage des paquets réseau",
        example: "iptables -L # lister règles\niptables -A INPUT -p tcp --dport 80 -j ACCEPT # autoriser port 80\niptables -P INPUT DROP # politique par défaut\niptables-save > rules.txt # sauvegarder config\niptables-restore < rules.txt # restaurer config"
    },
    {
        name: "systemctl",
        description: "Gérer les services systemd et le système",
        example: "systemctl status nginx # état service\nsystemctl start mysql # démarrer service\nsystemctl enable ssh # activer au démarrage\nsystemctl list-units --type=service # lister services\nsystemctl poweroff # éteindre système"
    },
    {
        name: "journalctl",
        description: "Consulter les logs système de systemd",
        example: "journalctl -xe # dernières entrées\njournalctl -u nginx # logs nginx\njournalctl --since today\njournalctl -f # suivi en temps réel\njournalctl --disk-usage # taille logs"
    },
    {
        name: "tcpdump",
        description: "Analyseur de paquets réseau en ligne de commande",
        example: "tcpdump -i eth0 # capture sur interface\ntcpdump port 80 # filtrer port\ntcpdump host 192.168.1.1\ntcpdump -w capture.pcap # sauver dans fichier\ntcpdump -r capture.pcap # lire fichier"
    },
    {
        name: "lsof",
        description: "Lister les fichiers ouverts. Très utile pour diagnostiquer les processus et connexions",
        example: "lsof -i # connexions réseau\nlsof -p 1234 # fichiers process\nlsof /chemin/fichier # qui utilise fichier\nlsof -u utilisateur # fichiers par user\nlsof -i :80 # qui utilise port 80"
    },
    {
        name: "watch",
        description: "Exécuter une commande périodiquement et afficher le résultat",
        example: "watch -n 1 'ps aux' # rafraîchir chaque seconde\nwatch -d 'df -h' # surligner différences\nwatch -t 'netstat -tuln' # sans titre\nwatch -g 'uptime' # arrêt si changement"
    },
    {
        name: "nmap 📦",
        description: "[Nécessite installation: sudo apt install nmap] Scanner de ports et outil d'exploration réseau",
        example: "nmap 192.168.1.0/24 # scanner réseau\nnmap -p 1-100 serveur # ports 1-100\nnmap -sV serveur # version services\nnmap -O serveur # OS detection\nnmap -A serveur # détection complète"
    },
    {
        name: "dd",
        description: "Copier et convertir des données au niveau bloc. Utile pour ISO, clés USB",
        example: "dd if=/dev/sda of=disk.img # backup disque\ndd if=image.iso of=/dev/sdb # créer clé USB\ndd if=/dev/zero of=file bs=1M count=100 # fichier 100MB\ndd status=progress # voir progression"
    },
    {
        name: "rsync",
        description: "Synchronisation efficace de fichiers localement ou via réseau",
        example: "rsync -av source/ dest/ # copie récursive\nrsync -avz --delete source/ dest/ # sync exacte\nrsync -avz -e ssh source/ user@serveur:dest/ # via SSH\nrsync --progress source dest # voir progression"
    },
    {
        name: "nc (netcat)",
        description: "Utilitaire réseau polyvalent pour lire/écrire via TCP/UDP",
        example: "nc -l 1234 # écouter port\nnc serveur 1234 # connecter\nnc -z serveur 20-30 # scanner ports\nnc -v serveur 80 # verbose\nnc -l 1234 > reçu.txt # recevoir fichier"
    },
    {
        name: "htop 📦",
        description: "[Nécessite installation: sudo apt install htop] Visualisation interactive des processus, version améliorée de top",
        example: "htop # interface complète\nhtop -u utilisateur # filtrer user\nhtop -p 1234,5678 # filtrer PID\nhtop -s CPU # trier par CPU\nhtop -t # vue arbre"
    },
    {
        name: "awk",
        description: "Langage de traitement de texte puissant pour analyser fichiers",
        example: "awk '{print $1}' fichier # première colonne\nawk -F: '{print $1,$3}' /etc/passwd # colonnes 1,3\nawk '$3 > 100' fichier # filtre ligne\nawk '{sum+=$1} END {print sum}' # somme colonne"
    },
    {
        name: "sed",
        description: "Éditeur de flux pour transformer/filtrer texte",
        example: "sed 's/ancien/nouveau/' fichier # remplacer\nsed -i 's/ancien/nouveau/g' fichier # remplacer tout\nsed '1d' fichier # supprimer ligne 1\nsed -n '1,5p' fichier # afficher lignes 1-5"
    },
    {
        name: "cut",
        description: "Extraire des sections de lignes de fichiers",
        example: "cut -d: -f1 /etc/passwd # première colonne\ncut -c1-10 fichier # caractères 1-10\ncut -d' ' -f1,3 fichier # colonnes 1 et 3\ncut -d, --output-delimiter=' ' # changer délimiteur"
    },
    {
        name: "tee",
        description: "Rediriger sortie vers fichier tout en l'affichant",
        example: "commande | tee fichier # écrire et afficher\ncommande | tee -a fichier # ajouter\ncommande | tee fichier1 fichier2 # multiple\ncommande | sudo tee fichier # avec sudo"
    },
    {
        name: "xargs",
        description: "Construire et exécuter des commandes depuis l'entrée standard",
        example: "find . -name '*.txt' | xargs rm # supprimer fichiers\necho 'un deux' | xargs mkdir # créer dossiers\ncat urls.txt | xargs wget # télécharger urls\nfind . -type f | xargs -P4 gzip # compression parallèle"
    },
    {
        name: "screen",
        description: "Gestionnaire de terminaux virtuels. Garde sessions actives",
        example: "screen # nouvelle session\nscreen -S nom # session nommée\nscreen -r # reprendre\nscreen -list # lister sessions\nCtrl+a d # détacher session"
    },
    {
        name: "tmux",
        description: "Multiplexeur de terminal moderne, alternative à screen",
        example: "tmux # nouvelle session\ntmux new -s nom # session nommée\ntmux attach # rattacher\ntmux ls # lister sessions\nCtrl+b d # détacher"
    },
    {
        name: "crontab",
        description: "Planificateur de tâches. Format: min heure jour mois jour_semaine commande",
        example: "crontab -l # lister tâches\ncrontab -e # éditer\n0 2 * * * backup.sh # exec 2h du matin\n*/5 * * * * check.sh # toutes les 5 min\n@reboot commande # au démarrage"
    },
    {
        name: "at",
        description: "Exécuter commandes à une date/heure spécifique",
        example: "at now + 1 hour # dans 1 heure\nat 23:59 # heure précise\natq # lister tâches\natrm 1 # supprimer tâche\nat -f script.sh 2am"
    },
    {
        name: "nice",
        description: "Modifier la priorité d'exécution d'un processus (-20 à 19)",
        example: "nice -n 10 commande # priorité basse\nnice -n -10 commande # priorité haute\nrenice -n 5 -p 1234 # modifier process\nnice -n 10 tar czf archive.tar.gz dossier"
    },
    {
        name: "dmesg",
        description: "Afficher messages du noyau, utile pour diagnostic",
        example: "dmesg # tous messages\ndmesg -H # formaté humain\ndmesg -w # suivi\ndmesg | grep USB # filtrer USB\ndmesg -l err # erreurs only"
    },
    {
        name: "strace",
        description: "Tracer appels système et signaux d'un processus",
        example: "strace ls # tracer commande\nstrace -p 1234 # attacher process\nstrace -e open ls # filtrer open\nstrace -c ls # statistiques\nstrace -f commande # suivre fork"
    },
    {
        name: "pmap",
        description: "Afficher carte mémoire d'un processus",
        example: "pmap 1234 # voir mappings\npmap -x 1234 # détails étendus\npmap -d 1234 # info device\npmap $(pgrep firefox) # mapper firefox"
    },
    {
        name: "free",
        description: "Afficher utilisation mémoire système",
        example: "free # voir mémoire\nfree -h # format humain\nfree -s 5 # update 5s\nfree -t # avec total\nfree -w # avec buffer/cache"
    },
    {
        name: "iostat",
        description: "Statistiques CPU et entrées/sorties disque",
        example: "iostat # stats basiques\niostat -x # stats étendues\niostat 2 5 # update 2s, 5 fois\niostat -p sda # device spécifique\niostat -m # stats en MB/s"
    },
    {
        name: "vmstat",
        description: "Statistiques mémoire virtuelle, processus, IO",
        example: "vmstat # stats système\nvmstat 2 # update 2s\nvmstat -S M # en mégaoctets\nvmstat -d # stats disque\nvmstat -s # stats détaillées"
    },
    {
        name: "mpstat",
        description: "Statistiques processeur par CPU",
        example: "mpstat # tous CPU\nmpstat -P ALL # détail par CPU\nmpstat 2 5 # update 2s, 5 fois\nmpstat -u # utilisation CPU\nmpstat -I ALL # interruptions"
    },
    {
        name: "netstat",
        description: "Statistiques réseau et connexions",
        example: "netstat -tuln # ports en écoute\nnetstat -anp # tous process\nnetstat -r # table routage\nnetstat -i # interfaces\nnetstat -s # stats protocols"
    },
    {
        name: "ss",
        description: "Utilitaire pour examiner sockets, remplaçant netstat",
        example: "ss -tuln # ports en écoute\nss -tp # connexions TCP\nss -s # statistiques\nss -4 state established # IPv4 établies\nss sport = :80 # filtrer port"
    },
    {
        name: "sar",
        description: "Collecter et rapporter activité système",
        example: "sar # activité CPU\nsar -r # mémoire\nsar -n DEV # réseau\nsar -b # IO\nsar -q # charge système"
    },
    {
        name: "lspci",
        description: "Afficher informations sur les bus PCI et périphériques",
        example: "lspci # liste devices\nlspci -v # détails\nlspci -k # drivers\nlspci -s 00:02.0 # device spécifique\nlspci -vv # très verbeux"
    },
    {
        name: "lsusb",
        description: "Afficher informations sur les périphériques USB",
        example: "lsusb # liste USB\nlsusb -v # détails\nlsusb -t # arborescence\nlsusb -d 1234:5678 # device spécifique\nlsusb -D /dev/bus/usb/001/001"
    },
    {
        name: "tree 📦",
        description: "[Nécessite installation: sudo apt install tree] Afficher structure des répertoires sous forme d'arbre",
        example: "tree # affichage basique\ntree -L 2 # limiter à 2 niveaux\ntree -a # fichiers cachés\ntree -d # uniquement dossiers\n\nExemple d'affichage:\n.\n├── dossier1\n│   ├── fichier1.txt\n│   └── sous-dossier\n│       └── fichier2.txt\n└── dossier2\n    └── fichier3.txt"
    },
    {
        name: "diff",
        description: "Comparer fichiers ligne par ligne",
        example: "diff fichier1 fichier2\ndiff -u # format unifié\ndiff -y # côte à côte\n\nExemple d'affichage:\n< ligne fichier1\n> ligne fichier2\n3c3\n< texte original\n---\n> nouveau texte"
    },
    {
        name: "nl",
        description: "Numéroter les lignes d'un fichier",
        example: "nl fichier.txt\nnl -ba fichier.txt # toutes lignes\nnl -w3 fichier.txt # largeur numéro\n\nExemple d'affichage:\n     1\tPremière ligne\n     2\tDeuxième ligne\n     3\tTroisième ligne"
    },
    {
        name: "column",
        description: "Formater texte en colonnes",
        example: "column -t fichier\nls -l | column -t # aligner ls\n\nExemple d'affichage:\nNom     Age   Ville\nPierre  25    Paris\nMarie   30    Lyon"
    },
    {
        name: "pstree",
        description: "Afficher arborescence des processus",
        example: "pstree\npstree -p # avec PID\npstree -u # utilisateurs\n\nExemple d'affichage:\nsystemd─┬─sshd─┬─sshd───bash\n        ├─nginx─┬─nginx\n        │       └─nginx\n        └─cron"
    },
    {
        name: "stat",
        description: "Afficher informations détaillées sur fichier",
        example: "stat fichier.txt\nstat -f dossier # système fichiers\n\nExemple d'affichage:\n  Fichier : fichier.txt\n  Taille : 1234   Blocs : 8   Bloc E/S : 4096   fichier\n  Accès : (0644/-rw-r--r--)  Uid : (1000/user)   Gid : (1000/user)\n  Accès : 2024-01-14 10:00:00\n  Modif. : 2024-01-14 09:00:00\n  Change : 2024-01-14 09:00:00"
    },
    {
        name: "hexdump",
        description: "Afficher contenu fichier en hexadécimal",
        example: "hexdump fichier\nhexdump -C # avec caractères\n\nExemple d'affichage:\n0000000 48 65 6c 6c 6f 20 57 6f 72 6c 64 0a\n         H  e  l  l  o     W  o  r  l  d  \\n"
    },
    {
        name: "nl",
        description: "Numéroter les lignes d'un fichier",
        example: "nl fichier.txt\nnl -ba # numéroter lignes vides\n\nExemple d'affichage:\n     1\tLigne 1\n     2\tLigne 2\n     3\tLigne 3"
    },
    {
        name: "expand",
        description: "Convertir tabulations en espaces",
        example: "expand fichier.txt\nexpand -t 4 # tab = 4 espaces\n\nExemple:\nAvant:\tTexte\ttabulé\nAprès:    Texte    tabulé"
    },
    {
        name: "fmt",
        description: "Formater texte simple",
        example: "fmt fichier.txt\nfmt -w 40 # largeur 40\n\nExemple d'affichage:\nTexte long formaté sur\nplusieurs lignes avec une\nlargeur contrôlée"
    },
    {
        name: "script",
        description: "Enregistrer session terminal",
        example: "script log.txt\nscript -t 2> timing.log\n\nContenu typique:\nScript démarré sur 2024-01-14 10:00:00\n$ ls\nfichier1 fichier2\n$ exit\nScript terminé..."
    },
    {
        name: "watch",
        description: "Exécuter commande périodiquement",
        example: "watch date\nwatch -n 1 'ls -l'\n\nExemple d'affichage:\nEvery 2.0s: date\n\nMer 14 jan 2024 10:00:00 CET"
    },
    {
        name: "tput",
        description: "Manipuler terminal",
        example: "tput cols # largeur\ntput lines # hauteur\ntput cup 5 10 # curseur\ntput setaf 2 # texte vert\ntput bold # gras"
    },
    {
        name: "ncdu 📦",
        description: "[Nécessite installation: sudo apt install ncdu] Analyseur d'espace disque interactif",
        example: "ncdu /\nncdu -x # un seul système fichiers\n\nAffichage interactif:\n  4.0GiB [##########] /usr\n  2.0GiB [#####     ] /var\n  1.0GiB [##        ] /home"
    },
    {
        name: "xxd",
        description: "Créer dump hexadécimal ou faire l'inverse",
        example: "xxd fichier\nxxd -b # binaire\nxxd -r hexa.txt > original\n\n00000000: 4865 6c6c 6f20 776f 726c 640a  Hello world."
    },
    {
        name: "factor",
        description: "Factoriser nombres entiers",
        example: "factor 60\nfactor 123456\n\nExemple d'affichage:\n60: 2 2 3 5\n123456: 2 2 2 2 2 2 3 643"
    },
    {
        name: "bc",
        description: "Calculatrice en ligne de commande",
        example: "echo '2+2' | bc\nbc -l # mode math\n\nExemple interactif:\n2+2\n4\nsqrt(2)\n1.4142135623730950488"
    },
    {
        name: "nl",
        description: "Numéroter les lignes",
        example: "nl fichier.txt\nnl -ba # toutes lignes\n\n     1\tPremière ligne\n     2\tDeuxième ligne"
    },
    {
        name: "paste",
        description: "Fusionner lignes de fichiers",
        example: "paste fichier1 fichier2\npaste -d, f1 f2 # délimiteur\n\nf1  f2\na   1\nb   2"
    },
    {
        name: "tr",
        description: "Traduire ou supprimer caractères",
        example: "echo 'HeLLo' | tr '[:upper:]' '[:lower:]'\ncat file | tr -d '\\r' # supprimer CR\n\nAvant: HeLLo\nAprès: hello"
    },
    {
        name: "dirname",
        description: "Extraire chemin du répertoire",
        example: "dirname /a/b/c.txt\ndirname /a/b/c/\n\n/a/b\n/a/b"
    },
    {
        name: "basename",
        description: "Extraire nom fichier du chemin",
        example: "basename /a/b/c.txt\nbasename /a/b/c.txt .txt\n\nc.txt\nc"
    },
    {
        name: "seq",
        description: "Générer séquences de nombres",
        example: "seq 5\nseq 2 5\nseq 0 2 10\n\n1\n2\n3\n4\n5"
    },
    {
        name: "time",
        description: "Chronométrer exécution commande",
        example: "time ls\n\nreal    0m0.003s\nuser    0m0.001s\nsys     0m0.002s"
    },
    {
        name: "timeout",
        description: "Exécuter commande avec limite temps",
        example: "timeout 5s command\ntimeout 1m command\ntimeout --kill-after=10s 5s command"
    },
    {
        name: "split",
        description: "Découper fichier en morceaux",
        example: "split -b 1M gros_fichier\nsplit -l 1000 fichier # par lignes\nsplit -d fichier prefix # numérique"
    },
    {
        name: "csplit",
        description: "Découper fichier selon motif",
        example: "csplit fichier '/^##/' # sur ##\ncsplit fichier 10 20 30 # lignes\n\nFichiers créés: xx00 xx01 xx02..."
    },
    {
        name: "join",
        description: "Joindre lignes de 2 fichiers sur champ commun",
        example: "join file1 file2\njoin -1 2 -2 1 f1 f2 # colonnes diff\n\nf1     f2    résultat\n1 a    1 x    1 a x\n2 b    2 y    2 b y"
    },
    {
        name: "comm",
        description: "Comparer 2 fichiers triés ligne à ligne",
        example: "comm file1 file2\ncomm -12 f1 f2 # suppr communes\n\nColonne 1: unique f1\nColonne 2: unique f2\nColonne 3: communes"
    },
    {
        name: "shuf",
        description: "Générer permutations aléatoires",
        example: "shuf fichier\nshuf -i 1-10 # nombres\nshuf -n 5 fichier # 5 lignes\n\nEntrée: 1 2 3\nSortie: 3 1 2"
    },
    {
        name: "uniq",
        description: "Filtrer lignes répétées consécutives",
        example: "uniq fichier\nuniq -c # compter\nuniq -d # doublons\n\n   2 ligne répétée\n   1 ligne unique"
    },
    {
        name: "expand",
        description: "Convertir tabulations en espaces",
        example: "expand fichier\nexpand -t 4 # tab = 4 espaces\n\nAvant: a\tb\nAprès: a    b"
    },
    {
        name: "unexpand",
        description: "Convertir espaces en tabulations",
        example: "unexpand fichier\nunexpand -a # tous espaces\n\nAvant: a    b\nAprès: a\tb"
    },
    {
        name: "look",
        description: "Rechercher mots commençant par préfixe",
        example: "look pre fichier\nlook pre # dans dict\n\npre\nprefix\npreview"
    },
    {
        name: "sudo",
        description: "Exécuter une commande en tant que superutilisateur (root). À utiliser pour les tâches d'administration système comme installer des logiciels, modifier les fichiers système, gérer les services",
        example: "sudo apt update # mettre à jour les paquets\nsudo systemctl restart nginx # redémarrer service\nsudo -i # devenir root\nsudo -u autre_user # exécuter en tant qu'autre user\nsudo !! # réexécuter dernière commande avec sudo"
    },
    {
        name: "apt/apt-get",
        description: "Gestionnaire de paquets Debian/Ubuntu. Utilisé pour installer, mettre à jour et gérer les logiciels",
        example: "sudo apt update # mettre à jour liste paquets\nsudo apt upgrade # mettre à jour système\nsudo apt install nginx # installer paquet\napt search php # chercher paquet\napt show mysql-server # info paquet\nsudo apt remove program # désinstaller\nsudo apt autoremove # nettoyer dépendances"
    },
    {
        name: "for (boucle)",
        description: "Exécuter des commandes de manière répétitive sur une liste d'éléments",
        example: "# Renommer tous les .txt en .bak\nfor f in *.txt; do mv \"$f\" \"${f%.txt}.bak\"; done\n\n# Compresser plusieurs dossiers\nfor d in */; do tar czf \"$d.tar.gz\" \"$d\"; done\n\n# Traiter une liste de serveurs\nfor server in server1 server2 server3; do\n    ssh \"$server\" 'uptime'\ndone"
    },
    {
        name: "while (boucle)",
        description: "Exécuter des commandes tant qu'une condition est vraie. Utile pour les scripts de monitoring",
        example: "# Surveiller un service toutes les 5 secondes\nwhile true; do\n    systemctl status nginx\n    sleep 5\ndone\n\n# Attendre qu'un serveur soit disponible\nwhile ! ping -c 1 server &>/dev/null; do\n    echo \"Attente du serveur...\"\n    sleep 1\ndone"
    },
    {
        name: "if (condition)",
        description: "Exécuter des commandes conditionnellement. Essentiel pour les scripts shell",
        example: "# Vérifier si un fichier existe\nif [ -f config.txt ]; then\n    echo \"Config trouvée\"\nelse\n    echo \"Config manquante\"\nfi\n\n# Vérifier espace disque\nif df -h / | awk 'NR==2 {gsub(\"%\",\"\",$5); if($5 > 90) exit 1}'; then\n    echo \"Espace OK\"\nelse\n    echo \"Disque presque plein\"\nfi"
    },
    {
        name: "case (switch)",
        description: "Alternative à multiples if/else, plus lisible pour plusieurs conditions",
        example: "case \"$1\" in\n    start)\n        echo \"Démarrage du service\"\n        service start\n        ;;\n    stop)\n        echo \"Arrêt du service\"\n        service stop\n        ;;\n    *)\n        echo \"Usage: $0 {start|stop}\"\n        ;;\nesac"
    },
    {
        name: "variables",
        description: "Stocker et manipuler des valeurs dans des scripts shell",
        example: "# Variables basiques\nNOM=\"serveur-web\"\nPORT=8080\n\n# Variables d'environnement\nexport JAVA_HOME=/usr/lib/jvm/java-11\n\n# Utilisation variables\necho \"Serveur $NOM écoute sur $PORT\"\n\n# Variables spéciales\necho \"Nom script: $0\"\necho \"Tous arguments: $@\"\necho \"Nombre arguments: $#\""
    },
    {
        name: "fonction",
        description: "Créer des blocs de code réutilisables dans les scripts shell",
        example: "# Définir fonction\ncheck_service() {\n    if systemctl is-active $1 >/dev/null; then\n        echo \"$1 est actif\"\n    else\n        echo \"$1 est arrêté\"\n    fi\n}\n\n# Utiliser fonction\ncheck_service nginx\ncheck_service mysql"
    },
    {
        name: "redirection",
        description: "Rediriger entrées/sorties des commandes. Fondamental pour la manipulation des flux",
        example: "# Redirection sortie standard\nls > fichiers.txt\n\n# Ajouter à un fichier\necho \"log\" >> app.log\n\n# Rediriger erreurs\ncommande 2> erreurs.log\n\n# Rediriger tout\ncommande &> tout.log\n\n# Here document\ncat << EOF > config.ini\nport=8080\nhost=localhost\nEOF"
    },
    {
        name: "pipe |",
        description: "Connecter la sortie d'une commande à l'entrée d'une autre. Base du traitement en chaîne",
        example: "# Trouver les gros fichiers\ndu -h | sort -hr | head -n 5\n\n# Processus consommant le plus de CPU\nps aux | sort -nrk 3,3 | head -n 5\n\n# Compter les connexions par IP\nnetstat -an | grep ':80' | awk '{print $5}' | cut -d: -f1 | sort | uniq -c | sort -nr"
    }
];

// Fonction pour afficher les commandes
function displayCommands(searchTerm = '') {
    const commandsContainer = document.getElementById('commands');
    commandsContainer.innerHTML = '';

    const filteredCommands = commands.filter(cmd => 
        cmd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cmd.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cmd.example.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filteredCommands.forEach(cmd => {
        const commandElement = document.createElement('div');
        commandElement.className = 'command';
        commandElement.innerHTML = `
            <div class="command-name">${cmd.name}</div>
            <div class="command-description">${cmd.description}</div>
            <div class="command-example">${cmd.example}</div>
        `;
        commandsContainer.appendChild(commandElement);
    });
}

// Fonction de l'API Mistral
function callMistralAPI(userMessage) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${MISTRAL_API_KEY}`
                },
                body: JSON.stringify({
                    model: "mistral-small-latest",
                    messages: [
                        {
                            role: "system",
                            content: "Tu es un expert Linux spécialisé dans les commandes shell, l'administration système, les scripts shell et les bonnes pratiques. Réponds de manière précise et concise avec des exemples pratiques."
                        },
                        {
                            role: "user",
                            content: userMessage
                        }
                    ]
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || 'Erreur API');
            }

            const data = await response.json();
            if (!data.choices?.[0]?.message?.content) {
                throw new Error('Format de réponse invalide');
            }

            resolve(data.choices[0].message.content);

        } catch (error) {
            reject(error);
        }
    });
}

// Fonction pour ajouter un message
// Fonction pour ajouter un message avec support Markdown
function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    
    if (isUser) {
        messageDiv.textContent = content;
    } else {
        // Configurer Marked.js pour highlight.js
        marked.setOptions({
            highlight: function(code, lang) {
                if (lang && hljs.getLanguage(lang)) {
                    return hljs.highlight(code, { language: lang }).value;
                }
                return hljs.highlightAuto(code).value;
            },
            breaks: true,
            gfm: true
        });
        
        // Convertir le markdown en HTML
        messageDiv.innerHTML = marked.parse(content);
    }
    
    document.getElementById('chat-messages').appendChild(messageDiv);
    messageDiv.scrollIntoView({ behavior: 'smooth' });
}

// Initialisation au chargement du document
document.addEventListener('DOMContentLoaded', () => {
    // Initialisation des commandes
    displayCommands();

    // Écouteur de recherche
    document.getElementById('search').addEventListener('input', (e) => {
        displayCommands(e.target.value);
    });

    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-message');
    const minimizeButton = document.getElementById('minimize-chat');
    const chatContainer = document.getElementById('chat-container');

    // Auto-resize du textarea
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 200) + 'px';
    });

    // Gestion du formulaire
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = chatInput.value.trim();
        
        if (message) {
            // Désactiver l'interface pendant le traitement
            chatInput.disabled = true;
            sendButton.disabled = true;

            // Afficher le message utilisateur
            addMessage(message, true);
            chatInput.value = '';
            chatInput.style.height = 'auto';

            // Afficher l'indicateur de chargement
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'message ai-message loading';
            loadingDiv.textContent = 'En train de réfléchir';
            document.getElementById('chat-messages').appendChild(loadingDiv);

            try {
                // Appeler l'API
                const response = await callMistralAPI(message);
                loadingDiv.remove();
                addMessage(response);
            } catch (error) {
                loadingDiv.remove();
                addMessage(`Erreur: ${error.message}`);
            } finally {
                // Réactiver l'interface
                chatInput.disabled = false;
                sendButton.disabled = false;
                chatInput.focus();
            }
        }
    });

    // Gestion du bouton minimiser
    minimizeButton.addEventListener('click', () => {
        const isMinimized = chatContainer.style.height === '50px';
        chatContainer.style.height = isMinimized ? '600px' : '50px';
        chatContainer.style.overflow = isMinimized ? 'visible' : 'hidden';
        minimizeButton.innerHTML = isMinimized ? 
            '<i class="fas fa-minus"></i>' : 
            '<i class="fas fa-plus"></i>';
    });
});