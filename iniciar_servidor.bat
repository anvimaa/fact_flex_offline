@echo off
title FACT FLEXI - Inicializacao Automatica
CHCP 65001 > nul

echo ------------------------------------------------
echo 🚀 Iniciando o FACT FLEXI...
echo ------------------------------------------------

:: Obtém o diretório onde o script está localizado
cd /d "%~dp0"

:: Verifica se o arquivo build existe
if exist "build" (
    echo ✅ Pasta 'build' encontrada. Iniciando servidor...
    echo Acesse o sistema no seu navegador em: http://localhost:3000 (ou na porta configurada)
    echo Pressione CTRL+C para encerrar o servidor.
    echo ------------------------------------------------
    node build
) else (
    echo ❌ Erro: Pasta 'build' nao encontrada.
    echo Certifique-se de que o sistema foi compilado corretamente.
    pause
)
