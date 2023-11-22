import aplicacao.*;
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
import java.util.*;

import org.springframework.jdbc.core.JdbcTemplate;
//import teste.bot.BotSlack;
import jdbc.ConexaoMySQL;
import metodo.Log;

public class App {
    public static void main(String[] args) {
        // ENTRADA DE DADOS
        Scanner in = new Scanner(System.in);
        Scanner inText = new Scanner(System.in);

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
        Integer opcaoEscolhida2 = -2;

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
                    System.out.println("""
                            \nCriando computador...
                            Associe esse computador a uma das empresas abaixo
                            ID | EMPRESA | MATRIZ""");
                    List<EmpresaLocataria> empresas = daoMySQL.exibirEmpresasLocatarias(func.getFkEmpresa());
                    for (int i = 0; i < empresas.size(); i++) {
                        EmpresaLocataria empresaDaVez = empresas.get(i);
                        String empresaMatriz;
                        Integer contador = i + 1;
                        if (empresaDaVez.getFkMatriz() != null) {
                            empresaMatriz = daoMySQL.exibirEmpresasLocatariasMatriz(contador).getNome();
                        } else {
                            empresaMatriz = "-";
                        }
                        System.out.println("""
                                %d) %s %s""".formatted(contador, empresaDaVez.getNome(), empresaMatriz));
                    }
                    System.out.print("ID: ");
                    Integer alocarComputador = in.nextInt();
                    computador.setFkEmpresaLocataria(alocarComputador);
                    daoMySQL.adicionarComputador(computador);
//                    daoSQLServer.adicionarComputador(computador);
                }

                // ADICIONANDO CPU, MEMORIA, DISCO, E JANELA
                Hardware hardwareCPU = new Hardware(processador.getNome(), 100.0, 1);
                Hardware hardwareMemoria = new Hardware("RAM", memoria.getTotal().doubleValue(), 2);
                if (daoMySQL.exibirHardwareCadastrados().size() < 4) {
                    System.out.println("Cadastrando CPU...");
                    daoMySQL.adicionarHardwareSemEspecificidade(hardwareCPU);
//                    daoSQLServer.adicionarHardwareSemEspecificidade(hardwareCPU);
                    System.out.println("Cadastrando RAM...");
                    daoMySQL.adicionarHardwareSemEspecificidade(hardwareMemoria);
//                    daoSQLServer.adicionarHardwareSemEspecificidade(hardwareMemoria);

                    for (Volume v : volumes) {
                        System.out.println("Cadastrando Disco...");
                        Hardware hardwareDisco = new Hardware(v.getNome(), v.getTotal().doubleValue(), 3);
                        daoMySQL.adicionarHardwareSemEspecificidade(hardwareDisco);
//                        daoSQLServer.adicionarHardwareSemEspecificidade(hardwareDisco);
                    }

                    Hardware hardwareJanelas = new Hardware("Janelas", grupoDeJanelas.getTotalJanelasVisiveis().doubleValue(), 4);
                    System.out.println("Cadastrando Janelas...");
                    daoMySQL.adicionarHardwareSemEspecificidade(hardwareJanelas);
//                    daoSQLServer.adicionarHardwareSemEspecificidade(hardwareJanelas);
                } else {
                    System.out.println("Hardwares já cadastrados");
                }
                if (daoMySQL.exibirComponentesCadastrados().size() < 4) {
                    System.out.println("Montando setup com CPU...");
                    Componente componenteCPU = new Componente(1, 1);
                    daoMySQL.adicionarComponente(componenteCPU);
//                    daoSQLServer.adicionarComponente(componenteCPU);

                    System.out.println("Montando setup com RAM...");
                    Componente componenteRAM = new Componente(1, 2);
                    daoMySQL.adicionarComponente(componenteRAM);
//                    daoSQLServer.adicionarComponente(componenteRAM);

                    System.out.println("Montando setup com Disco...");
                    Componente componenteDisco = new Componente(1, 3);
                    daoMySQL.adicionarComponente(componenteDisco);
//                    daoSQLServer.adicionarComponente(componenteDisco);

                    System.out.println("Montando setup com Janela...");
                    Componente componenteJanela = new Componente(1, 4);
                    daoMySQL.adicionarComponente(componenteJanela);
//                    daoSQLServer.adicionarComponente(componenteJanela);
                } else {
                    System.out.println("Componentes já montados");
                }

