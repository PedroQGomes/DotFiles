export ZSH="$HOME/.oh-my-zsh"

# See https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
ZSH_THEME="lukerandall"
DISABLE_UNTRACKED_FILES_DIRTY="true"

plugins=(git zsh-autosuggestions command-not-found)

source $ZSH/oh-my-zsh.sh

# Preferred editor for local and remote sessions
# if [[ -n $SSH_CONNECTION ]]; then
#   export EDITOR='vim'
# else
#   export EDITOR='mvim'
# fi

LS_COLORS='rs=0:di=01;95:ln=01;94:mh=00:pi=40;33:so=01;94:do=01;94:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=30;41:tw=30;95:ow=95;95:st=37;44:ex=01;94:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.jpg=01;94:*.jpeg=01;94:*.mjpg=01;94:*.mjpeg=01;94:*.gif=01;94:*.bmp=01;94:*.pbm=01;94:*.pgm=01;94:*.ppm=01;94:*.tga=01;94:*.xbm=01;94:*.xpm=01;94:*.tif=01;94:*.tiff=01;94:*.png=01;94:*.svg=01;94:*.svgz=01;94:*.mng=01;94:*.pcx=01;94:*.mov=01;94:*.mpg=01;94:*.mpeg=01;94:*.m2v=01;94:*.mkv=01;94:*.webm=01;94:*.ogm=01;94:*.mp4=01;94:*.m4v=01;94:*.mp4v=01;94:*.vob=01;94:*.qt=01;94:*.nuv=01;94:*.wmv=01;94:*.asf=01;94:*.rm=01;94:*.rmvb=01;94:*.flc=01;94:*.avi=01;94:*.fli=01;94:*.flv=01;94:*.gl=01;94:*.dl=01;94:*.xcf=01;94:*.xwd=01;94:*.yuv=01;94:*.cgm=01;94:*.emf=01;94:*.ogv=01;94:*.ogx=01;94:*.aac=00;94:*.au=00;94:*.flac=00;94:*.m4a=00;94:*.mid=00;94:*.midi=00;94:*.mka=00;94:*.mp3=00;94:*.mpc=00;94:*.ogg=00;94:*.ra=00;94:*.wav=00;94:*.oga=00;94:*.opus=00;94:*.spx=00;94:*.xspf=00;94:';
export LS_COLORS

# Zsh to use the same colors as ls
zstyle ':completion:*' list-colors ${(s.:.)LS_COLORS} 

__kube_contexts() {
  local curr_arg;
  curr_arg=${COMP_WORDS[COMP_CWORD]}
  COMPREPLY=( $(compgen -W "- $(kubectl config get-contexts --output='name')" -- $curr_arg ) );
}

__kube_namespaces() {
  local curr_arg;
  curr_arg=${COMP_WORDS[COMP_CWORD]}
  COMPREPLY=( $(compgen -W "- $(kubectl get namespaces -o=jsonpath='{range .items[*].metadata.name}{@}{"\n"}{end}')" -- $curr_arg ) );
}

source <(kubectl completion zsh)
source <(helm completion zsh)
complete -F __start_kubectl kubectl
complete -F __kube_contexts kubectx
complete -F __kube_namespaces kubens

alias k=kubectl
alias ks=kubens
alias kx=kubectx  

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

export KUBECONFIG=/home/pedro/.kube/config
export PATH=$PATH:/usr/local/go/bin
export PATH=$PATH:/snap/bin
export PATH="$PATH:/opt/nvim-linux64/bin"