package dao;

import aplicacao.Captura;
import aplicacao.Componente;
import aplicacao.Computador;
import aplicacao.Hardware;
import jdbc.ConexaoMySQL;
import org.h2.command.query.Select;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import usuario.Funcionario;

import java.util.List;

public class DaoMySQL {
    ConexaoMySQL conexao = new ConexaoMySQL();
    JdbcTemplate con = conexao.getConexaoDoBanco();

    public DaoMySQL() {
        this.conexao = conexao;
        this.con = con;
    }

    // FUNÇÕES DE ADICIONAR REGISTROS (INSERT)
    public void adicionarComputador(Computador computador) {
        con.update("INSERT INTO computador (nome, fkEmpresa, fkModeloComputador, fkEmpresaLocataria, fkStatus) VALUES (?, ?, ?, ?, ?)", computador.getNome(), computador.getFkEmpresa(), computador.getFkModeloComputador(), computador.getFkEmpresaLocataria(), computador.getFkStatus());
    }

    public void adicionarComponente(Componente componente) {
        con.update("INSERT INTO componente (fkComputador, fkHardware) VALUES (?, ?)", componente.getFkComputador(), componente.getFkHardware());
    }

    public void adicionarHardwareSemEspecificidade(Hardware hardware) {
        con.update("INSERT INTO hardware (nome, capacidade, fkTipoHardware) VALUES (?, ?, ?)", hardware.getNome(), hardware.getCapacidade(), hardware.getFkTipoHardware());
    }

    public void adicionarCaptura(Captura captura) {
        con.update("INSERT INTO captura (valor, fkComputador, fkHardware, fkComponente) VALUES (?, ?, ?, ?)", captura.getValor(), captura.getFkComputador(), captura.getFkHardware(), captura.getFkComponente());
    }


    // FUNCÕES DE EXIBIR REGISTROS (SELECT)
    public Funcionario exibirUsuario(String email) {
        // ISSO AQUI BUSCA 1 ELEMENTO (COM PERSONALIZAÇÃO)
        Funcionario funcionarioDoBanco = con.queryForObject("SELECT nome, email, senha, fkTipoUsuario, fkEmpresaLocadora, fkEmpresa, fkStatus FROM usuario WHERE email = ?", new BeanPropertyRowMapper<>(Funcionario.class), email);
        return funcionarioDoBanco;
    }

    public List<Computador> exibirComputadorCadastrado(String nome) {
        // SEMPRE FAZER ESSE BLOCO DE CODIGO PARA PRINTAR NA TELA E GUARDAR NO VETOR "personagensDoBanco"
        List<Computador> computadorDoBanco = con.query("SELECT nome, fkEmpresa, fkModeloComputador, fkEmpresaLocataria, fkStatus FROM computador WHERE nome = ?", new BeanPropertyRowMapper<>(Computador.class), nome);
        return computadorDoBanco;
    }

    public Computador exibirComputadorAtual(String nome) {
        // ISSO AQUI BUSCA 1 ELEMENTO (COM PERSONALIZAÇÃO)
        Computador computadorDoBanco = con.queryForObject("SELECT nome, fkEmpresa, fkModeloComputador, fkEmpresaLocataria, fkStatus FROM computador WHERE nome = ?", new BeanPropertyRowMapper<>(Computador.class), nome);
        return computadorDoBanco;
    }

    public List<Hardware> exibirHardwareCadastrados() {
        // SEMPRE FAZER ESSE BLOCO DE CODIGO PARA PRINTAR NA TELA E GUARDAR NO VETOR "personagensDoBanco"
        List<Hardware> hardwareDoBanco = con.query("SELECT nome, especificidade, capacidade, fkTipoHardware FROM hardware", new BeanPropertyRowMapper<>(Hardware.class));
        return hardwareDoBanco;
    }

    public List<Componente> exibirComponentesCadastrados() {
        // SEMPRE FAZER ESSE BLOCO DE CODIGO PARA PRINTAR NA TELA E GUARDAR NO VETOR "personagensDoBanco"
        List<Componente> componenteDoBanco = con.query("SELECT fkComputador, fkHardware FROM componente", new BeanPropertyRowMapper<>(Componente.class));
        return componenteDoBanco;
    }

    public List<Captura> exibirTodasCapturas() {
        // SEMPRE FAZER ESSE BLOCO DE CODIGO PARA PRINTAR NA TELA E GUARDAR NO VETOR "personagensDoBanco"
        List<Captura> capturasDoBanco = con.query("SELECT valor, dtCaptura, fkTipoHardware FROM captura AS cpt JOIN componente AS cmp ON idComponente = fkComponente JOIN Hardware AS hdw ON hdw.idHardware = cmp.fkHardware ORDER BY dtCaptura DESC", new BeanPropertyRowMapper<>(Captura.class));
        return capturasDoBanco;
    }

    public List<Captura> exibirCapturasDeUmTipo(Integer tipo) {
        // SEMPRE FAZER ESSE BLOCO DE CODIGO PARA PRINTAR NA TELA E GUARDAR NO VETOR "personagensDoBanco"
        List<Captura> capturasDoBanco = con.query("SELECT valor, dtCaptura, fkTipoHardware FROM captura AS cpt JOIN componente AS cmp ON idComponente = fkComponente JOIN Hardware AS hdw ON hdw.idHardware = cmp.fkHardware WHERE hdw.fkTipoHardware = ? ORDER BY dtCaptura DESC LIMIT 10", new BeanPropertyRowMapper<>(Captura.class), tipo);
        return capturasDoBanco;
    }


    // FUNCÕES DE ATUALIZAR REGISTROS (UPDATE)
    public void atualizarComputador(Integer opcao) {
        con.update("UPDATE computador SET fkStatus = ? WHERE idComputador = 1", opcao);
    }
}
