#!/bin/bash
set -e

# Instalar dependencias
apt-get update
apt-get install -y zsh git curl

# Instalar oh-my-zsh en modo silencioso
RUNZSH=no CHSH=no KEEP_ZSHRC=yes sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" --unattended

# Cambiar shell por defecto
chsh -s $(which zsh) root

