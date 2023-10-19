#!/bin/bash

sudo adduser noctu

sudo usermod -a -G sudo noctu

su noctu

sudo apt update

sudo apt upgrade

sudo apt install xrdp lxde-core lxde tigervnc-standalone-server -y

if which java > /dev/null 2>&1; then
  java_version=$(java -version 2>&1 | head -n 1 | awk -F '"' '{print $2}')

  if [ "$(echo -e "17\n$java_version" | sort -V | head -n 1)" == "17" ]; then
    echo "A versão do JDK é igual ou superior a 17."
  else
    echo "A versão do JDK é inferior a 17."
    echo "Deseja atualizar? [s/n]"
    read get

    if [ "$get" == "s" ]; then
      sudo apt install openjdk-17-jre -y
    else
      echo "Você escolheu não prosseguir"
    fi
  fi
else
  echo "Java não está instalado."
  echo "Gostaria de instalar o OpenJDK-17? [s/n]"
  read get

  if [ "$get" == "s" ]; then
    sudo apt install openjdk-17-jre -y
  else
    echo "Você escolheu não prosseguir."
  fi
fi