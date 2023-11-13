package teste;

import com.github.britooo.looca.api.group.discos.DiscoGrupo;
import com.github.britooo.looca.api.group.discos.Volume;
import com.github.britooo.looca.api.group.janelas.JanelaGrupo;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import com.github.britooo.looca.api.group.rede.RedeInterfaceGroup;
import dao.NoctuDao;
import oshi.SystemInfo;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
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
        List<Volume> volumes = grupoDeDiscos.getVolumes();
        JanelaGrupo grupoDeJanelas = new JanelaGrupo(si);

        // FORMATAR DATA E HORA NO FORMATO MYSQL
        DateTimeFormatter formatadorDeData = DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss");

        // ADICIONANDO A FICHA TECNICA (INSERINDO HARDWARE NO BANCO)
        Hardware hardwareCPU = new Hardware(processador.getNome(), 100.0, 1);
        Hardware hardwareMemoria = new Hardware("RAM", memoria.getTotal().doubleValue(), 2);

        dao.adicionarHardware(hardwareCPU);
        dao.adicionarHardware(hardwareMemoria);

        Hardware hardwareDisco;
        for (Volume v : volumes) {
            hardwareDisco = new Hardware(v.getNome(), v.getTotal().doubleValue(), 3);
            dao.adicionarHardware(hardwareDisco);
        }

        Hardware hardwareJanelas = new Hardware("Janelas", grupoDeJanelas.getTotalJanelasVisiveis().doubleValue(), 4);
        dao.adicionarHardware(hardwareJanelas);

        Componente componenteCPU = new Componente(1, 1, "123dsa45");
        Componente componenteRAM = new Componente(1, 2, "78asd9s1");
        Componente componenteDisco = new Componente(1, 3, "7avsd9s0");
        Componente componenteJanela = new Componente(1, 4, "dasd546a");

//        dao.adicionarComponenteCPU(componenteCPU);
//        dao.adicionarComponenteRAM(componenteRAM);
//        dao.adicionarComponenteDisco(componenteDisco);
//        dao.adicionarComponenteJanela(componenteJanela);

        PlacaDeRede placa = new PlacaDeRede();
        System.out.println(placa.getHostName());
        System.out.println(placa.getNumIpv4());

        RedeInterfaceGroup rede2 =new RedeInterfaceGroup(new SystemInfo());
        System.out.println(rede2.getInterfaces().get(1).getEnderecoIpv4());

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
                Captura cap01 = new Captura(valorProcessador, dataAtual, 1, 1, 1);
                dao.adicionarCaptura(cap01);

                Double valorMemoria = memoria.getEmUso().doubleValue();
                Captura cap02 = new Captura(valorMemoria, dataAtual, 1, 2, 2);
                dao.adicionarCaptura(cap02);

                for (Volume v : volumes) {
                    Double valorDisco;
                    valorDisco = v.getTotal().doubleValue() - v.getDisponivel().doubleValue();
                    Captura cap03 = new Captura(valorDisco, dataAtual, 1, 3, 3);
                    dao.adicionarCaptura(cap03);
                }

                Double valorJanela = grupoDeJanelas.getTotalJanelas().doubleValue();
                Captura cap04 = new Captura(valorJanela, dataAtual, 1, 4, 4);
                dao.adicionarCaptura(cap04);


                GravarEmArquivo(componenteCPU, componenteRAM, componenteDisco, componenteJanela);

                System.out.println(dao.exibirCaptura());
            }

            private void GravarEmArquivo(Componente componenteCPU, Componente componenteRAM, Componente componenteDisco, Componente componenteJanela) {

                String nomeDoArquivo = "C:\\Users\\sthef\\OneDrive\\Área de Trabalho\\Noct.u\\java\\LogTXT";

                // Mensagem para solicitar suporte
                String mensagemSuporte = "Suporte foi solicitado para arrumar a máquina.";

                try {
                    File LogTXT = new File(nomeDoArquivo);

                    if (!LogTXT.exists()) {
                        LogTXT.createNewFile();
                    }

                    BufferedWriter escritor = new BufferedWriter(new FileWriter(LogTXT, true));

                    // Construir a string de dados
                    String dados = "Consumo CPU: " + componenteCPU + "%\n" + "Consumo RAM: " + componenteRAM + " bytes\n" + "Consumo Disco: " + componenteDisco + " GB\n" + "Janelas Abertas: " + componenteJanela + " janelas abertas\n" + "Mensagem para Suporte: " + mensagemSuporte + "\n\n";

                    // Escrever os dados no arquivo
                    escritor.write(dados);

                    escritor.close();

                    System.out.println("Dados gravados em " + nomeDoArquivo + ", Gerando LOG de consumos dos dados");

                } catch (IOException e) {
                    e.printStackTrace();
                }
            }


        };
        // TEMPORIZADOR PARA A TAREFA.
        timer.scheduleAtFixedRate(tarefa, 5, 5000);
    }


}