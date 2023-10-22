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
        sleep 3

        echo "Agora será baixado o arquivo .JAR"
        cd /home/$USER/Desktop
        wget https://github.com/Noct-U/Noct.u/blob/main/java/noctu-looca-1.0.jar
        sleep 3

        echo "Arquivo baixado, agora será executado"
        java -jar noctu-looca-1.0.jar
        sleep 3

        echo "Aquivo executando..."
        sleep 4
    
    else 
        echo -e "Você não foi possível encontrar o java instalado na sua máquina"
        echo -e "Deseja baixar o java? (s/n)"
        read get
        if [ "$inst" == "s" ];
            then
            
            else
        
        sleep 4
fi