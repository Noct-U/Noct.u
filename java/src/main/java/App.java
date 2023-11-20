import aplicacao.Captura;
import aplicacao.Componente;
import aplicacao.Computador;
import aplicacao.Hardware;
import com.github.britooo.looca.api.group.discos.DiscoGrupo;
import com.github.britooo.looca.api.group.discos.Volume;
import com.github.britooo.looca.api.group.janelas.JanelaGrupo;
import com.github.britooo.looca.api.group.memoria.Memoria;
import com.github.britooo.looca.api.group.processador.Processador;
import com.github.britooo.looca.api.group.rede.Rede;
import com.sun.jna.platform.win32.WinDef;
import dao.DaoMySQL;
import dao.DaoSQLServer;
import jdbc.ConexaoMySQL;
import oshi.SystemInfo;
import slack.BotSlack;
import usuario.Funcionario;
import usuario.Representante;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Scanner;
import java.util.Timer;
import java.util.TimerTask;

import org.springframework.jdbc.core.JdbcTemplate;
//import teste.bot.BotSlack;
import jdbc.ConexaoMySQL;
import metodo.Log;

public class App {
    public static void main(String[] args) {
        // ENTRADA DE DADOS
        Scanner in = new Scanner(System.in);
        Scanner inText = new Scanner(System.in);

        ConexaoMySQL Conexao = new ConexaoMySQL();
        Log log = new Log();
        JdbcTemplate con = Conexao.getConexaoDoBanco();

        // LOOCA
        Rede rede = new Rede(new SystemInfo());
        Processador processador = new Processador();
        Memoria memoria = new Memoria();
        DiscoGrupo grupoDeDiscos = new DiscoGrupo();
        List<Volume> volumes = grupoDeDiscos.getVolumes();
        JanelaGrupo grupoDeJanelas = new JanelaGrupo(new SystemInfo());

        // CONEXÕES PARA OS BANCOS MYSQL E SQLSERVER
        DaoMySQL daoMySQL = new DaoMySQL();
        DaoSQLServer daoSQLServer = new DaoSQLServer();                      // LEMBRAR DISSO AQUI

        Integer opcaoEscolhida = -1;
        Integer opcaoEscolhida2 = -1;

        System.out.println("SISTEMA DE MONITORAMENTO NOCTU");
        do {
            System.out.print("Digite seu email: ");
            String email = inText.nextLine();
            System.out.print("Digite sua senha: ");
            String senha = inText.nextLine();

            // VALIDANDO SE POSSUI CADASTRO NO BANCO
            Funcionario func = daoMySQL.exibirUsuario(email);
            if (func.getEmail().equals(email) && func.getSenha().equals(senha)) {
                System.out.println("\n----- Bem vindo - %s -----".formatted(func.getNome()));

                // ADICIONANDO COMPUTADOR
                Computador computador = new Computador(rede.getParametros().getHostName(), func.getFkEmpresa(), 1, null, 1);
                if (daoMySQL.exibirComputadorCadastrado(computador.getNome()).size() > 0) {
                    System.out.println("\nComputador já cadastrado");
                } else {
                    System.out.println("\nCriando computador...");
                    daoMySQL.adicionarComputador(computador);
                }

                // ADICIONANDO CPU, MEMORIA, DISCO, E JANELA
                Hardware hardwareCPU = new Hardware(processador.getNome(), 100.0, 1);
                Hardware hardwareMemoria = new Hardware("RAM", memoria.getTotal().doubleValue(), 2);
                if (daoMySQL.exibirHardwareCadastrados().size() < 4) {
                    System.out.println("Cadastrando CPU...");
                    daoMySQL.adicionarHardwareSemEspecificidade(hardwareCPU);
                    System.out.println("Cadastrando RAM...");
                    daoMySQL.adicionarHardwareSemEspecificidade(hardwareMemoria);

                    for (Volume v : volumes) {
                        System.out.println("Cadastrando Disco...");
                        Hardware hardwareDisco = new Hardware(v.getNome(), v.getTotal().doubleValue(), 3);
                        daoMySQL.adicionarHardwareSemEspecificidade(hardwareDisco);
                    }

                    Hardware hardwareJanelas = new Hardware("Janelas", grupoDeJanelas.getTotalJanelasVisiveis().doubleValue(), 4);
                    System.out.println("Cadastrando Janelas...");
                    daoMySQL.adicionarHardwareSemEspecificidade(hardwareJanelas);
                } else {
                    System.out.println("Hardwares já cadastrados");
                }
                if (daoMySQL.exibirComponentesCadastrados().size() < 4) {
                    System.out.println("Montando setup com CPU...");
                    Componente componenteCPU = new Componente(1, 1);
                    daoMySQL.adicionarComponente(componenteCPU);

                    System.out.println("Montando setup com RAM...");
                    Componente componenteRAM = new Componente(1, 2);
                    daoMySQL.adicionarComponente(componenteRAM);

                    System.out.println("Montando setup com Disco...");
                    Componente componenteDisco = new Componente(1, 3);
                    daoMySQL.adicionarComponente(componenteDisco);

                    System.out.println("Montando setup com Janela...");
                    Componente componenteJanela = new Componente(1, 4);
                    daoMySQL.adicionarComponente(componenteJanela);
                } else {
                    System.out.println("Componentes já montados");
                }

                if (daoMySQL.exibirComputadorAtual(computador.getNome()).getFkStatus().equals(1)) {
                    System.out.println("Iniciando capturas...");

                    // CRIA UM TEMPORIZADOR COM INTERVALO DE X SEGUNDOS.
                    Timer timer = new Timer();

                    // CRIA UMA TAREFA PARA SER EXECUTADA REPETIDAMENTE.
                    TimerTask tarefa = new TimerTask() {
                        @Override
                        public void run() {
                            Long valorProcessador = processador.getUso().longValue();
                            Captura cap01 = new Captura(valorProcessador.doubleValue(), 1, 1, 1);
                            daoMySQL.adicionarCaptura(cap01);

                            Long valorMemoria = memoria.getEmUso();
                            Captura cap02 = new Captura(valorMemoria.doubleValue(), 1, 2, 2);
                            daoMySQL.adicionarCaptura(cap02);

                            Captura cap03 = null;

                            for (Volume v : volumes) {
                                Long valorDisco = v.getTotal() - v.getDisponivel();
                                cap03 = new Captura(valorDisco.doubleValue(), 1, 3, 3);
                                daoMySQL.adicionarCaptura(cap03);
                            }

                            Long valorJanela = grupoDeJanelas.getTotalJanelas().longValue();
                            Captura cap04 = new Captura(valorJanela.doubleValue(), 1, 4, 4);
                            daoMySQL.adicionarCaptura(cap04);

                            Log.gerarLog(cap01.getValor(), cap02.getValor(),cap03.getValor(), computador.getNome());
                            //Log.adicionarMotivo();


                        }
                    };
                    // TEMPORIZADOR PARA A TAREFA.
                    timer.scheduleAtFixedRate(tarefa, 5, 5000);

                    Componente componenteCPU = new Componente();
                    Componente componenteRAM = new Componente();
                    Componente componenteDisco = new Componente();
                    Componente componenteJanela = new Componente();
                    // Notificações para slack
                    verificarLimiteEEnviarNotificacao("CPU", componenteCPU.getFkHardware());
                    verificarLimiteEEnviarNotificacao("RAM", componenteRAM.getFkHardware());
                    verificarLimiteEEnviarNotificacao("Disco", componenteDisco.getFkHardware());
                    verificarLimiteEEnviarNotificacao("Quantidade janelas", componenteJanela.getFkHardware());


                } else {
                    System.out.println("\nA captura desse computador esta desativada!!");
                }


                Integer opcaoUsuario = -1;
                do {
                    if (func.getFkTipoUsuario().equals(1)) {
                        // DIRECIONANDO PARA ÁREA DE REPRESENTANTE
                        Representante rep = new Representante(func.getNome(), func.getEmail(), func.getSenha(), func.getFkTipoUsuario(), func.getFkEmpresa(), func.getFkEmpresa(), func.getFkStatus());

                        System.out.println("""
                                \nVocê está como representante
                                1) Ativar computador atual
                                2) Desativar computador atual
                                3) Visualizar CPU
                                4) Visualizar RAM
                                5) Visualizar Disco
                                6) Visualizar Janelas
                                0) Sair""");
                        opcaoEscolhida2 = in.nextInt();

                        switch (opcaoEscolhida2) {
                            case 1:
                                System.out.println("Ativando captura de dados...");
                                rep.atualizarMaquina(1);
                                break;
                            case 2:
                                System.out.println("Desativando captura de dados...");
                                rep.atualizarMaquina(2);
                                break;
                            case 3:
                                System.out.println("Visualizando dados de CPU...");
                                rep.visualizarCPU();
                                break;
                            case 4:
                                System.out.println("Visualizando dados de RAM...");
                                rep.visualizarRAM();
                                break;
                            case 5:
                                System.out.println("Visualizando dados de Disco...");
                                rep.visualizarDisco();
                                break;
                            case 6:
                                System.out.println("Visualizando dados de Janelas...");
                                rep.visualizarJanelas();
                                break;
                            case 0:
                                System.out.println("Saindo...");
                                break;
                            default:
                                System.out.println("Escolha uma opção válida!");
                                break;
                        }
                    } else {
                        // DIRECIONANDO PARA ÁREA DE FUNCIONÁRIO
                        System.out.println("Entrando nas opções de funcionário");

                        System.out.println("""
                                1) Visualizar CPU
                                2) Visualizar RAM
                                3) Visualizar Disco
                                4) Visualizar Janelas
                                0) Sair""");

                        opcaoEscolhida2 = in.nextInt();
                        switch (opcaoEscolhida2) {
                            case 1:
                                System.out.println("Visualizando dados de CPU...");
                                func.visualizarCPU();
                                break;
                            case 2:
                                System.out.println("Visualizando dados de RAM...");
                                func.visualizarRAM();
                                break;
                            case 3:
                                System.out.println("Visualizando dados de Disco...");
                                func.visualizarDisco();
                                break;
                            case 4:
                                System.out.println("Visualizando dados de Janelas...");
                                func.visualizarJanelas();
                                break;
                            default:
                            case 0:
                                System.out.println("Saindo...");
                                break;
                        }
                    }
                } while (opcaoUsuario != 0);


            } else {
                System.out.println("Email e/ou senha incorretos!");
            }
        } while (!opcaoEscolhida.equals(1));

    }

    private static void verificarLimiteEEnviarNotificacao(String componente, Integer fkTipoHardware) {
        if (componente.equals("CPU") || componente.equals("Janelas Abertas")) {
            // Notificar o usuário no Java
            System.out.println("Alerta de limite no Jar");
        }
        // Enviar notificação por Slack
        try {
            BotSlack botSlack = new BotSlack();
            botSlack.mensagemHardware(componente);
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException("Erro ao enviar notificação no Slack", e);
        }
    }
}

