#!/bin/bash

echo "Olá usuário, vamos instalar nossa nova aplicação!"
sleep 1
echo "Atualizando e baixando pacotes!"
sudo apt update && sudo apt upgrade
sleep 2
echo "Pacotes atualizados!"

echo "Verificando se você possui o Java instalado na sua máquina!"
sleep 2

java -version
if [ $? == 0 ]; 
    then
        echo -e "Você ja possui o java instalado"
        sleep 4

        echo "Agora será baixado o arquivo .JAR"
        cd /home/$USER/Desktop
        wget
        








    else 
        echo -e "Você não possui java instalado"

    echo -e "Deseja baixar o java?"
    sleep 4
fi