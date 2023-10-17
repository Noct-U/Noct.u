package dao;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import teste.Captura;
import teste.Componente;
import teste.Hardware;

import java.util.List;

public class NoctuDao {
    Conexao conexao = new Conexao();
    JdbcTemplate con = conexao.getConexaoDoBanco();

    public NoctuDao() {
        this.conexao = conexao;
        this.con = con;
    }

    // INSERT NO BANCO PARA CAPTURAR E EXIBIR DADOS EM TEMPO REAL
    public void adicionarCaptura(Captura captura) {
        con.update("INSERT INTO captura (valor, dtCaptura, fkComputador, fkHardware, fkComponente) VALUES (?, ?, ?, ?, ?)", captura.getValor(), captura.getDtCaptura(), captura.getFkComputador(), captura.getFkHardware(), captura.getFkComponente());
    }

    public void adicionarCapturaComDescricao(Captura captura) {
        con.update("INSERT INTO captura (valor, descricao, dtCaptura, fkComputador, fkHardware, fkComponente) VALUES (?, ?, ?, ?, ?, ?)", captura.getValor(), captura.getDescricao(), captura.getDtCaptura(), captura.getFkComputador(), captura.getFkHardware(), captura.getFkComponente());
    }

    public List<Componente.Captura> exibirCaptura() {
        // SEMPRE FAZER ESSE BLOCO DE CODIGO PARA PRINTAR NA TELA E GUARDAR NO VETOR "personagensDoBanco"
        List<Componente.Captura> capturaDoBanco = con.query("SELECT * FROM captura", new BeanPropertyRowMapper<>(Componente.Captura.class));
        return capturaDoBanco;
    }

    public void adicionarHardware(Hardware hardware) {
        con.update("INSERT INTO hardware (nome, capacidade, fkTipoHardware) VALUES (?, ?, ?)", hardware.getNome(), hardware.getCapacidade(), hardware.getFkModeloHardware());
    }

    public void adicionarComponente(Componente componente) {
        con.update("INSERT INTO componente (fkComputador, fkHardware, codigoSerial) VALUES (?, ?, ?)", componente.getFkComputador(), componente.getFkHardware(), componente.getCodigoSerial());
    }





//
//    public List<Componente> exibirComponente() {
//        // SEMPRE FAZER ESSE BLOCO DE CODIGO PARA PRINTAR NA TELA E GUARDAR NO VETOR "personagensDoBanco"
//        List<Componente> componenteDoBanco = con.query("SELECT * FROM Componente", new BeanPropertyRowMapper<>(Componente.class));
//        return componenteDoBanco;
//    }
//
//    public List<DadoComponente> exibirDadoComponente() {
//        // SEMPRE FAZER ESSE BLOCO DE CODIGO PARA PRINTAR NA TELA E GUARDAR NO VETOR "personagensDoBanco"
//        List<DadoComponente> dadoComponenteDoBanco = con.query("SELECT * FROM dadoComponente", new BeanPropertyRowMapper<>(DadoComponente.class));
//        return dadoComponenteDoBanco;
//    }
//
//    public List<ModeloComponente> verificarModelos() {
//        // SEMPRE FAZER ESSE BLOCO DE CODIGO PARA PRINTAR NA TELA E GUARDAR NO VETOR "personagensDoBanco"
//        List<ModeloComponente> modeloComponentedoBanco = con.query("SELECT nome FROM modeloComponente", new BeanPropertyRowMapper<>(ModeloComponente.class));
//        return modeloComponentedoBanco;
//    }
//
//    public void atualizarLivro(Integer id, Livros livro) {
//        con.update("UPDATE livros SET nome = ?, preco = ? WHERE id = ?", livro.getNome(), livro.getPreco(), id);
//    }
//
//    public void deletarLivro(Integer id) {
//        con.update("DELETE FROM livros WHERE id = ?", id);
//    }
//
//    public List<Livros> buscarLivro(String nomeLivro) {
//        List<Livros> livrosDoBanco = con.query("SELECT * FROM livros WHERE nome LIKE ?", new BeanPropertyRowMapper<>(Livros.class), String.format("%%%s%%", nomeLivro));
//        return livrosDoBanco;
//    }
}