                if (daoMySQL.exibirComputadorAtual(computador.getNome()).getFkStatus().equals(1)) {
                    System.out.println("Iniciando capturas...");

                    List<Parametro> parametros = (daoMySQL.exibirParametrosDoModeloComputador(computador.getFkModeloComputador()));
                    Double valorInicial;
                    Double valorFinal;
                    Double Range;

                    // CRIA UM TEMPORIZADOR COM INTERVALO DE X SEGUNDOS.
                    Timer timer = new Timer();

                    // CRIA UMA TAREFA PARA SER EXECUTADA REPETIDAMENTE.
                    TimerTask tarefa = new TimerTask() {
                        @Override
                        public void run() {
                            Double valorInicial;
                            Double valorFinal;
                            Double range;
                            Double alertaVermelhoAbaixo;
                            Double alertaAmareloAbaixo;
                            Double alertaAmareloAcima;
                            Double alertaVermelhoAcima;
                            Double valorAtual;

                            Parametro parametroAtual = parametros.get(1);
                            valorInicial = parametroAtual.getMin();
                            valorFinal = parametroAtual.getMax();
                            range = valorFinal - valorInicial;
                            alertaVermelhoAbaixo = valorInicial + (range * 0.125);
                            alertaAmareloAbaixo = valorInicial + (range * 0.25);
                            alertaAmareloAcima = valorInicial + (range * 0.75);
                            alertaVermelhoAcima = valorInicial + (range * 0.875);

                            Long valorProcessador = processador.getUso().longValue();
                            Captura cap01 = new Captura(valorProcessador.doubleValue(), 1, 1, 1);
                            valorAtual = cap01.getValor();
                            daoMySQL.adicionarCaptura(cap01);
//                            daoSQLServer.adicionarCaptura(cap01);
                            if (valorAtual <= alertaVermelhoAbaixo) {
                                Integer idCaptura = daoMySQL.exibirIdCaptura().get(0).getIdCaptura();
                                Alerta alerta = new Alerta("CPU - ABAIXO DO LIMITE", idCaptura, 2);
                                daoMySQL.adicionarAlerta(alerta);
                            } else if (valorAtual <= alertaAmareloAbaixo) {
                                Integer idCaptura = daoMySQL.exibirIdCaptura().get(0).getIdCaptura();
                                Alerta alerta = new Alerta("CPU - PERTO DO LIMITE BAIXO", idCaptura, 1);
                                daoMySQL.adicionarAlerta(alerta);
                            } else if (valorAtual >= alertaAmareloAcima && valorAtual < alertaVermelhoAcima) {
                                Integer idCaptura = daoMySQL.exibirIdCaptura().get(0).getIdCaptura();
                                Alerta alerta = new Alerta("CPU - PERTO DO LIMITE ACIMA", idCaptura, 1);
                                daoMySQL.adicionarAlerta(alerta);
                            } else if (valorAtual >= alertaVermelhoAcima) {
                                Integer idCaptura = daoMySQL.exibirIdCaptura().get(0).getIdCaptura();
                                Alerta alerta = new Alerta("CPU - ACIMA DO LIMITE ", idCaptura, 2);
                                daoMySQL.adicionarAlerta(alerta);
                            }


                            Long valorMemoria = memoria.getEmUso();
                            Captura cap02 = new Captura(valorMemoria.doubleValue(), 1, 2, 2);
                            daoMySQL.adicionarCaptura(cap02);
//                            daoSQLServer.adicionarCaptura(cap02);
                            valorAtual = cap02.getValor();
                            if (valorAtual <= alertaVermelhoAbaixo) {
                                Integer idCaptura = daoMySQL.exibirIdCaptura().get(0).getIdCaptura();
                                Alerta alerta = new Alerta("RAM - ABAIXO DO LIMITE", idCaptura, 2);
                                daoMySQL.adicionarAlerta(alerta);
                            } else if (valorAtual <= alertaAmareloAbaixo) {
                                Integer idCaptura = daoMySQL.exibirIdCaptura().get(0).getIdCaptura();
                                Alerta alerta = new Alerta("RAM - PERTO DO LIMITE BAIXO", idCaptura, 1);
                                daoMySQL.adicionarAlerta(alerta);
                            } else if (valorAtual >= alertaAmareloAcima && valorAtual < alertaVermelhoAcima) {
                                Integer idCaptura = daoMySQL.exibirIdCaptura().get(0).getIdCaptura();
                                Alerta alerta = new Alerta("RAM - PERTO DO LIMITE ACIMA", idCaptura, 1);
                                daoMySQL.adicionarAlerta(alerta);
                            } else if (valorAtual >= alertaVermelhoAcima) {
                                Integer idCaptura = daoMySQL.exibirIdCaptura().get(0).getIdCaptura();
                                Alerta alerta = new Alerta("RAM - ACIMA DO LIMITE ", idCaptura, 2);
                                daoMySQL.adicionarAlerta(alerta);
                            }

                            Captura cap03 = null;

                            for (Volume v : volumes) {
                                Long valorDisco = v.getTotal() - v.getDisponivel();
                                cap03 = new Captura(valorDisco.doubleValue(), 1, 3, 3);
                                daoMySQL.adicionarCaptura(cap03);
//                                daoSQLServer.adicionarCaptura(cap03);
                                valorAtual = cap03.getValor();
                                if (valorAtual <= alertaVermelhoAbaixo) {
                                    Integer idCaptura = daoMySQL.exibirIdCaptura().get(0).getIdCaptura();
                                    Alerta alerta = new Alerta("DISCO - ABAIXO DO LIMITE", idCaptura, 2);
                                    daoMySQL.adicionarAlerta(alerta);
                                } else if (valorAtual <= alertaAmareloAbaixo) {
                                    Integer idCaptura = daoMySQL.exibirIdCaptura().get(0).getIdCaptura();
                                    Alerta alerta = new Alerta("DISCO - PERTO DO LIMITE BAIXO", idCaptura, 1);
                                    daoMySQL.adicionarAlerta(alerta);
                                } else if (valorAtual >= alertaAmareloAcima && valorAtual < alertaVermelhoAcima) {
                                    Integer idCaptura = daoMySQL.exibirIdCaptura().get(0).getIdCaptura();
                                    Alerta alerta = new Alerta("DISCO - PERTO DO LIMITE ACIMA", idCaptura, 1);
                                    daoMySQL.adicionarAlerta(alerta);
                                } else if (valorAtual >= alertaVermelhoAcima) {
                                    Integer idCaptura = daoMySQL.exibirIdCaptura().get(0).getIdCaptura();
                                    Alerta alerta = new Alerta("DISCO - ACIMA DO LIMITE ", idCaptura, 2);
                                    daoMySQL.adicionarAlerta(alerta);
                                }
                            }

                            Long valorJanela = grupoDeJanelas.getTotalJanelas().longValue();
                            Captura cap04 = new Captura(valorJanela.doubleValue(), 1, 4, 4);
                            daoMySQL.adicionarCaptura(cap04);
//                            daoSQLServer.adicionarCaptura(cap04);

                            Log.gerarLog(cap01.getValor(), cap02.getValor(), cap03.getValor(), computador.getNome());
//                            Log.adicionarMotivo();


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
                                System.exit(0);
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

