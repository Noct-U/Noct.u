package teste;

import com.github.britooo.looca.api.group.discos.Disco;
import com.github.britooo.looca.api.group.discos.DiscoGrupo;
import com.github.britooo.looca.api.group.discos.Volume;
import com.github.britooo.looca.api.group.janelas.Janela;
import com.github.britooo.looca.api.group.janelas.JanelaGrupo;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import dao.NoctuDao;
import oshi.SystemInfo;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

public class TestePrototipo {
    public static void main(String[] args) {
        SystemInfo si = new SystemInfo();
        NoctuDao dao = new NoctuDao();
        Processador processador = new Processador();
        Memoria memoria = new Memoria();
        DiscoGrupo grupoDeDiscos = new DiscoGrupo();
        List<Disco> discos = grupoDeDiscos.getDiscos();
        JanelaGrupo grupoDeJanelas = new JanelaGrupo(si);

        // FORMATAR DATA E HORA NO FORMATO MYSQL
        DateTimeFormatter formatadorDeData = DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss");

        // ADICIONANDO A FICHA TECNICA (INSERINDO HARDWARE NO BANCO)
        Hardware hardwareCPU = new Hardware(processador.getNome(), 100.0, 1);
        Hardware hardwareMemoria = new Hardware("RAM", memoria.getTotal().doubleValue(), 2);
        Hardware hardwareJanelas = new Hardware("Janelas", grupoDeJanelas.getTotalJanelasVisiveis().doubleValue(), 4);

        dao.adicionarHardware(hardwareCPU);
        dao.adicionarHardware(hardwareMemoria);
        dao.adicionarHardware(hardwareJanelas);

        Hardware hardwareDisco;
        for (Disco d : discos) {
            hardwareDisco = new Hardware(d.getModelo(), d.getEscritas().doubleValue(), 3);
            dao.adicionarHardware(hardwareDisco);
        }

        Componente componenteCPU = new Componente(1, 1, "123dsa45");
        Componente componenteRAM = new Componente(1, 2, "78asd9s1");
        Componente componenteDisco0 = new Componente(1, 3, "7avsd9s0");
        Componente componenteDisco1 = new Componente(1, 4, "awdx8zc6");
        Componente componenteJanela = new Componente(1, 5, "dasd546a");

        dao.adicionarComponente(componenteCPU);
        dao.adicionarComponente(componenteRAM);
        dao.adicionarComponente(componenteDisco0);
        dao.adicionarComponente(componenteDisco1);
        dao.adicionarComponente(componenteJanela);

        // CRIA UM TEMPORIZADOR COM INTERVALO DE X SEGUNDOS.
        Timer timer = new Timer();

        // CRIA UMA TAREFA PARA SER EXECUTADA REPETIDAMENTE.
        TimerTask tarefa = new TimerTask() {
            @Override
            public void run() {
                // Pega a data atual e formata no estilo mySQL
                LocalDateTime dataHora = LocalDateTime.now();
                String dataAtual = dataHora.format(formatadorDeData);

                Double valorProcessador = processador.getUso();
                Double valorMemoria = memoria.getEmUso().doubleValue();
                Double valorJanela = grupoDeJanelas.getTotalJanelas().doubleValue();

                Captura cap01 = new Captura(valorProcessador, dataAtual, 1, 1, 1);
                Captura cap02 = new Captura(valorMemoria, dataAtual, 1, 2, 2);
                Captura cap04 = new Captura(valorJanela, dataAtual, 1, 5, 5);

                dao.adicionarCaptura(cap01);
                dao.adicionarCaptura(cap02);

                for (int i = 0; i < 2; i++) {
                    Disco d = discos.get(i);
                    Double valorDisco = d.getBytesDeEscritas().doubleValue();
                    Captura cap03 = new Captura(valorDisco, dataAtual, 1, i + 3, i + 3);
                    dao.adicionarCaptura(cap03);
                }
                dao.adicionarCaptura(cap04);

                System.out.println(dao.exibirCaptura());
            }
        };
        // TEMPORIZADOR PARA A TAREFA.
        timer.scheduleAtFixedRate(tarefa, 0, 5000);
    }
}