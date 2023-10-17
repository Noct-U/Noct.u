package teste;

import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import dao.NoctuDao;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Timer;
import java.util.TimerTask;

public class TestePrototipo {
    public static void main(String[] args) {
        NoctuDao dao = new NoctuDao();
        Processador processador = new Processador();
        Memoria memoria = new Memoria();
        // DiscoGrupo grupoDeDiscos = new DiscoGrupo();
        // List<Disco> discos = grupoDeDiscos.getDiscos();

        // FORMATAR DATA E HORA NO FORMATO MYSQL
        DateTimeFormatter formatadorDeData = DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss");

        // ADICIONANDO A FICHA TECNICA (INSERINDO HARDWARE NO BANCO)
        Hardware hardwareCPU = new Hardware(processador.getNome(), 100.0, 1);
        Hardware hardwareMemoria = new Hardware("RAM", memoria.getTotal().doubleValue(), 2);

        dao.adicionarHardware(hardwareCPU);
        dao.adicionarHardware(hardwareMemoria);

        Componente componenteCPU = new Componente(1, 1, "123dsa45");
        Componente componenteRAM = new Componente(1, 2, "78asd9s1");

        dao.adicionarComponente(componenteCPU);
        dao.adicionarComponente(componenteRAM);

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

                String valorMemoriaTexto = String.format("%.2f", memoria.getEmUso().doubleValue());

                Captura cap01 = new Captura(valorProcessador, dataAtual, 1, 1, 1);
                Captura cap02 = new Captura(valorMemoria, dataAtual, 1, 2, 2);

                dao.adicionarCaptura(cap01);
                dao.adicionarCaptura(cap02);
                System.out.println(dao.exibirCaptura());
            }
        };
        // TEMPORIZADOR PARA A TAREFA.
        timer.scheduleAtFixedRate(tarefa, 0, 5000);
    }
}