package teste.metodo;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class Log {
    private static final String CAMINHO_ARQUIVO = "src/main/java/teste/users/";
    private static final int LIMITE_CPU = 60;  // Defina o limite máximo de CPU conforme necessário
    private static final int LIMITE_RAM = 60;  // Defina o limite máximo de RAM conforme necessário

    public static void gerarLog(Long componenteCPU, Long componenteRAM, Long componenteDisco) {
        LocalDate dataAtual = LocalDate.now();
        DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("yyyyMMdd", Locale.ENGLISH);
        String nomeArquivo = dateFormat.format(dataAtual) + "_log.txt";
        String caminhoCompleto = CAMINHO_ARQUIVO + nomeArquivo;

        if (Files.exists(Path.of(caminhoCompleto))) {
            adicionarMensagens(caminhoCompleto, dataAtual, componenteCPU, componenteRAM, componenteDisco);
        } else {
            criarNovoArquivo(caminhoCompleto, dataAtual);
        }
    }

    private static void adicionarMensagens(String caminhoCompleto, LocalDate dataAtual, Long componenteCPU, Long componenteRAM, Long componenteDisco) {
        try (BufferedWriter writer = Files.newBufferedWriter(Path.of(caminhoCompleto), StandardOpenOption.APPEND)) {

            // Adicionar mensagem relacionada ao consumo máximo de CPU e RAM
            String mensagemConsumo = String.format("O consumo de CPU estourou o máximo sugerido (%d%%). O consumo de RAM atingiu o máximo sugerido (%d%%) de acordo com o nome da máquina.%n", LIMITE_CPU, LIMITE_RAM);

            String dados = String.format("Data/Hora: %s%n CPU: %d%%%nConsumo RAM: %d bytes%nConsumo Disco: %d GB%n",
                    dataAtual, componenteCPU, componenteRAM, componenteDisco, mensagemConsumo);

            writer.write(dados);
            writer.write("Nova mensagem de log adicionada.\n");
            System.out.println("Mensagem adicionada ao log em: " + caminhoCompleto);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void criarNovoArquivo(String caminhoCompleto, LocalDate dataAtual) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(caminhoCompleto))) {
            writer.write(String.format("Data/Hora: %s%nMensagem de log: Este é um exemplo de log.%n", dataAtual));
            System.out.println("Novo log gerado com sucesso em: " + caminhoCompleto);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static class Main {
        public static void main(String[] args) {
            // Valores de exemplo
            Long componenteCPU = 70L;
            Long componenteRAM = 8000000000L;  // 8 GB
            Long componenteDisco = 100L;  // 100 GB

            // Chama o método gerarLog com os valores de exemplo
            Log.gerarLog( componenteCPU, componenteRAM, componenteDisco);
        }
    }
}
