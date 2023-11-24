package dao;

import aplicacao.*;
import jdbc.ConexaoMySQL;
import org.h2.command.query.Select;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import usuario.Funcionario;

import java.util.List;

import metodo.Log;

public class DaoMySQL {
    ConexaoMySQL conexao = new ConexaoMySQL();
    JdbcTemplate con = conexao.getConexaoDoBanco();

    Log logs = new Log();

    public DaoMySQL() {
        this.conexao = conexao;
        this.con = con;
    }

    // FUNÇÕES DE ADICIONAR REGISTROS (INSERT)
    public void adicionarComputador(Computador computador) {
        con.update("INSERT IGNORE INTO computador (nome, fkEmpresa, fkModeloComputador, fkEmpresaLocataria, fkStatus) VALUES (?, ?, ?, ?, ?)", computador.getNome(), computador.getFkEmpresa(), computador.getFkModeloComputador(), computador.getFkEmpresaLocataria(), computador.getFkStatus());
    }

    public void adicionarComponente(Componente componente) {
        con.update("INSERT IGNORE INTO componente (fkComputador, fkHardware) VALUES (?, ?)", componente.getFkComputador(), componente.getFkHardware());
    }

    public void adicionarHardwareSemEspecificidade(Hardware hardware) {
        con.update("INSERT IGNORE INTO hardware (nome, capacidade, fkTipoHardware) VALUES (?, ?, ?)", hardware.getNome(), hardware.getCapacidade(), hardware.getFkTipoHardware());
    }

    public void adicionarCaptura(Captura captura) {
        con.update("INSERT IGNORE INTO captura (valor, fkComputador, fkHardware, fkComponente) VALUES (?, ?, ?, ?)", captura.getValor(), captura.getFkComputador(), captura.getFkHardware(), captura.getFkComponente());
    }

    public void adicionarAlerta(Alerta alerta) {
        con.update("INSERT IGNORE INTO alerta (titulo, fkCaptura, fkTipoAlerta) VALUES (?, ?, ?)", alerta.getTitulo(), alerta.getFkCaptura(), alerta.getFkTipoAlerta());
    }


    // FUNCÕES DE EXIBIR REGISTROS (SELECT)
    public Computador exibirComputadorAtual(String nome) {
        // ISSO AQUI BUSCA 1 ELEMENTO (COM PERSONALIZAÇÃO)
        con.execute("SET FOREIGN_KEY_CHECKS = 0");
        Computador computadorDoBanco = con.queryForObject("SELECT nome, fkEmpresa, fkModeloComputador, fkEmpresaLocataria, fkStatus FROM computador WHERE nome = ?", new BeanPropertyRowMapper<>(Computador.class), nome);
        return computadorDoBanco;
    }

    public List<Hardware> exibirHardwareCadastrados() {
        // SEMPRE FAZER ESSE BLOCO DE CODIGO PARA PRINTAR NA TELA E GUARDAR NO VETOR "personagensDoBanco"
        con.execute("SET FOREIGN_KEY_CHECKS = 0");
        List<Hardware> hardwareDoBanco = con.query("SELECT nome, especificidade, capacidade, fkTipoHardware FROM hardware", new BeanPropertyRowMapper<>(Hardware.class));
        return hardwareDoBanco;
    }

    public List<Componente> exibirComponentesCadastrados() {
        // SEMPRE FAZER ESSE BLOCO DE CODIGO PARA PRINTAR NA TELA E GUARDAR NO VETOR "personagensDoBanco"
        con.execute("SET FOREIGN_KEY_CHECKS = 0");
        List<Componente> componenteDoBanco = con.query("SELECT fkComputador, fkHardware FROM componente", new BeanPropertyRowMapper<>(Componente.class));
        return componenteDoBanco;
    }

    public List<EmpresaLocataria> exibirEmpresasLocatarias(Integer fkEmpresa) {
        // SEMPRE FAZER ESSE BLOCO DE CODIGO PARA PRINTAR NA TELA E GUARDAR NO VETOR "personagensDoBanco"
        con.execute("SET FOREIGN_KEY_CHECKS = 0");
        List<EmpresaLocataria> empresasLocatariasDoBanco = con.query("SELECT nome, fkMatriz, fkEmpresa, fkStatus FROM empresaLocataria WHERE fkEmpresa = ? AND fkStatus = 1", new BeanPropertyRowMapper<>(EmpresaLocataria.class), fkEmpresa);
        return empresasLocatariasDoBanco;
    }

    public List<Captura> exibirCapturasDeUmTipo(Integer tipo) {
        // SEMPRE FAZER ESSE BLOCO DE CODIGO PARA PRINTAR NA TELA E GUARDAR NO VETOR "personagensDoBanco"
        con.execute("SET FOREIGN_KEY_CHECKS = 0");
        List<Captura> capturasDoBanco = con.query("SELECT valor, dtCaptura, fkTipoHardware FROM captura AS cpt JOIN componente AS cmp ON idComponente = fkComponente JOIN Hardware AS hdw ON hdw.idHardware = cmp.fkHardware WHERE hdw.fkTipoHardware = ? ORDER BY dtCaptura DESC LIMIT 10", new BeanPropertyRowMapper<>(Captura.class), tipo);
        return capturasDoBanco;
    }

    public List<Parametro> exibirParametrosDoModeloComputador(Integer fkModeloComputador) {
        // SEMPRE FAZER ESSE BLOCO DE CODIGO PARA PRINTAR NA TELA E GUARDAR NO VETOR "personagensDoBanco"
        con.execute("SET FOREIGN_KEY_CHECKS = 0");
        List<Parametro> parametrosDoBanco = con.query("SELECT min, max, fkUnidadeMedida, fkTipoHardware, fkModeloComputador FROM parametro WHERE fkModeloComputador = ?", new BeanPropertyRowMapper<>(Parametro.class), fkModeloComputador);
        return parametrosDoBanco;
    }

    public List<Captura> exibirIdCaptura() {
        // SEMPRE FAZER ESSE BLOCO DE CODIGO PARA PRINTAR NA TELA E GUARDAR NO VETOR "personagensDoBanco"
        con.execute("SET FOREIGN_KEY_CHECKS = 0");
        List<Captura> parametrosDoBanco = con.query("SELECT idCaptura FROM captura ORDER BY idCaptura DESC LIMIT 1", new BeanPropertyRowMapper<>(Captura.class));
        return parametrosDoBanco;
    }


    // FUNCÕES DE ATUALIZAR REGISTROS (UPDATE)
    public void atualizarComputador(Integer opcao) {
        con.update("UPDATE computador SET fkStatus = ? WHERE idComputador = 1", opcao);
    }
}
