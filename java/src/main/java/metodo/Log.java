package metodo;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class Log {
    private static final String CAMINHO_ARQUIVO = "src/main/java/users/";
    private static final int LIMITE_CPU = 60;  // Defina o limite máximo de CPU conforme necessário
    private static final int LIMITE_RAM = 60;  // Defina o limite máximo de RAM conforme necessário

    public static void gerarLog(Double componenteCPU, Double componenteRAM, Double componenteDisco, String nome) {
        LocalDate dataAtual = LocalDate.now();
        DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd ", Locale.ENGLISH);
        String nomeArquivo = dateFormat.format(dataAtual) + "_log.txt";
        String caminhoCompleto = CAMINHO_ARQUIVO + nomeArquivo;

        if (Files.exists(Path.of(caminhoCompleto))) {
            adicionarMensagens(caminhoCompleto, dataAtual, componenteCPU, componenteRAM, componenteDisco, nome);
        } else {
            criarNovoArquivo(caminhoCompleto, dataAtual);
        }
    }

    private static void adicionarMensagens(String caminhoCompleto, LocalDate dataAtual, Double componenteCPU, Double componenteRAM, Double componenteDisco, String nome) {
        try (BufferedWriter writer = Files.newBufferedWriter(Path.of(caminhoCompleto), StandardOpenOption.APPEND)) {

            String mensagemSuporte = "Suporte foi solicitado para arrumar  a maquina";

            // Adicionar mensagem relacionada ao consumo máximo de CPU e RAM
            String mensagemConsumo = String.format("O consumo de CPU estourou o máximo sugerido (%d%%). O consumo de RAM atingiu o máximo sugerido (%d%%) de acordo com o nome da máquina.%n", LIMITE_CPU, LIMITE_RAM);

            String dados = String.format("Data/Hora: %s%n Computador: %s %n Consumo CPU: %.2f%nConsumo RAM: %.2f bytes%nConsumo Disco: %.2f GB%n %n", dataAtual, nome, componenteCPU, componenteRAM, componenteDisco, mensagemConsumo);

            writer.write(dados);
//            System.out.println("Mensagem adicionada ao log em: " + caminhoCompleto);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void criarNovoArquivo(String caminhoCompleto, LocalDate dataAtual) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(caminhoCompleto))) {
            System.out.println("log gerado com sucesso em: " + caminhoCompleto);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void adicionarMotivo(String mensagem) {  // caso queira colocar mensagem do pq do erro
        LocalDate dataAtual = LocalDate.now();
        DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("yyyyMMdd", Locale.ENGLISH);
        String nomeArquivo = dateFormat.format(dataAtual) + "_log.txt";
        String caminhoCompleto = CAMINHO_ARQUIVO + nomeArquivo;

        if (Files.exists(Path.of(caminhoCompleto))) {
            LocalDateTime dataAtualLogs = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss", Locale.ENGLISH);

            // Formata a data de acordo com o formato especificado
            String dataFormatadaLog = formatter.format(dataAtualLogs);
            String mesagemLog = dataFormatadaLog + mensagem;
            salvarMensagem(caminhoCompleto, mesagemLog);
        } else {
            criarNovoArquivo(caminhoCompleto, dataAtual);
        }
    }

    private static void salvarMensagem(String caminhoCompleto, String mensagem) {
        try (BufferedWriter writer = Files.newBufferedWriter(Path.of(caminhoCompleto), StandardOpenOption.APPEND)) {
            writer.write(mensagem + "\n");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}