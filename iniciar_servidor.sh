#!/bin/bash

# FACT FLEXI - Script de Inicialização (Linux/macOS)
# Desenvolvido por: António Mantente (@anvimaa)

echo "------------------------------------------------"
echo "🚀 Iniciando o FACT FLEXI..."
echo "------------------------------------------------"

# Obtém o diretório onde o script está localizado
cd "$(dirname "$0")"

# Verifica se o arquivo build existe
if [ -d "build" ]; then
    echo "✅ Pasta 'build' encontrada. Iniciando servidor..."
    echo "Acesse o sistema no seu navegador em: http://localhost:3000 (ou na porta configurada)"
    echo "Pressione CTRL+C para encerrar o servidor."
    echo "------------------------------------------------"
    node build
else
    echo "❌ Erro: Pasta 'build' não encontrada."
    echo "Certifique-se de que o sistema foi compilado corretamente."
    read -p "Pressione qualquer tecla para sair..."
fi
