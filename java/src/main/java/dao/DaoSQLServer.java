package dao;

import aplicacao.*;
import jdbc.ConexaoSQLServer;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class DaoSQLServer {
    ConexaoSQLServer conexao = new ConexaoSQLServer();
    JdbcTemplate con = conexao.getConexaoDoBanco();

    public DaoSQLServer() {
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

    public void adicionarAlerta(Alerta alerta) {
        con.update("INSERT INTO alerta (titulo, fkCaptura, fkTipoAlerta) VALUES (?, ?, ?)", alerta.getTitulo(), alerta.getFkCaptura(), alerta.getFkTipoAlerta());
    }

    public List<Computador> exibirIdComputadorPeloNomeComputador(String nome) {
        // SEMPRE FAZER ESSE BLOCO DE CODIGO PARA PRINTAR NA TELA E GUARDAR NO VETOR "personagensDoBanco"
        List<Computador> computadorDoBanco = con.query("SELECT IdComputador FROM computador WHERE nome = ?", new BeanPropertyRowMapper<>(Computador.class), nome);
        return computadorDoBanco;
    }

    public List<Hardware> exibirIdHardwarePeloNomeHardware(String nome) {
        // SEMPRE FAZER ESSE BLOCO DE CODIGO PARA PRINTAR NA TELA E GUARDAR NO VETOR "personagensDoBanco"
        List<Hardware> hardwareDoBanco = con.query("SELECT idHardware FROM hardware WHERE nome = ? ORDER BY idHardware DESC", new BeanPropertyRowMapper<>(Hardware.class), nome);
        return hardwareDoBanco;
    }

    public List<Computador> exibirComputadorCadastrado(String nome) {
        // SEMPRE FAZER ESSE BLOCO DE CODIGO PARA PRINTAR NA TELA E GUARDAR NO VETOR "personagensDoBanco"
        List<Computador> computadorDoBanco = con.query("SELECT nome, fkEmpresa, fkModeloComputador, fkEmpresaLocataria, fkStatus FROM computador WHERE nome = ?", new BeanPropertyRowMapper<>(Computador.class), nome);
        return computadorDoBanco;
    }
}
