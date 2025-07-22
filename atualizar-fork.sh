#!/bin/bash

echo "Atualizando fork com repositório original..."

echo " Buscando atualizações"
git fetch upstream

echo "Fazendo merge"
git merge upstream/main


if [ $? -eq 0 ]; then
    echo "Merge realizado com sucesso!"
    
    echo " Enviando para seu fork..."
    git push origin main
    
    echo " Fork atualizado com sucesso!"
    echo "Agora você pode trabalhar nas suas mudanças."
else
    echo " Conflitos detectados!"
    echo "Resolva os conflitos manualmente e rode:"
    echo "git add ."
    echo "git commit"
    echo "git push origin main"
fi 
